import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import SubHeader from './SubHeader';
import ComponentStyles from './ComponentStyles';
import {getDBConnection} from '../connection/Database';

const CustomLatihanPage = ({navigation}) => {
  const route = useRoute();
  const {materialId} = route.params;

  const [material, setMaterial] = useState();

  useEffect(() => {
    const fetchMaterial = async () => {
      const db = await getDBConnection();
      try {
        const res = await db.executeSql(
          `SELECT * FROM materials WHERE id = ?`,
          [materialId],
        );
        if (res[0].rows.length > 0) {
          const data = res[0].rows.item(0);
          setMaterial(data);
        }
      } catch (error) {
        console.error('Error fetching material:', error);
      }
    };
    fetchMaterial();
  }, [materialId]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />
        {/* isi kontent */}
        <View style={styles.contentContainer}>
          <Text style={[styles.titleContent, ComponentStyles.poppinsBold]}>
            {material ? material.title : 'Memuat...'}
          </Text>
          <View style={styles.section}>
            <Text style={[styles.paragraph, ComponentStyles.poppinsReguler]}>
              {material ? material.description : 'Memuat deskripsi...'}
            </Text>
          </View>
        </View>
        {/* end isi kontent */}
      </ScrollView>
    </SafeAreaView>
  );
};

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
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
  },
  list: {
    paddingLeft: 16,
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
});

export default CustomLatihanPage;
