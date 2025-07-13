import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
} from 'react-native';
import ListItems from '../ListItems';
import SubHeader from '../SubHeader';
import ComponentStyles from '../ComponentStyles';

const BkFokusTeknikTanpaBola = ({navigation}) => {
  const sections = [
    {
      title: 'SIKAP AWAL',
      data: [
        'Berdiri ±30-50 cm dari net.',
        'Kaki dibuka selebar bahu, lutut ditekuk, badan sedikit condong kedepan.',
        'Tangan berada di depan dada, telapak tangan menghadap net.',
      ],
    },
    {
      title: 'GERAKAN LOMPAT',
      data: [
        'Dorong tubuh ke atas menggunakan kekuatan otot paha dan betis.',
        'Tangan diluruskan ke atas saat melompat.',
        'Jari-jari terbuka, telapak tangan menghadap ke arah net, agak menunduk ke depan untuk mengarahkan bola kembali ke lapangan lawan.',
      ],
    },
    {
      title: 'PENDARATAN',
      data: [
        'Mendarat dengan kedua kaki, lutut ditekuk untuk mengurangi beban.',
        'Siap kembali ke posisi blocking atau transisi ke pertahanan.',
      ],
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
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />
        <View style={styles.contentContainer}>
          <Text style={styles.titleContent}>BLOCKING</Text>
          <Text style={styles.sub}>FOKUS TEKNIK TANPA BOLA</Text>
          {sections.map(renderSection)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BkFokusTeknikTanpaBola;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  titleContent: {
    ...ComponentStyles.poppinsBold,
    textAlign: 'center',
    color: '#005fee',
    fontSize: 24,
  },
  sub: {
    ...ComponentStyles.poppinsBold,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subTitle: {
    ...ComponentStyles.poppinsBold,
    fontSize: 18,
    marginBottom: 6,
  },
  list: {
    paddingLeft: 16,
  },
});
