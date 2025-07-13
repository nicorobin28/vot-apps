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
import ComponentStyles from './ComponentStyles';
import {Table, Row, Rows} from 'react-native-table-component';
import VideoPlayer from 'react-native-video-controls';

const JumpServeFloating = ({navigation}) => {
  const langkahPelaksanaan = [
    'Gunakan 3–4 langkah pendek dan cepat (ritme: kiri–kanan–kiri untuk tangan kanan), (ritme: kanan-kiri-kanan untuk tangan kiri).',
    'Lempar bola dengan satu tangan ke atas ±1 meter di atas kepala, sedikit ke depan tubuh.',
    'Pastikan lemparan bola tidak berputar (stabil).',
    'Lompat bersamaan dengan ayunan tangan belakang.',
    'Pukul bola dengan telapak tangan terbuka, kontak tepat di bagian tengah bola.',
    'Hindari gerakan memutar pergelangan tangan untuk menghasilkan bola tanpa spin.',
    'Mendarat dengan kedua kaki secara seimbang.',
    'Siap masuk ke lapangan jika sistem permainan mengharuskan.',
  ];
  const posisiAwal = [
    'Berdiri beberapa langkah di belakang garis servis.',
    'Fokus pada bola dan area target.',
    'Pegang bola dengan dua tangan di depan tubuh.',
  ];
  const bertahapData = [
    'TAHAP 1 : Lempar Bola',
    '\u2022 Latihan melempar bola keatas dengan stabil dan akurat (tanpa spin).',
    '\u2022 10-15 repetisi',
    'TAHAP 2 : Ayunan & Pukulan',
    '\u2022 Latihan pukulan bola floating dari posisi berdiri',
    '\u2022 Fokus pada kontak tengah bola dan tidak membuat spin',
    'TAHAP 3 : Pukulan Dengan Lompat Ringan',
    '\u2022 Tambahkan lompatan rendah untuk koordinasi pukulan saat melayang.',
    'TAHAP 4 : Jump Serve Floating Lengkap',
    '\u2022 Latihan jump serve dengan gerakan penuh.',
    '\u2022 Targetkan area tertentu di lapangan lawan.',
    '\u2022 Gunakan kerucut/karpet sebagai target area.',
    'TAHAP 5 : Evaluasi dan Ulang',
    '\u2022 Video analisis gerakan jika memungkinkan',
    '\u2022 Umpan balik dari pelatih.',
    '\u2022 Uji ketepatan dan kekuatan servis.',
  ];

  const tableHead = ['Komponen Evaluasi', 'Kriteria Penilaian'];
  const tableData = [
    ['Lemparan Bola', 'Tinggi, stabil, tanpa spin.'],
    ['Kekuatan Lompatan', 'Cukup untuk menjangkau titik pukul ideal.'],
    ['Kontak Bola', 'Tepat di tengah bola, tidak berputar.'],
    ['Akurasi Servis', 'Masuk ke area target lawan.'],
    ['Stabilitas Mendarat', 'Seimbang dan siap melanjutkan permainan.'],
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />
        {/* isi kontent */}
        <View style={styles.contentContainer}>
          <Text style={styles.titleContent}>JUMP SERVE FLOATING</Text>
          <View style={styles.section}>
            <Text style={[styles.subTitle, ComponentStyles.poppinsBold]}>
              PENJELASAN TEKNIK
            </Text>
            <Text style={[styles.paragraph, ComponentStyles.poppinsReguler]}>
              Jump Serve Floating adalah jenis servis atas yang dilakukan dengan
              lompatan dan pukulan bola yang minim spin, menghasilkan gerakan
              bola yang tidak stabil (mengambang), menyulitkan lawan dalam
              menerima bola
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={[styles.subTitle, ComponentStyles.poppinsBold]}>
              POSISI AWAL
            </Text>
            <View style={styles.list}>
              <ListItems items={posisiAwal} />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={[styles.subTitle, ComponentStyles.poppinsBold]}>
              LANGKAH - LANGKAH PELAKSANAAN
            </Text>
            <View style={styles.list}>
              <ListItems items={langkahPelaksanaan} />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={[styles.subTitle, ComponentStyles.poppinsBold]}>
              LATIHAN BERTAHAP
            </Text>
            <View style={styles.list}>
              <ListItems items={bertahapData} />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={[styles.subTitle, ComponentStyles.poppinsBold]}>
              SKEMA LATIHAN
            </Text>
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
          <View style={styles.section}>
            <Text style={[styles.subTitle, ComponentStyles.poppinsBold]}>
              SKEMA LATIHAN
            </Text>
            <View style={styles.containerVideo}>
              <VideoPlayer
                source={require('../assets/jsf1.mp4')}
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
            <View style={styles.containerVideo}>
              <VideoPlayer
                source={require('../assets/jsf2.mp4')}
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

export default JumpServeFloating;

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
  listItems: {
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: '#eef4ff',
    marginVertical: 10,
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
