import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import ComponentStyles from './ComponentStyles';
import {compatibilityFlags} from 'react-native-screens';

const PassingAtasMenu = () => {
  const navigation = useNavigation();

  const upperBodyList = [
    {label: 'LATIHAN BAHU', path: 'latihanbahu'},
    {label: 'LATIHAN TRICEPS', path: 'latihantricepsonobw'},
    {label: 'LATIHAN DADA', path: 'latihandadaonobw'},
    {label: 'LATIHAN PUNGGUNG', path: 'latihanpunggungonobw'},
    {label: 'LATIHAN PINGGANG', path: 'latihanpinggangonobw'},
    {label: 'LATIHAN PERUT', path: 'latihanperutonobw'},
  ];

  const lowerBodyList = [
    {label: 'LATIHAN PAHA DEPAN', path: 'latihanpahadepanonobw'},
    {label: 'LATIHAN PAHA BELAKANG', path: 'latihanpahabelakangonobw'},
    {label: 'LATIHAN BETIS', path: 'latihanbetisonobw'},
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <Header
          title="ON BODY WEIGHT"
          onBackPress={() => navigation.goBack()}
        />
        {/* Konten */}
        <View style={styles.contentContainer}>
          <View style={styles.desc}>
            <Text
              style={[
                ComponentStyles.poppinsReguler,
                {textAlign: 'justify', fontSize: 16},
              ]}>
              LATIHAN STRENGTH UNTUK PEMULA BISA DILAKUKAN DENGAN BEBAN RINGAN
              TERLEBIH DAHULU DENGAN REPETISI 25 X 4 SET ATAU BISA MENGGUNAKAN
              WAKTU 1 MENIT X 4 SET.
            </Text>
          </View>

          {/* Upper Body */}
          <Text style={[styles.page, ComponentStyles.poppinsBold]}>
            UPPER BODY
          </Text>
          <Text style={[styles.sub, ComponentStyles.poppinsBold]}>
            PILIH LATIHAN
          </Text>
          {upperBodyList.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => item.path && navigation.navigate(item.path)}>
              <Text style={[styles.buttonText, ComponentStyles.poppinsBold]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Lower Body */}
          <Text style={[styles.page, ComponentStyles.poppinsBold]}>
            LOWER BODY
          </Text>
          <Text style={[styles.sub, ComponentStyles.poppinsBold]}>
            PILIH LATIHAN
          </Text>
          {lowerBodyList.map((item, index) => (
            <TouchableOpacity
              key={`lower-${index}`}
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
    fontSize: 20,
  },
  desc: {
    marginBottom: 30,
  },
  page: {
    fontSize: 18,
    color: '#005fee',
    marginTop: 10,
    marginBottom: 4,
    textAlign: 'center',
  },
  sub: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default PassingAtasMenu;
