import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ListItemsNew from './ListItemsNew';
import ListItems from './ListItems';
import SubHeader from './SubHeader';
import Header from './Header';
import ComponentStyles from './ComponentStyles';

const AnAerobik = ({navigation}) => {
  const ladderDrillData = [
    {type: 'main', text: 'Speed Interval'},
    {
      type: 'bullet',
      text: 'Latihan dimulai dengan berada ditrack/lintasan yang memadai.',
    },
    {
      type: 'bullet',
      text: 'Berlari kencang dengan intensitas 60% – 90% sejauh 100 – 400 m dengan dibatasi limit.',
    },
    {
      type: 'bullet',
      text: 'Dilakukan sebanyak 4 – 12 set.',
    },
    {type: 'main', text: 'Fartlex'},
    {
      type: 'bullet',
      text: 'Jogging sampai ke cone/marker 1 selama 30 detik.',
    },
    {
      type: 'bullet',
      text: 'Sprint sampai ke cone/marker 2 selama 30 detik.',
    },
    {
      type: 'bullet',
      text: 'Jogging lagi sampai ke cone/marker 3 selama 30 detik.',
    },
    {
      type: 'bullet',
      text: 'Sprint sampai ke cone/marker 4 selama 30 detik.',
    },
    {
      type: 'bullet',
      text: 'Lakukan selama 5 menit.',
    },
    {type: 'main', text: 'EuroFit'},
    {
      type: 'bullet',
      text: 'Lari dengan intensitas kecepatan 70 – 90%.',
    },
    {
      type: 'bullet',
      text: 'Jarak 20 meter dengan durasi 4’.',
    },
    {
      type: 'bullet',
      text: 'Volume lari 15” dan istirahat 15” terus dilakukan selama 4 menit.',
    },
    {
      type: 'bullet',
      text: 'Bisa dilakukan 3 – 5 set.',
      image: require('../assets/eurofit.jpg'),
      format: 'image',
    },
    {type: 'main', text: 'Cross Country'},
    {
      type: 'bullet',
      text: 'Biasanya lari dilakukan dengan haling rintang seperti gunung,bukit,air,pepohonan,jalan lika – liku, dll tetapi bisa diterapkan pada tempat lain contoh bisa dilakukan di stadion yang mempunyai tribun dan bisa dimanfaatkan sebagai media untuk menanjak dan menurun.',
    },
    {
      type: 'bullet',
      text: 'Lari yang dilakukan bisa dengan durasi 30 – 60 menit x 2 set.',
    },
    {
      type: 'bullet',
      text: 'Kisaran nadi 130 – 150.',
    },
    {type: 'main', text: 'Jogging & LongStride'},
    {
      type: 'bullet',
      text: 'Bisa dilakukan dengan individu dan berkelompok.',
    },
    {
      type: 'bullet',
      text: 'Jika dilakukan secaran berkelompok maka membentuk 1 barisan dan melakukan jogging, kemudian orang yang berada dibarisan palig belakang melakukan lari dengan intensitas tinggi untuk sampai ke barisan paling depan,dilakukan secara terus menerus sampai durasi 30 – 60 menit.',
    },
    {
      type: 'bullet',
      text: 'Jika dilakukan secara individu maka atlet berlari  dengan intensitas tinggi dengan jarak 200 meter kemudian jogging dengan jarak 100 meter (bisa disesuaikan dengan program pelatih).',
    },
    {
      type: 'bullet',
      text: 'Contoh : long stride 100 meter jogging 50 meter long stride 200 meter jogging 50 meter long stride 300 meter jogging 150 meter.',
    },
    {
      type: 'bullet',
      text: 'Disarankan latihan pada lintasan atletik karena ada jarak yang sudah ada.',
    },
    {
      type: 'bullet',
      text: 'Dilakukan dengan durasi (30 – 45 menit x 2 – 3 set) dan bisa juga dengan lap 8 – 12 putaran.',
    },
  ];

  const renderSection = ({title, data}) => (
    <View style={styles.section} key={title}>
      <Text style={styles.subTitle}>{title}</Text>
      <View style={styles.list}>
        <ListItems items={data} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {/* Header dengan Background */}

        <SubHeader onBackPress={() => navigation.goBack()} />

        <View style={styles.contentContainer}>
          <Text style={[styles.titleContent, ComponentStyles.poppinsBold]}>
            {' '}
            AN AEROBIK
          </Text>
          <Text style={[styles.sub, ComponentStyles.poppinsBold]}>
            LATIHAN AN AEROBIK BISA DILAKUKAN DENGAN
          </Text>

          {/* Render Ladders Drill Section */}
          <View style={styles.section}>
            <View style={styles.list}>
              <ListItemsNew items={ladderDrillData} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnAerobik;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  sub: {
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  titleContent: {
    textAlign: 'center',
    color: '#005fee',
    fontSize: 24,
  },
  list: {
    paddingLeft: 16,
  },
});
