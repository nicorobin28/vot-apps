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
import Icon from 'react-native-vector-icons/FontAwesome';
import SubHeader from './SubHeader';
import DeviceInfo from 'react-native-device-info';
import ComponentStyles from './ComponentStyles';

const VersionInfoScreen = ({navigation}) => {
  const appName = DeviceInfo.getApplicationName();
  const appVersion = DeviceInfo.getVersion();
  const buildNumber = DeviceInfo.getBuildNumber();
  const userDevice = DeviceInfo.getDeviceName();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />
        <View style={styles.infoApp}>
          <Text style={styles.app}>App Information</Text>
          <Text style={styles.appDesc}>Application Name : {appName}</Text>
          <Text style={styles.appDesc}>Version : {appVersion}</Text>
          <Text style={styles.appDesc}>Build Number : {buildNumber}</Text>
          <Text style={styles.appDesc}>
            Your Phone : {userDevice} support to run this apps
          </Text>
          <Text style={styles.appDesc}>
            Powered By : Ghazan Akbari Azzamuda, Muhammad Adha Syawaludin
          </Text>
          <Text style={styles.appDesc}>Supported By : MNT KREATIF</Text>
        </View>
        <View style={styles.infoApp}>
          <Text style={styles.app}>Apa itu VOT APPS?</Text>
          <Text style={styles.appDesc}>
            VOT APPS adalah aplikasi pelatihan yang dirancang khusus untuk para
            atlet voli. Aplikasi ini memungkinkan atlet membuat jadwal latihan
            secara fleksibel, memilih jenis latihan yang tersedia, atau membuat
            latihan kustom sesuai kebutuhan mereka.
          </Text>
        </View>
        <View style={styles.infoApp}>
          <Text style={styles.app}>
            Siapa saja yang bisa menggunakan VOT APPS?
          </Text>
          <Text style={styles.appDesc}>
            Aplikasi ini ditujukan untuk para atlet voli, baik pemula maupun
            profesional, serta pelatih yang ingin memantau dan mengatur jadwal
            latihan atletnya.
          </Text>
        </View>
        <View style={styles.infoApp}>
          <Text style={styles.app}>
            Apakah saya bisa membuat lebih dari satu jadwal latihan dalam
            sehari?
          </Text>
          <Text style={styles.appDesc}>
            Ya, VOT APPS memungkinkan Anda membuat beberapa jadwal latihan dalam
            satu hari agar latihan bisa dilakukan secara maksimal.
          </Text>
        </View>
        <View style={styles.infoApp}>
          <Text style={styles.app}>
            Apakah saya bisa membuat latihan sendiri (custom)?
          </Text>
          <Text style={styles.appDesc}>
            Tentu! Anda dapat membuat latihan kustom sesuai dengan kebutuhan dan
            tujuan latihan Anda.
          </Text>
        </View>
        <View style={styles.infoApp}>
          <Text style={styles.app}>
            Apakah tersedia latihan bawaan dalam aplikasi?
          </Text>
          <Text style={styles.appDesc}>
            Ya, VOT APPS menyediakan berbagai jenis latihan fisik dan teknik
            yang bisa langsung Anda pilih dan jadwalkan.
          </Text>
        </View>
        <View style={styles.infoApp}>
          <Text style={styles.app}>
            Apakah saya bisa melihat riwayat latihan saya sebelumnya?
          </Text>
          <Text style={styles.appDesc}>
            Ya. VOT APPS menyimpan riwayat latihan Anda sehingga Anda dapat
            melihat perkembangan dan evaluasi latihan dari waktu ke waktu.
          </Text>
        </View>
        <View style={styles.infoApp}>
          <Text style={styles.app}>
            Apakah aplikasi ini membutuhkan koneksi internet?
          </Text>
          <Text style={styles.appDesc}>
            Sebagian besar fitur dapat digunakan secara offline, namun untuk
            menyimpan data ke cloud dan sinkronisasi, koneksi internet
            dibutuhkan.
          </Text>
        </View>
        <View style={styles.infoApp}>
          <Text style={styles.app}>Apakah data saya aman di VOT APPS?</Text>
          <Text style={styles.appDesc}>
            Ya. Kami berkomitmen menjaga keamanan dan privasi data Anda dengan
            sistem keamanan yang sesuai standar industri.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  infoApp: {
    margin: 20,
    padding: 20,
    backgroundColor: '#eef4ff',
    borderRadius: 20,
  },
  app: {
    ...ComponentStyles.poppinsBold,
  },
  appDesc: {
    ...ComponentStyles.poppinsReguler,
    textAlign: 'justify',
  },
});

export default VersionInfoScreen;
