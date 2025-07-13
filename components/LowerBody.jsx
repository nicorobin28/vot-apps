import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';

import ListItemsFlexibility from './ListItemsFlexibility';
import Header from './Header';
import SubHeader from './SubHeader';

const LowerBody = ({navigation}) => {
  const [scrollY, setScrollY] = useState(0);
  const ladderDrillData = [
    {
      type: 'main',
      text: 'Box Jumps',
    },
    {
      type: 'text',
      text: 'Melompat ke atas kotak atau platform dengan dua kaki.',
      image: require('../assets/boxjumps.mp4'),
      format: 'video',
    },

    {
      type: 'main',
      text: 'Depth Jumps',
    },
    {
      type: 'text',
      text: 'Melompat dari kotak atau platform tinggi dan langsung melakukan lompatan lagi ke atas setelah mendarat.',
      image: require('../assets/boxjumps2.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Lateral Bounds (Skater Jumps)',
    },
    {
      type: 'text',
      text: 'Melompat dari sisi ke sisi, menyerupai gerakan pemain ski.',
      image: require('../assets/lateralBounds.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Tuck Jumps',
    },
    {
      type: 'text',
      text: 'Melompat tinggi dan menarik lutut ke dada.',
      image: require('../assets/tuckjumps.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Jump Squats',
    },
    {
      type: 'text',
      text: 'Melakukan squat kemudian melompat setinggi mungkin setelah posisi squat.',
      image: require('../assets/jumpSquats.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Kneel Down to Jump Squat',
      image: require('../assets/kneeldownToJumpSquat.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Kneel Down to Jump Tucks',
      image: require('../assets/kneeldownJumpTucks.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Jump With Hurdle',
      image: require('../assets/jumpwithhurdle1.mp4'),
      format: 'video',
      items: [
        {
          type: 'text',
          text: '',
          image: require('../assets/jumpwithhurdle2.mp4'),
          format: 'video',
        },
        {
          type: 'text',
          text: '',
          image: require('../assets/jumpWithHurdle3.mp4'),
          format: 'video',
        },
        {
          type: 'text',
          text: '',
          image: require('../assets/jumpwithhurdle4.mp4'),
          format: 'video',
        },
        {
          type: 'text',
          text: '',
          image: require('../assets/jumpwithhurdle5.mp4'),
          format: 'video',
        },
        {
          type: 'text',
          text: '',
          image: require('../assets/jumpwithhurdle6.mp4'),
          format: 'video',
        },
        {
          type: 'text',
          text: '',
          image: require('../assets/jumpwithhurdle7.mp4'),
          format: 'video',
        },
        {
          type: 'text',
          text: '',
          image: require('../assets/jumpwithhurdle8.mp4'),
          format: 'video',
        },
      ],
    },
    {
      type: 'main',
      text: 'Ankling',
      image: require('../assets/ankling.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'UP KNEE',
      image: require('../assets/upknee.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'IN AND OUT',
      image: require('../assets/inandout.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'IN AND OUT RIGHT SIDE',
      image: require('../assets/inandoutrightside.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'IN AND OUT LEFT SIDE',
      image: require('../assets/inandoutleftside.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Forward Then Backward',
      image: require('../assets/forwardthenbackward.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Karioka',
      image: require('../assets/karioka.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Forward Then Backward Right Side',
      image: require('../assets/forwardthenbackwardrightside.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Forward Then Backward Left Side',
      image: require('../assets/forwardthenbackwardleftside.mp4'),
      format: 'video',
    },
    {
      type: 'main',
      text: 'Front Step',
      image: require('../assets/frontstep.mp4'),
      format: 'video',
    },
    {
      type: 'text',
      text: '',
      items: [
        {
          type: 'text',
          text: 'CONTOH MATERI LATIHAN STRENGTH YANG BISA DIGUNAKAN',
        },
        {
          type: 'subnumber',
          text: 'Kekuatan Kaki & Core',
          items: [
            {
              type: 'bullet',
              text: 'Back squat / Goblet squat – 4 x 8',
            },
            {
              type: 'bullet',
              text: 'Walking lunges – 3 x 12 tiap kaki',
            },
            {
              type: 'bullet',
              text: 'Romanian deadlift – 3 x 10',
            },
            {
              type: 'bullet',
              text: 'Calf raises – 3 x 20',
            },
            {
              type: 'bullet',
              text: 'Plank hold – 3 x 45 detik',
            },
            {
              type: 'bullet',
              text: 'Hanging leg raises – 3 x 12',
            },
          ],
        },
        {
          type: 'subnumber',
          text: 'Kekuatan Tubuh Atas (Upper Body)',
          items: [
            {
              type: 'bullet',
              text: 'Push-up / Bench press – 4 x 10',
            },
            {
              type: 'bullet',
              text: 'Pull-up (atau assisted pull-up) – 3 x semampunya',
            },
            {
              type: 'bullet',
              text: 'Shoulder press (dumbbell/barbell) – 3 x 10',
            },
            {
              type: 'bullet',
              text: 'Lat pulldown / Seated row – 3 x 12',
            },
            {
              type: 'bullet',
              text: 'Triceps dips – 3 x 12',
            },
            {
              type: 'bullet',
              text: 'Russian twist – 3 x 30 detik',
            },
          ],
        },
        {
          type: 'subnumber',
          text: 'Power + Plyometric Strength',
          items: [
            {
              type: 'bullet',
              text: 'Power clean / kettlebell swing – 3 x 8',
            },
            {
              type: 'bullet',
              text: 'Box jump – 4 x 8',
            },
            {
              type: 'bullet',
              text: 'Depth jump – 3 x 6',
            },
            {
              type: 'bullet',
              text: 'Bulgarian split squat – 3 x 10 per kaki',
            },
            {
              type: 'bullet',
              text: 'Med ball slam – 3 x 12',
            },
            {
              type: 'bullet',
              text: 'Side plank – 3 x 30 detik per sisi',
            },
          ],
        },
        {
          type: 'subnumber',
          text: 'Full Body Strength',
          items: [
            {
              type: 'bullet',
              text: 'Deadlift – 4 x 6',
            },
            {
              type: 'bullet',
              text: 'Overhead press – 3 x 8',
            },
            {
              type: 'bullet',
              text: 'Chin-up – 3 x semampunya',
            },
            {
              type: 'bullet',
              text: 'Step-up (dengan beban) – 3 x 10 per kaki',
            },
            {
              type: 'bullet',
              text: 'Cable or band rotation – 3 x 15 per sisi',
            },
            {
              type: 'bullet',
              text: 'Bicycle crunch – 3 x 20',
            },
          ],
        },
        {
          type: 'subnumber',
          text: 'COMBINATION',
          items: [
            {
              type: 'bullet',
              text: 'Battle rope (jika ada) – 3 x 30 detik',
            },
            {
              type: 'bullet',
              text: 'Jump rope – 3 x 1 menit',
            },
            {
              type: 'bullet',
              text: 'V-up – 3 x 15',
            },
            {
              type: 'bullet',
              text: 'Side crunch – 3 x 15 per sisi',
            },
          ],
        },
      ],
    },
  ];

  const handleScroll = e => {
    setScrollY(e.nativeEvent.contentOffset.y);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />
        <View style={styles.contentContainer}>
          <Text style={styles.titleContent}>LOWER BODY</Text>
          <Text style={styles.sub}>
            LATIHAN LOWER BODY BISA DILAKUKAN DENGAN
          </Text>
          <ListItemsFlexibility items={ladderDrillData} scrollY={scrollY} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LowerBody;

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 26,
    height: 26,
    marginRight: 6,
  },
  appName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  descName: {
    color: '#fff',
    fontSize: 3.5,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerWrapper: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    height: 120,
    width: '100%',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  headerImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextSmall: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerTextLarge: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  titleContent: {
    textAlign: 'center',
    color: '#005fee',
    fontWeight: 'bold',
    fontSize: 24,
  },
  section: {
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
  },
  list: {
    paddingRight: 16,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 4,
    flexDirection: 'row',
    gap: 5,
  },
  imageView: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    height: '240',
    borderRadius: 20,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  sub: {
    // padding: 20,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  jumpingJack: {},
});
