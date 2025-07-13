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
      {label: 'WEIGHTLIFTING', path: 'weightlifting'},
      {label: 'ON BODY WEIGHT', path: 'onbodyweight'},
      {label: 'TABATA', path: 'tabata'},
    ],
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {/* Header dengan Background */}
        <Header title="STRENGTH" onBackPress={() => navigation.goBack()} />

        {/* Konten */}
        <View style={styles.contentContainer}>
          <View style={styles.desc}>
            <Text
              style={[
                ComponentStyles.poppinsReguler,
                {textAlign: 'justify', marginVertical: 10},
              ]}>
              Latihan strength atau latihan kekuatan adalah jenis latihan fisik
              yang bertujuan untuk meningkatkan kemampuan otot dalam
              menghasilkan tenaga terhadap suatu beban. Latihan ini biasanya
              melibatkan resistensi (perlawanan), baik dari beban eksternal
              seperti barbel, dumbel, resistance band, maupun beban tubuh
              sendiri (seperti push-up atau pull-up)
            </Text>

            <Text
              style={[ComponentStyles.poppinsReguler, {textAlign: 'justify'}]}>
              LATIHAN STRENGTH UNTUK UMUR U 10 - 15 BISA DILAKUKAN DENGAN BEBAN
              RINGAN TERLEBIH DAHULU DENGAN REPETISI 8 - 12 X 3 - 4 SET, DAN
              UNTUK UMUR U 16 - 18 HARUS MENGGUNAKAN TES 1 RM
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
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  sub: {
    fontWeight: 'bold',
  },
  desc: {
    marginBottom: 70,
  },
});

export default PassingAtasMenu;
