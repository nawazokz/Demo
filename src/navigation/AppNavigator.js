import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import UserDetail from '../screens/UserDetail';
import FlatlistDemo from '../screens/FlatlistDemo';
import ImagePicker from '../screens/ImagePicker';
import TopTabDemo from '../screens/TopTabDemo';
import Chat from '../screens/Chat';

const stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name="Home" component={Home} />
        <stack.Screen name="UserDetail" component={UserDetail} />
        <stack.Screen
          name="FlatlistDemo"
          component={FlatlistDemo}
          options={{headerShown: true, title: ''}}
        />
        <stack.Screen
          name="ImagePicker"
          component={ImagePicker}
          options={{headerShown: true, title: ''}}
        />
        <stack.Screen
          name="TopTab"
          component={TopTabDemo}
          options={{headerShown: true, title: ''}}
        />
        <stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: true, title: ''}}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
