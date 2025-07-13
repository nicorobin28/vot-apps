import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import ListItemsNew from './ListItemsNew';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import SubHeader from './SubHeader';
// import FastImage from '@d11/react-native-fast-image';

const Latihanforearm = ({navigation}) => {
  const teknikData = [
    'Berdiri tegak dengan kaki kiri di depan (untuk tangan kanan) dan kaki kanan di belakang.',
    'Pegang bola di tangan kiri (di depan tubuh).',
    'Tangan kanan membentuk kepalan atau telapak tangan terbuka.',
    'Ayunkan tangan dari belakang ke-depan, pukul bagian bawah bola dengan telapak atau kepalan tangan',
    'Bola diarahkan ke atas melewati net..',
  ];
  const bertahapData = [
    'Latihan ayunan tangan tanpa bola',
    'Latihan memukul bola kearah dinding',
    'Latihan servis ke area target di lapangan (gunakan lingkaran/tanda)',
    'Latihan servis berpasangan',
  ];
  const evaluasiItem = [
    'Akurasi bola melewati net.',
    'Ketetapan jatuh bola ke area target',
    'Konsistensi ayunan dan postur tubuh',
  ];

  const items = [
    {
      type: 'main',
      text: 'Squat',
      image: require('../assets/squat.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Wall Sit',
      image: require('../assets/wallsit.jpg'),
      format: 'image',
    },
    {
      type: 'main',
      text: 'Lunges',
      image: require('../assets/lunges.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Bulgarian Split',
      image: require('../assets/bulgarianSplit.mp4'),
      format: 'video',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />
        {/* isi kontent */}
        <View style={styles.contentContainer}>
          <Text style={styles.titleContent}>UPPER BODY</Text>
          <View style={styles.section}>
            <Text style={styles.subTitle}>
              LATIHAN UNTUK OTOT QUADRICEPS (PAHA DEPAN)
            </Text>
            <View style={styles.list}>
              <ListItemsNew items={items} />
            </View>
          </View>
        </View>
        {/* end isi kontent */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Latihanforearm;

const styles = StyleSheet.create({
  gif: {
    width: 200,
    height: 200,
  },
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
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
  },
  list: {
    paddingLeft: 16,
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
});
