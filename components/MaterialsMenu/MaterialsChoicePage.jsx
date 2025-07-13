import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';

import SubHeader from '../SubHeader';
import ComponentStyles from '../ComponentStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRoute, useNavigation} from '@react-navigation/native';
import {getDBConnection} from '../../connection/Database';
import {showMessage} from 'react-native-flash-message';

const MaterialsChoicePage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {materialId, session_id} = route.params;

  const [materialTree, setMaterialTree] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);
  const [materialTitle, setMaterialTitle] = useState('');
  const presetOptions = [5, 10, 15, 20];
  const [inputDetails, setInputDetails] = useState({});
  const [customMode, setCustomMode] = useState({});
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const isLeafNode = item =>
    item.content && (!item.children || item.children.length === 0);

  const toggleItem = id => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const toggleExpand = id => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const fetchMaterialParts = async () => {
    const db = await getDBConnection();
    const res = await db.executeSql(
      'SELECT * FROM material_parts WHERE material_id = ?',
      [materialId],
    );
    const parts = res[0].rows.raw();
    const map = {};
    const roots = [];

    parts.forEach(p => {
      p.children = [];
      map[p.id] = p;
    });

    parts.forEach(p => {
      if (p.parent_id) {
        map[p.parent_id]?.children.push(p);
      } else {
        roots.push(p);
      }
    });

    setMaterialTree(roots);
  };

  const fetchMaterialTitle = async () => {
    const db = await getDBConnection();
    const res = await db.executeSql(
      'SELECT title FROM materials WHERE id = ?',
      [materialId],
    );

    if (res[0].rows.length > 0) {
      const material = res[0].rows.item(0);
      setMaterialTitle(material.title);
    }
  };

  const saveSelectedParts = async () => {
    if (selectedItems.length === 0) {
      showMessage({message: 'Pilih setidaknya 1 submateri.', type: 'warning'});
      return;
    }

    const db = await getDBConnection();
    const now = new Date().toISOString();

    try {
      for (const partId of selectedItems) {
        const res = await db.executeSql(
          `SELECT mp.title, mp.material_id, mp.format_type FROM material_parts mp WHERE mp.id = ?`,
          [partId],
        );

        if (res[0].rows.length > 0) {
          const part = res[0].rows.item(0);
          const detail = inputDetails[partId] || {};

          // Validasi input per format_type
          if (part.format_type === 'repetition-set') {
            if (
              detail.repetitions == null ||
              detail.sets == null ||
              isNaN(detail.repetitions) ||
              isNaN(detail.sets)
            ) {
              showMessage({
                message: `Isi Repetisi dan Set untuk "${part.title}"`,
                type: 'danger',
              });
              return;
            }
          } else if (part.format_type === 'time-distance') {
            if (
              detail.duration == null ||
              detail.distance == null ||
              isNaN(detail.duration) ||
              isNaN(detail.distance)
            ) {
              showMessage({
                message: `Isi Waktu dan Jarak untuk "${part.title}"`,
                type: 'danger',
              });
              return;
            }
          } else if (part.format_type === 'lap-set') {
            if (
              detail.laps == null ||
              detail.sets == null ||
              isNaN(detail.laps) ||
              isNaN(detail.sets)
            ) {
              showMessage({
                message: `Isi Lap dan Set untuk "${part.title}"`,
                type: 'danger',
              });
              return;
            }
          } else if (part.format_type === 'lap-time') {
            if (
              detail.laps == null ||
              detail.duration == null ||
              isNaN(detail.laps) ||
              isNaN(detail.duration)
            ) {
              showMessage({
                message: `Isi Lap dan waktu untuk "${part.title}"`,
                type: 'danger',
              });
              return;
            }
          }

          const fields = {
            repetitions: null,
            sets: null,
            notes: null,
            distance: null,
            duration: null,
            laps: null,
          };

          if (part.format_type === 'repetition-set') {
            fields.repetitions = detail.repetitions;
            fields.sets = detail.sets;
            fields.notes = detail.notes;
          } else if (part.format_type === 'time-distance') {
            fields.duration = detail.duration;
            fields.distance = detail.distance;
            fields.notes = detail.notes;
          } else if (part.format_type === 'lap-set') {
            fields.laps = detail.laps;
            fields.sets = detail.sets;
            fields.notes = detail.notes;
          } else if (part.format_type === 'lap-time') {
            fields.laps = detail.laps;
            fields.duration = detail.duration;
            fields.notes = detail.notes;
          }

          console.log(fields.repetitions);

          await db.executeSql(
            `INSERT INTO training_logs (session_id, title, material_id, material_part_id, format_type, repetitions, sets, laps, duration_minutes, distance_km, notes, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              session_id,
              part.title,
              part.material_id,
              partId,
              part.format_type,
              fields.repetitions,
              fields.sets,
              fields.laps,
              fields.duration,
              fields.distance,
              fields.notes,
              now,
            ],
          );
        }
      }

      showMessage({message: 'Materi berhasil disimpan.', type: 'success'});
      navigation.goBack();
    } catch (error) {
      console.error('Error saving parts:', error);
      showMessage({message: 'Gagal menyimpan materi.', type: 'danger'});
    }
  };

  const flattenTree = node => {
    let result = [node];
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        result = result.concat(flattenTree(child));
      });
    }
    return result;
  };

  const renderPartsTree = (items, level = 0) =>
    items.map(item => {
      const isSelected = selectedItems.includes(item.id);
      const isExpanded = expandedItems.includes(item.id);
      const hasChildren = item.children && item.children.length > 0;
      const canSelect = isLeafNode(item);

      return (
        <View key={item.id} style={{marginLeft: level * 16, marginBottom: 10}}>
          <TouchableOpacity
            onPress={() => {
              if (canSelect) {
                toggleItem(item.id);
              } else if (hasChildren) {
                toggleExpand(item.id);
              }
            }}
            style={[styles.partCard, isSelected && styles.selectedPartCard]}
            disabled={!canSelect && !hasChildren}>
            <Text
              style={[styles.partText, isSelected && styles.partTextSelected]}>
              {item.title}
            </Text>
            {hasChildren && (
              <Icon
                name={isExpanded ? 'minus' : 'plus'}
                color={isSelected ? '#fff' : '#0064D7'}
                size={16}
              />
            )}
          </TouchableOpacity>

          {isExpanded &&
            hasChildren &&
            renderPartsTree(item.children, level + 1)}
        </View>
      );
    });

  useEffect(() => {
    fetchMaterialParts();
    fetchMaterialTitle();
  }, [materialId]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SubHeader onBackPress={() => navigation.goBack()} />
        <View style={styles.contentContainer}>
          <Text style={styles.titleContent}>{materialTitle}</Text>
          <Text style={styles.sub}>
            {' '}
            {materialTitle ? `PILIH LATIHAN ${materialTitle}` : 'Memuat...'}
          </Text>
        </View>

        <View style={{paddingBottom: 100, padding: 20}}>
          {materialTree.length === 0 ? (
            <Text style={styles.empty}>Tidak ada submateri ditemukan.</Text>
          ) : (
            renderPartsTree(materialTree)
          )}

          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveSelectedParts}>
            <Text style={styles.saveText}>Simpan Pilihan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.basketContainer}>
        <TouchableOpacity
          style={styles.basketMaterial}
          onPress={() => {
            if (selectedItems.length > 0) {
              setShowPreviewModal(true);
            }
          }}>
          {selectedItems.length === 0 ? (
            <Icon name="bookmark" size={35} color={'#fff'} />
          ) : (
            <Text style={styles.basketText}>{selectedItems.length}</Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        visible={showPreviewModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPreviewModal(false)}>
        <View style={styles.fullscreenModal}>
          <ScrollView contentContainerStyle={styles.modalScrollContent}>
            <Text style={styles.modalTitle}>Materi Terpilih</Text>

            {selectedItems.length === 0 ? (
              <Text style={styles.empty}>Tidak ada materi dipilih.</Text>
            ) : (
              selectedItems.map(id => {
                const input = inputDetails[id] || {};
                const custom = customMode[id] || {};
                const part = materialTree
                  .flatMap(flattenTree)
                  .find(p => p.id === id);
                const format = part?.format_type;

                const formatFields = {
                  'repetition-set': {
                    label1: 'Repetisi',
                    label2: 'Set',
                    field1: 'repetitions',
                    field2: 'sets',
                    preset1: [8, 12, 20],
                    preset2: [3, 4, 5],
                  },
                  'time-distance': {
                    label1: 'Waktu (menit)',
                    label2: 'Jarak (km)',
                    field1: 'duration',
                    field2: 'distance',
                    preset1: [30, 45, 60],
                    preset2: [5, 7, 10],
                  },
                  'lap-set': {
                    label1: 'Lap',
                    label2: 'Set',
                    field1: 'laps',
                    field2: 'sets',
                    preset1: [5, 7, 10],
                    preset2: [2, 3, 4],
                  },
                  'lap-time': {
                    label1: 'Lap',
                    label2: 'Waktu (menit)',
                    field1: 'laps',
                    field2: 'duration',
                    preset1: [5, 7, 10],
                    preset2: [30, 45, 60],
                  },
                };

                const config = formatFields[format] || {};

                return (
                  <View key={id} style={styles.previewCard}>
                    <Text style={styles.modalItem}>{part?.title}</Text>

                    {/* Field 1 */}
                    <Text style={{marginTop: 8}}>{config.label1}</Text>
                    {custom[config.field1] ? (
                      <>
                        <TextInput
                          placeholder={`Input ${config.label1}`}
                          keyboardType="numeric"
                          value={input[config.field1]?.toString() || ''}
                          onChangeText={val =>
                            setInputDetails(prev => ({
                              ...prev,
                              [id]: {
                                ...prev[id],
                                [config.field1]: parseInt(val) || 0,
                              },
                            }))
                          }
                          style={styles.inputField}
                        />
                        <TouchableOpacity
                          onPress={() =>
                            setCustomMode(prev => ({
                              ...prev,
                              [id]: {
                                ...(prev[id] || {}),
                                [config.field1]: false,
                              },
                            }))
                          }>
                          <Text style={{color: 'blue'}}>Gunakan Pilihan</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <View style={styles.optionList}>
                          {config.preset1?.map(opt => (
                            <TouchableOpacity
                              key={opt}
                              style={[
                                styles.optionButton,
                                input[config.field1] === opt &&
                                  styles.optionSelected,
                              ]}
                              onPress={() =>
                                setInputDetails(prev => ({
                                  ...prev,
                                  [id]: {...prev[id], [config.field1]: opt},
                                }))
                              }>
                              <Text style={{color: '#fff'}}>{opt}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            setCustomMode(prev => ({
                              ...prev,
                              [id]: {
                                ...(prev[id] || {}),
                                [config.field1]: true,
                              },
                            }))
                          }>
                          <Text style={{color: 'blue'}}>Input Manual</Text>
                        </TouchableOpacity>
                      </>
                    )}

                    {/* Field 2 */}
                    <Text style={{marginTop: 8}}>{config.label2}</Text>
                    {custom[config.field2] ? (
                      <>
                        <TextInput
                          placeholder={`Input ${config.label2}`}
                          keyboardType="numeric"
                          value={input[config.field2]?.toString() || ''}
                          onChangeText={val =>
                            setInputDetails(prev => ({
                              ...prev,
                              [id]: {
                                ...prev[id],
                                [config.field2]: parseInt(val) || 0,
                              },
                            }))
                          }
                          style={styles.inputField}
                        />
                        <TouchableOpacity
                          onPress={() =>
                            setCustomMode(prev => ({
                              ...prev,
                              [id]: {
                                ...(prev[id] || {}),
                                [config.field2]: false,
                              },
                            }))
                          }>
                          <Text style={{color: 'blue'}}>Gunakan Pilihan</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        <View style={styles.optionList}>
                          {config.preset2?.map(opt => (
                            <TouchableOpacity
                              key={opt}
                              style={[
                                styles.optionButton,
                                input[config.field2] === opt &&
                                  styles.optionSelected,
                              ]}
                              onPress={() =>
                                setInputDetails(prev => ({
                                  ...prev,
                                  [id]: {...prev[id], [config.field2]: opt},
                                }))
                              }>
                              <Text style={{color: '#fff'}}>{opt}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            setCustomMode(prev => ({
                              ...prev,
                              [id]: {
                                ...(prev[id] || {}),
                                [config.field2]: true,
                              },
                            }))
                          }>
                          <Text style={{color: 'blue'}}>Input Manual</Text>
                        </TouchableOpacity>
                      </>
                    )}

                    {/* Notes */}
                    <Text style={{marginTop: 8}}>Catatan</Text>
                    <TextInput
                      placeholder="Catatan (opsional)"
                      value={input.notes || ''}
                      onChangeText={val =>
                        setInputDetails(prev => ({
                          ...prev,
                          [id]: {
                            ...prev[id],
                            notes: val, // simpan mentah dulu (tetap \n untuk preview)
                          },
                        }))
                      }
                      multiline={true}
                      numberOfLines={4}
                      textAlignVertical="top"
                      style={[styles.inputField, {height: 100}]}
                    />
                  </View>
                );
              })
            )}

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowPreviewModal(false)}>
              <Text style={styles.modalCloseText}>Tutup</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MaterialsChoicePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  titleContent: {
    textAlign: 'center',
    color: '#005fee',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 16,
  },
  sub: {
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  mainContainer: {
    alignItems: 'center',
  },
  title: {
    paddingVertical: 24,
    padding: 20,
    width: 350,
    margin: 10,
    borderRadius: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...ComponentStyles.poppinsBold,
  },

  basketContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 100,
  },
  basketMaterial: {
    backgroundColor: '#005fee',
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
    width: 60,
    borderRadius: 18,
  },
  textSelected: {
    color: '#fff',
    ...ComponentStyles.poppinsBold,
  },
  text: {
    color: '#0064D7',
    ...ComponentStyles.poppinsBold,
  },
  partCard: {
    backgroundColor: '#CDE1FF',
    marginVertical: 5,
    borderRadius: 30,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedPartCard: {
    backgroundColor: '#0064D7',
  },
  partText: {
    fontSize: 16,
    color: '#0064D7',
    ...ComponentStyles.poppinsBold,
  },
  partTextSelected: {
    color: '#fff',
    ...ComponentStyles.poppinsBold,
  },
  saveButton: {
    backgroundColor: '#0064D7',
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    borderRadius: 30,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  empty: {
    fontSize: 16,
    color: 'gray',
    fontStyle: 'italic',
  },
  basketText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#005fee',
    alignItems: 'center',
    ...ComponentStyles.poppinsBold,
  },

  modalItem: {
    fontSize: 16,
    marginVertical: 2,
    color: '#0064D7',
    ...ComponentStyles.poppinsBold,
  },

  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#005fee',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 6,
  },

  modalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    backgroundColor: '#fff',
    marginTop: 4,
    marginBottom: 10,
  },
  optionList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
    marginBottom: 6,
  },
  optionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    marginBottom: 6,
  },
  fullscreenModal: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  modalScrollContent: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '85%',
  },
  optionList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    marginBottom: 6,
  },
  optionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#0064D7',
    backgroundColor: '#0064D7',
    marginRight: 8,
    marginBottom: 6,
  },
  optionSelected: {
    backgroundColor: '#16C982',
    borderColor: '#009A40',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    backgroundColor: '#fff',
    marginTop: 4,
    marginBottom: 10,
  },
  previewCard: {
    backgroundColor: '#CDE1FF',
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
  },
});
