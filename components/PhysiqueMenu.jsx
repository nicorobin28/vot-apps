import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import ComponentStyles from './ComponentStyles';

const PhysiqueMenu = () => {
  const navigation = useNavigation();

  const latihanList = [
    {
      label: 'ENDURANCE',
      path: 'enduranceMenu',
      icon: require('../assets/dayatahan.png'),
    },
    {
      label: 'STRENGTH',
      path: 'strTest',
      icon: require('../assets/strenght.png'),
    },
    {label: 'AGILITY', path: 'agility', icon: require('../assets/agility.png')},
    {label: 'SPEED', path: 'speed', icon: require('../assets/speed.png')},
    {label: 'POWER', path: 'power', icon: require('../assets/power.png')},
    {
      label: 'FLEXIBILITY',
      path: 'flexibility',
      icon: require('../assets/flexibility.png'),
    },
    {
      label: 'COORDINATION',
      path: 'coordination',
      icon: require('../assets/coordination.png'),
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <Header title="LATIHAN FISIK" onBackPress={() => navigation.goBack()} />
        <View style={styles.contentContainer}>
          <Text style={[styles.subTitle, ComponentStyles.poppinsBold]}>
            PILIH LATIHAN
          </Text>
          <View style={styles.gridContainer}>
            {latihanList.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() =>
                  item.path
                    ? navigation.navigate(item.path)
                    : alert('Menu belum tersedia.')
                }>
                <Image source={item.icon} style={styles.icon} />
                <Text style={[styles.buttonText, ComponentStyles.poppinsBold]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
    fontSize: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#005fee',
    borderRadius: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 4},
    shadowRadius: 6,
    elevation: 5,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 12,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default PhysiqueMenu;
