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
import SubHeader from './SubHeader';
import {Table, Row, Rows} from 'react-native-table-component';
import ComponentStyles from './ComponentStyles';

const paTanpaBolaP = ({navigation}) => {
  const ladderDrillData = [
    {
      type: 'main',
      useNumber: false,
      text: 'PASSING KE DINDING (INDIVIDU):',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi.',
          items: [
            {
              type: 'bullet',
              text: 'Pemain berdiri ±1–2 meter dari dinding.',
            },
            {
              type: 'bullet',
              text: 'Melakukan passing atas ke dinding berulang-ulang.',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Tujuan: Melatih kontrol bola, kekuatan dorongan, dan akurasi.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Variasi.',
          items: [
            {
              type: 'bullet',
              text: 'Gunakan target tertentu di dinding.',
            },
            {
              type: 'bullet',
              text: 'Hitung jumlah pantulan berturut-turut tanpa jatuh.',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Skema Latihan:',
          image: require('../assets/skemalatihan.mp4'),
          format: 'video',
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'PASSING ATAS BERPASANGAN:',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi.',
          items: [
            {
              type: 'bullet',
              text: 'Dua pemain saling berhadapan ±3 meter.',
            },
            {
              type: 'bullet',
              text: 'Bergantian melakukan passing atas ke satu sama lain.',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Tujuan: Melatih kontrol dan kerja sama dengan rekan.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Variasi: Tambahkan gerakan maju-mundur setelah setiap passing.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Skema Latihan:',
          media: [
            {
              source: require('../assets/skm1.jpg'),
              format: 'image',
            },
            {
              source: require('../assets/skm2.jpg'),
              format: 'image',
            },
          ],
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'PASSING ATAS BERGERAK:',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi: Pemain melakukan passing atas sambil bergerak ke kanan, kiri, atau depan.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Tujuan: Menyesuaikan diri dengan bola yang datang tidak di tempat.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Variasi:',
          items: [
            {
              type: 'bullet',
              text: 'Pelatih melempar bola ke berbagai arah.',
            },
            {
              type: 'bullet',
              text: 'Pemain harus mengejar dan melakukan passing atas.',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Skema Latihan:',
          media: [
            {
              source: require('../assets/skm3.jpg'),
              format: 'image',
            },
            {
              source: require('../assets/skm4.jpg'),
              format: 'image',
            },
            {
              source: require('../assets/skm5.jpg'),
              format: 'image',
            },
          ],
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'PASSING ATAS KEARAH TARGET:',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi:',
          items: [
            {
              type: 'bullet',
              text: 'Letakkan kerucut atau lingkaran sebagai target di lapangan.',
            },
            {
              type: 'bullet',
              text: 'Pemain melakukan passing atas ke arah target tersebut',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Tujuan: Melatih akurasi arah passing untuk umpan.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Skema Latihan:',
          media: [
            {
              source: require('../assets/skm6.jpg'),
              format: 'image',
            },
            {
              source: require('../assets/skm7.jpg'),
              format: 'image',
            },
            {
              source: require('../assets/skm8.jpg'),
              format: 'image',
            },
            {
              source: require('../assets/skm9.jpg'),
              format: 'image',
            },
            {
              source: require('../assets/skm10.jpg'),
              format: 'image',
            },
            {
              source: require('../assets/skm11.jpg'),
              format: 'image',
            },
          ],
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'PASSING ATAS ESTAET (KELOMPOK):',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi:',
          items: [
            {
              type: 'bullet',
              text: 'Pemain dibagi dalam beberapa kelompok.',
            },
            {
              type: 'bullet',
              text: 'Tiap pemain harus melakukan passing atas ke pemain berikutnya hingga bola mencapai akhir barisan.',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Tujuan: Melatih kerja sama tim, kecepatan, dan akurasi.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Skema Latihan:',
          image: require('../assets/skm12.jpg'),
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'PASSING ATAS MENGATUR BOLA UNTUK SMASH (SET UP):',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi:',
          items: [
            {
              type: 'bullet',
              text: 'Satu pemain melakukan set/passing atas ke arah teman untuk dismash.',
            },
            {
              type: 'bullet',
              text: 'Fokus pada tinggi dan arah bola.',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Tujuan: Melatih kerja sama tim, kecepatan, dan akurasi.Tujuan: Mengembangkan kemampuan mengatur serangan (playmaker).',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Skema Latihan:',
          media: [
            {
              source: require('../assets/skm13.jpg'),
              format: 'image',
            },
            {
              source: require('../assets/skm14.jpg'),
              format: 'image',
            },
          ],
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'EVALUASI',
    },
  ];

  const tableHead = ['Komponen Evaluasi', 'Indikator'];
  const tableData = [
    ['Postur Tubuh', 'Lutut ditekuk, badan seimbang, mata fokus'],
    ['Posisi Tangan', 'Jari membentuk mangkuk, bola tidak menyentuh telapak'],
    ['Kontrol Bola', 'Tidak berputar, arah sesuai'],
    ['Kerja Sama', 'Passing lancar dengan rekan'],
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />
        <View style={styles.contentContainer}>
          <Text style={styles.titleContent}>PASING ATAS</Text>
          <Text style={styles.sub}>LATIHAN DENGAN BOLA</Text>
          <ListItemsFlexibility items={ladderDrillData} />
          <View style={styles.list}>
            <Table
              borderStyle={{
                borderWidth: 1,
                borderColor: '#c8e1ff',
              }}>
              <Row
                data={tableHead}
                textStyle={{padding: 10, ...ComponentStyles.poppinsBold}}
              />
              <Rows
                data={tableData}
                textStyle={{padding: 10, ...ComponentStyles.poppinsReguler}}
              />
            </Table>
          </View>
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
