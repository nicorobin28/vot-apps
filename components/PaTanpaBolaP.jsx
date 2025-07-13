import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';

import ListItemsFlexibility from './ListItemsFlexibility';
// import Header from './Header';
import SubHeader from './SubHeader';

const paTanpaBolaP = ({navigation}) => {
  const ladderDrillData = [
    {
      type: 'main',
      useNumber: false,
      text: 'LATIHAN POSISI TANGAN:',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Bentuk tangan seperti sedang memegang bola.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Latihan dilakukan sambil berdiri di depan cermin.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Fokus pada bentuk jari, posisi siku, dan tinggi tangan.',
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'LATIHAN GERAKAN DORONGAN:',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Posisi tangan di atas dahi.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Gerakkan tangan seperti mendorong bola ke atas (bayangkan bola ada di tangan).',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Lakukan 10–15 repetisi dengan fokus pada pergerakan pergelangan tangan dan perpanjangan siku.',
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'LATIHAN GERAKAN KAKI DAN BADAN:',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Dari posisi kuda-kuda, dorong badan ke atas seolah-olah sedang mengangkat bola.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Sinkronkan gerakan lutut, pinggul, dan tangan.',
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'SIMULASI DENGAN GERAK ARAH:',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Pelatih memberi aba-aba arah (kiri, kanan, depan).',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Pemain bergerak ke arah tersebut, lalu lakukan simulasi passing atas.',
          media: [
            {
              source: require('../assets/patanpabola1.jpg'),
              format: 'image',
            },
            {
              source: require('../assets/patanpabola2.jpg'),
              format: 'image',
            },
            {
              source: require('../assets/patanpabola3.jpg'),
              format: 'image',
            },
            {
              source: require('../assets/patanpabola4.mp4'),
              format: 'video',
            },
          ],
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />
        <View style={styles.contentContainer}>
          <Text style={styles.titleContent}>PASING ATAS</Text>
          <Text style={styles.sub}>LATIHAN TANPA BOLA</Text>
          <ListItemsFlexibility items={ladderDrillData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default paTanpaBolaP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    // padding: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
