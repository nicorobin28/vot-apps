import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import ListItemsFlexibility from '../ListItemsFlexibility';
import SubHeader from '../SubHeader';
import ComponentStyles from '../ComponentStyles';
import {Table, Row, Rows} from 'react-native-table-component';

const BkLatihanTanpaBola = ({navigation}) => {
  const sections = [
    {
      type: 'main',
      useNumber: false,
      text: 'LATIHAN REAKSI DENGAN SWING BLOCK',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi : ',
          items: [
            {
              type: 'bullet',
              text: 'Pelatih spike bola dari sisi lawan ke atas net.',
            },
            {
              type: 'bullet',
              text: 'Pemain melompat dan mencoba memblok bola tersebut',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Tujuan: Melatih waktu lompat dan posisi tangan.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Varias: Gunakan arah bola berbeda (kanan, tengah, kiri).',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Skema Latihan',
          image: require('../../assets/bk4.mp4'),
          format: 'video',
        },
        {
          type: 'text',
          text: '',
          image: require('../../assets/bk5.mp4'),
          format: 'video',
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'LATIHAN BLOK MENGHADAPI SMASH (1 VS 1)',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi : ',
          items: [
            {
              type: 'bullet',
              text: 'Satu pemain sebagai smasher (dengan umpan lambung).',
            },
            {
              type: 'bullet',
              text: 'Satu pemain sebagai blocker di depan net.',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Tujuan: Melatih blok saat menghadapi smash langsung.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Catatan: Smash awal harus lambat untuk pemula, kemudian ditingkatkan kecepatannya.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Skema Latihan',
          image: require('../../assets/bk6.mp4'),
          format: 'video',
        },
        {
          type: 'text',
          text: '',
          image: require('../../assets/bk7.mp4'),
          format: 'video',
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'LATIHAN BLOK BERPASANGAN (BLOK GANDA)',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi : ',
          items: [
            {
              type: 'bullet',
              text: 'Dua blocker berdiri bersebelahan di depan net.',
            },
            {
              type: 'bullet',
              text: 'Menghadapi smash dari satu penyerangan.',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Tujuan: Melatihan komunikasi dan penempatan tangan blok ganda.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Skema Latihan :',
          items: [
            {
              type: 'text',
              media: [
                {source: require('../../assets/bk8.jpg'), format: 'image'},
                {source: require('../../assets/bk9.jpg'), format: 'image'},
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'LATIHAN BLOK KEPOSISI SPIKE',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi : ',
          items: [
            {
              type: 'bullet',
              text: 'Spike di tempatkan posisi 4-3-2',
            },
            {
              type: 'bullet',
              text: 'Pelatih memberikan aba-aba untuk',
            },
            {
              type: 'bullet',
              text: 'Posisi blocker berada di posisi 3',
            },
            {
              type: 'bullet',
              text: 'Blocker harus bergerak ke arah spiker sesuai aba-aba posisi dari pelatih dan melakukan blocking pada di posisi tersebut',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Tujuan: Melatihan mobilitas horizontal di sepanjang net.',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Skema Latihan :',
          items: [
            {
              type: 'text',
              image: require('../../assets/bk10.jpg'),
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
    ['Posisi Siap', 'Kaki selebar bahu, lutut ditekuk, badan condong.'],
    ['Lompatan', 'Vertikal, kuat, dan tepat waktu.'],
    [
      'Tangan Saat Blocking',
      'Lurus ke atas, jari terbuka, telapak tangan menghapad net',
    ],
    ['Koordinasi', 'Gerakan kaki, tangan, dan pandangan sinkron.'],
    ['Mobilitas', 'Cepat bergerak ke arah blocking.'],
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />
        <View style={styles.contentContainer}>
          <Text style={styles.titleContent}>BLOCKING</Text>
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

export default BkLatihanTanpaBola;

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
