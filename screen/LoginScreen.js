/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../constants';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    const user = {email, password};
    console.log('sending user credentials for login', email, password);
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, user);
      console.log('login response', res);
      const token = res.data.token;
      AsyncStorage.setItem('authToken', token);
      navigation.replace('MainScreen');
    } catch (error) {
      console.log('frontend login err response', error);
      Alert.alert('Login error', 'Can not login');
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage('authToken');
        if (token) {
          navigation.replace('Main');
        }
      } catch (error) {
        console.log('failed to check login status', error);
      }
    };
    checkLoginStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.MainContainer}>
      <Image
        source={require('../assets/amazon.png')}
        style={{height: 150, width: 200}}
      />

      <KeyboardAvoidingView>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.LoginHeader}>Login In to Your Accounts</Text>
        </View>

        <View style={{marginTop: 50}}>
          <View>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder="enter your email"
              style={styles.InputStyles}
            />
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <View>
            <TextInput
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
              placeholder="enter your Password"
              style={styles.InputStyles}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text>Keep me Logged in</Text>
          <Text style={{color: '#007fff', fontWeight: '500'}}>
            Forgot Password
          </Text>
        </View>
        <View style={{marginTop: 50}} />
        <Pressable onPress={handleLogin} style={styles.LoginButton}>
          <Text style={styles.LoginButtonText}>Login</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('RegisterScreen')}
          style={{marginTop: 20}}>
          <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  InputStyles: {
    backgroundColor: '#d0d0d0',
    paddingVertical: 10,
    fontSize: 16,
    paddingHorizontal: 15,
    color: 'gray',
    width: 300,
    borderRadius: 5,
  },
  LoginHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#041E42',
  },
  LoginButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  LoginButton: {
    width: 200,
    backgroundColor: '#febe18',
    borderRadius: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
    color: 'white',
    fontSize: 16,
  },
});
