import {Children} from 'react';
import SQLite from 'react-native-sqlite-storage';
import {materials} from '../components/data/materialsData';

SQLite.enablePromise(true);

export const getDBConnection = async () => {
  return SQLite.openDatabase({name: 'volley_apps.db', location: 'default'});
};

export const createTable = async db => {
  await db.executeSql(`
        CREATE TABLE IF NOT EXISTS schedules (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sasaran TEXT NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL
        )
    `);

  await db.executeSql(`
      CREATE TABLE IF NOT EXISTS schedule_days(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        schedule_id INTEGER NOT NULL,
        training_date DATE NOT NULL,
        FOREIGN KEY (schedule_id) REFERENCES schedules(id) ON DELETE CASCADE
      )
  `);

  await db.executeSql(`
        CREATE TABLE IF NOT EXISTS schedule_sessions(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            schedule_day_id INTEGER NOT NULL,
            time_start TEXT NOT NULL,
            time_end TEXT NOT NULL,
            periodisasi TEXT NOT NULL,
            FOREIGN KEY (schedule_day_id) REFERENCES schedule_days(id) ON DELETE CASCADE
        )
    `);

  await db.executeSql(`
        CREATE TABLE IF NOT EXISTS category_materials(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            path TEXT NOT NULL,
            description TEXT NOT NULL
        )    
    `);

  await db.executeSql(`
        CREATE TABLE IF NOT EXISTS training_logs(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          session_id INTEGER NOT NULL,
          title TEXT NOT NULL,
          material_id INTEGER,
          material_part_id INTEGER,
          custom_material TEXT,
          repetitions TEXT,
          sets TEXT,
          laps TEXT,
          duration_minutes TEXT,
          distance_km TEXT,
          notes TEXT,
          format_type TEXT, 
          created_at DATETIME NOT NULL,
          FOREIGN KEY (session_id) REFERENCES schedule_sessions(id) ON DELETE CASCADE,
          FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE SET NULL,
          FOREIGN KEY (material_part_id) REFERENCES material_parts(id) ON DELETE SET NULL
        );

    `);

  await db.executeSql(`
      CREATE TABLE IF NOT EXISTS category(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_name TEXT NOT NULL,
        description TEXT
      )
    `);
  await db.executeSql(`
      CREATE TABLE IF NOT EXISTS materials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER,
        title TEXT NOT NULL,
        path TEXT,
        image_path TEXT,
        description TEXT,
        FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL
      )
    `);

  await db.executeSql(`
      CREATE TABLE IF NOT EXISTS material_parts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        material_id INTEGER NOT NULL,
        parent_id INTEGER,
        title TEXT NOT NULL,
        content TEXT,
        format_type TEXT,
        image_path TEXT,
        FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE,
        FOREIGN KEY (parent_id) REFERENCES material_parts(id) ON DELETE CASCADE
      )
    `);

  await initializedData(db);
};

const getFormatFromTitle = (title = '') => {
  const t = title.toLowerCase();

  if (t.includes('jogging') || t.includes('longstride')) return 'time-distance';

  if (
    t.includes('fartlex') ||
    t.includes('cross country') ||
    t.includes('an aerobik') ||
    t.includes('sprint')
  )
    return 'lap-set';

  if (
    t.includes('easy') ||
    t.includes('run') ||
    t.includes('slow') ||
    t.includes('Continous')
  )
    return 'lap-time';

  return 'repetition-set';
};

const markFormatType = (parts, formatType) => {
  for (const part of parts) {
    if (part.children && part.children.length > 0) {
      const allChildrenAreLeaf = part.children.every(
        c => !c.children || c.children.length === 0,
      );
      if (allChildrenAreLeaf) {
        const specificFormat = getFormatFromTitle(part.title); // override
        part.format_type = specificFormat || formatType; // fallback ke format material
      }
      markFormatType(part.children, formatType);
    } else {
      const specificFormat = getFormatFromTitle(part.title);
      part.format_type = specificFormat || formatType;
    }
  }
};

const applyFormatTypeToMaterials = materialsData => {
  for (const material of materialsData) {
    const formatType = getFormatFromTitle(material.title);
    if (material.parts && material.parts.length > 0) {
      markFormatType(material.parts, formatType);
    }
  }
  return materialsData;
};

