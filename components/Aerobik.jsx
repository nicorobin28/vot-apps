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
// import ListItems from './ListItems';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import SubHeader from './SubHeader';
import ListItemsNew from './ListItemsNew';
import LottieView from 'lottie-react-native';
import ComponentStyles from './ComponentStyles';

const Aerobik = ({navigation}) => {
  const isiContent = [
    {
      type: 'subnumber',
      items: [
        {
          text: 'Easy run(lari dengan kecepatan 50%),Berenang,Bersepeda 40 – 90 menit dengan kisaran nadi berada di 130 – 140',
        },
        {
          text: 'Slow Continues Run(berlari dengan kecepatan 60% - 80% ) ,Berenang,Bersepeda 90 – 120 menit dengan kisaran nadi 130 – 150',
        },
        {
          text: 'Jumping jack 1 – 2 menit x 10 – 15 repetisi',
          image: require('../assets/jumpingjack.mp4'),
          format: 'video',
        },
        {
          text: 'Skipping 1 – 5 menit x 8 – 12 repetisi',
          image: require('../assets/skipping.mp4'),
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
        {/* isi kontent */}
        <View style={styles.contentContainer}>
          <Text style={[styles.titleContent, ComponentStyles.poppinsBold]}>
            AEROBIK
          </Text>
          <Text style={[styles.sub, ComponentStyles.poppinsBold]}>
            LATIHAN AEROBIK BISA DILAKUKAN DENGAN
          </Text>
          {/* end isi kontent */}
          <View style={styles.section}>
            <View style={styles.list}>
              <ListItemsNew items={isiContent} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Aerobik;

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
    textAlign: 'center',
    marginBottom: 20,
  },
  jumpingJack: {},
  animation: {
    width: 400,
    height: 400,
  },
  video: {
    width: 400,
    height: 400,
  },
});
