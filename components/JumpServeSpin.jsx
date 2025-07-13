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

const JumpServeSpin = ({navigation}) => {
  const langkahPelaksanaan = [
    'Langkah pendek, biasanya 3 langkah (kanan-kiri-kanan untuk tangan kanan).',
    'Ritme langkah seperti lompat spike.',
    'Lempar bola ke atas dan agak ke depan dengan tangan non-dominan.',
    'Tinggi lemparan ±1 meter di atas kepala.',
    'Bola dilempar dengan sedikit spin untuk memudahkan pukulan berputar.',
    'Lompatan eksplosif saat langkah terakhir.',
    'Lutut ditekuk dan dorong dengan kaki depan ke atas.',
    'Pukul bagian belakang-atas bola dengan telapak tangan terbuka.',
    'Gunakan pergelangan tangan (wrist snap) untuk memberi efek spin.',
    'Arahkan bola menukik ke area lapangan lawan.',
    'Mendarat dengan kedua kaki, posisi siap masuk ke lapangan (jika diperlukan).',
  ];
  const posisiAwal = [
    'Berdiri ±4–5 langkah dari garis belakang.',
    'Fokus pandangan ke arah bola dan area target.',
    'Pegang bola dengan tangan kiri, tangan kanan siap di belakang.',
  ];
  const bertahapData = [
    'TAHAP 1 : Kordinasi Lemparan dan Pukulan',
    '\u2022 Latihan lempar-pukul tanpa lompatan',
    '\u2022 Fokus pada menghasilkan spin dengan gerakan pergelangan tangan',
    'TAHAP 2 : Latihan Lompatan',
    '\u2022 Latihan lompatan eksplosif (box jump, skipping, squat jump)',
    '\u2022 Kombinasikan lompatan dengan ayunan tangan.',
    'TAHAP 3 :  Latihan Pukulan Spin',
    '\u2022 Latihan pukulan bola ke arah dinding/lapangan dengan target.',
    '\u2022 Fokus pada penggunaan pergelangan tangan untuk menghasilkan spin',
    'TAHAP 4 : Jump Serve Spin Lengkap',
    '\u2022 Gabungkan awalan, lemparan, lompatan, dan pukulan.',
    '\u2022 Lakukan ke arah area target di lapangan lawan.',
    '\u2022 Lakukan minimal 10–15 repetisi per sesi',
    'TAHAP 5 : Evaluasi dan Ulang',
    '\u2022 Video analisis gerakan jika memungkinkan',
    '\u2022 Umpan balik dari pelatih.',
    '\u2022 Uji ketepatan dan kekuatan servis.',
  ];

  const tableHead = ['Komponen Evaluasi', 'Indikator'];
  const tableData = [
    ['Lemparan Bola', 'Stabil, tinggi cukup, ke arah depan.'],
    ['Lompatan', 'Tinggi, seimbang, waktu lompatan tepat.'],
    ['Pukulan', 'Keras, spin terlihat, arah meukik.'],
    ['Akurasi Servis', 'Masuk ke area target lawan.'],
    ['Keseimbangan Mendarat', 'Mendarat aman dan siap bermain.'],
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />
        {/* isi kontent */}
        <View style={styles.contentContainer}>
          <Text style={[styles.titleContent, ComponentStyles.poppinsBold]}>
            JUMP SERVE SPIN
          </Text>
          <View style={styles.section}>
            <Text style={[styles.subTitle, ComponentStyles.poppinsBold]}>
              PENJELASAN TEKNIK
            </Text>
            <Text style={styles.paragraph}>
              Jump Serve Spin adalah jenis servis atas lanjutan yang dilakukan
              dengan lompatan dan pukulan keras, disertai putaran bola (spin)
              untuk menghasilkan kecepatan dan arah menukik yang tajam ke area
              lawan.
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
                source={require('../assets/jss1.mp4')}
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
                source={require('../assets/jss2.mp4')}
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
                source={require('../assets/jss3.mp4')}
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

export default JumpServeSpin;

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
});
