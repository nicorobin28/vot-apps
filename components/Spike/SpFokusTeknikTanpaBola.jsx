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

const SpFokusTeknikTanpaBola = ({navigation}) => {
  const sections = [
    {
      title: 'SIKAP AWAL',
      data: [
        'Posisi berdiri 2–3 langkah dari net.',
        'Gunakan langkah pendek dan cepat (biasanya: kiri–kanan–kiri / kanan–kiri–kanan).',
        'Badan condong ke depan, tangan di samping badan.',
      ],
    },
    {
      title: 'GERAKAN LOMPAT',
      data: [
        'Lompatan vertikal dengan tolakan dari kedua kaki.',
        'Tangan diayunkan ke belakang saat awalan, lalu ke depan saat lompat.',
      ],
    },
    {
      title: 'GERAKAN TANGAN (AYUNAN SMASH)',
      data: [
        'Tangan dominan diangkat ke belakang atas.',
        'Ayunkan tangan ke depan dan pukul “bayangan bola” di udara.',
        'Gunakan gerakan pergelangan untuk menambah kecepatan.',
      ],
    },
    {
      title: 'PENDARATAN',
      data: [
        'Mendarat dengan kedua kaki, lutut ditekuk untuk mengurangi beban.',
        'Siap kembali ke posisi blocking atau transisi ke pertahanan.',
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
          <Text style={styles.titleContent}>SPIKE</Text>
          <Text style={styles.sub}>FOKUS TEKNIK TANPA BOLA</Text>
          {sections.map(renderSection)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SpFokusTeknikTanpaBola;

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
