import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {getDBConnection, getScheduleWithDays} from '../services/db-service';

const ScheduleListPage = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const db = await getDBConnection();
      const result = await getScheduleWithDays(db);
      setSchedules(result);
    };

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Jadwal Latihan</Text>
      <FlatList
        data={schedules}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.sasaran}>Sasaran: {item.sasaran}</Text>
            <Text>Mulai: {item.start_date}</Text>
            <Text>Selesai: {item.end_date}</Text>
            <Text style={styles.subTitle}>Tanggal Latihan:</Text>
            {item.days.length > 0 ? (
              item.days.map(day => (
                <Text key={day.id} style={styles.trainingDate}>
                  • {day.training_date}
                </Text>
              ))
            ) : (
              <Text>- Belum ada tanggal latihan</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default ScheduleListPage;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 16},
  card: {
    backgroundColor: '#f0f8ff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  sasaran: {fontWeight: 'bold', fontSize: 18},
  subTitle: {marginTop: 8, fontWeight: '600'},
  trainingDate: {marginLeft: 8},
});
