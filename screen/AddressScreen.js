/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {UserType} from '../context/UserContext';
import axios from 'axios';
import {BASE_URL} from '../constants';
import {useNavigation} from '@react-navigation/native';

const AddressScreen = () => {
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const {userId, setUserId} = useContext(UserType);
  const navigation = useNavigation();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const token = await AsyncStorage.getItem('authToken');
  //     const decodedToken = jwt_decode(token);
  //     const userId = decodedToken.userId;
  //     setUserId(userId);
  //   };
  //   fetchUser();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const handleAddAddress = async () => {
    const address = {
      houseNo,
      street,
      name,
      landmark,
      mobileNo,
      postalCode,
      city
    };
    console.log('address sending', address);
    try {
      await axios.post(`${BASE_URL}/addresses`, {
        address,
        userId,
      });
      Alert.alert('Successful', 'address added successfully');
      setHouseNo('');
      setName('');
      setStreet('');
      setLandmark('');
      setMobileNo('');
      setCity('')
      setPostalCode('');
      setTimeout(() => {
        navigation.goBack();
      }, 500);
    } catch (error) {
      console.log('unsuccessful adding address frontend', error);
      Alert.alert('Unsuccessful', 'address adding failed');
    }
  };

 
  return (
    <ScrollView>
      <View
        style={{
          height: 40,
          backgroundColor: '#00ced1',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>
          Add a new Address
        </Text>
      </View>
      <View style={{padding: 10}}>
        <TextInput
          placeholder="India"
          placeholderTextColor="black"
          style={{
            padding: 10,
            borderColor: '#d0d0d0',
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            Full name (First & Last name)
          </Text>
          <TextInput
            onChangeText={text => setName(text)}
            value={name}
            placeholderTextColor="black"
            placeholder="enter your name"
            style={{
              padding: 10,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>Mobile number</Text>
          <TextInput
            value={mobileNo}
            onChangeText={text => setMobileNo(text)}
            placeholderTextColor="black"
            placeholder="Mobile No"
            style={{
              padding: 10,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            keyboardType="number-pad"
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            Flat, House No, Building, Company
          </Text>
          <TextInput
            value={houseNo}
            onChangeText={text => setHouseNo(text)}
            style={{
              padding: 10,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            City
          </Text>
          <TextInput
            value={city}
            onChangeText={text => setCity(text)}
            style={{
              padding: 10,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            Area, Street, Sector, Village
          </Text>
          <TextInput
            value={street}
            onChangeText={text => setStreet(text)}
            style={{
              padding: 10,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>Landmark</Text>
          <TextInput
            value={landmark}
            onChangeText={text => setLandmark(text)}
            placeholder="eg: near apollo hospital"
            placeholderTextColor="black"
            style={{
              padding: 10,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>Pin Code</Text>
          <TextInput
            value={postalCode}
            onChangeText={text => setPostalCode(text)}
            style={{
              padding: 10,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            keyboardType="number-pad"
          />
        </View>
        <Pressable
          onPress={handleAddAddress}
          style={{
            backgroundColor: '#ffc72c',
            padding: 19,
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
