import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Header from './Header';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ComponentStyles from './ComponentStyles';
import {
  getDBConnection,
  getTodaySchedules,
  getSchedulesAll,
} from '../connection/Database';

const SchedulePage = ({navigation}) => {
  const [cards, setCards] = useState([]);
  const [historyCards, setHistoryCards] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const db = await getDBConnection();
        const todaySchedule = await getTodaySchedules(db);
        const scheduleAll = await getSchedulesAll(db);
        setCards(todaySchedule);
        setHistoryCards(scheduleAll);
      };
      loadData();
    }, []),
  );
  console.log(historyCards.length);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header title="JADWAL ANDA" onBackPress={() => navigation.goBack()} />
        {historyCards.length === 0 ? (
          <View style={styles.contentContainer}>
            <View style={styles.desc}>
              <Text style={styles.text}>
                Anda belum memiliki {'\n'} jadwal latihan
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('createSchedulePage')}>
              <Text style={styles.textButton}>Buat Jadwal</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <View style={{width: '100%'}}>
              <View style={styles.todaySchedule}>
                <View style={styles.imageContainerJadwal}>
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/ios-filled/50/000000/calendar.png',
                    }}
                    style={styles.iconJadwal}
                  />
                </View>
                <Text style={styles.Task}>Jadwal Latihan Hari Ini</Text>
              </View>
              {cards.map((schedule, index) => (
                <View key={index} style={styles.buttonToday}>
                  {schedule.sessions.map((item, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.button}
                      onPress={() =>
                        navigation.navigate('previewSchedulePage', {
                          scheduleId: schedule.schedule_id,
                          autoSelectToday: true,
                        })
                      }>
                      <View style={styles.titleButton}>
                        <Icon name="book" size={20} color={'#fff'} />
                        <Text style={styles.textButton}>
                          {schedule.sasaran}
                        </Text>
                      </View>
                      <View style={styles.textTime}>
                        <Text style={styles.textContent}>
                          {schedule.start_date}
                        </Text>
                        <Text style={styles.textContent}>
                          {schedule.end_date}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>

            <View style={{width: '100%'}}>
              <View style={styles.tomorrowSchedule}>
                <View style={styles.imageContainerJadwal}>
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/ios-filled/50/000000/calendar.png',
                    }}
                    style={styles.iconJadwal}
                  />
                </View>
                <Text style={styles.Task}>Jadwal Latihan Anda</Text>
              </View>
              <View style={styles.buttonToday}>
                {historyCards.map((schedule, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate('previewSchedulePage', {
                        scheduleId: schedule.schedule_id,
                        autoSelectToday: false, // karena ini bukan hari ini
                      })
                    }>
                    <View style={styles.titleButton}>
                      <Icon name="book" size={20} color={'#fff'} />
                      <Text style={styles.textButton}>{schedule.sasaran}</Text>
                    </View>
                    <View style={styles.textTime}>
                      <Text style={styles.textContent}>
                        {schedule.start_date}
                      </Text>
                      <Text style={styles.textContent}>
                        {schedule.end_date}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.historyButton}
              onPress={() => navigation.navigate('previewHistoryPage')}>
              <Text style={styles.textButton}>Riwayat Latihan Anda</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SchedulePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: -25,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  buttonToday: {
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#005fee',
    paddingVertical: 12,
    padding: 15,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {width: 4, height: 6},
    shadowRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleButton: {
    flexDirection: 'row',
    gap: 8,
  },
  historyButton: {
    backgroundColor: '#005fee',
    paddingVertical: 12,
    width: 200,
    marginTop: 40,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {width: 4, height: 6},
    shadowRadius: 5,
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  textContent: {
    fontSize: 10,
    color: 'white',
  },
  tomorrowSchedule: {
    marginTop: 35,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  imageContainerJadwal: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: '50%',
  },
  iconJadwal: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  todaySchedule: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  Task: {
    ...ComponentStyles.poppinsReguler,
    fontSize: 16,
  },
  text: {
    textAlign: 'center',
  },
});
