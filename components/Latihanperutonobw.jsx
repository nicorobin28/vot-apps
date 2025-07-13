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
import ListItemsFlexibility from './ListItemsFlexibility';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import SubHeader from './SubHeader';
// import FastImage from '@d11/react-native-fast-image';

const Latihanforearm = ({navigation}) => {
  const [scrollY, setScrollY] = useState(0);

  const items = [
    {
      type: 'main',
      text: 'Dead Bug',
    },
    {
      type: 'text',
      text: '*Lakukan dengan gerakan yang pelan',
      image: require('../assets/deadbug.mp4'),
      format: 'video',
    },

    {
      type: 'main',
      text: 'Back Up',
    },
    {
      type: 'text',
      text: '*Lakukan dengan gerakan yang pelan',
      image: require('../assets/backup.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Leg Raise',
    },
    {
      type: 'text',
      text: '*lakukan dengan gerakan yang pelan',
      image: require('../assets/legraise.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Russian Twist',
    },
    {
      type: 'text',
      text: '*lakukan dengan gerakan yang pelan',
      image: require('../assets/russiantwist.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Cycling',
    },
    {
      type: 'text',
      text: '*lakukan dengan gerakan yang pelan',
      image: require('../assets/cycling.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Toe Touch',
    },
    {
      type: 'text',
      text: '*lakukan dengan gerakan yang pelan',
      image: require('../assets/toetouch.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Heel Touch',
    },
    {
      type: 'text',
      text: '*lakukan dengan gerakan yang pelan',
      image: require('../assets/heeltouch.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Plank',
      image: require('../assets/plank.jpg'),
    },
    {
      type: 'main',
      text: 'Shoulder Tap',
      image: require('../assets/shouldertap1.jpg'),
    },
    {
      type: 'text',
      image: require('../assets/shouldertap2.jpg'),
    },
    {
      type: 'main',
      text: 'Side Plank',
      image: require('../assets/sideplank.jpg'),
    },
    {
      type: 'main',
      text: 'Superman Plank',
      image: require('../assets/supermanplank.jpg'),
    },
    {
      type: 'main',
      text: 'Single Arm Plank',
      image: require('../assets/plankwitharmreach.jpg'),
    },
    {
      type: 'main',
      text: 'Plank With Leg Lift',
      image: require('../assets/plankwithleglift.jpg'),
    },
    {
      type: 'main',
      text: 'Flutter Kick',
      image: require('../assets/flutterKick.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Mountain Climber',
      image: require('../assets/mountainClimber.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'V Up',
      image: require('../assets/v_up.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Knee Tucks',
      image: require('../assets/kneeTucks.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Olbique',
      image: require('../assets/oblique.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Climber Twist',
      image: require('../assets/mountainclimbertwist.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Stickbar Backup',
      image: require('../assets/stickbarbackup.mp4'),
      format: 'video',
    },
  ];
  const handleScroll = e => {
    setScrollY(e.nativeEvent.contentOffset.y);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />
        {/* isi kontent */}
        <View style={styles.contentContainer}>
          <Text style={styles.titleContent}>UPPER BODY</Text>
          <View style={styles.section}>
            <Text style={styles.subTitle}>
              LATIHAN UNTUK ABDOMINALS (PERUT)
            </Text>
            <View style={styles.list}>
              <ListItemsFlexibility items={items} scrollY={scrollY} />
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
