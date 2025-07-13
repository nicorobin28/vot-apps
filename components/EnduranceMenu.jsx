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
import ComponentStyles from './ComponentStyles';
import Header from './Header';

const EnduranceMenu = () => {
  const navigation = useNavigation();

  const latihanList = {
    menu: [
      {label: 'AEROBIK', path: 'aerobik'},
      {label: 'AN AEROBIK', path: 'anAerobik'},
    ],
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {/* Header dengan Background */}
        <Header title="ENDURANCE" onBackPress={() => navigation.goBack()} />
        <View style={styles.contentContainer}>
          <Text style={[styles.contentText, ComponentStyles.poppinsReguler]}>
            Kemampuan tubuh untuk melakukan aktivitas fisik dalam waktu lama
            tanpa mengalami kelelahan yang berlebihan, daya tahan dibagi menjadi
            dua jenis yaitu kardiovaskular (kebugaran jantung dan paru) dan
            muscular endurance (daya tahan otot). Untuk daya tahan
            kardiovaskular dibagi menjadi dua yaitu Aerobic dan Anaerobic yang
            dimana digunakan untuk menambah VO2MAX (volume oksigen maksimal).
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
  contentText: {
    fontSize: 18,
    textAlign: 'justify',
    paddingBottom: 30,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default EnduranceMenu;
