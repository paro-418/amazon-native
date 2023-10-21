/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  Pressable,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../constants';
import {UserType} from '../context/UserContext';
import Header from '../components/Header';

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/addresses/${userId}`);
        const {addresses} = res.data;
        // console.log('allAddresses', allAddresses);
        setAddresses(addresses);
      } catch (error) {
        console.log('failed to fetch addresses frontend', error);
      }
    };
    fetchAddresses();
  }, [userId]);
  console.log('userId', userId);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{}}>
      <Header />
      <View style={{padding: 10}}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Your Addresses</Text>
        <Pressable
          onPress={() => navigation.navigate('AddressScreen')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            borderColor: '#d0d0d0',
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingHorizontal: 5,
            paddingVertical: 7,
          }}>
          <Text>Add new Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
        </Pressable>
        <View>
          {addresses.map((item, index) => (
            <Pressable
              key={index}
              style={{
                borderWidth: 1,
                borderColor: '#d0d0d0',
                padding: 10,
                flexDirection: 'column',
                gap: 5,
                marginVertical: 10,
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
                <Text>{item?.name}</Text>
                <MaterialIcons name="location-on" size={15} color="red" />
              </View>
              <Text style={{fontSize: 15, color: '#181818'}}>
                {item?.houseNo}, {item?.landmark}
              </Text>
              <Text style={{fontSize: 15, color: '#181818'}}>
                {item?.street}, {item?.city}, India - {item?.postalCode}
              </Text>
              <Text style={{fontSize: 15, color: '#181818'}}>
                {item?.mobileNo}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 10,
                }}>
                <Pressable
                  style={{
                    backgroundColor: '#f5f5f5',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: '#d0d0d0',
                  }}>
                  <Text style={{textAlign: 'center'}}>Edit</Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: '#f5f5f5',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: '#d0d0d0',
                  }}>
                  <Text style={{textAlign: 'center'}}>Remove</Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: '#f5f5f5',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: '#d0d0d0',
                  }}>
                  <Text style={{textAlign: 'center'}}>Set as Default</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
