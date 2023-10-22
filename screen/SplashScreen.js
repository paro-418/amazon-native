/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SplashScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../assets/amazon.png')}
        style={{
          height: 100,
          width: 150,
          marginLeft: -20,
        }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
