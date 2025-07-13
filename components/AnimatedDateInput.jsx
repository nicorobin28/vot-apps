import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ComponentStyles from './ComponentStyles';

const AnimatedDateInput = ({label, value, onChange}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

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

  const formatDate = date => {
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.input}
        activeOpacity={0.8}
        onPress={() => {
          setIsFocused(true);
          setShowPicker(true);
        }}>
        <Text
          style={[
            {fontSize: 16, color: value ? '#000' : '#aaa'},
            ComponentStyles.poppinsReguler,
          ]}>
          {value ? formatDate(value) : ' '}
        </Text>
      </TouchableOpacity>

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

      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            setIsFocused(false);
            if (selectedDate) {
              onChange(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
};

export default AnimatedDateInput;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 30,
    width: '100%',
  },
  input: {
    fontSize: 16,
    padding: 10,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#515151',
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
