import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import AnimatedInput from './AnimatedInput';
import AnimatedDateInput from './AnimatedDateInput';
import SubHeader from './SubHeader';
import {
  getDBConnection,
  insertSchedules,
  createTable,
  getScheduleWithDays,
} from '../connection/Database';
import moment from 'moment';
import ComponentStyles from './ComponentStyles';
import {Calendar} from 'react-native-calendars';

const CreateSchedulePage = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);

  const getMarkedDates = dates => {
    const marked = {};
    dates.forEach(date => {
      marked[date] = {
        selected: true,
        selectedColor: '#005fee',
      };
    });
    return marked;
  };

  const handleCalendarToggle = date => {
    setSelectedDates(prev => {
      if (prev.includes(date)) {
        return prev.filter(d => d !== date);
      } else {
        return [...prev, date];
      }
    });
  };

  const onSubmit = async data => {
    if (!data.sasaran || !startDate || !endDate || selectedDates.length === 0) {
      Alert.alert('Semua field dan tanggal latihan wajib diisi!');
      return;
    }

    try {
      const db = await getDBConnection();
      await createTable(db);
      await insertSchedules(
        db,
        data.sasaran,
        moment(startDate).format('YYYY-MM-DD'),
        moment(endDate).format('YYYY-MM-DD'),
      );

      const schedules = await db.executeSql(
        `SELECT id FROM schedules ORDER BY id DESC LIMIT 1`,
      );
      const scheduleId = schedules[0].rows.item(0).id;

      for (const date of selectedDates) {
        await db.executeSql(
          `INSERT INTO schedule_days (schedule_id, training_date) VALUES (?, ?)`,
          [scheduleId, date],
        );
      }

      Alert.alert('Berhasil Menyimpan Jadwal!');
      reset();
      setSelectedDates([]);
      setStartDate(new Date());
      setEndDate(new Date());

      navigation.navigate('previewSchedulePage', {scheduleId});
    } catch (error) {
      console.error('DB Error:', error);
      Alert.alert('Terjadi kesalahan saat menyimpan data!');
    }
  };

  const minDate = moment(startDate).format('YYYY-MM-DD');
  const maxDate = moment(endDate).format('YYYY-MM-DD');

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />

        <View style={styles.contentContainer}>
          <Text style={[styles.titleContent, ComponentStyles.poppinsBold]}>
            LATIHAN
          </Text>
          <Text style={[styles.sub, ComponentStyles.poppinsBold]}>
            BUAT JADWAL LATIHAN
          </Text>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.isMain}>
            <Controller
              control={control}
              name="sasaran"
              rules={{required: 'Sasaran harus diisi!'}}
              render={({field: {onChange, value}}) => (
                <AnimatedInput
                  label="Sasaran"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.sasaran && (
              <Text style={styles.error}>{errors.sasaran.message}</Text>
            )}
          </View>

          <View style={styles.isMain}>
            <AnimatedDateInput
              label="Tanggal Mulai"
              value={startDate}
              onChange={setStartDate}
            />
          </View>
          <View style={styles.isMain}>
            <AnimatedDateInput
              label="Tanggal Selesai"
              value={endDate}
              onChange={setEndDate}
            />
          </View>

          <Text style={[styles.selectDateTitle, ComponentStyles.poppinsBold]}>
            Pilih Tanggal Latihan:
          </Text>
          <View style={styles.calendarContainer}>
            <Calendar
              minDate={minDate}
              maxDate={maxDate}
              onDayPress={day => handleCalendarToggle(day.dateString)}
              markedDates={getMarkedDates(selectedDates)}
              markingType={'multi-dot'}
              theme={{
                selectedDayBackgroundColor: '#005fee',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#005fee',
                arrowColor: '#005fee',
                monthTextColor: '#005fee',
                textDayFontWeight: '500',
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          <Text style={[styles.textButton, ComponentStyles.poppinsBold]}>
            Simpan Jadwal
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateSchedulePage;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ffffff'},
  contentContainer: {paddingHorizontal: 20, paddingTop: 30, paddingBottom: 20},
  titleContent: {
    textAlign: 'center',
    color: '#005fee',
    fontSize: 24,
    marginBottom: 16,
  },
  sub: {color: 'grey', textAlign: 'center'},
  mainContainer: {marginHorizontal: 22},
  isMain: {marginVertical: 10},
  selectDateTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#005fee',
    paddingVertical: 12,
    marginHorizontal: 100,
    borderRadius: 12,
    marginBottom: 24,
    marginTop: 20,
  },
  textButton: {textAlign: 'center', color: 'white'},
  error: {
    color: 'red',
  },
  calendarContainer: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
});
