/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {BASE_URL} from '../constants';
import {UserType} from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const {userId} = useContext(UserType);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {
        backgroundColor: '#00ced1',
      },
      headerLeft: () => (
        <Image
          source={require('../assets/amazon.png')}
          style={{
            height: 100,
            width: 150,
            marginLeft: -20,
          }}
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
          <MaterialIcons name="notifications" size={25} color="#000" />
          <MaterialIcons name="search" size={25} color="#000" />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      console.log('fetching user');
      try {
        const res = await axios.get(`${BASE_URL}/profile/${userId}`);
        // console.log('fetch profile res frontend', res.data);
        setUser(res.data.user);
      } catch (error) {
        console.log('error fetching user frontend', error);
      }
    };
    fetchUser();
  }, []);
  console.log('user profile', user);

  useEffect(() => {
    console.log('fetching orders');
    const fetchOrders = async () => {
      try {
        console.log('sending userId', userId);
        const res = await axios.get(`${BASE_URL}/order/${userId}`);
        console.log('res of all order ', res.data.orders);
        setLoading(false);
        setOrders(res.data.orders);
      } catch (error) {
        console.log('failed to fetch orders frontend', error);
      }
    };
    fetchOrders();
  }, []);

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem('authToken');
    console.log('auth Token Cleared');
    navigation.replace('LoginScreen');
  };
  const handleLogout = () => {
    clearAuthToken();
  };
  return (
    <>
      <StatusBar backgroundColor="#00ced1" />
      <ScrollView style={{paddingHorizontal: 5}}>
        <Text style={{padding: 10, flex: 1, backgroundColor: '#fff'}}>
          Welcome {user?.name}
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
              padding: 10,
              backgroundColor: '#e0e0e0',
              borderRadius: 25,
              flex: 1,
            }}>
            <Text style={{textAlign: 'center'}}>Your Orders</Text>
          </Pressable>
          <Pressable
            style={{
              padding: 10,
              backgroundColor: '#e0e0e0',
              borderRadius: 25,
              flex: 1,
            }}>
            <Text style={{textAlign: 'center'}}>Your Account</Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 10,
          }}>
          <Pressable
            style={{
              padding: 10,
              backgroundColor: '#e0e0e0',
              borderRadius: 25,
              flex: 1,
            }}>
            <Text style={{textAlign: 'center'}}>Buy Again</Text>
          </Pressable>
          <Pressable
            onPress={handleLogout}
            style={{
              padding: 10,
              backgroundColor: '#e0e0e0',
              borderRadius: 25,
              flex: 1,
            }}>
            <Text style={{textAlign: 'center'}}>Logout</Text>
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            orders?.map(order => (
              <Pressable
                style={{
                  marginTop: 20,
                  padding: 15,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#d0d0d0',
                  marginHorizontal: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                key={order._id}>
                {order?.products.slice(0,1)?.map(product => (
                  <View style={{marginVertical: 10}} key={product._id}>
                    <Image
                      source={{uri: product.image}}
                      style={{width: 100, height: 100, resizeMode: 'contain'}}
                    />
                  </View>
                ))}
              </Pressable>
            ))
          )}
        </ScrollView>
      </ScrollView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
