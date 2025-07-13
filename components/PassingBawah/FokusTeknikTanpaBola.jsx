import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
} from 'react-native';
import ListItems from '../ListItems';
import SubHeader from '../SubHeader';
import ComponentStyles from '../ComponentStyles';

const FokusTeknikTanpaBola = ({navigation}) => {
  const sections = [
    {
      title: 'SIKAP AWAL',
      data: [
        'Berdiri dengan kedua kaki dibuka selebar bahu.',
        'Lutut sedikit ditekuk, berat badan di ujung kaki.',
        'Badan sedikit condong ke depan.',
        'Tangan di depan badan dalam posisi siap membentuk platform passing.',
      ],
    },
    {
      title: 'POSISI TANGAN',
      data: [
        'Rentangkan kedua tangan lurus ke depan',
        'Rapatkan ibu jari sejajar dan lurus ke depan.',
        'Kedua lengan dirapatkan dan diluruskan agar bola terkena bagian tengah lengan bawah.',
      ],
    },
    {
      title: 'GERAKAN SIMULASI',
      data: [
        'Gerakan dorong ke atas dan depan menggunakan pergelangan dan lutut (bukan ayunan lengan).',
        'Latihan menggunakan imajinasi arah datangnya bola.',
      ],
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
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />
        <View style={styles.contentContainer}>
          <Text style={styles.titleContent}>PASSING BAWAH</Text>
          <Text style={styles.sub}>FOKUS TEKNIK TANPA BOLA</Text>
          {sections.map(renderSection)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FokusTeknikTanpaBola;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  titleContent: {
    ...ComponentStyles.poppinsBold,
    textAlign: 'center',
    color: '#005fee',
    fontSize: 24,
  },
  sub: {
    ...ComponentStyles.poppinsBold,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subTitle: {
    ...ComponentStyles.poppinsBold,
    fontSize: 18,
    marginBottom: 6,
  },
  list: {
    paddingLeft: 16,
  },
});
