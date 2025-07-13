import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {showMessage} from 'react-native-flash-message';
import {Alert} from 'react-native';

// Components
import ComponentStyles from './ComponentStyles';
import SubHeader from './SubHeader';
import AnimatedInput from './AnimatedInput';
import {getDBConnection} from '../connection/Database';
import {imageMap} from './ImageMap';
import {PermissionsAndroid, Platform} from 'react-native';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

// Constants
const TRAINING_STATUS = {
  NOT_STARTED: 'Belum Dimulai',
  IN_PROGRESS: 'Sedang Berlangsung',
  FINISHED: 'Selesai',
};

const STATUS_CONFIG = {
  [TRAINING_STATUS.NOT_STARTED]: {
    icon: 'clock-o',
    bgColor: '#facc15',
  },
  [TRAINING_STATUS.IN_PROGRESS]: {
    icon: 'play-circle',
    bgColor: '#3b82f6',
  },
  [TRAINING_STATUS.FINISHED]: {
    icon: 'check-circle',
    bgColor: '#22c55e',
  },
};

const CATEGORIES = ['Teknik', 'Fisik', 'Custom'];
const UPDATE_INTERVAL = 30000; // 30 seconds

// Custom Hooks
const useTrainingData = sessionId => {
  const [data, setData] = useState({
    sasaran: '',
    start_date: '',
    end_date: '',
    training_date: '',
    time_start: '',
    time_end: '',
    periodisasi: '',
  });

  const fetchData = useCallback(async () => {
    const db = await getDBConnection();
    try {
      const results = await db.executeSql(
        `SELECT
          s.sasaran,
          s.start_date,
          s.end_date,
          d.training_date,
          ss.time_start,
          ss.time_end,
          ss.periodisasi 
        FROM schedule_sessions ss 
        JOIN schedule_days d ON ss.schedule_day_id = d.id 
        JOIN schedules s ON d.schedule_id = s.id
        WHERE ss.id = ?`,
        [sessionId],
      );

      if (results[0].rows.length > 0) {
        const row = results[0].rows.item(0);
        setData({
          sasaran: row.sasaran,
          start_date: row.start_date,
          end_date: row.end_date,
          training_date: row.training_date,
          time_start: row.time_start,
          time_end: row.time_end,
          periodisasi: row.periodisasi,
        });
      }
    } catch (error) {
      console.error('Failed to fetch schedule details:', error);
    }
  }, [sessionId]);

  return {data, fetchData};
};

const useMaterials = () => {
  const [materials, setMaterials] = useState({
    Fisik: [],
    Teknik: [],
    Custom: [],
  });

  const fetchMaterials = useCallback(async () => {
    const db = await getDBConnection();
    try {
      const queries = CATEGORIES.map(category =>
        db.executeSql(
          `SELECT m.*, c.category_name FROM materials m
           JOIN category c ON m.category_id = c.id
           WHERE c.category_name = ?`,
          [category === 'Custom' ? 'custom' : category],
        ),
      );

      const results = await Promise.all(queries);

      setMaterials({
        Fisik: results[1][0].rows.raw(),
        Teknik: results[0][0].rows.raw(),
        Custom: results[2][0].rows.raw(),
      });
    } catch (error) {
      console.error('Error while getting materials from database:', error);
    }
  }, []);

  return {materials, fetchMaterials};
};

const useTrainingLogs = sessionId => {
  const [trainingLogs, setTrainingLogs] = useState([]);
  const fetchTrainingLogs = useCallback(async () => {
    const db = await getDBConnection();
    try {
      const [logsRes] = await db.executeSql(
        `SELECT 
        tl.*, 
        mp.title AS material_part_title,
        mp.image_path AS formation_images, 
        mp.parent_id AS material_part_parent_id,
        m.title AS material_title
      FROM training_logs tl
      LEFT JOIN material_parts mp ON mp.id = tl.material_part_id
      LEFT JOIN materials m ON m.id = tl.material_id
      WHERE tl.session_id = ?
      ORDER BY tl.id ASC`,
        [sessionId],
      );

      // Ambil seluruh part untuk membangun path
      const [partsRes] = await db.executeSql(
        `SELECT id, title, parent_id FROM material_parts`,
      );

      const partMap = {};
      partsRes.rows.raw().forEach(part => {
        partMap[part.id] = part;
      });

      // Fungsi membangun full path
      const buildFullPath = partId => {
        const path = [];
        let current = partMap[partId];
        while (current) {
          path.unshift(current.title);
          current = partMap[current.parent_id];
        }
        return path;
      };

      const logs = logsRes.rows.raw().map(log => {
        if (log.material_part_id) {
          const fullPathArray = buildFullPath(log.material_part_id);
          return {
            ...log,
            material_part_full_path: fullPathArray.join(' > '), // full path as string
            material_part_leaf_title: fullPathArray[fullPathArray.length - 1], // only leaf
          };
        }
        return log;
      });

      setTrainingLogs(logs);
    } catch (error) {
      console.error('Failed to fetch training logs:', error);
    }
  }, [sessionId]);

  return {trainingLogs, fetchTrainingLogs};
};

