import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ComponentStyles from './ComponentStyles';

const ListItems = ({items}) => {
  let itemNumber = 1;

  return (
    <View>
      {items.map((item, index) => {
        const hasBullet = item.trim().startsWith('\u2022');
        const showNumber = !hasBullet;

        return (
          <View
            key={index}
            style={[styles.listItem, hasBullet && styles.bulletItem]}>
            <Text style={[styles.listText, ComponentStyles.poppinsReguler]}>
              {showNumber ? `${itemNumber++}. ` : ''}
              {item}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default ListItems;

const styles = StyleSheet.create({
  listItem: {
    marginBottom: 6,
    paddingLeft: 10,
  },
  bulletItem: {
    marginLeft: 20,
  },
  listText: {
    fontSize: 16,
    lineHeight: 22,
  },
});
