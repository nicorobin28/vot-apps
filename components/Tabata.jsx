import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import ComponentStyles from './ComponentStyles';

const PassingAtasMenu = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <Header title="TABATA" onBackPress={() => navigation.goBack()} />

        {/* Konten */}
        <View style={styles.contentContainer}>
          <View style={styles.desc}>
            <Text
              style={[ComponentStyles.poppinsReguler, {textAlign: 'justify'}]}>
              Latihan Tabata adalah bentuk latihan HIIT (High Intensity Interval
              Training) yang dirancang untuk meningkatkan daya tahan
              kardiovaskular dan kekuatan otot dalam waktu singkat.
              Diperkenalkan oleh Dr. Izumi Tabata dari Jepang, latihan ini
              terdiri dari interval 20 detik latihan intensif diikuti oleh 10
              detik istirahat, dilakukan selama 8 putaran (total 4 menit).
            </Text>
          </View>

          {/* BODYWEIGHT */}
          <Text style={[styles.sectionTitle, ComponentStyles.poppinsBold]}>
            BODYWEIGHT EXERCISES (TANPA ALAT)
          </Text>
          {[
            'Jumping jack',
            'High knees',
            'Push-up',
            'Squat jump',
            'Burpee',
            'Mountain climber',
            'Plank to push-up',
            'Lunges',
          ].map((item, index) => (
            <Text
              key={index}
              style={[styles.listItem, ComponentStyles.poppinsReguler]}>
              {index + 1}. {item}
            </Text>
          ))}

          {/* STRENGTH */}
          <Text style={[styles.sectionTitle, ComponentStyles.poppinsBold]}>
            STRENGTH-BASED TABATA
          </Text>
          {[
            'Squat dengan barbel',
            'Deadlift ringan',
            'Dumbbell press',
            'Kettlebell swing',
            'Resistance band row',
          ].map((item, index) => (
            <Text
              key={`s-${index}`}
              style={[styles.listItem, ComponentStyles.poppinsReguler]}>
              {index + 1}. {item}
            </Text>
          ))}

          {/* CARDIO */}
          <Text style={[styles.sectionTitle, ComponentStyles.poppinsBold]}>
            CARDIO TABATA
          </Text>
          {[
            'Lompat tali (jump rope)',
            'Sprint di tempat',
            'Sepeda statis dengan interval',
            'Rowing machine',
          ].map((item, index) => (
            <Text
              key={`c-${index}`}
              style={[styles.listItem, ComponentStyles.poppinsReguler]}>
              {index + 1}. {item}
            </Text>
          ))}

          {/* CORE */}
          <Text style={[styles.sectionTitle, ComponentStyles.poppinsBold]}>
            CORE TABATA
          </Text>
          {['Plank hold', 'Russian twist', 'Bicycle crunch', 'Leg raise'].map(
            (item, index) => (
              <Text
                key={`core-${index}`}
                style={[styles.listItem, ComponentStyles.poppinsReguler]}>
                {index + 1}. {item}
              </Text>
            ),
          )}

          {/* TABEL */}
          <Text style={[styles.sectionTitle, ComponentStyles.poppinsBold]}>
            CONTOH RANGKAIAN TABATA (4 MENIT):
          </Text>
          <View style={styles.table}>
            {[
              ['0:00–0:20', 'Squat jump'],
              ['0:20–0:30', 'Istirahat'],
              ['0:30–0:50', 'Push-up'],
              ['0:50–1:00', 'Istirahat'],
              ['1:00–1:20', 'Flutter kick'],
              ['1:20–1:30', 'Istirahat'],
              ['1:30–1:50', 'Heel Touch'],
              ['1:50–2:00', 'Istirahat'],
            ].map(([time, activity], index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, ComponentStyles.poppinsBold]}>
                  {time}
                </Text>
                <Text style={[styles.tableCell, ComponentStyles.poppinsBold]}>
                  {activity}
                </Text>
              </View>
            ))}
            <Text style={[ComponentStyles.poppinsReguler, {marginTop: 8}]}>
              (diulang sampai 4 menit)
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  desc: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 14,
    color: '#000',
    marginBottom: 6,
  },
  table: {
    marginTop: 10,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#000',
    paddingBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1.5,
    borderColor: '#000',
  },
  tableCell: {
    fontSize: 14,
    flex: 1,
    color: '#000',
  },
});

export default PassingAtasMenu;
