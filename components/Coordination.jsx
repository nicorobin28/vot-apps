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

const Coordination = ({navigation}) => {
  const isiContent = [
    'Ladders drill',
    'Lempar tangkap bola',
    'Passing lempar bola',
    'Passing berjalan 1 tangan',
    'Balance & Catch ball',
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={styles.container}>
        {/* Header dengan Background */}
        <Header title="COORDINATION" onBackPress={() => navigation.goBack()} />

        <View style={styles.contentContainer}>
          <Text style={[styles.Title, ComponentStyles.poppinsReguler]}>
            Kemampuan tubuh untuk mengintegrasikan gerakan berbagai tubuh secara
            efisien, tepat, dan harmonis guna melakukan suatu aktifitas fisik
            dengan efektif.
          </Text>
          <Text style={styles.sub}>MATERI LATIHAN MELIPUTI:</Text>

          {/* Render Ladders Drill Section */}
          <View style={styles.section}>
            <View style={styles.list}>
              <ListItems items={isiContent} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Coordination;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  Title: {
    fontSize: 17,
    textAlign: 'justify',
    paddingBottom: 30,
    paddingHorizontal: 10,
    paddingTop: 10,
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
    height: 580,
  },
  sub: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 11,
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
