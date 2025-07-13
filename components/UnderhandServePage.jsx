import React, {useState} from 'react';
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
import ListItems from './ListItems';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import SubHeader from './SubHeader';
import ComponentStyles from './ComponentStyles';
import VideoPlayer from 'react-native-video-controls';

const UnderhandServePage = ({navigation}) => {
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />
        {/* isi kontent */}
        <View style={styles.contentContainer}>
          <Text style={[styles.titleContent, ComponentStyles.poppinsBold]}>
            UNDERHAND SERVE
          </Text>
          <View style={styles.section}>
            <Text style={[styles.subTitle, ComponentStyles.poppinsBold]}>
              PENJELASAN TEKNIK
            </Text>
            <Text style={[styles.paragraph, ComponentStyles.poppinsReguler]}>
              Underhand Serve adalah jenis servis yang dilakukan dengan cara
              memukul bola dari bawah menggunakan tangan yang diayun dari
              belakang ke depan
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={[styles.subTitle, ComponentStyles.poppinsBold]}>
              LANGKAH - LANGKAH TEKNIK
            </Text>
            <View style={styles.list}>
              <ListItems items={teknikData} />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={[styles.subTitle, ComponentStyles.poppinsBold]}>
              LANGKAH BERTAHAP
            </Text>
            <View style={styles.list}>
              <ListItems items={bertahapData} />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={[styles.subTitle, ComponentStyles.poppinsBold]}>
              EVALUASI
            </Text>
            <View style={styles.list}>
              <ListItems items={evaluasiItem} />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={[styles.subTitle, ComponentStyles.poppinsBold]}>
              SKEMA LATIHAN
            </Text>
            <View style={styles.listItems}>
              <Image
                style={styles.image}
                source={require('../assets/slServis1.jpg')}
              />
            </View>
            <View style={styles.listItems}>
              <Image
                style={styles.image}
                source={require('../assets/slServis2.jpg')}
              />
            </View>
            <View style={styles.listItems}>
              <Image
                style={styles.image}
                source={require('../assets/slServis3.jpg')}
              />
            </View>
            <View style={styles.listItems}>
              <Image
                style={styles.image}
                source={require('../assets/slServis4.jpg')}
              />
            </View>
            <View style={styles.listItems}>
              <Image
                style={styles.image}
                source={require('../assets/slServis5.jpg')}
              />
            </View>
            <View style={styles.listItems}>
              <Image
                style={styles.image}
                source={require('../assets/slServis6.jpg')}
              />
            </View>
            <View style={styles.containerVideo}>
              <VideoPlayer
                source={require('../assets/slServis7.mp4')}
                style={styles.video}
                tapAnywhereToPause={true}
                controlTimeout={2000}
                disableFullscreen={true}
                disableVolume={true}
                disableBack={true}
                seekColor="#007aff"
                muted={true}
                repeat={true}
                paused={true}
              />
            </View>
          </View>
        </View>
        {/* end isi kontent */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UnderhandServePage;

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
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
  },
  list: {
    paddingLeft: 16,
    overflow: 'hidden',
    borderRadius: 20,
  },
  listItems: {
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: '#eef4ff',
    marginVertical: 10,
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
  containerVideo: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 20,
  },
  video: {
    height: 300,
    width: '100%',
    backgroundColor: '#eef4ff',
  },
  image: {
    width: '100%',
    height: 250,
    marginTop: 4,
    resizeMode: 'contain',
  },
});