const initializedData = async db => {
  const [results] = await db.executeSql(
    'SELECT COUNT(*) as count FROM category',
  );
  const count = results.rows.item(0).count;

  if (count === 0) {
    const categories = [
      {name: 'Fisik', desc: 'Melatih Fisik Dengan Alat & Tanpa Alat'},
      {name: 'Teknik', desc: 'Melatih Teknik Olahraga Voli'},
      {name: 'custom', desc: null},
    ];

    for (const cat of categories) {
      await db.executeSql(
        `INSERT INTO category (category_name, description) VALUES (?, ?)`,
        [cat.name, cat.desc],
      );
    }

    const [catResult] = await db.executeSql(`SELECT * FROM category`);
    const categoryMap = {};
    for (let i = 0; i < catResult.rows.length; i++) {
      const item = catResult.rows.item(i);
      categoryMap[item.category_name] = item.id;
    }

    const insertAllMaterialsFromJson = async (
      db,
      materialsJson,
      categoryMap,
    ) => {
      const updatedMaterials = applyFormatTypeToMaterials(materialsJson);
      for (const material of updatedMaterials) {
        const categoryId = categoryMap[material.category] || null;
        const [res] = await db.executeSql(
          `INSERT INTO materials (category_id, title, description, path, image_path) VALUES (?, ?, ?, ?, ?)`,
          [
            categoryId,
            material.title,
            material.description || '',
            material.path || null,
            material.imagePath || null,
          ],
        );
        const materialId = res.insertId;
        if (material.parts && material.parts.length > 0) {
          for (const part of material.parts) {
            await insertMaterialPart(db, materialId, part);
          }
        }
      }
    };

    const insertMaterialPart = async (
      db,
      materialId,
      part,
      parentId = null,
    ) => {
      const imagePath =
        Array.isArray(part.imagePath) || typeof part.imagePath === 'object'
          ? JSON.stringify(part.imagePath)
          : part.imagePath || null;

      const [res] = await db.executeSql(
        `INSERT INTO material_parts (material_id, parent_id, title, content, format_type, image_path) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          materialId,
          parentId,
          part.title,
          part.content || null,
          part.format_type || null,
          imagePath || null,
        ],
      );
      const partId = res.insertId;
      if (part.children && part.children.length > 0) {
        for (const child of part.children) {
          await insertMaterialPart(db, materialId, child, partId);
        }
      }
    };

    await insertAllMaterialsFromJson(db, materials, categoryMap);
    console.log('data category dan materi berhasil ditambahkan ke database!');
  } else {
    console.log('data sudah ditambahkan!');
  }
};

export const insertSchedules = async (db, sasaran, start_date, end_date) => {
  const insertQuery = `INSERT INTO schedules (sasaran, start_date, end_date) VALUES (?, ?, ?)`;
  await db.executeSql(insertQuery, [sasaran, start_date, end_date]);
};

export const getSchedules = async db => {
  const results = await db.executeSql(`SELECT * FROM schedules`);
  const schedule = [];

  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      schedule.push(result.rows.item(i));
    }
  });

  return schedule;
};

export const getScheduleWithDays = async db => {
  const query = `
    SELECT 
      s.id as schedule_id,
      s.sasaran,
      s.start_date,
      s.end_date,
      d.id as day_id,
      d.training_date
    FROM schedules s
    LEFT JOIN schedule_days d ON s.id = d.schedule_id
    ORDER BY s.id, d.training_date
  `;

  const results = await db.executeSql(query);
  const scheduleMap = {};

  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);
      const id = row.schedule_id;

      if (!scheduleMap[id]) {
        console.log(scheduleMap[id]);
        scheduleMap[id] = {
          id: row.schedule_id,
          sasaran: row.sasaran,
          start_date: row.start_date,
          end_date: row.end_date,
          days: [],
        };
      }

      if (row.day_id) {
        scheduleMap[id].days.push({
          id: row.day_id,
          training_date: row.training_date,
        });
      }
    }
  });

  return Object.values(scheduleMap);
};

export const getTodaySchedules = async db => {
  const now = new Date();
  const offsetWIB = 7 * 60 * 60 * 1000; // 7 jam dalam ms
  const nowWIB = new Date(now.getTime() + offsetWIB);
  const today = nowWIB.toISOString().split('T')[0];

  console.log(today.toString());
  const query = `
    SELECT 
      s.id AS schedule_id,
      s.sasaran,
      s.start_date,
      s.end_date,
      d.id AS day_id,
      d.training_date,
      ss.id AS session_id,
      ss.time_start,
      ss.time_end,
      ss.periodisasi
    FROM schedules s
    JOIN schedule_days d ON s.id = d.schedule_id
    JOIN schedule_sessions ss ON d.id = ss.schedule_day_id
    WHERE d.training_date = ?
    ORDER BY ss.time_start
  `;
  const results = await db.executeSql(query, [today]);
  const schedules = [];

  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);

      let schedule = schedules.find(
        item => item.schedule_id === row.schedule_id,
      );

      if (!schedule) {
        schedule = {
          schedule_id: row.schedule_id,
          sasaran: row.sasaran,
          start_date: row.start_date,
          end_date: row.end_date,
          training_date: row.training_date,
          sessions: [],
        };
        schedules.push(schedule);
      }

      schedule.sessions.push({
        session_id: row.session_id,
        time_start: row.time_start,
        time_end: row.time_end,
        periodisasi: row.periodisasi,
      });
    }
  });

  return schedules;
};

export const getLast7DaysSchedules = async db => {
  const now = new Date();
  const offsetWIB = 7 * 60 * 60 * 1000; // UTC+7 dalam ms
  const nowWIB = new Date(now.getTime() + offsetWIB);

  // Ambil tanggal hari ini (format: YYYY-MM-DD)
  const today = nowWIB.toISOString().split('T')[0];

  // Ambil tanggal 6 hari sebelumnya (jadi total 7 hari termasuk hari ini)
  const pastDate = new Date(nowWIB.getTime() - 6 * 24 * 60 * 60 * 1000);
  const startDate = pastDate.toISOString().split('T')[0];

  console.log(`Mengambil jadwal dari ${startDate} sampai ${today}`);

  const query = `
    SELECT 
      s.id AS schedule_id,
      s.sasaran,
      s.start_date,
      s.end_date,
      d.id AS day_id,
      d.training_date,
      ss.id AS session_id,
      ss.time_start,
      ss.time_end,
      ss.periodisasi
    FROM schedules s
    JOIN schedule_days d ON s.id = d.schedule_id
    JOIN schedule_sessions ss ON d.id = ss.schedule_day_id
    WHERE d.training_date BETWEEN ? AND ?
    ORDER BY d.training_date ASC, ss.time_start ASC
  `;

  const results = await db.executeSql(query, [startDate, today]);
  const schedules = [];

  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);

      let schedule = schedules.find(
        item =>
          item.schedule_id === row.schedule_id &&
          item.training_date === row.training_date,
      );

      if (!schedule) {
        schedule = {
          schedule_id: row.schedule_id,
          sasaran: row.sasaran,
          start_date: row.start_date,
          end_date: row.end_date,
          training_date: row.training_date,
          sessions: [],
        };
        schedules.push(schedule);
      }

      schedule.sessions.push({
        session_id: row.session_id,
        time_start: row.time_start,
        time_end: row.time_end,
        periodisasi: row.periodisasi,
      });
    }
  });

  return schedules;
};

export const getSchedulesByDateRange = async (db, startDate, endDate) => {
  const query = `
    SELECT 
      s.id AS schedule_id,
      s.sasaran,
      s.start_date,
      s.end_date,
      d.training_date,
      ss.id AS session_id,
      ss.time_start,
      ss.time_end,
      ss.periodisasi
    FROM schedules s
    JOIN schedule_days d ON s.id = d.schedule_id
    JOIN schedule_sessions ss ON d.id = ss.schedule_day_id
    WHERE d.training_date BETWEEN ? AND ?
    ORDER BY d.training_date ASC, ss.time_start ASC
  `;

  const results = await db.executeSql(query, [startDate, endDate]);
  const schedules = [];

  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);
      let schedule = schedules.find(
        item =>
          item.schedule_id === row.schedule_id &&
          item.training_date === row.training_date,
      );

      if (!schedule) {
        schedule = {
          schedule_id: row.schedule_id,
          sasaran: row.sasaran,
          start_date: row.start_date,
          end_date: row.end_date,
          training_date: row.training_date,
          sessions: [],
        };
        schedules.push(schedule);
      }

      schedule.sessions.push({
        session_id: row.session_id,
        time_start: row.time_start,
        time_end: row.time_end,
        periodisasi: row.periodisasi,
      });
    }
  });

  return schedules;
};

export const getSchedulesAll = async db => {
  const query = `
    SELECT 
      s.id AS schedule_id,
      s.sasaran,
      s.start_date,
      s.end_date,
      d.training_date,
      ss.id AS session_id,
      ss.time_start,
      ss.time_end,
      ss.periodisasi
    FROM schedules s
    JOIN schedule_days d ON s.id = d.schedule_id
    JOIN schedule_sessions ss ON d.id = ss.schedule_day_id
    ORDER BY d.training_date ASC, ss.time_start ASC
  `;

  const results = await db.executeSql(query);
  const schedules = [];

  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);
      let schedule = schedules.find(
        item =>
          item.schedule_id === row.schedule_id &&
          item.training_date === row.training_date,
      );

      if (!schedule) {
        schedule = {
          schedule_id: row.schedule_id,
          sasaran: row.sasaran,
          start_date: row.start_date,
          end_date: row.end_date,
          training_date: row.training_date,
          sessions: [],
        };
        schedules.push(schedule);
      }

      schedule.sessions.push({
        session_id: row.session_id,
        time_start: row.time_start,
        time_end: row.time_end,
        periodisasi: row.periodisasi,
      });
    }
  });

  return schedules;
};
