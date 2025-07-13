import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';
// import ListItemsNew from './ListItemsNew';
import ListItemsFlexibility from './ListItemsFlexibility';
import ListItems from './ListItems';
import Header from './Header';
import ComponentStyles from './ComponentStyles';

const Agility = ({navigation}) => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = e => {
    setScrollY(e.nativeEvent.contentOffset.y);
  };

  const ladderDrillData = [
    {
      type: 'main',
      text: 'Shuttle Run',
      image: require('../assets/shuttlerun.jpg'),
      items: [
        {
          type: 'bullet',
          text: 'Lari dengan jarak 5m daan dilakukan sebanyak 8x',
        },
        {
          type: 'bullet',
          text: 'Lari dengan berbalik arah dan meggunakan kecepatan maksimal',
        },
      ],
    },
    {
      type: 'main',
      text: 'Zig Zag Sprint',
      image: require('../assets/zigzagsprint.png'),
      items: [
        {
          type: 'bullet',
          text: 'Lari cepat berubah arah dengan cara berselang seling',
        },
        {type: 'bullet', text: 'Gunakan marker/penanda sebagai alur lari'},
      ],
    },
    {
      type: 'main',
      text: 'Cone Drill',
      items: [
        {
          type: 'bullet',
          text: 'Letakkan beberapa cone di lapangan dengan bentuk lurus,zigzag,lingkaran, dan segitiga',
        },
        {
          type: 'bullet',
          text: 'Kemudian buatlah alur lari sprint ke depan,mundur,mengelilingi,zigzag,side step,dan cross step',
        },
      ],
    },
    {
      type: 'main',
      text: 'Ladders Drill',
      image: require('../assets/laddersdrill.mp4'),
      format: 'video',

      items: [
        {
          type: 'bullet',
          text: 'Lakukan Gerakan running ABC di dalam kotak” ladders dan dilakukan dengan cepat untuk melatih kelincahan',
        },
        {type: 'bullet', text: 'Gerakan Running ABC'},
        {type: 'bullet', text: 'Gerakan Running ABC yaitu:'},
        {type: 'subnumberWithoutBold', text: 'Angkling'},
        {type: 'subnumberWithoutBold', text: 'High Knee'},
        {type: 'subnumberWithoutBold', text: 'Kicking'},
        {type: 'subnumberWithoutBold', text: 'Butt Kick'},
        {type: 'subnumberWithoutBold', text: 'Touch Banding'},
        {type: 'subnumberWithoutBold', text: 'Hopping'},
        {type: 'subnumberWithoutBold', text: 'Lateral In and Out'},
        {type: 'subnumberWithoutBold', text: 'Icky Shuffle'},
        {type: 'subnumberWithoutBold', text: 'Twist Hop'},
        {type: 'subnumberWithoutBold', text: 'Crossover'},
        {type: 'subnumberWithoutBold', text: 'Scissor Hops'},
      ],
    },
    {
      type: 'main',
      text: 'Font Drill',
      items: [
        {
          type: 'text',
          text: 'Sprint dilakukan dengan membentuk huruf tertentu diantaranya yaitu : L,M.N,V,W',
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Letter L',
          image: require('../assets/letterl.png'),
          items: [
            {
              type: 'bullet',
              text: 'Lakukan dimulai dari titk sampai ke bendera merah',
            },
            {
              type: 'bullet',
              text: 'Lakukan dengan repetisi 30 detik x 5-10 set',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Letter M',
          image: require('../assets/letterm.png'),
          items: [
            {type: 'bullet', text: 'Lari dengan kecepatan maksimal'},
            {
              type: 'bullet',
              text: 'Setelah melakukan side step ke dua atlet harus berbalik badan dan melakukan sprint ke depan',
            },
            {
              type: 'bullet',
              text: 'Lakukan dengan repetisi 30 detik x 5-10 set',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Letter V',
          image: require('../assets/letterv.png'),
          items: [
            {type: 'bullet', text: 'Lakukan dengan kecepatan maksimal'},
            {
              type: 'bullet',
              text: 'Sprint sampai ke titik A kemudian berbalik arah melakukan sprint lagi sampai titik start dan lakukan yang sama ke titik B',
            },
            {
              type: 'bullet',
              text: 'Lakukan dengan repetisi 30 detik x 5-10 set',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Letter N',
          image: require('../assets/lettern.png'),
          items: [
            {type: 'bullet', text: 'Lakukan dengan kecepatan maksimal'},
            {
              type: 'bullet',
              text: 'Sprint dari titik start sampai ke titik A kemudia lari dengan posisi mundur sampai ke titik B dan melakukan sprint sampai ke titik finish',
            },
            {
              type: 'bullet',
              text: 'Lakukan dengan repetisi 30 detik x 5-10 set',
            },
          ],
        },
        {
          type: 'subnumberWithoutBold',
          text: 'Letter Z',
          image: require('../assets/letterz.png'),
          format: 'image',
          items: [
            {type: 'bullet', text: 'Lakukan dengan kecepatan maksimal'},
            {
              type: 'bullet',
              text: 'Sprint dari titik start sampai ke titik A kemudia lari dengan posisi mundur sampai ke titik B dan melakukan sprint sampai ke titik finish',
            },
            {
              type: 'bullet',
              text: 'Lakukan dengan repetisi 30 detik x 5-10 set',
            },
          ],
        },
      ],
    },
    {
      type: 'main',
      text: 'Reaction Drill',
      items: [
        {
          type: 'bullet',
          text: 'Bisa menggunakan media seperti bola,cone,tongkat',
        },
        {
          type: 'bullet',
          text: 'Lempar bola sekitar atlet dengan jarak 1m depab,belakang,kanan,kiri',
        },
        {
          type: 'bullet',
          text: 'Bisa juga menggunakan alat rubber dan diikat ke atlet sebagai penghambat dan tambahan beban untuk daya ledak',
        },
      ],
    },
    {
      type: 'main',
      text: 'Star Sprint',
      image: require('../assets/StarSprint.png'),
      items: [
        {
          type: 'bullet',
          text: 'Lakukan sprint dengan kecepatan maksimal',
        },
        {
          type: 'bullet',
          text: 'Sprint dilakukan terus kearah depan tanpa ada gerakan mundur',
        },
        {
          type: 'bullet',
          text: 'Sprint dimulai dari titik A-H ',
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <Header title="AGILITY" onBackPress={() => navigation.goBack()} />
        <View style={styles.contentContainer}>
          <Text style={styles.sub}>LATIHAN AGILITY BISA DILAKUKAN DENGAN:</Text>
          <ListItemsFlexibility items={ladderDrillData} scrollY={scrollY} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Agility;

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
