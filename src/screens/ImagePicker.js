import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import RNFS from 'react-native-fs';

const ImagePicker = () => {
  const [imageUri, setImageUri] = useState(null);

  const requestGalleryPermission = async () => {
    let permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    }

    const result = await request(permission);
    return result === 'granted';
  };

  const selectImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert('Permission is required to access the gallery.');
      return;
    }

    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = {uri: response.assets[0].uri};
        setImageUri(source.uri);
      }
    });
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert('Please select an image first');
      return;
    }

    try {
      const base64Image = await RNFS.readFile(imageUri, 'base64');

      const response = await axios.post(
        'https://api.imgbb.com/1/upload',
        {
          key: 'b2bb7508e0af31e1d48a23daa694d7c2',
          image: base64Image,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      Alert.alert('Upload Successful', `Link: ${response.data.data.url}`);
    } catch (error) {
      console.error('Upload Error:', error.response?.data || error.message);
      Alert.alert('Upload Failed', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectImage} style={styles.button}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>

      {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}

      <TouchableOpacity
        onPress={uploadImage}
        style={[styles.button, {marginTop: 20}]}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '40%',
    backgroundColor: '#aeaeff',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
  },
});

export default ImagePicker;
