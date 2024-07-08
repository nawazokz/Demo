import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          height: 50,
          borderWidth: 1,
          padding: 10,
          backgroundColor: 'white',
          borderRadius: 5,
          borderColor: 'black',
        }}
        onPress={() => navigation.navigate('FlatlistDemo')}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            color: 'black',
          }}>
          Flatlist Demo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 50,
          borderWidth: 1,
          padding: 10,
          backgroundColor: 'white',
          borderRadius: 5,
          borderColor: 'black',
          marginTop: 10,
        }}
        onPress={() => navigation.navigate('UserDetail')}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            color: 'black',
          }}>
          Redux toolkit Demo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 50,
          borderWidth: 1,
          padding: 10,
          backgroundColor: 'white',
          borderRadius: 5,
          borderColor: 'black',
          marginTop: 10,
        }}
        onPress={() => navigation.navigate('ImagePicker')}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            color: 'black',
          }}>
          Image Picker Demo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 50,
          borderWidth: 1,
          padding: 10,
          backgroundColor: 'white',
          borderRadius: 5,
          borderColor: 'black',
          marginTop: 10,
        }}
        onPress={() => navigation.navigate('TopTab')}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            color: 'black',
          }}>
          Top Tab Demo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 50,
          borderWidth: 1,
          padding: 10,
          backgroundColor: 'white',
          borderRadius: 5,
          borderColor: 'black',
          marginTop: 10,
        }}
        onPress={() => navigation.navigate('Chat')}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            color: 'black',
          }}>
          Chat Demo
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
