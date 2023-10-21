/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {StyleSheet} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import HomeScreen from '../screen/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProductInfoScreen from '../screen/ProductInfoScreen';
import AddAddressScreen from '../screen/AddAddressScreen';
import AddressScreen from '../screen/AddressScreen';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tabs.Navigator screenOptions={{headerShown: false}}>
      <Tabs.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {color: '#008e97'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialIcons name="home" size={30} color="#008e97" />
            ) : (
              <MaterialIcons name="home" size={30} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="ProfileTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {color: '#008e97'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialIcons name="account-circle" size={30} color="#008e97" />
            ) : (
              <MaterialIcons name="account-circle" size={30} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="CartTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarLabelStyle: {color: '#008e97'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialIcons name="shopping-cart" size={30} color="#008e97" />
            ) : (
              <MaterialIcons name="shopping-cart" size={30} color="black" />
            ),
        }}
      />
    </Tabs.Navigator>
  );
}

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MainScreen" component={BottomTabs} />
        <Stack.Screen name="ProductInfoScreen" component={ProductInfoScreen} />
        <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} />
        <Stack.Screen name="AddressScreen" component={AddressScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
