import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ListItemsNew from './ListItemsNew';
import ListItems from './ListItems';
import SubHeader from './SubHeader';
import Header from './Header';
import ComponentStyles from './ComponentStyles';

const Speed = ({navigation}) => {
  const ladderDrillData = [
    {
      type: 'main',
      text: 'Sprint jarak pendek',
      image: require('../assets/sprintjarakpendek.jpg'),
      format: 'image',
    },
    {
      type: 'bullet',
      text: 'Dilakukan dengan kecepatan maksimal dengan jarak 10 – 50 m.',
    },
    {
      type: 'bullet',
      text: 'Bisa dilakukan dilandasan yang datar atau menanjak.',
    },
    {
      type: 'bullet',
      text: 'Lakukan repetisi sebanyak 10 x 3 set.',
    },
    {
      type: 'main',
      text: 'Sprint menggunakan parasut/beban/resistance band',
      image: require('../assets/sprintmenggunakanbeban.jpg'),
      format: 'image',
    },
    {
      type: 'bullet',
      text: 'Dilakukan dengan kecepatan maksimal dengan jarak 50 – 100 m.',
    },
    {
      type: 'bullet',
      text: 'Tubuh menggunakan beban dibelakang bisa mengggunakan opsi parasut mini,resistance band, dan beban dibelakang yang diikat dengan tali.Gunakan marker/penanda sebagai alur lari.',
    },
    {
      type: 'bullet',
      text: 'Dilakukan dengan repetisi 10 x 3 set.',
    },
  ];

  const renderSection = ({title, data}) => (
    <View style={styles.section} key={title}>
      <Text style={styles.subTitle}>{title}</Text>
      <View style={styles.list}>
        <ListItems items={data} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {/* Header dengan Background */}
        <Header title="SPEED" onBackPress={() => navigation.goBack()} />

        <View style={styles.contentContainer}>
          <Text style={[styles.sub, ComponentStyles.poppinsBold]}>
            LATIHAN SPEED BISA DILAKUKAN DENGAN
          </Text>

          {/* Render Ladders Drill Section */}
          <View style={styles.section}>
            <View style={styles.list}>
              <ListItemsNew items={ladderDrillData} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Speed;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    marginTop: -25,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    height: 'auto',
  },
  sub: {
    fontSize: 19,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  list: {
    paddingLeft: 16,
  },
});
