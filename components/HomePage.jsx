import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  FlatList,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-reanimated-carousel';
import ComponentStyles from './ComponentStyles';
import {getDBConnection, getTodaySchedules} from '../connection/Database';

const HomePage = ({navigation}) => {
  const [cards, setCards] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const db = await getDBConnection();
        const todaySchedules = await getTodaySchedules(db);
        const chunked = chunkArray(todaySchedules, 2);
        setCards(chunked);
      };

      loadData();
    }, []),
  );

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const [pagingEnabled, setPaggingEnabled] = useState(true);
  const width = Dimensions.get('window').width;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const duration = 1000;

  useEffect(() => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    }).start();
  }, [currentIndex]);

  const list = [
    {
      id: 1,
      title: 'First Slider',
      image: require('../assets/slider/enduranceBanner.png'),
      route: 'enduranceMenu',
    },
    {
      id: 2,
      title: 'Second Slider',
      image: require('../assets/slider/serviceBanner.png'),
      route: 'servisMenu',
    },
    {
      id: 3,
      title: 'Third Slider',
      image: require('../assets/slider/spikeBanner.png'),
      route: 'spikeMenu',
    },
    {
      id: 4,
      title: 'Fourth Slider',
      image: require('../assets/slider/strengthBanner.png'),
      route: 'strTest',
    },
  ];

  const Arrow = <Icon name="chevron-right" size={20} color="#2563eb" />;
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.headerWrapper}>
          <ImageBackground
            source={require('../assets/headerbg.png')}
            style={styles.headerImage}
            resizeMode="cover">
            <View style={styles.logoWrap}>
              <Image
                style={styles.ballImage}
                source={require('../assets/volleyLogo.png')}
              />
              <View>
                <Text style={styles.headerTextLarge}>VOT APPS</Text>
                <Text style={[styles.headerTextSmall, {textAlign: 'center'}]}>
                  VOLLEYBALL TRAINING APPLICATION
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.containerCarousel}>
          <Carousel
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 40,
            }}
            width={width}
            height={width / 2}
            data={list}
            autoPlay
            scrollAnimationDuration={duration}
            pagingEnabled
            onSnapToItem={index => {
              setCurrentIndex(index);
            }}
            renderItem={({item}) => (
              <View style={styles.CarouselItem}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(item.route)}>
                  <Image style={styles.img} source={item.image} />
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Dots + Progress Bar */}
          <View style={styles.paginationContainer}>
            {list.map((_, index) => (
              <View key={index} style={styles.dotWrapper}>
                {index === currentIndex ? (
                  <Animated.View
                    style={[
                      styles.progressDot,
                      {
                        width: progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%'],
                        }),
                      },
                    ]}
                  />
                ) : (
                  <View style={styles.inactiveDot} />
                )}
              </View>
            ))}
          </View>
        </View>

        <ImageBackground
          source={require('../assets/splashScreenBackground.png')}
          style={styles.cardContainer}>
          <View style={styles.containerJadwal}>
            {/* Header */}
            <View style={styles.headerJadwal}>
              <View style={styles.imageContainerJadwal}>
                <Image
                  source={{
                    uri: 'https://img.icons8.com/ios-filled/50/000000/calendar.png',
                  }}
                  style={styles.iconJadwal}
                />
              </View>
              <Text style={styles.headerTextJadwal}>
                Jadwal Latihan Hari Ini
              </Text>
            </View>

            <View style={styles.contentJadwal}>
              {cards.length === 0 ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 40,
                  }}>
                  <Text
                    style={{fontSize: 16, color: 'gray', fontStyle: 'italic'}}>
                    Anda belum memiliki jadwal latihan
                  </Text>
                </View>
              ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {cards.map((column, index) => (
                    <View
                      key={index}
                      style={{flexDirection: 'column', marginRight: 10}}>
                      {column.map((item, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={styles.cardJadwal}
                          onPress={() =>
                            navigation.navigate('previewSchedulePage', {
                              scheduleId: item.schedule_id,
                              autoSelectToday: true,
                            })
                          }>
                          <Icon name="book" color="white" size={25} />
                          <View style={styles.cardTextContainerJadwal}>
                            <Text style={styles.cardTitleJadwal}>
                              {item.sasaran}
                            </Text>
                            <View>
                              <Text style={styles.cardDateJadwal}>
                                {item.start_date}
                              </Text>
                              <Text style={styles.cardDateJadwal}>
                                {item.end_date}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainerJadwal}>
              <TouchableOpacity
                style={styles.buttonJadwal}
                onPress={() => navigation.navigate('schedulePage')}>
                <Text style={styles.buttonTextJadwal}>Lihat Jadwal Anda</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonJadwal}
                onPress={() => navigation.navigate('createSchedulePage')}>
                <Text style={styles.buttonTextJadwal}>Tambah Jadwal</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('physiqueMenu')}>
            <View style={styles.cardImage}>
              <Image
                style={{
                  resizeMode: 'cover',
                  width: '100%',
                }}
                source={require('../assets/physic.png')}
              />
            </View>
            <View style={styles.cardContent}>
              <View style={styles.rowWrap}>
                <Text style={styles.cardTitle}>Exercise</Text>
                <Text style={styles.cardTitle}>Physical</Text>
              </View>
              <Text style={styles.cardTitle}>
                Melatih Fisik Dengan{'\n'}Alat & Tanpa Alat
              </Text>
              <View style={styles.rowWrap}>
                <Text style={styles.cardTitle}>Lihat Materi</Text>
                {Arrow}
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, {marginTop: 30, marginBottom: 60}]}
            onPress={() => navigation.navigate('technical')}>
            <View style={styles.cardImage}>
              <Image
                style={{
                  resizeMode: 'cover',
                  width: '100%',
                }}
                source={require('../assets/teknik.png')}
              />
            </View>
            <View style={styles.cardContent}>
              <View style={styles.rowWrap}>
                <Text style={styles.cardTitle}>Exercise</Text>
                <Text style={styles.cardTitle}>Technic</Text>
              </View>
              <Text style={styles.cardTitle}>
                Melatih Teknik {'\n'}Olahraga Voli
              </Text>
              <View style={styles.rowWrap}>
                <Text style={styles.cardTitle}>Lihat Materi</Text>
                {Arrow}
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.supportedWrapper}
            onPress={() => navigation.navigate('versionInfoScreen')}>
            <Text style={[styles.supportedText, ComponentStyles.poppinsBold]}>
              Faq
            </Text>
            <Icon name="question-circle" size={20} color="#fff" />
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerWrapper: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    height: 160,
    width: '100%',
  },
  logoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ballImage: {
    width: 64,
    height: 64,
  },
  headerTextSmall: {
    color: '#ffffff',
    fontSize: 12,
    paddingBottom: 10,
    fontFamily: 'Poppins-Bold',
  },
  headerTextLarge: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: 'bold',
    // fontFamily: 'Poppins-Bold',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 30,
    padding: 4,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    gap: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#2563eb',
    fontSize: 10,
    // fontWeight: 'bold',
    flexShrink: 1,
    fontFamily: 'Poppins-Bold',
  },
  cardDescription: {
    color: '#2563eb',
    fontSize: 12,
    marginTop: 4,
  },
  cardImage: {
    backgroundColor: '#D9D9D9',
    width: 140,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    objectFit: 'cover',
  },
  cardContent: {
    flex: 1,
    gap: 16,
    margin: 10,
  },
  rowWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  cardSubText: {
    fontWeight: '300',
    color: '#2563eb',
  },
  CarouselItem: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 20,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 8,
  },
  dotWrapper: {
    width: 30,
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressDot: {
    height: '100%',
    backgroundColor: '#007aff',
  },
  inactiveDot: {
    width: '100%',
    height: '100%',
    backgroundColor: '#aaa',
  },
  containerCarousel: {
    marginVertical: 10,
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  supportedWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  supportedText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '300',
  },
  containerJadwal: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 30,
    padding: 4,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  jadwalLatihan: {
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconJadwal: {
    height: 30,
    width: 30,
    borderRadius: '50%',
    backgroundColor: '#005FEE',
  },
  textJudul: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  contentJadwal: {
    paddingVertical: 10,
  },
  cardJadwal: {
    backgroundColor: '#2563eb',
    width: 300,
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    borderRadius: 10,
    minHeight: 70,
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTextContainerJadwal: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitleJadwal: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  cardDateJadwal: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  containerJadwal: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  headerJadwal: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  imageContainerJadwal: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: '50%',
  },
  iconJadwal: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  headerTextJadwal: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Bold',
  },
  contentJadwal: {
    alignItems: 'center',
    marginBottom: 20,
  },
  infoTextJadwal: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 24,
    fontFamily: 'Poppins-Regular',
  },
  buttonContainerJadwal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  buttonJadwal: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonTextJadwal: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  supportedWrapper: {
    position: 'absolute',
    flexDirection: 'row',
    top: 620,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  supportedText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '300',
  },
});
