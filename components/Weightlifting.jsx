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

const Weightlifting = () => {
  const navigation = useNavigation();

  const upperBodyList = [
    {label: 'LATIHAN FOREARM', path: 'latihanforearm'},
    {label: 'LATIHAN BAHU', path: 'latihanbaru'},
    {label: 'LATIHAN TRICEPS', path: 'latihantriceps'},
    {label: 'LATIHAN BICEPS', path: 'latihanbiceps'},
    {label: 'LATIHAN DADA', path: 'latihandada'},
    {label: 'LATIHAN PUNGGUNG', path: 'latihanpunggung'},
    {label: 'LATIHAN PINGGANG', path: 'latihanpinggang'},
    {label: 'LATIHAN PERUT', path: 'latihanperut'},
  ];

  const lowerBodyList = [
    {label: 'LATIHAN PAHA DEPAN', path: 'latihanpahadepan'},
    {label: 'LATIHAN PAHA BELAKANG', path: 'latihanpahabelakang'},
    {label: 'LATIHAN BETIS', path: 'latihanbetis'},
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <Header title="WEIGHTLIFTING" onBackPress={() => navigation.goBack()} />

        {/* Konten */}
        <View style={styles.contentContainer}>
          <View style={styles.desc}>
            <Text
              style={[
                ComponentStyles.poppinsReguler,
                {textAlign: 'justify', fontSize: 14},
              ]}>
              Weightlifting dirancang untuk melatih otot-otot yang ada di area
              lengan, dada, bahu, punggung, bokong, paha, betis, atau kaki.
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

export default Weightlifting;
