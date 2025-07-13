import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  SafeAreaView,
  StatusBar,
  Button,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {getDBConnection} from '../connection/Database';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import SubHeader from './SubHeader';
import AnimatedInput from './AnimatedInput';
import ComponentStyles from './ComponentStyles';
import {showMessage} from 'react-native-flash-message';

import notifee, {
  TimestampTrigger,
  TriggerType,
  AndroidImportance,
} from '@notifee/react-native';

const PreviewSchedulePage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {scheduleId, autoSelectToday} = route.params;

  const [schedule, setSchedule] = useState(null);
  const [trainingDates, setTrainingDates] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());
  const [periode, setPeriode] = useState('');
  const [showTimeStartPicker, setShowTimeStartPicker] = useState(false);
  const [showTimeEndPicker, setShowTimeEndPicker] = useState(false);
  const [sessionsByDate, setSessionsByDate] = useState({});
  const [editingSession, setEditingSession] = useState(null);

  useEffect(() => {
    requestNotificationPermission();
    fetchData();
  }, [scheduleId]);

  const requestNotificationPermission = async () => {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus < 1) {
      Alert.alert(
        'Izin Diperlukan',
        'Aktifkan notifikasi agar mendapatkan pengingat sesi latihan',
      );
    }
  };

  const fetchData = async () => {
    const db = await getDBConnection();
    const result = await db.executeSql('SELECT * FROM schedules WHERE id = ?', [
      scheduleId,
    ]);
    const scheduleData = result[0].rows.item(0);
    setSchedule(scheduleData);

    const daysResult = await db.executeSql(
      'SELECT * FROM schedule_days WHERE schedule_id = ?',
      [scheduleId],
    );

    const dates = [];
    const marks = {};
    const sessionsMap = {};

    for (let i = 0; i < daysResult[0].rows.length; i++) {
      const item = daysResult[0].rows.item(i);
      dates.push(item);
      marks[item.training_date] = {
        selected: true,
        marked: true,
        selectedColor: '#005fee',
      };

      const sessionsResult = await db.executeSql(
        'SELECT * FROM schedule_sessions WHERE schedule_day_id = ?',
        [item.id],
      );

      const sessions = [];
      for (let j = 0; j < sessionsResult[0].rows.length; j++) {
        sessions.push(sessionsResult[0].rows.item(j));
      }

      sessionsMap[item.training_date] = sessions;
    }

    setTrainingDates(dates);
    setMarkedDates(marks);
    setSessionsByDate(sessionsMap);

    if (autoSelectToday) {
      const today = moment().format('YYYY-MM-DD');
      const todayDateObj = dates.find(d => d.training_date === today);

      if (todayDateObj) {
        setSelectedDate(todayDateObj);
        const hasSessions = sessionsMap[today]?.length > 0;
        setShowModal(!hasSessions);
      }
    }
  };

  const handleDayPress = day => {
    const exists = trainingDates.find(d => d.training_date === day.dateString);
    if (exists) {
      setSelectedDate(exists);
      const hasSessions = sessionsByDate[exists.training_date]?.length > 0;
      setShowModal(!hasSessions);
    } else {
      setSelectedDate(null);
    }
  };

  const handleAddSession = async () => {
    if (!timeStart || !timeEnd || !selectedDate) return;
    const db = await getDBConnection();

    if (editingSession) {
      await db.executeSql(
        'UPDATE schedule_sessions SET time_start = ?, time_end = ? WHERE id = ?',
        [
          timeStart.toTimeString().slice(0, 5),
          timeEnd.toTimeString().slice(0, 5),
          editingSession.id,
        ],
      );
    } else {
      const result = await db.executeSql(
        'INSERT INTO schedule_sessions (schedule_day_id, time_start, time_end, periodisasi) VALUES (?, ?, ?, ?)',
        [
          selectedDate.id,
          timeStart.toTimeString().slice(0, 5),
          timeEnd.toTimeString().slice(0, 5),
          periode,
        ],
      );

      if (result[0].rowsAffected > 0) {
        console.log('triggered');
        showMessage({
          message: 'Sesi latihan berhasil di buat!',
          description: `Sesi latihan dijadwalkan pada ${
            selectedDate?.training_date
          }, ${timeStart.toTimeString().slice(0, 5)}`,
          type: 'success',
          duration: 3000,
          icon: 'success',
        });
      }

      const insertedSessionId = result[0].insertId;
      console.log(insertedSessionId);

      const dateString = selectedDate.training_date; // Format: 'YYYY-MM-DD'
      const [year, month, day] = dateString.split('-'); // Pisahkan menjadi tahun, bulan, hari

      // Ambil jam dan menit dari timeStart
      const [hourStart, minuteStart] = timeStart
        .toTimeString()
        .slice(0, 5)
        .split(':');

      // Buat Date object lokal (ingat: bulan dimulai dari 0, jadi -1)
      const date = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hourStart),
        parseInt(minuteStart),
        0, // detik
      );

      console.log('Tanggal & waktu lokal yang dijadwalkan:', date);
      const now = new Date();

      if (date > new Date()) {
        const trigger = {
          type: TriggerType.TIMESTAMP,
          timestamp: date.getTime(),
        };

        await notifee.createChannel({
          id: 'training',
          name: 'Training Channel',
          importance: AndroidImportance.HIGH,
        });

        const fiveMinutesBefore = new Date(date.getTime() - 5 * 60 * 1000);

        if (fiveMinutesBefore > now) {
          await notifee.createTriggerNotification(
            {
              title: 'Persiapan Latihan',
              body: 'Sesi latihan akan segera dimulai!',
              android: {
                channelId: 'training',
              },
            },
            {
              type: TriggerType.TIMESTAMP,
              timestamp: fiveMinutesBefore.getTime(),
            },
          );
        }

        await notifee.createTriggerNotification(
          {
            title: 'Waktunya Latihan!',
            body: `Sesi latihan dimulai pukul : ${hourStart} : ${minuteStart}`,
            android: {
              channelId: 'training',
              pressAction: {
                id: 'default',
              },
            },
            data: {
              sessionId: insertedSessionId.toString(),
            },
          },
          trigger,
        );
      }
    }

    const sessionsResult = await db.executeSql(
      'SELECT * FROM schedule_sessions WHERE schedule_day_id = ?',
      [selectedDate.id],
    );

    const sessions = [];
    for (let i = 0; i < sessionsResult[0].rows.length; i++) {
      sessions.push(sessionsResult[0].rows.item(i));
    }

    setSessionsByDate(prev => ({
      ...prev,
      [selectedDate.training_date]: sessions,
    }));

    setShowModal(false);
    setEditingSession(null);
    setTimeStart(new Date());
    setTimeEnd(new Date());
    setPeriode('');
  };

  const handleEditSession = session => {
    setEditingSession(session);
    setTimeStart(moment(session.time_start, 'HH:mm').toDate());
    setTimeEnd(moment(session.time_end, 'HH:mm').toDate());
    setPeriode(session.periodisasi);
    setShowModal(true);
  };

  const confirmDeleteSession = () => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Apakah Anda yakin ingin menghapus sesi latihan ini?',
      [
        {text: 'Batal', style: 'cancel'},
        {text: 'Hapus', style: 'destructive', onPress: handleDeleteSession},
      ],
      {cancelable: true},
    );
  };

  const handleDeleteSession = async () => {
    if (!editingSession) return;

    const db = await getDBConnection();
    const result = await db.executeSql(
      'DELETE FROM schedule_sessions WHERE id = ?',
      [editingSession.id],
    );

    if (result[0].rowsAffected > 0) {
      console.log('triggered');
      showMessage({
        message: 'Sesi Latihan Berhasil Dihapus',
        description: `Sesi latihan  pada ${
          selectedDate?.training_date
        }, ${timeStart.toTimeString().slice(0, 5)} Berhasil Dihapus`,
        type: 'danger',
        duration: 3000,
        icon: 'danger',
      });
    }

    const sessionsResult = await db.executeSql(
      'SELECT * FROM schedule_sessions WHERE schedule_day_id = ?',
      [selectedDate.id],
    );

    const sessions = [];
    for (let i = 0; i < sessionsResult[0].rows.length; i++) {
      sessions.push(sessionsResult[0].rows.item(i));
    }

    setSessionsByDate(prev => ({
      ...prev,
      [selectedDate.training_date]: sessions,
    }));

    setShowModal(false);
    setEditingSession(null);
  };

  if (!schedule) return <Text style={{margin: 20}}>Loading...</Text>;

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />

        <View style={{marginVertical: 20}}>
          <View style={styles.mainContainer}>
            <View style={styles.isMain}>
              <AnimatedInput
                label="Sasaran"
                value={schedule.sasaran}
                editable={false}
              />
            </View>
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.isMain}>
              <AnimatedInput
                label="Tanggal Mulai"
                value={schedule.start_date}
                editable={false}
              />
            </View>
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.isMain}>
              <AnimatedInput
                label="Tanggal Selesai"
                value={schedule.end_date}
                editable={false}
              />
            </View>
          </View>
        </View>

        <View style={styles.containerSession}>
          <Text style={[styles.selectDateTitle, ComponentStyles.poppinsBold]}>
            Buat Sesi Latihan:
          </Text>
          <View style={styles.calendarContainer}>
            <Calendar
              current={moment(schedule.start_date).format('YYYY-MM-DD')}
              minDate={moment(schedule.start_date).format('YYYY-MM-DD')}
              maxDate={moment(schedule.end_date).format('YYYY-MM-DD')}
              markedDates={markedDates}
              onDayPress={handleDayPress}
              theme={{
                selectedDayBackgroundColor: '#005fee',
                selectedDayTextColor: '#fff',
                todayTextColor: '#005fee',
                arrowColor: '#005fee',
              }}
            />
          </View>

          {selectedDate && sessionsByDate[selectedDate.training_date] && (
            <View style={{marginTop: 20}}>
              <Text style={styles.sessionTitle}>
                Sesi latihan pada {selectedDate.training_date}:
              </Text>
              {sessionsByDate[selectedDate.training_date].map(
                (session, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.sessionBox}
                    onPress={() =>
                      navigation.navigate('LatihanDetail', {
                        sessionId: session.id,
                      })
                    }>
                    <View style={styles.sessionRow}>
                      <Text style={styles.sessionText}>
                        {session.time_start} - {session.time_end} - (
                        {session.periodisasi})
                      </Text>
                      <View style={styles.actionButtons}>
                        <TouchableOpacity
                          onPress={() => handleEditSession(session)}>
                          <Text style={styles.editText}>✏️</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setEditingSession(session);
                            confirmDeleteSession();
                          }}>
                          <Text style={styles.deleteText}>🗑️</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                ),
              )}
              <TouchableOpacity
                onPress={() => {
                  setEditingSession(null);
                  setTimeStart(new Date());
                  setTimeEnd(new Date());
                  setPeriode('');
                  setShowModal(true);
                }}
                style={styles.saveBtn}>
                <Text style={styles.saveText}>Tambah Sesi Latihan</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* MODAL ADD/EDIT SESSION */}
        <Modal visible={showModal} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {editingSession ? 'Edit Sesi' : 'Tambah Sesi'} untuk{' '}
                {selectedDate?.training_date}
              </Text>

              <Text>Jam Mulai:</Text>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => setShowTimeStartPicker(true)}>
                <Text>{moment(timeStart).format('HH:mm')}</Text>
              </TouchableOpacity>
              {showTimeStartPicker && (
                <DateTimePicker
                  value={timeStart}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={(e, val) => {
                    setShowTimeStartPicker(false);
                    if (val) {
                      const selectedTime = new Date(val);
                      const now = new Date();

                      const isToday =
                        selectedDate?.training_date ===
                        moment().format('YYYY-MM-DD');

                      if (isToday && selectedTime < now) {
                        Alert.alert(
                          'Waktu Tidak Valid!',
                          'Untuk sesi hari ini, tidak bisa memilih waktu yang sudah lewat.',
                        );
                      } else {
                        setTimeStart(val);
                      }
                    }
                  }}
                />
              )}
              <Text>Jam Selesai:</Text>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => setShowTimeEndPicker(true)}>
                <Text>{moment(timeEnd).format('HH:mm')}</Text>
              </TouchableOpacity>
              {showTimeEndPicker && (
                <DateTimePicker
                  value={timeEnd}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={(e, val) => {
                    setShowTimeEndPicker(false);
                    if (val) {
                      const now = new Date();
                      const selectedTime = new Date();
                      selectedTime.setHours(
                        val.getHours(),
                        val.getMinutes(),
                        0,
                        0,
                      );

                      if (selectedTime <= timeStart) {
                        Alert.alert(
                          'Waktu Tidak Valid!',
                          'Jam selesai tidak bisa lebih dari Jam Mulai',
                        );
                      } else {
                        setTimeEnd(val);
                      }
                    }
                  }}
                />
              )}

              <Text>Periodisasi:</Text>
              <TextInput
                value={periode}
                onChangeText={setPeriode}
                placeholder="Masukkan periodisasi"
                style={styles.input}
              />

              <TouchableOpacity
                onPress={handleAddSession}
                style={styles.saveBtn}>
                <Text style={styles.saveText}>Simpan</Text>
              </TouchableOpacity>

              {editingSession && (
                <TouchableOpacity
                  onPress={confirmDeleteSession}
                  style={[styles.cancelBtn, {borderColor: 'red'}]}>
                  <Text style={{textAlign: 'center', color: 'red'}}>
                    Hapus Sesi
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                  setEditingSession(null);
                }}
                style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ffffff'},
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#005fee',
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '50%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#005fee',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
    borderRadius: 6,
  },
  saveBtn: {
    backgroundColor: '#005fee',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  saveText: {color: 'white', textAlign: 'center'},
  cancelBtn: {
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  cancelText: {textAlign: 'center'},
  timeButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
  },
  sessionBox: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#eef4ff',
    borderRadius: 8,
  },
  sessionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionText: {color: '#005fee', fontWeight: 'bold', flex: 1},
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  editText: {
    fontSize: 18,
    color: '#007aff',
    marginHorizontal: 5,
  },
  deleteText: {
    fontSize: 18,
    color: '#ff3b30',
    marginHorizontal: 5,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#005fee',
  },
  mainContainer: {marginHorizontal: 22},
  isMain: {marginVertical: 10},
  containerSession: {
    marginHorizontal: 22,
    marginVertical: 10,
  },
  selectDateTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
  },
  calendarContainer: {
    borderWidth: 2,
    borderColor: 'gray',
    overflow: 'hidden',
    borderRadius: 15,
  },
});

export default PreviewSchedulePage;
