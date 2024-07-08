// TopTabDemo.js
import React from 'react';
import {ScrollView, Text, View, StyleSheet, Dimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const GalleryScreen = () => (
  <View style={styles.tabContainer}>
    <Text>Gallery Screen</Text>
  </View>
);

const CameraScreen = () => (
  <View style={styles.tabContainer}>
    <Text>Camera Screen</Text>
  </View>
);

const TopTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Gallery" component={GalleryScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
    </Tab.Navigator>
  );
};

const TopTabDemo = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.initialContent}>
        <Text style={styles.initialContentText}>
          Initial Content before Tabs
        </Text>
      </View>
      <View style={styles.tabsContainer}>
        <TopTabNavigator />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  initialContent: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  initialContentText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabsContainer: {
    height: Dimensions.get('window').height, // Ensuring tabs take the full remaining height
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopTabDemo;
