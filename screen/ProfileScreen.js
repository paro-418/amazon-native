/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {
        backgroundColor: '#00ced1',
      },
      headerLeft: () => (
        <Image
          source={require('../assets/amazon.png')}
          style={{height: 150, width: 200}}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginRight: 12,
          }}>
            
          </View>
      ),
    });
  }, []);
  return (
    <ScrollView>
      <Text>ProfileScreen</Text>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
