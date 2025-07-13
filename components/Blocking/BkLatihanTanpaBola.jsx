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

const BkLatihanTanpaBola = ({navigation}) => {
  const sections = [
    {
      type: 'main',
      useNumber: false,
      text: 'LATIHAN LOMPATAN DITEMPAT',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi : ',
          items: [
            {
              type: 'bullet',
              text: 'Pemain melompat vertikal di tempat dengan gerakan blocking tangan.',
            },
            {
              type: 'bullet',
              text: 'Fokus pada meluruskan tangan ke atas dan menjaga jari tetap terbuka.',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Repetisi: 3 set x 10 lompatan',
          image: require('../../assets/bk1.mp4'),
          format: 'video',
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'LATIHAN GERAK LATERAL',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi : ',
          items: [
            {
              type: 'bullet',
              text: 'Pemain bergerak ke kanan dan kiri sepanjang net dalam posisi siap.',
            },
            {
              type: 'bullet',
              text: 'Setiap 1-2 langkah, lakukan simulasi blocking (tanpa bola).',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Tujuan: Melatih mobilitas horizontal untuk menyesuaikan dengan posisi serangan lawan',
          image: require('../../assets/bk2.mp4'),
          format: 'video',
        },
      ],
    },
    {
      type: 'main',
      useNumber: false,
      text: 'SWING BLOCK',
      items: [
        {
          type: 'subnumberWithoutBold',
          text: 'Deskripsi : ',
          items: [
            {
              type: 'bullet',
              text: 'Pemain bergerak dan melompat seolah-olah memblok spike di arah tersebut.',
            },
            {
              type: 'bullet',
              text: 'Gerakannya seperti hendak melakukan spike.',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Tujuan: Melatih respons cepat dan antisipasi arah serangan lawan.',
          image: require('../../assets/bk3.mp4'),
          format: 'video',
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
          <Text style={styles.titleContent}>BLOCKING</Text>
          <Text style={styles.sub}>LATIHAN TANPA BOLA</Text>
          <ListItemsFlexibility items={sections} />
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
