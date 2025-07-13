import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ComponentStyles from './ComponentStyles';

const Header = ({title, onBackPress}) => {
  return (
    <ImageBackground
      source={require('../assets/headerbg.png')}
      style={styles.header}
      resizeMode="cover">
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBackPress}>
          <Icon name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/volleyLogo.png')}
            style={styles.logo}
          />
          <View style={styles.descContainer}>
            <Text style={styles.appName}>VOT APPS</Text>
            <Text style={styles.descName}>VOLLEYBALL TRAINING APPLICATION</Text>
          </View>
        </View>
      </View>

      {/* Judul */}
      <View style={styles.headerTitleContainer}>
        <Text style={[styles.headerTitle, ComponentStyles.poppinsBold]}>
          {title}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 22,
    height: 22,
    marginRight: 6,
  },
  descContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
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
  headerTitleContainer: {
    alignItems: 'center',
    marginVertical: 70,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
  },
});
