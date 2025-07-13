import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ListItemsFlexibility from '../ListItemsFlexibility';
import ListItems from '../ListItems';
import SubHeader from '../SubHeader';
import {Table, Row, Rows} from 'react-native-table-component';
import ComponentStyles from '../ComponentStyles';

const LatihanDenganBola = ({navigation}) => {
  const sections = [
    {
      type: 'main',
      useNumber: false,
      text: 'PASSING KE DINDING (INDIVIDU)',
      items: [
        {
          type: 'subnumber',
          text: 'Deskripsi: ',
          items: [
            {
              type: 'bullet',
              text: 'Pemain berdiri ±2–3 meter dari dinding.',
            },
            {
              type: 'bullet',
              text: 'Melakukan passing ke dinding secara berulang.',
            },
          ],
        },
        {
          type: 'subnumber',
          text: 'Tujuan: Melatih kontrol bola dan akurasi arah pantulan. ',
        },
        {
          type: 'subnumber',
          text: 'Variasi: ',
          items: [
            {
              type: 'bullet',
              text: 'Gunakan target pada dinding (misalnya lingkaran kecil).',
            },
            {
              type: 'bullet',
              text: 'Hitung berapa kali bola bisa dipantulkan berturut-turut.',
            },
          ],
        },
        {
          type: 'subnumber',
          text: 'Skema Latihan : ',
          items: [
            {
              type: 'text',
              image: require('../../assets/pb3.mp4'),
              format: 'video',
            },
            {
              type: 'text',
              image: require('../../assets/pb4.mp4'),
              format: 'video',
            },
            {
              type: 'text',
              image: require('../../assets/pb5.mp4'),
              format: 'video',
            },
          ],
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'PASSING ESTAFET',
      items: [
        {
          type: 'subnumber',
          text: 'Deskripsi: ',
          items: [
            {
              type: 'bullet',
              text: 'Pemain dibagi menjadi 2 kelompok dengan jumlah yang sama, berbaris saling berhadapan ±3–5 meter.',
            },
            {
              type: 'bullet',
              text: 'Lakukan passing bawah secara bergantian.',
            },
            {
              type: 'bullet',
              text: 'Sehabis melakukan passing langsung rotasi ke barisan belakang.',
            },
          ],
        },
        {
          type: 'subnumber',
          text: 'Tujuan: Melatih teknik passing saat menerima bola dari orang lain.',
        },
        {
          type: 'subnumber',
          text: 'Variasi : ',
          items: [
            {
              type: 'bullet',
              text: 'Ubah jarak antar pemain.',
            },
            {
              type: 'bullet',
              text: 'Latihan dengan satu pemain spike yang lain mem-passing balik dan sebaliknya secara bergantian.',
            },
            {
              type: 'bullet',
              text: 'Tambahkan lompat hurdle sebelum passing.',
            },
          ],
        },
        {
          type: 'subnumber',
          text: 'Skema Latihan :',
          items: [
            {
              type: 'text',
              image: require('../../assets/ldb4PB.jpg'),
              format: 'image',
            },
          ],
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'PASSING STEP POSISI 1 - 5',
      items: [
        {
          type: 'subnumber',
          text: 'Deskripsi: ',
          items: [
            {
              type: 'bullet',
              text: 'Pemain berdiri di posisi 6.',
            },
            {
              type: 'bullet',
              text: 'Lakukan step ke posisi 1 lalu balik lagi ke posisi 6.',
            },
            {
              type: 'bullet',
              text: 'Bola dilempar oleh pelatih/rekan kea rah posisi 6.',
            },
            {
              type: 'bullet',
              text: 'Lalu lakukan step sebaliknya ke posisi 5 dan balik lagi ke posisi 6.',
            },
            {
              type: 'bullet',
              text: 'Dan lakukan passing bawah di posisi 6.',
            },
          ],
        },
        {
          type: 'subnumber',
          text: 'Tujuan: Melatih kecepatan reaksi dan komunikasi antar pemain.',
        },
        {
          type: 'subnumber',
          text: 'Variasi : ',
          items: [
            {
              type: 'bullet',
              text: 'Pelatih/rekan dapat melakukan spike ke arah pemain yang melakukan passing.',
            },
          ],
        },
        {
          type: 'subnumber',
          text: 'Skema Latihan :',
          items: [
            {
              type: 'text',
              media: [
                {source: require('../../assets/ldb5PB.jpg'), format: 'image'},
                {source: require('../../assets/ldb6PB.jpg'), format: 'image'},
                {source: require('../../assets/ldb7PB.jpg'), format: 'image'},
                {source: require('../../assets/ldb8PB.jpg'), format: 'image'},
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'PASSING TARGET AREA SETTER/TOSSER',
      items: [
        {
          type: 'subnumber',
          text: 'Deskripsi: ',
          items: [
            {
              type: 'bullet',
              text: 'Siapkan target keranjang, kerucut, atau garis di area target di lapangan.',
            },
            {
              type: 'bullet',
              text: 'Pemain melakukan passing ke target tersebut.',
            },
          ],
        },
        {
          type: 'subnumber',
          text: 'Tujuan: Melatih akurasi dan arah passing.',
        },
        {
          type: 'subnumber',
          text: 'Skema Latihan :',
          items: [
            {
              type: 'text',
              media: [
                {source: require('../../assets/ldb9PB.jpg'), format: 'image'},
                {source: require('../../assets/ldb10PB.jpg'), format: 'image'},
                {source: require('../../assets/ldb11PB.jpg'), format: 'image'},
                {source: require('../../assets/ldb12PB.jpg'), format: 'image'},
                {source: require('../../assets/ldb13PB.jpg'), format: 'image'},
                {source: require('../../assets/ldb14PB.jpg'), format: 'image'},
              ],
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
    ['Postur Tubuh', 'Kaki selebar bahu, lutut ditekuk, badan condong.'],
    ['Posisi Lengan', 'Rapat, dan lurus.'],
    ['Koordinasi Gerakan', 'Sinkronisasi gerakan lutut dan tangan'],
    ['Respons Arah', 'Mampu bergerak ke arah aba-aba dengan cepat'],
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />

        <View style={styles.contentContainer}>
          <Text style={styles.titleContent}>PASSING BAWAH</Text>
          <Text style={styles.sub}>LATIHAN DENGAN BOLA</Text>
          <ListItemsFlexibility items={sections} />
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

export default LatihanDenganBola;

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
