import React, {useState, useCallback} from 'react';
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
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AnimatedDateInputSearch from './AnimatedDateInputSearch';
import {
  getDBConnection,
  getLast7DaysSchedules,
  getSchedulesByDateRange,
} from '../connection/Database';
import ComponentStyles from './ComponentStyles';

const PreviewHistoryPage = ({navigation}) => {
  const [historyCards, setHistoryCards] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const db = await getDBConnection();
        const last7DaysSchedule = await getLast7DaysSchedules(db);
        setHistoryCards(last7DaysSchedule);
      };
      loadData();
    }, []),
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header
          title="RIWAYAT LATIHAN ANDA"
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.contentContainer}>
          <View style={styles.wrapper}>
            <View style={styles.containerCari}>
              <View style={{width: '35%', flexDirection: 'row', gap: 10}}>
                <AnimatedDateInputSearch
                  label="Dari Tanggal"
                  value={startDate}
                  onChange={setStartDate}
                />
                <AnimatedDateInputSearch
                  label="Sampai Tanggal"
                  value={endDate}
                  onChange={setEndDate}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                    setLoading(true);
                    const db = await getDBConnection();
                    const formattedStart = startDate
                      .toISOString()
                      .split('T')[0];
                    const formattedEnd = endDate.toISOString().split('T')[0];
                    const result = await getSchedulesByDateRange(
                      db,
                      formattedStart,
                      formattedEnd,
                    );
                    setSearchResult(result);
                    setIsSearch(true);
                    setLoading(false);
                  }}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={styles.textButtonSearch}>Cari</Text>
                      <Icon name="search" size={20} color={'#fff'} />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {!isSearch ? (
              <>
                <View style={styles.desc}>
                  <Text style={styles.text}>
                    Riwayat Latihan Anda Dalam 7 Hari Terakhir
                  </Text>
                </View>

                <View style={styles.containerRiwayat}>
                  {historyCards.map((schedule, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.buttonLatihanku}
                      onPress={() =>
                        navigation.navigate('previewSchedulePage', {
                          scheduleId: schedule.schedule_id,
                          autoSelectToday: false, // karena ini bukan hari ini
                        })
                      }>
                      <View style={styles.titleButton}>
                        <Icon name="book" size={25} color={'#fff'} />
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
              </>
            ) : (
              <>
                <View style={styles.desc}>
                  <Text style={styles.text}>
                    Hasil Riwayat Latihan dari {startDate.toLocaleDateString()}{' '}
                    sampai {endDate.toLocaleDateString()}
                  </Text>
                </View>

                {searchResult.length > 0 ? (
                  <View style={styles.containerRiwayat}>
                    {searchResult.map((schedule, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.buttonLatihanku}
                        onPress={() =>
                          navigation.navigate('previewSchedulePage', {
                            scheduleId: schedule.schedule_id,
                            autoSelectToday: false, // karena ini bukan hari ini
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
                ) : (
                  <Text style={{textAlign: 'center'}}>
                    Tidak ada riwayat dalam rentang tanggal tersebut.
                  </Text>
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PreviewHistoryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    marginTop: -25,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  wrapper: {
    marginHorizontal: 10,
  },
  containerCari: {
    flexDirection: 'row',
    gap: 15,
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  textField: {
    width: 250,
    height: 45,
    borderColor: 'black',
    color: 'black',
    borderWidth: 2,
    borderRadius: 8,
    padding: 5,
  },
  desc: {
    marginVertical: 12,
    marginBottom: 24,
  },
  text: {
    fontSize: 18,
    ...ComponentStyles.poppinsReguler,
  },
  textContent: {
    fontSize: 10,
    color: 'white',
  },
  containerRiwayat: {
    gap: 20,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#005fee',
    height: 40,
    width: 80,
    paddingHorizontal: 18,
    borderRadius: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {width: 4, height: 6},
    shadowRadius: 5,
  },
  buttonLatihanku: {
    width: '100%',
    padding: 10,
    borderRadius: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {width: 4, height: 6},
    shadowRadius: 5,
    backgroundColor: '#005fee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleButton: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    ...ComponentStyles.poppinsReguler,
    fontSize: 18,
  },
  textButtonSearch: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    ...ComponentStyles.poppinsReguler,
  },
  textTime: {
    flexDirection: 'column',
    gap: 8,
  },
});