// Utility Functions
const getTotalMinutes = (start, end) => {
  if (!start || !end) return '0';

  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);

  const startInMinutes = startHour * 60 + startMinute;
  const endInMinutes = endHour * 60 + endMinute;

  return endInMinutes - startInMinutes;
};

const computeTrainingStatus = (trainingDate, timeStart, timeEnd) => {
  if (!trainingDate || !timeStart || !timeEnd) return null;

  const today = new Date();
  const todayStr = today.toLocaleDateString('en-CA');

  if (trainingDate !== todayStr) return null;

  const now = today.getHours() * 60 + today.getMinutes();
  const [startHour, startMin] = timeStart.split(':').map(Number);
  const [endHour, endMin] = timeEnd.split(':').map(Number);

  const startTime = startHour * 60 + startMin;
  const endTime = endHour * 60 + endMin;

  let status;
  if (now < startTime) {
    status = TRAINING_STATUS.NOT_STARTED;
  } else if (now >= startTime && now <= endTime) {
    status = TRAINING_STATUS.IN_PROGRESS;
  } else {
    status = TRAINING_STATUS.FINISHED;
  }

  return {
    status,
    icon: <Icon name={STATUS_CONFIG[status].icon} size={16} color="#fff" />,
    bgColor: STATUS_CONFIG[status].bgColor,
  };
};

// Components
const TrainingInfoSection = ({data, trainingStatus}) => (
  <>
    <View style={styles.mainContainer}>
      <View style={styles.title}>
        <Text style={[ComponentStyles.poppinsBold, styles.titleText]}>
          LATIHAN
        </Text>
        <Text style={[ComponentStyles.poppinsBold, styles.subtitleText]}>
          Pilih latihan / Buat Custom Latihan
        </Text>
      </View>

      <View style={styles.inputContainer}>
        {[
          {label: 'Sasaran', value: data.sasaran},
          {label: 'Tanggal Mulai', value: data.start_date},
          {label: 'Tanggal Selesai', value: data.end_date},
          {label: 'Periodisasi', value: data.periodisasi},
        ].map(({label, value}) => (
          <View key={label} style={styles.mainContainer}>
            <AnimatedInput label={label} value={value} editable={false} />
          </View>
        ))}
      </View>
    </View>

    <View
      style={[styles.mainContainer, styles.sesiLatihan, {marginVertical: 0}]}>
      <View>
        <Text style={[styles.sesiLatihanText, ComponentStyles.poppinsBold]}>
          Waktu Latihan
        </Text>
        <Text
          style={[styles.sesiLatihanTextsub, ComponentStyles.poppinsReguler]}>
          {getTotalMinutes(data.time_start, data.time_end)} Menit
        </Text>
      </View>

      <View>
        <Text style={[styles.sesiLatihanText, ComponentStyles.poppinsBold]}>
          Jam Latihan
        </Text>
        <View style={styles.timeContainer}>
          <Text
            style={[styles.sesiLatihanTextsub, ComponentStyles.poppinsReguler]}>
            {data.time_start} - {data.time_end}
          </Text>
          {trainingStatus && (
            <View
              style={[
                styles.statusBadge,
                {backgroundColor: trainingStatus.bgColor},
              ]}>
              {trainingStatus.icon}
            </View>
          )}
        </View>
      </View>
    </View>
  </>
);

