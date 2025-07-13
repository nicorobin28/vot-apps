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

const Power = () => {
    const navigation = useNavigation();

    const latihanList = {
    menu: [
      {label: 'UPPER BODY', path: 'upperBody'},
      {label: 'LOWER BODY', path: 'lowerBody'},
      {label: 'FULL BODY', path: 'fullBody'},

    ],
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {/* Header dengan Background */}
        <Header
          title="POWER"
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.contentContainer}>
            <Text style={styles.contentText}>Plyometrics adalah bentuk latihan fisik
yang bertujuan untuk meningkatkan
kekuatan dan kecepatan otot dengan
melibatkan gerakan eksplosif dan cepat.
Latihan ini biasanya melibatkan
peregangan otot yang cepat (fase
eksentrik) diikuti dengan kontraksi kuat
(fase konsentris), seperti pada
lompatan atau loncatan.</Text >
            {latihanList.menu.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => item.path && navigation.navigate(item.path)}>
                <Text style={styles.buttonText}>{item.label}</Text>
              </TouchableOpacity>
                  ))}
        </View>
         <TouchableOpacity style={[styles.card, {marginTop: 30}]} onPress={()=> navigation.navigate('lowerBody')}>
        
                </TouchableOpacity>
         <TouchableOpacity style={[styles.card, {marginTop: 30}]} onPress={()=> navigation.navigate('upperBody')}>
        
                </TouchableOpacity>
         <TouchableOpacity style={[styles.card, {marginTop: 30}]} onPress={()=> navigation.navigate('fullBody')}>
        
                </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
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
    fontWeight: 'bold',
    fontSize: 24,
  },
  contentText:{
    fontSize:18,
    textAlign:'justify',
    paddingBottom:30,
    paddingHorizontal:10,
    paddingTop:10
  }

});


export default Power


