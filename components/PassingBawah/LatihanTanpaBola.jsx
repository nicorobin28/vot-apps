import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
} from 'react-native';
import ListItemsFlexibility from '../ListItemsFlexibility';
import ListItems from '../ListItems';
import SubHeader from '../SubHeader';

const LatihanTanpaBola = ({navigation}) => {
  const sections = [
    {
      type: 'main',
      useNumber: false,
      text: 'TAHAP 1 : LATIHAN POSTUR BADAN',
      items: [
        {
          type: 'subnumberWithoutBold',
          useNumber: true,
          text: 'Latihan berdiri dan turun ke posisi passing (sikap kuda-kuda).',
        },
        {
          type: 'subnumberWithoutBold',
          useNumber: true,
          text: 'Fokus pada postur dan keseimbangan selama 10–15 detik per repetisi.',
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'TAHAP 2 : LATIHAN BENTUK LENGAN',
      items: [
        {
          type: 'subnumberWithoutBold',
          useNumber: true,
          text: 'Latihan membentuk posisi tangan yang benar.',
        },
        {
          type: 'subnumberWithoutBold',
          useNumber: true,
          text: 'Lakukan di depan cermin atau dengan pasangan untuk koreksi.',
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'TAHAP 3 : LATIHAN KOORDINASI TUBUH',
      items: [
        {
          type: 'subnumberWithoutBold',
          useNumber: true,
          text: 'Kombinasikan sikap kuda-kuda, platform tangan, dan gerakan naik turun (seperti menahan bola).',
        },
        {
          type: 'subnumberWithoutBold',
          useNumber: true,
          text: 'Latihan dilakukan 3 set x 10 repetisi.',
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'TAHAP 4 : SIMULASI GERAKAN',
      items: [
        {
          type: 'subnumberWithoutBold',
          useNumber: true,
          text: 'Pelatih memberi aba-aba arah (kanan, kiri, depan, tengah).',
        },
        {
          type: 'subnumberWithoutBold',
          useNumber: true,
          text: 'Pemain merespons dengan gerakan gerak kaki ke arah tersebut, lalu membentuk posisi passing.',
          image: require('../../assets/pb1.mp4'),
          format: 'video',
        },
      ],
    },

    {
      type: 'main',
      useNumber: false,
      text: 'TAHAP 5 : SHADOW PASSING',
      items: [
        {
          type: 'subnumberWithoutBold',
          useNumber: true,
          text: 'Gerakan seolah-olah menerima bola dari berbagai arah.',
        },
        {
          type: 'subnumberWithoutBold',
          useNumber: true,
          text: 'Fokus pada waktu, ayunan lutut, dan arah tubuh.',
          image: require('../../assets/pb2.mp4'),
          format: 'video',
        },
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
          <Text style={styles.sub}>LATIHAN TANPA BOLA</Text>
          <ListItemsFlexibility items={sections} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default LatihanTanpaBola;

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
    textAlign: 'center',
    color: '#005fee',
    fontWeight: 'bold',
    fontSize: 24,
  },
  sub: {
    fontSize: 20,
    fontWeight: 'bold',
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
  list: {
    paddingLeft: 16,
  },
});
