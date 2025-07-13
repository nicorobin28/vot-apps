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
import ListItems from './ListItems';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import SubHeader from './SubHeader';

const PaTanpaBola = ({navigation}) => {
  const langkahTeknik = [
    'Berdiri dengan kedua kaki selebar bahu.',
    'Lutut sedikit ditekuk, badan condong ke depan.',
    'Pandangan ke arah datangnya bola (visualisasi).',
  ];

  const langkahBertahap = [
    'Bentuk jari-jari membentuk mangkuk (seperti memegang bola).',
    'Jempol dan jari telunjuk membentuk segitiga kecil (tidak terlalu rapat).',
    'Tangan berada di atas dahi, siku terbuka ke samping.',
  ];

  const evaluasi = [
    'Gerakan mendorong ke atas dengan ujung jari-jari.',
    'Pergerakan berasal dari pergelangan tangan dan dorongan kaki.',
    'Gerakan disertai perpanjangan siku dan lutut saat mendorong.',
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />
        {/* isi kontent */}
        <View style={styles.contentContainer}>
          <Text style={styles.titleContent}>PASSING ATAS</Text>
          <Text style={styles.sub}>FOKUS TEKNIK TANPA BOLA</Text>

          <View style={styles.section}>
            <Text style={styles.subTitle}>SIKAP AWAL</Text>
            <View style={styles.list}>
              <ListItems items={langkahTeknik} />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.subTitle}>POSISI TANGAN</Text>
            <View style={styles.list}>
              <ListItems items={langkahBertahap} />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.subTitle}>GERAKAN SIMULASI</Text>
            <View style={styles.list}>
              <ListItems items={evaluasi} />
            </View>
          </View>
        </View>
        {/* end isi kontent */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaTanpaBola;

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
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
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
  sub: {
    // padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
