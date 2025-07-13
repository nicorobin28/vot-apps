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
import Header from './Header';
import ComponentStyles from './ComponentStyles';

const TechnicMenu = () => {
  const navigation = useNavigation();

  const latihanList = {
    menu: [
      {label: 'SERVIS', path: 'servisMenu'},
      {label: 'PASSING BAWAH', path: 'passingBawahMenu'},
      {label: 'PASSING ATAS', path: 'passingAtasMenu'},
      {label: 'BLOCKING', path: 'blockingMenu'},
      {label: 'SPIKE', path: 'spikeMenu'},
    ],
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {/* Header dengan Background */}
        <Header
          title="LATIHAN TEKNIK"
          onBackPress={() => navigation.goBack()}
        />
        {/* Konten */}
        <View style={styles.contentContainer}>
          <Text style={[styles.subTitle, ComponentStyles.poppinsReguler]}>
            PILIH LATIHAN
          </Text>
          {latihanList.menu.map((item, index) => (
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
    elevation: 6, // for shadow on Android
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

export default TechnicMenu;
