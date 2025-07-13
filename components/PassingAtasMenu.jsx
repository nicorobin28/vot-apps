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

const PassingAtasMenu = () => {
  const navigation = useNavigation();

  const methodList = {
    menu: [
      {label: 'FOKUS TEKNIK', path: 'paTanpaBola'},
      {label: 'LATIHAN TANPA BOLA', path: 'paTanpaBolaP'},
      {label: 'LATIHAN DENGAN BOLA', path: 'paDenganBola'},
    ],
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {/* Header dengan Background */}
        <Header title="PASING ATAS" onBackPress={() => navigation.goBack()} />

        {/* Konten */}
        <View style={styles.contentContainer}>
          <View style={styles.desc}>
            <Text style={styles.sub}>PENJELASAN TEKNIK</Text>
            <Text style={styles.description}>
              Passing atas (set up) adalah teknik mengoper bola menggunakan
              ujung jari-jari tangan dengan gerakan dorongan ke atas, biasanya
              untuk mengatur serangan (set) atau menerima servis tinggi.
            </Text>
          </View>

          {methodList.menu.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => item.path && navigation.navigate(item.path)}>
              <Text style={styles.buttonText}>{item.label}</Text>
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
    ...ComponentStyles.poppinsBold,
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
  },
  sub: {
    ...ComponentStyles.poppinsBold,
  },
  desc: {
    marginBottom: 70,
  },
  description: {
    ...ComponentStyles.poppinsReguler,
    textAlign: 'justify',
    fontSize: 16,
  },
});

export default PassingAtasMenu;
