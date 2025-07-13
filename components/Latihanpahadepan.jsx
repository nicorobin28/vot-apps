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
import SubHeader from './SubHeader';

const Latihanforearm = ({navigation}) => {
  const [scrollY, setScrollY] = useState(0);

  const items = [
    {
      type: 'main',
      text: 'Half Squat',
      image: require('../assets/halfsquat.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Back Extension',
      image: require('../assets/backExtension.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Dumbbell Leg Extension',
      image: require('../assets/dumbellsquat.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Leg Press',
      image: require('../assets/legPress.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Sumo Squat',
      image: require('../assets/sumosquat.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Bulgarian Split',
      image: require('../assets/bulgarianSplit.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Dumbbell Lunges',
      image: require('../assets/dumbelllunges.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Leg Curl',
      image: require('../assets/legcurl.mp4'),
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
              LATIHAN UNTUK OTOT QUADRICEPS (PAHA DEPAN)
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
