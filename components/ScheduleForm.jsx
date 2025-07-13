import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  getDBConnection,
  createTable,
  insertSchedules,
} from '../connection/Database';

const ScheduleForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const formatDate = date => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  const onSubmit = async data => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      await insertSchedules(
        db,
        data.sasaran,
        formatDate(startDate),
        formatDate(endDate),
      );
      Alert.alert('Sukses', 'Data jadwal berhasil disimpan!');
      reset();
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan data.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sasaran</Text>
      <Controller
        control={control}
        rules={{required: 'Sasaran wajib diisi'}}
        name="sasaran"
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.sasaran && (
        <Text style={styles.error}>{errors.sasaran.message}</Text>
      )}

      {/* Start Date Picker */}
      <Text style={styles.label}>Tanggal Mulai</Text>
      <TouchableOpacity
        onPress={() => setShowStartPicker(true)}
        style={styles.input}>
        <Text>{formatDate(startDate)}</Text>
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowStartPicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}

      {/* End Date Picker */}
      <Text style={styles.label}>Tanggal Berakhir</Text>
      <TouchableOpacity
        onPress={() => setShowEndPicker(true)}
        style={styles.input}>
        <Text>{formatDate(endDate)}</Text>
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowEndPicker(false);
            if (date) setEndDate(date);
          }}
        />
      )}

      <Button title="Simpan Jadwal" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default ScheduleForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 4,
  },
  error: {
    color: 'red',
    marginTop: 4,
  },
});