const TrainingLogItem = ({log}) => {
  const isSubMaterial = !!log.material_part_leaf_title;

  const renderFormatDescription = () => {
    switch (log.format_type) {
      case 'time-distance':
        return `⏱ ${log.duration_minutes} menit • 📏 ${log.distance_km} km`;
      case 'lap-set':
        return `🏁 ${log.laps} lap • 🔁 ${log.sets} set`;
      case 'repetition-set':
        return `🔂 ${log.repetitions}x • 🔁 ${log.sets} set`;
      case 'lap-time':
        return `🏁 ${log.laps} lap • ⏱ ${log.duration_minutes} menit`;
      default:
        return log.notes ? `📝 ${log.notes}` : '';
    }
  };

  return (
    <TouchableOpacity style={styles.trainingLogItem}>
      <View style={{flexDirection: 'row'}}>
        {isSubMaterial ? (
          <Text style={styles.trainingLogText}>
            {log.material_part_leaf_title}
          </Text>
        ) : (
          <Text style={styles.trainingLogText}>• {log.title}</Text>
        )}
        <Text> - </Text>
        <Text style={styles.trainingLogText}>{log.material_title}</Text>
      </View>
      <Text style={styles.trainingLogDesc}>{renderFormatDescription()}</Text>
      <View
        style={[
          styles.catatan,
          {width: '100%', marginVertical: 10, padding: 10, borderRadius: 10},
        ]}>
        <Text style={{color: '#fff', ...ComponentStyles.poppinsReguler}}>
          {log.notes !== null ? log.notes : 'tidak ada catatan'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const MaterialCard = ({
  material,
  isSelected,
  onPress,
  isCustom = false,
  onLongPressDelete,
}) => (
  <TouchableOpacity
    style={[styles.materialCard, isSelected && styles.selectedMaterialCard]}
    onPress={onPress}
    onLongPress={isCustom ? () => onLongPressDelete(material.id) : null}>
    <Image
      source={
        imageMap[material.image_path] || require('../assets/headerbg.png')
      }
      style={styles.materialImage}
    />
    <View style={styles.materialOverlay}>
      <Icon name="book" size={16} color="#fff" />
      <Text style={[ComponentStyles.poppinsReguler, styles.materialTitle]}>
        {material.title}
      </Text>
    </View>
  </TouchableOpacity>
);

const CustomTrainingForm = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}) => (
  <View style={styles.customFormContainer}>
    <View style={styles.inputContainer}>
      <AnimatedInput
        label="Sasaran"
        value={title}
        onChangeText={onTitleChange}
      />
    </View>
    <TextInput
      style={styles.customDescriptionInput}
      multiline
      placeholder="Masukkan materi latihan"
      value={description}
      onChangeText={onDescriptionChange}
    />
  </View>
);

// Main Component
const LatihanDetailScreen = ({navigation}) => {
  const route = useRoute();
  const {sessionId} = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [trainingStatus, setTrainingStatus] = useState(null);
  const [isCustom, setIsCustom] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [filePath, setFilePath] = useState('');
  const intervalRanAfterFinished = useRef(false);
  const [hasPermission, setHasPermission] = useState(false);

  const {data, fetchData} = useTrainingData(sessionId);
  const {materials, fetchMaterials} = useMaterials();
  const {trainingLogs, fetchTrainingLogs} = useTrainingLogs(sessionId);

  // Status update effect
  useFocusEffect(
    useCallback(() => {
      let intervalId;

      const updateStatus = () => {
        const status = computeTrainingStatus(
          data.training_date,
          data.time_start,
          data.time_end,
        );
        setTrainingStatus(status);

        if (
          status?.status === TRAINING_STATUS.FINISHED &&
          !intervalRanAfterFinished.current
        ) {
          intervalRanAfterFinished.current = true;
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
        }
      };

      updateStatus();
      intervalId = setInterval(updateStatus, UPDATE_INTERVAL);

      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    }, [data.training_date, data.time_start, data.time_end]),
  );

  // Initial data fetch
  useEffect(() => {
    const initializeData = async () => {
      await fetchData();
      await fetchMaterials();
    };
    initializeData();
  }, [sessionId, fetchData, fetchMaterials]);

  useFocusEffect(
    useCallback(() => {
      fetchTrainingLogs();
    }, [fetchTrainingLogs]),
  );

  useEffect(() => {
    checkPermissions();
  }, []);

  const handleTrainingLogPress = log => {
    if (log.category_id === 3) {
      navigation.navigate('customLatihanPage', {materialId: log.materialsId});
    } else if (log.path) {
      navigation.navigate(log.path);
    } else {
      showMessage({
        message: 'Path tidak tersedia untuk materi ini.',
        type: 'warning',
      });
    }
  };

  const handleAddMaterial = () => {
    if (trainingStatus?.status === TRAINING_STATUS.FINISHED) {
      showMessage({
        message:
          'Waktu latihan telah berakhir, tidak dapat menambahkan materi!',
        type: 'warning',
      });
      return;
    }
    setSelectedMaterial(null);
    setModalVisible(true);
  };

  const handleSaveMaterial = async () => {
    const db = await getDBConnection();
    const now = new Date().toISOString();

    try {
      if (isCustom) {
        if (!customTitle || !customDesc) {
          showMessage({
            message: 'Lengkapi semua field untuk custom latihan',
            type: 'danger',
          });
          return;
        }

        const materialRes = await db.executeSql(
          `INSERT INTO materials (category_id, title, description) VALUES (?, ?, ?)`,
          [3, customTitle, customDesc],
        );

        await db.executeSql(
          `INSERT INTO training_logs (session_id, title, material_id, custom_material, created_at)
           VALUES (?, ?, ?, ?, ?)`,
          [sessionId, customTitle, materialRes[0].insertId, customDesc, now],
        );

        setCustomTitle('');
        setCustomDesc('');
        setIsCustom(false);
      } else {
        if (!selectedMaterial) {
          showMessage({
            message: 'Pilih salah satu materi latihan terlebih dahulu',
            type: 'warning',
          });
          return;
        }

        await db.executeSql(
          `INSERT INTO training_logs (session_id, title, material_id, custom_material, created_at)
           VALUES (?, ?, ?, ?, ?)`,
          [sessionId, selectedMaterial.title, selectedMaterial.id, null, now],
        );

        setSelectedMaterial(null);
      }

      showMessage({
        message: 'Latihan berhasil ditambahkan!',
        type: 'success',
      });

      setModalVisible(false);
      fetchTrainingLogs();
    } catch (error) {
      console.error('Error saving material:', error);
      showMessage({
        message: 'Gagal menyimpan latihan',
        type: 'danger',
      });
    }
  };

  const handleDeleteMaterialWithConfirm = materialId => {
    Alert.alert(
      'Hapus Latihan Custom',
      'Apakah Anda yakin ingin menghapus latihan custom ini?',
      [
        {text: 'Batal', style: 'cancel'},
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              const db = await getDBConnection();
              await db.executeSql(`DELETE FROM materials WHERE id = ?`, [
                materialId,
              ]);
              showMessage({
                message: 'Latihan custom berhasil dihapus.',
                type: 'success',
              });
            } catch (error) {
              console.error('Gagal menghapus:', error);
              showMessage({
                message: 'Gagal menghapus latihan custom.',
                type: 'danger',
              });
            }
          },
        },
      ],
    );
  };

  const renderFormatDescription = log => {
    switch (log.format_type) {
      case 'time-distance':
        return `⏱ ${log.duration_minutes} menit • 📏 ${log.distance_km} km`;
      case 'lap-set':
        return `🏁 ${log.laps} lap • 🔁 ${log.sets} set`;
      case 'repetition-set':
        return `🔂 ${log.repetitions}x • 🔁 ${log.sets} set`;
      case 'lap-time':
        return `🏁 ${log.laps} lap • ⏱ ${log.duration_minutes} menit`;
      default:
        return '';
    }
  };

  const generateHTML = (logs, trainingLogs) => {
    const sanitizeNotes = text => {
      if (!text) return '';
      return text.replace(/\n/g, '<br/>');
    };

    const time = getTotalMinutes(
      trainingLogs.time_start,
      trainingLogs.time_end,
    );
    const rows = logs
      .map((log, index) => {
        // Tangani array gambar formasi
        const imagePath = JSON.parse(log.formation_images);
        const formationImageTags = Array.isArray(imagePath)
          ? imagePath
              .map(
                img =>
                  `<img src="file:///android_asset/custom/${img}" width="100" style="margin: 4px;" />`,
              )
              .join('<br/>')
          : '';

        return `
        <tr>
          <td style="border: 1px solid #000;">${index + 1}</td>
          <td style="border: 1px solid #000;">${
            log.material_part_leaf_title || log.title
          }</td>
          <td style="border: 1px solid #000;">${renderFormatDescription(
            log,
          )}</td>
          <td style="border: 1px solid #000; text-align: center;">${formationImageTags}</td>
          <td style="border: 1px solid #000;">${
            sanitizeNotes(log.notes) || ''
          }</td>
        </tr>
      `;
      })
      .join('');

    return `
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; font-size: 12px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 5px; vertical-align: top; }
          img { display: block; margin: auto; }
        </style>
      </head>
      <body>
        <h2 style="text-align: center;">SESI LATIHAN CABANG OLAHRAGA BOLA VOLI</h2>

        <table>
          <tr>
              <td>Waktu</td>
              <td>: ${time} Menit</td>
              <td>Periodisasi</td>
              <td>: ${trainingLogs.periodisasi}</td>
          </tr>
          <tr>
              <td>Sasaran</td>
              <td>: ${trainingLogs.sasaran}</td>
              <td>Sesi</td>
              <td>: ${sessionId}</td>
          </tr>
          <tr>
              <td>Pukul</td>
              <td>: ${trainingLogs.time_start} – ${trainingLogs.time_end}</td>
          </tr>
        </table>

        <br/>
        <table>
          <thead>
            <tr>
              <th style="border: 1px solid #000;">No</th>
              <th style="border: 1px solid #000;">Materi Latihan</th>
              <th style="border: 1px solid #000;">Dosis</th>
              <th style="border: 1px solid #000;">Formasi</th>
              <th style="border: 1px solid #000;">Catatan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #000;">A</td>
              <td style="border: 1px solid #000;">
                <strong>PENGANTAR:</strong><br/>
                Dibariskan, Doa, Penjelasan Materi Latihan
              </td>
              <td style="border: 1px solid #000;">5 Menit</td>
              <td style="border: 1px solid #000; text-align: center;">
                <img src="file:///android_asset/custom/formasiPengantar.png" width="150" />
              </td>
              <td style="border: 1px solid #000;">Singkat & Jelas</td>
            </tr>

            <tr>
              <td style="border: 1px solid #000;">B</td>
              <td style="border: 1px solid #000;">
                <strong>PEMANASAN:</strong> Jogging, Stretching Statis & Dinamis
                <ol style="margin-top: 10px; padding-left: 18px;">
                  <li>Jogging</li>
                  <li>Stretching Statis</li>
                  <li>Stretching Dinamis</li>
                  <li>Passing bawah dan passing atas</li>
                </ol>
              </td>
              <td style="border: 1px solid #000;">
                15 Menit<br/><br/>
                8 x keliling<br/><br/>
                10” tiap Gerakan<br/><br/>
                8 macam<br/>
                a. 4x4 hit.<br/>
                5 Menit<br/>
              </td>
              <td style="border: 1px solid #000; text-align: center;">
                <img src="file:///android_asset/custom/formasiPengantar.png" width="150" />
              </td>
              <td style="border: 1px solid #000;">
                Lari keliling lapangan bolavoli<br/>
                Stretching dilakukan dr tubuh bagian atas ke bawah atau sebaliknya.<br/>
                Passing dilakukan berdua berhadapan (1 bola dua orang)
              </td>
            </tr>
            ${rows}
          </tbody>
        </table>
      </body>
    </html>
  `;
  };

  const checkPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      setHasPermission(result === RESULTS.GRANTED);
    } else {
      setHasPermission(true); // For older Android or other platforms
    }
  };

  const exportAndSharePDF = async (logs, dataLatihan) => {
    if (!hasPermission) {
      Alert.alert('Permission not granted!');
      return;
    }

    try {
      const html = generateHTML(logs, dataLatihan);
      const file = await RNHTMLtoPDF.convert({
        html,
        fileName: 'sesi_latihan_voli',
        base64: false,
      });

      const tempFilePath = file.filePath;
      const randomCode = Math.floor(Math.random() * 10000);
      const filename = `sesi-latihan-voli-${dataLatihan.sasaran}-${dataLatihan.periodisasi}-${randomCode}.pdf`;
      const path = `${RNFS.ExternalDirectoryPath}/${filename}`;

      await RNFS.copyFile(tempFilePath, path);

      // Share the file
      await Share.open({
        url: `file://${path}`,
        type: 'text/pdf',
        filename: filename,
        failOnCancel: false,
      });

      Alert.alert('Success', `File exported successfully : ${path}`);
    } catch (err) {
      console.log('Gagal ekspor atau share PDF:', err);
      Alert.alert('Error', 'Gagal ekspor atau membagikan PDF');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />

        <TrainingInfoSection data={data} trainingStatus={trainingStatus} />

        <View style={styles.trainingLogsContainer}>
          <Text style={styles.sectionTitle}>Latihan Yang Dijalankan</Text>

          {trainingLogs.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                Anda belum memiliki pilihan latihan
              </Text>
            </View>
          ) : (
            trainingLogs.map(log => <TrainingLogItem key={log.id} log={log} />)
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.addButton,
            trainingStatus?.status === TRAINING_STATUS.FINISHED &&
              styles.disabledButton,
          ]}
          disabled={trainingStatus?.status === TRAINING_STATUS.FINISHED}
          onPress={handleAddMaterial}>
          <Text style={styles.addButtonText}>+ Tambah Materi Latihan</Text>
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setModalVisible(false)}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pilih Materi Latihan</Text>
            {CATEGORIES.map(category => (
              <View key={category}>
                <Text style={styles.categoryTitle}>
                  LATIHAN {category.toUpperCase()}
                </Text>
                <View style={styles.materialsGrid}>
                  {materials[category].map(material => (
                    <TouchableOpacity
                      key={material.id}
                      style={styles.materialCard}
                      onPress={() => {
                        setModalVisible(false);
                        navigation.navigate('materialsChoicePage', {
                          materialId: material.id,
                          session_id: sessionId,
                        });
                      }}>
                      <Image
                        source={
                          imageMap[material.image_path] ||
                          require('../assets/headerbg.png')
                        }
                        style={styles.materialImage}
                      />
                      <View style={styles.materialOverlay}>
                        <Icon name="book" size={16} color="#fff" />
                        <Text style={styles.materialTitle}>
                          {material.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </Modal>
      </ScrollView>
      <View style={styles.basketContainer}>
        <TouchableOpacity
          style={styles.basketMaterial}
          onPress={() => exportAndSharePDF(trainingLogs, data)}>
          <Icon name="save" size={35} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  mainContainer: {
    marginHorizontal: 22,
    marginVertical: 15,
  },
  title: {
    alignItems: 'center',
    gap: 10,
  },
  titleText: {
    color: '#005fee',
    fontSize: 24,
  },
  subtitleText: {
    color: 'grey',
    fontSize: 18,
  },
  inputContainer: {
    marginVertical: 20,
  },
  sesiLatihan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sesiLatihanText: {
    fontSize: 18,
    textAlign: 'right',
  },
  sesiLatihanTextsub: {
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  statusBadge: {
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  trainingLogsContainer: {
    marginHorizontal: 22,
    marginVertical: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    ...ComponentStyles.poppinsBold,
    fontSize: 18,
    marginVertical: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: 'gray',
    fontStyle: 'italic',
  },
  trainingLogItem: {
    backgroundColor: '#CDE1FF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  trainingLogImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#eef4ff',
    marginRight: 10,
  },
  trainingLogText: {
    fontSize: 16,
    ...ComponentStyles.poppinsBold,
    color: '#0064D7',
  },
  addButton: {
    backgroundColor: '#005fee',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 22,
    marginBottom: 30,
  },
  disabledButton: {
    opacity: 0.5,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    ...ComponentStyles.poppinsBold,
    textAlign: 'center',
    fontSize: 20,
  },
  categoryTitle: {
    ...ComponentStyles.poppinsBold,
    textAlign: 'center',
    fontSize: 22,
    marginTop: 20,
  },
  materialsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  materialCard: {
    width: '47%',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  selectedMaterialCard: {
    borderWidth: 4,
    borderColor: '#7fff0c',
  },
  materialImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#E8E8E8',
  },
  materialOverlay: {
    backgroundColor: '#0008',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  materialTitle: {
    color: 'white',
    marginLeft: 8,
  },
  customFormContainer: {
    marginTop: 20,
  },
  customDescriptionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    height: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#005fee',
    padding: 12,
    borderRadius: 20,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  toggleButton: {
    marginTop: 15,
    padding: 12,
    alignSelf: 'center',
    backgroundColor: '#eef4ff',
    width: '100%',
    borderRadius: 20,
  },
  toggleButtonText: {
    color: '#005fee',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  trainingLogSub: {
    fontSize: 12,
    color: '#0064D7',
    marginTop: 2,
  },
  trainingLogDesc: {
    color: '#0064D7',
    ...ComponentStyles.poppinsReguler,
  },
  catatan: {
    backgroundColor: '#005fee',
  },
  basketContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 100,
  },
  basketMaterial: {
    backgroundColor: '#005fee',
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
    width: 60,
    borderRadius: 18,
  },
});

export default LatihanDetailScreen;
