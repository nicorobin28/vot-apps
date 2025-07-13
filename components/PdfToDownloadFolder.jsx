import React, {useState} from 'react';
import {View, Button, Alert, Platform, Image} from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const PdfToDownloadFolder = () => {
  const [hasPermission, setHasPermission] = useState(false);

  const checkPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      setHasPermission(result === RESULTS.GRANTED);
    } else {
      setHasPermission(true); // For older Android or other platforms
    }
  };

  const exportFile = async () => {
    try {
      const localImage = require('../assets/latPower.png');

      const data = 'Your file content here again';
      const filename = 'exported_file.txt';
      const path = `${RNFS.DownloadDirectoryPath}/${filename}`;

      await RNFS.writeFile(path, data, 'utf8');

      // // Share the file
      // await Share.open({
      //   url: `file://${path}`,
      //   type: 'text/plain',
      //   filename: filename,
      // });

      Alert.alert('Success', `File exported successfully : ${path}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to export file');
      console.error(error);
    }
  };

  const generatePDF = async () => {
    try {
      // HTML yang menyisipkan gambar dari android/app/src/main/assets
      const htmlContent = `
      <h1>Hasil Latihan</h1>
      <p>Latihan Power:</p>
      <img src="file:///android_asset/custom/woman.jpeg" width="300" />

      <p>Latihan Lompatan:</p>
      <img src="file:///android_asset/custom/woman.jpeg" width="300" />

      <p>Latihan Smash:</p>
      <img src="file:///android_asset/custom/woman.jpeg" width="300" />
    `;

      try {
        const file = await RNHTMLtoPDF.convert({
          html: htmlContent,
          fileName: 'laporan-latihan',
          directory: 'Documents',
        });

        Alert.alert('Sukses', `PDF disimpan di:\n${file.filePath}`);
        console.log('PDF Path:', file.filePath);
      } catch (error) {
        console.error('Gagal export PDF:', error);
        Alert.alert('Gagal', 'Terjadi kesalahan saat membuat PDF.');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to export file : ${error}`);
      console.error(error);
    }
  };

  return (
    <View style={{margin: 40}}>
      <Button title="Check Permissions" onPress={checkPermissions} />
      <Button title="Export File" onPress={generatePDF} />
    </View>
  );
};

export default PdfToDownloadFolder;
