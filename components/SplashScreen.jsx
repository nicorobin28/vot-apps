import React, {useEffect, useRef} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const SplashScreen = ({onFinish}) => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const letters = 'VOT APPS'.split('');
  const letterOpacities = letters.map(
    () => useRef(new Animated.Value(0)).current,
  );

  useEffect(() => {
    const logoTargetX = letters.length * 24 + 40; // posisi akhir sejajar kiri teks (estimasi)

    // Mulai animasi gerak + rotasi logo
    Animated.parallel([
      Animated.timing(moveAnim, {
        toValue: logoTargetX,
        duration: 2500,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onFinish) onFinish();
    });

    // Animasi huruf muncul satu per satu sesuai timing logo
    letters.forEach((_, index) => {
      setTimeout(() => {
        Animated.timing(letterOpacities[index], {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, index * 250 + 400); // offset awal + delay per huruf
    });
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1080deg'],
  });

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        style={styles.container}
        source={require('../assets/splashScreenBackground.png')}>
        <View style={styles.supportedWrapper}>
          <Image source={require('../assets/logo_unj.png')} />
        </View>
        <View style={styles.centerRow}>
          <View style={styles.textRow}>
            <Animated.View
              style={[
                styles.logoContainer,
                {
                  transform: [{translateX: moveAnim}, {rotate}],
                  position: 'absolute',
                  left: 0,
                },
              ]}>
              <Image
                source={require('../assets/volleyLogo.png')}
                style={styles.logo}
              />
            </Animated.View>

            {/* Spacer untuk memberikan tempat logo agar tidak overlap */}
            <View
              style={{
                width: 100,
                marginRight: -60,
              }}
            />

            {/* Teks */}
            {letters.map((letter, index) => (
              <Animated.Text
                key={index}
                style={[
                  styles.letter,
                  {
                    opacity: letterOpacities[index],
                  },
                ]}>
                {letter}
              </Animated.Text>
            ))}
          </View>
        </View>

        {/* <View style={styles.supportedWrapper}>
          <Text style={styles.supportedText}>Supported By :</Text>
          <Text style={[styles.supportedText, {fontWeight: 'bold'}]}>
            PortgasGroup
          </Text>
        </View> */}
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  centerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: 20,
  },
  logoContainer: {
    width: 100,
    height: 100,
  },
  logo: {
    width: 100,
    height: 100,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  letter: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 2,
  },
  supportedWrapper: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 10,
  },
  supportedText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '300',
  },
});
