import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import VideoPlayer from 'react-native-video-controls';
import ComponentStyles from './ComponentStyles';

const ListItemsNew = ({items}) => {
  let mainNumber = 1;

  const renderMedia = (media, format) => {
    if (!media) return null;

    if (format === 'video') {
      // media bisa berupa require(...) atau URL string
      const source = typeof media === 'number' ? media : {uri: media};
      return (
        <View style={styles.containerVideo}>
          <VideoPlayer
            source={media}
            style={styles.video}
            tapAnywhereToPause={true}
            controlTimeout={2000}
            disableFullscreen={true}
            disableVolume={true}
            disableBack={true}
            seekColor="#007aff"
            muted={true}
            repeat={true}
            paused={true}
          />
        </View>
      );
    }

    // Jika format adalah image
    if (typeof media === 'number') {
      return <Image source={media} style={styles.image} />;
    }

    return <FastImage source={{uri: media}} style={styles.image} />;
  };

  return (
    <View>
      {items.map((item, index) => {
        if (item.type === 'main') {
          return (
            <View key={index} style={styles.mainItem}>
              <View style={styles.row}>
                <Text style={[styles.mainNumber, ComponentStyles.poppinsBold]}>
                  {mainNumber++}.
                </Text>
                <Text style={[styles.mainText, ComponentStyles.poppinsBold]}>
                  {item.text}
                </Text>
              </View>
              {renderMedia(item.image, item.format)}
            </View>
          );
        }

        if (item.type === 'bullet') {
          return (
            <View key={index} style={styles.bulletItem}>
              <View style={styles.row}>
                <Text style={[styles.bullet, ComponentStyles.poppinsReguler]}>
                  •
                </Text>
                <Text
                  style={[styles.bulletText, ComponentStyles.poppinsReguler]}>
                  {item.text}
                </Text>
              </View>
              {renderMedia(item.image, item.format)}
            </View>
          );
        }

        if (item.type === 'subnumber') {
          return item.items.map((sub, subIndex) => (
            <View key={`${index}-${subIndex}`} style={styles.subItem}>
              <View style={styles.row}>
                <Text
                  style={[styles.subNumber, ComponentStyles.poppinsReguler]}>
                  {subIndex + 1}.
                </Text>
                <Text style={[styles.subText, ComponentStyles.poppinsReguler]}>
                  {sub.text}
                </Text>
              </View>
              {renderMedia(sub.image, sub.format)}
            </View>
          ));
        }

        if (item.type === 'text') {
          return (
            <View key={index} style={styles.textOnlyItem}>
              <Text style={styles.textOnly}>{item.text}</Text>
              {renderMedia(item.image, item.format)}
            </View>
          );
        }

        return null;
      })}
    </View>
  );
};

export default ListItemsNew;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  mainItem: {
    marginBottom: 10,
  },
  mainNumber: {
    marginRight: 4,
  },
  mainText: {
    flex: 1,
  },
  bulletItem: {
    marginLeft: 10,
    marginBottom: 8,
  },
  bullet: {
    marginRight: 6,
  },
  bulletText: {
    flex: 1,
  },
  subItem: {
    marginLeft: 26,
    marginBottom: 6,
  },
  subNumber: {
    width: 24,
  },
  subText: {
    flex: 1,
  },
  textOnlyItem: {
    marginBottom: 10,
    marginLeft: 10,
  },
  textOnly: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 150,
    marginTop: 4,
    resizeMode: 'contain',
  },
  containerVideo: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 20,
  },
  video: {
    height: 300,
    width: '100%',
    backgroundColor: '#eef4ff',
  },
});
