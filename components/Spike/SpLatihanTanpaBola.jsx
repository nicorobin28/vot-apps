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
import SubHeader from '../SubHeader';
import ComponentStyles from '../ComponentStyles';

const SpLatihanTanpaBola = ({navigation}) => {
  const sections = [
    {
      type: 'main',
      useNumber: false,
      text: 'LANGKAH - LANGKAH AWAL',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi: ',
          items: [
            {
              type: 'bullet',
              text: 'Latihan 2-3 langkah cepat dengan ritme yang benar',
            },
            {
              type: 'bullet',
              text: 'Fokus pada keseimbangan dan posisi tubuh.',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Repetisi: 3 set x 10 kali.',
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'LATIHAN AYUNAN TANGAN',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi: ',
          items: [
            {
              type: 'bullet',
              text: 'Berdiri diam atau setelah lompatan kecil, lakukan gerakan ayunan tangan seperti melakukan spike',
            },
            {
              type: 'bullet',
              text: 'Fokus pada posisi tangan, bahu, dan pergelangan.',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: '3 set x 10 kali (tangan kanan/kiri dominan).',
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'LATIHAN LOMPATAN VERTIKAL',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi: ',
          items: [
            {
              type: 'bullet',
              text: 'Latihan lompat ditempat dengan ayunan tangan keatas.',
            },
            {
              type: 'bullet',
              text: 'Bisa menggunakan tanda (seperti garis dinding) untuk mengukur tinggi lompatan.',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Repetisi : 3 set x 8 lompatan.',
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'SIMULASI SPIKE LENGKAP (AWALAN - LOMPAT - AYUNAN - TURUN)',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi: ',
          items: [
            {
              type: 'bullet',
              text: 'Gabungkan seluruh rangkaian gerakkan spike tanpa bola.',
            },
            {
              type: 'bullet',
              text: 'Lakukan seolah-olah ada bola didepan net.',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Repetisi : 3 set x 5-8 kali per sisi (kanan dan kiri).',
          media: [
            {source: require('../../assets/spike1.jpg'), format: 'image'},
            {source: require('../../assets/spike2.jpg'), format: 'image'},
            {source: require('../../assets/spike3.jpg'), format: 'image'},
            {source: require('../../assets/spike4.jpg'), format: 'image'},
            {source: require('../../assets/spike5.jpg'), format: 'image'},
          ],
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'SHADOW DRILL',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi: Pelatih memberi aba-aba arah (kanan/kiri/tengah), pemain bergerak, lalu lakukan gerakkan spike tanpa bola.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Tujuan: melatih respons dan konsentrasi.',
          format: 'video',
          image: require('../../assets/spike6.mp4'),
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
          <Text style={styles.titleContent}>SPIKE</Text>
          <Text style={styles.sub}>LATIHAN TANPA BOLA</Text>
          <ListItemsFlexibility items={sections} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SpLatihanTanpaBola;

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
