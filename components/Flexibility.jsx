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
import Header from './Header';
import ComponentStyles from './ComponentStyles';

const Flexibility = ({navigation}) => {
  const ladderDrillData = [
    {
      type: 'main',
      text: 'PNF',
      items: [
        {type: 'text', text: 'Ada 3 cara dalam melakukan PNF:'},
        {
          type: 'subnumber',
          text: 'Passive Stretch (Peregangan Pasif)',
          items: [
            {
              type: 'bullet',
              text: 'Peregang (misalnya partner) membawa anggota tubuh kamu ke posisi peregangan ringan',
            },
            {
              type: 'bullet',
              text: 'Peregang (misalnya partner) membawa anggota tubuh kamu ke posisi peregangan ringan',
            },
          ],
        },
        {
          type: 'subnumber',
          text: 'Isometric Contraction (Kontraksi Isometrik)',
          items: [
            {
              type: 'bullet',
              text: 'Kamu melawan peregangan dengan mengontraksikan otot selama 6–10 detik.',
            },
            {
              type: 'bullet',
              text: 'Misalnya, jika paha belakang diregangkan, kamu coba dorong kaki ke arah berlawanan tanpa menggerakkannya (isometrik).',
            },
          ],
        },
        {
          type: 'subnumber',
          text: 'Deeper Passive Stretch',
          items: [
            {
              type: 'bullet',
              text: 'Setelah kontraksi, relaks dan peregang meningkatkan sudut peregangan lebih jauh.',
            },
            {
              type: 'bullet',
              text: 'Tahan lagi selama 15–30 detik.',
            },
          ],
        },
      ],
    },
    {
      type: 'text',
      text: 'Contoh PNF pada otot hamstring (paha belakang):',
      items: [
        {
          type: 'bullet',
          text: 'Posisi berbaring dengan satu tungkai diangkat lurus oleh partner.',
        },
        {
          type: 'bullet',
          text: 'Kemudian partner menahan posisi tungkai 6 – 10 detik.',
        },
        {
          type: 'bullet',
          text: 'Partner memberikan kontraksi dengan cara mendorong tungkai ke arah dada 10 – 15 detik.',
        },
        {
          type: 'bullet',
          text: 'Setelah mendorong ke arah dada biarkan tungkai relax terlebih dahulu kemudian setelah relax partener mendorong lagi tungkai ke arah kepala 20 – 30 detik.',
        },
      ],
    },
    {
      type: 'main',
      text: 'Static stretch',
      items: [
        {
          type: 'bullet',
          text: 'Regangkan otot dengan menarik salah satu anggota tubuh sampai bagian tubuh terasa meregang.',
        },
        {
          type: 'bullet',
          text: 'Tahan selama 15 – 30 detik.',
        },
      ],
    },
    {
      type: 'text',
      text: 'CONTOH GERAKAN FLEXIBILITY',
    },
    {
      type: 'subnumber',
      text: ' Child Pose',
      image: require('../assets/childpose.jpg'),
    },
    {
      type: 'subnumber',
      text: ' Cobra Pose',
      image: require('../assets/cobrapose.jpg'),
    },
    {
      type: 'subnumber',
      text: ' Downward Dog',
      image: require('../assets/downwarddog.jpg'),
    },
    {
      type: 'subnumber',
      text: ' Forward Lunge',
      image: require('../assets/forwardlunge.jpg'),
    },
    {
      type: 'subnumber',
      text: 'Kneeling Hamstring',
      image: require('../assets/kneelinghamstring.jpg'),
    },
    {
      type: 'subnumber',
      text: 'Thread the Needle',
      image: require('../assets/threadtheneedle.jpg'),
    },
    {
      type: 'subnumber',
      text: '90/90 Stretch',
      image: require('../assets/stretch.jpg'),
    },
    {
      type: 'subnumber',
      text: 'Butterfly',
      image: require('../assets/butterly.jpg'),
    },
    {
      type: 'subnumber',
      text: 'Recniled Twist',
      image: require('../assets/reclinedtwist.jpg'),
    },
    {
      type: 'subnumber',
      text: 'Kneeling Down Strecth',
      image: require('../assets/kneelingdownstrecth.jpg'),
    },
    {
      type: 'subnumber',
      text: 'Sit and Reach',
      image: require('../assets/sitandreach.jpg'),
    },
  ];
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container}>
        <Header title="FLEXIBILITY" onBackPress={() => navigation.goBack()} />
        <View style={styles.contentContainer}>
          <Text style={[styles.Title, ComponentStyles.poppinsReguler]}>
            Flexibilitas dalam konteks olahraga adalah kemampuan tubuh untuk
            melakukan gerakan dengan rentang yang luas pada sendi atau
            sekelompok sendi tanpa mengalami cidera atau ketegangan pada otot.
          </Text>
          <Text style={[styles.sub, ComponentStyles.poppinsBold]}>
            MATERI LATIHAN MELIPUTI:
          </Text>
          <ListItemsFlexibility items={ladderDrillData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Flexibility;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginTop: -25,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  Title: {
    fontSize: 17,
    textAlign: 'justify',
    paddingBottom: 30,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  sub: {
    fontSize: 17,
    marginBottom: 10,
    // paddingLeft: 11,
  },
});
