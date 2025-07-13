import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import ComponentStyles from './ComponentStyles';
import LazyVideoPlayer from './LazyVideoPlayer';

const ListItemsFlexibility = ({items, level = 0, scrollY}) => {
  let mainNumber = 1;
  let subNumberCount = 1;

  const renderMedia = (media, format) => {
    if (!media) return null;

    // Jika media array (beberapa gambar/video)
    if (Array.isArray(media)) {
      return (
        <View style={styles.gridContainer}>
          {media.map((item, index) => {
            const source =
              typeof item.source === 'number'
                ? item.source
                : {uri: item.source};

            if (item.format === 'video') {
              return (
                <View key={index} style={styles.gridItemVideo}>
                  <LazyVideoPlayer source={source} scrollY={scrollY} />
                </View>
              );
            }

            return (
              <Image
                key={index}
                source={source}
                style={styles.gridImage}
                resizeMode="cover"
              />
            );
          })}
        </View>
      );
    }

    // Jika hanya satu media
    if (format === 'video') {
      const source = typeof media === 'number' ? media : {uri: media};
      return <LazyVideoPlayer source={source} scrollY={scrollY} />;
    }

    const imgSource = typeof media === 'number' ? media : {uri: media};
    return <Image style={styles.image} source={imgSource} />;
  };

  return (
    <View>
      {items.map((item, index) => {
        const nestedItems = item.items ? (
          <ListItemsFlexibility
            items={item.items}
            level={level + 1}
            scrollY={scrollY}
          />
        ) : null;

        if (item.type === 'main') {
          const showNumber = item.useNumber !== false;
          return (
            <View key={index} style={[styles.mainItem, getIndentation(level)]}>
              <View style={styles.row}>
                {showNumber && (
                  <Text
                    style={[styles.mainNumber, ComponentStyles.poppinsBold]}>
                    {mainNumber++}.
                  </Text>
                )}
                <Text style={[styles.mainText, ComponentStyles.poppinsBold]}>
                  {item.text}
                </Text>
              </View>
              {renderMedia(item.media || item.image, item.format)}
              {nestedItems}
            </View>
          );
        }

        if (item.type === 'subnumber') {
          return (
            <View key={index} style={[styles.subItem, getIndentation(level)]}>
              <View style={styles.row}>
                <Text style={[styles.subNumber, ComponentStyles.poppinsBold]}>
                  {subNumberCount++}.
                </Text>
                <Text style={[styles.subText, ComponentStyles.poppinsBold]}>
                  {item.text}
                </Text>
              </View>
              {renderMedia(item.media || item.image, item.format)}
              {nestedItems}
            </View>
          );
        }

        if (item.type === 'subnumberWithoutBold') {
          return (
            <View key={index} style={[styles.subItem, getIndentation(level)]}>
              <View style={styles.row}>
                <Text style={styles.subNumber}>{subNumberCount++}.</Text>
                <Text style={[styles.subText, ComponentStyles.poppinsReguler]}>
                  {item.text}
                </Text>
              </View>
              {renderMedia(item.media || item.image, item.format)}
              {nestedItems}
            </View>
          );
        }

        if (item.type === 'bullet') {
          return (
            <View
              key={index}
              style={[styles.bulletItem, getIndentation(level)]}>
              <View style={styles.row}>
                <Text style={[styles.bullet, ComponentStyles.poppinsReguler]}>
                  •
                </Text>
                <Text
                  style={[styles.bulletText, ComponentStyles.poppinsReguler]}>
                  {item.text}
                </Text>
              </View>
              {renderMedia(item.media || item.image, item.format)}
              {nestedItems}
            </View>
          );
        }

        if (item.type === 'text') {
          return (
            <View
              key={index}
              style={[styles.textOnlyItem, getIndentation(level)]}>
              <Text style={[styles.textOnly, ComponentStyles.poppinsReguler]}>
                {item.text}
              </Text>
              {renderMedia(item.media || item.image, item.format)}
              {nestedItems}
            </View>
          );
        }

        return null;
      })}
    </View>
  );
};

export default ListItemsFlexibility;

const getIndentation = level => ({
  marginLeft: level * 16,
});

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
    marginBottom: 8,
  },
  bullet: {
    marginRight: 6,
  },
  bulletText: {
    flex: 1,
  },
  subItem: {
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
  },
  textOnly: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 450,
    marginTop: 4,
    resizeMode: 'contain',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 8,
  },
  gridImage: {
    width: '48%',
    height: 220,
    borderRadius: 15,
    marginBottom: 10,
  },
  gridItemVideo: {
    width: '48%',
    height: 180,
    marginBottom: 10,
    backgroundColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
