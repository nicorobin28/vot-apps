// components/CustomTextEditor.js
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

const CustomTextEditor = forwardRef(({initialValue = ''}, ref) => {
  const [content, setContent] = useState(initialValue);
  const [selection, setSelection] = useState({start: 0, end: 0});
  const [segments, setSegments] = useState([
    {text: '', bold: false, italic: false, underline: false},
  ]);

  useImperativeHandle(ref, () => ({
    getValue: () => segments.map(s => s.text).join(''),
  }));

  const applyFormat = type => {
    const {start, end} = selection;
    if (start === end) return;

    const before = content.slice(0, start);
    const selected = content.slice(start, end);
    const after = content.slice(end);

    // reset content and segments
    const newSegment = {
      text: selected,
      bold: type === 'bold',
      italic: type === 'italic',
      underline: type === 'underline',
    };

    setSegments([
      {text: before, bold: false, italic: false, underline: false},
      newSegment,
      {text: after, bold: false, italic: false, underline: false},
    ]);

    setContent(before + selected + after);
    setSelection({start: end, end: end});
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <FormatButton label="B" onPress={() => applyFormat('bold')} />
        <FormatButton label="I" onPress={() => applyFormat('italic')} />
        <FormatButton label="U" onPress={() => applyFormat('underline')} />
      </View>

      <TextInput
        multiline
        style={styles.input}
        value={content}
        onChangeText={text => {
          setContent(text);
          setSegments([{text, bold: false, italic: false, underline: false}]);
        }}
        onSelectionChange={({nativeEvent: {selection}}) =>
          setSelection(selection)
        }
        placeholder="Tulis sesuatu di sini..."
        textAlignVertical="top"
        selection={selection}
      />

      <Text style={{fontWeight: 'bold', marginTop: 10}}>Preview:</Text>
      <View style={styles.preview}>
        <Text>
          {segments.map((seg, idx) => (
            <Text
              key={idx}
              style={{
                fontWeight: seg.bold ? 'bold' : 'normal',
                fontStyle: seg.italic ? 'italic' : 'normal',
                textDecorationLine: seg.underline ? 'underline' : 'none',
              }}>
              {seg.text}
            </Text>
          ))}
        </Text>
      </View>
    </View>
  );
});

const FormatButton = ({label, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {marginBottom: 16},
  toolbar: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    borderRadius: 4,
  },
  buttonText: {fontSize: 16},
  input: {
    minHeight: 160,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
  },
  preview: {
    minHeight: 100,
    padding: 10,
    backgroundColor: '#f6f6f6',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default CustomTextEditor;
