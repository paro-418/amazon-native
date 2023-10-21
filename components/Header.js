/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = () => {
  return (
    <View
      style={{
        backgroundColor: '#00ced1',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Pressable style={styles.SearchBar}>
        <MaterialIcons
          style={{paddingLeft: 6}}
          name="search"
          size={26}
          color="#008e97"
        />
        <TextInput placeholder="Search Amazon.in" />
      </Pressable>
      <MaterialCommunityIcons name="microphone" size={30} color="black" />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  SearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 3,
    height: 38,
    flex: 1,
  },
});
