import React, {useState} from 'react';
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
import SubHeader from './SubHeader';

const Flexibility = ({navigation}) => {
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = e => {
    setScrollY(e.nativeEvent.contentOffset.y);
  };
  const ladderDrillData = [
    {
      type: 'main',
      text: 'Plyometric Push Up',
      image: require('../assets/plyometricPushUp.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Clap Push Up',
      image: require('../assets/clappushup.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Staggered Push Up',
      image: require('../assets/staggeredPushUp.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Medicine Ball Chest Pass',
      image: require('../assets/medicineballchestpass.jpg'),
      format: 'image',
    },
    {
      type: 'text',
      text: 'Posisi Berdiri',
    },
    {
      type: 'bullet',
      text: 'Berdiri tegak dengan kaki selebar bahu dan pegang bola medis (medicine ball) di dada.',
    },
    {
      type: 'bullet',
      text: 'Dorong bola dengan cepat dan kuat ke depan, seperti gerakan melempar.',
    },
    {
      type: 'bullet',
      text: 'Setelah bola dipantulkan atau mengenai dinding atau partner, tangkap bola dan kembali ke posisi awal.',
    },
    {
      type: 'main',
      text: 'Medicine Ball Overhead Slam',
      image: require('../assets/medicineballoverheadslam.mp4'),
      format: 'video',
    },
    {
      type: 'bullet',
      text: 'Pegang bola medicine di atas kepala dengan kedua tangan',
    },
    {
      type: 'bullet',
      text: 'Dengan posisi kaki sedikit lebar, lemparkan bola medis ke bawah dengan tenaga maksimal, melakukan gerakan slam ke lantai.',
    },
    {
      type: 'bullet',
      text: 'Setelah bola memantul, tangkap bola dan ulangi gerakan',
    },
    {
      type: 'main',
      text: 'Battle Rope',
    },
    {
      type: 'text',
      text: 'DILAKUKAN DENGAN CEPAT SELAMA 15 – 30 DETIK X 3-5 SET',
    },
    {
      type: 'bullet',
      text: 'Swing',
      image: require('../assets/swing.mp4'),
      format: 'video',
    },
    {
      type: 'bullet',
      text: 'Slams',
      image: require('../assets/slams.mp4'),
      format: 'video',
    },
    {
      type: 'bullet',
      text: 'Snakes',
      image: require('../assets/snakes.mp4'),
      format: 'video',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />
        <View style={styles.contentContainer}>
          <Text style={styles.titleContent}>UPPER BODY</Text>
          <Text style={styles.sub}>
            LATIHAN UPPER BODY BISA DILAKUKAN DENGAN
          </Text>
          <ListItemsFlexibility items={ladderDrillData} scrollY={scrollY} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Flexibility;

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 26,
    height: 26,
    marginRight: 6,
  },
  appName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  descName: {
    color: '#fff',
    fontSize: 3.5,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerWrapper: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    height: 120,
    width: '100%',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  headerImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextSmall: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerTextLarge: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
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
  section: {
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
  },
  list: {
    paddingRight: 16,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 4,
    flexDirection: 'row',
    gap: 5,
  },
  imageView: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    height: '240',
    borderRadius: 20,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  sub: {
    // padding: 20,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  jumpingJack: {},
});
