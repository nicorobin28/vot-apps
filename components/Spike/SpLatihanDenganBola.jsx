import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ListItems from '../ListItems';
import SubHeader from '../SubHeader';
import ComponentStyles from '../ComponentStyles';
import ListItemsFlexibility from '../ListItemsFlexibility';
import {Table, Row, Rows} from 'react-native-table-component';

const SpLatihanDenganBola = ({navigation}) => {
  const sections = [
    {
      type: 'main',
      text: 'LATIHAN SPIKE DI TEMPAT',
      useNumber: false,
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi : ',
          items: [
            {
              type: 'bullet',
              text: 'Pelatih/teman melempar bola (toss) kearah depan net.',
            },
            {
              type: 'bullet',
              text: 'Pemain melakukan awalan, lompat, dan melakukan spike',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Tujuan: Melatih dasar teknik spike dari umpan tetap.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Variasi: Gunakan posisi spike dari kanan (posisi 2), tengah (posisi 3), dan kiri (posisi 4).',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Skema Latihan : ',
          image: require('../../assets/spike7.mp4'),
          format: 'video',
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'SPIKE DARI SET UP',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi : ',
          items: [
            {
              type: 'bullet',
              text: 'Satu pemain melakukan set (umpan atas) kearah spiker.',
            },
            {
              type: 'bullet',
              text: 'Spiker melakukan awalan dan spike ke lapangan lawan.',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Tujuan: Melatih timing dan kerja sama antara setter dan spiker.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Catatan: Mulai dengan tempo lambat, lalu bertahap ke tempo cepat.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Skema Latihan : ',
          image: require('../../assets/spike8.jpg'),
          format: 'image',
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'SPIKE KE TARGET',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi : ',
          items: [
            {
              type: 'bullet',
              text: 'Letakkan kerucut, ban, atau matras di area lawan.',
            },
            {
              type: 'bullet',
              text: 'Pemain diminta melakukan spike tepat ke target.',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Tujuan: Meningkatkan akurasi arah dan kontrol spike.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Skema Latihan : ',
          image: require('../../assets/spike9.jpg'),
          format: 'image',
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'LATIHAN KOMBINASI: SPIKE SETELAH PASSING',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi : ',
          items: [
            {
              type: 'bullet',
              text: 'Pemain melakukan passing -> set up -> spike.',
            },
            {
              type: 'bullet',
              text: 'Bisa dilakukan berpasangan atau dalam kelompok 3 orang.',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Tujuan: Melatih transisi dari pertahanan ke serangan.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Skema Latihan : ',
          image: require('../../assets/spike10.mp4'),
          format: 'video',
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'LATIHAN KOMBINASI: SPIKE SETELAH PASSING',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi : ',
          items: [
            {
              type: 'bullet',
              text: 'Pemain melakukan passing -> set up -> spike.',
            },
            {
              type: 'bullet',
              text: 'Bisa dilakukan berpasangan atau dalam kelompok 3 orang.',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Tujuan: Melatih transisi dari pertahanan ke serangan.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Skema Latihan : ',
          image: require('../../assets/spike10.mp4'),
          format: 'video',
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'LATIHAN SPIKE BERPASANGAN DENGAN BLOK',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi : ',
          items: [
            {
              type: 'bullet',
              text: 'Satu pemain spike, satu pemain menjadi blocker.',
            },
            {
              type: 'bullet',
              text: 'Spike berusaha melewati blok, blocker mencoba menahan.',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Tujuan: Melatih variasi arah spike dan menghadapi blok',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Skema Latihan : ',
          image: require('../../assets/spike11.jpg'),
          format: 'image',
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
    ['Awalan', 'Cepat, berirama, dan siap loncat.'],
    ['Lompatan', 'Vertikal, cukup tinggi, stabil.'],
    ['Ayunan Tangan', 'Penuh tenaga, diarahkan ke bola.'],
    ['Kontak Bola', 'Di atas kepala, bola masuk area lawan.'],
    ['Arah Bola', 'Terarah dan menghindari blok lawan.'],
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />

        <View style={styles.contentContainer}>
          <Text style={styles.titleContent}>SPIKE</Text>
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

export default SpLatihanDenganBola;

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
