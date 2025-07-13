import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, StyleSheet, Animated, Easing} from 'react-native';
import ComponentStyles from './ComponentStyles';

const AnimatedInput = ({label, value, onChangeText, editable = true}) => {
  const [isFocused, setIsFocused] = useState(false);

  const animatedFocus = useRef(new Animated.Value(value ? 1 : 0)).current;
  const barAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedFocus, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    Animated.timing(barAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelTranslateY = animatedFocus.interpolate({
    inputRange: [0, 1],
    outputRange: [10, -20],
  });

  const labelFontSize = animatedFocus.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 14],
  });

  const labelColor = animatedFocus.interpolate({
    inputRange: [0, 1],
    outputRange: ['#999', '#5264AE'],
  });

  const leftBarWidth = barAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  const rightBarWidth = barAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, ComponentStyles.poppinsReguler]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={editable}
      />
      <View style={styles.bar}>
        <Animated.View
          style={[styles.barSide, {left: 0, width: leftBarWidth}]}
        />
        <Animated.View
          style={[styles.barSide, {right: 0, width: rightBarWidth}]}
        />
      </View>
      <Animated.Text
        style={[
          styles.label,
          ComponentStyles.poppinsReguler,
          {
            transform: [{translateY: labelTranslateY}],
            fontSize: labelFontSize,
            color: labelColor,
          },
        ]}>
        {label}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 10,
    width: '100%',
  },
  input: {
    fontSize: 16,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#515151',
    color: '#000',
  },
  bar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    width: '100%',
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barSide: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: '#5264AE',
  },
  label: {
    position: 'absolute',
    left: 5,
    top: 10,
  },
});

export default AnimatedInput;
