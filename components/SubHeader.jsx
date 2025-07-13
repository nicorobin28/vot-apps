import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SubHeader = ({onBackPress}) => {
  return (
    <View style={styles.headerWrapper}>
      <ImageBackground
        source={require('../assets/headerbg.png')}
        style={styles.headerImage}
        resizeMode="cover">
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onBackPress}>
            <Icon name="chevron-left" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/volleyLogo.png')}
              style={styles.logo}
            />
            <View>
              <Text style={styles.appName}>VOT APPS</Text>
              <Text style={styles.descName}>
                VOLLEYBALL TRAINING APPLICATION
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SubHeader;

const styles = StyleSheet.create({
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 26,
    height: 26,
    marginRight: 6,
  },
});
