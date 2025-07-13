import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './Header';
import ComponentStyles from './ComponentStyles';

const ServisMenu = () => {
  const navigation = useNavigation();

  const methodList = {
    menu: [
      {label: 'UNDERHAND SERVE', path: 'underhandServePage'},
      {label: 'OVERHAND SERVE', path: 'overHandServe'},
      {label: 'JUMP SERVE FLOATING', path: 'jumpServeFloating'},
      {label: 'JUMP SERVE SPIN', path: 'jumpServeSpin'},
    ],
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {/* Header dengan Background */}
        <Header title="SERVIS" onBackPress={() => navigation.goBack()} />

        {/* Konten */}
        <View style={styles.contentContainer}>
          <Text style={[styles.subTitle, ComponentStyles.poppinsReguler]}>
            PILIH JENIS SERVIS
          </Text>
          {methodList.menu.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => item.path && navigation.navigate(item.path)}>
              <Text style={[styles.buttonText, ComponentStyles.poppinsBold]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    marginTop: -25,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  subTitle: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
    fontSize: 12,
  },
  button: {
    backgroundColor: '#005fee',
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {width: 4, height: 6},
    shadowRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
  },
});

export default ServisMenu;
