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
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../constants';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigation = useNavigation();

  const handleRegister = async () => {
    const user = {
      name,
      email,
      password,
    };
    console.log('front end', user);

    // send a post request to backend
    // 192.168.43.208:8000, 10.0.2.2:8000 me emulator se ho rha
    // android me koi se v nhi ho rha
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, user);
      console.log('registering response', res);
      Alert.alert(
        'Registration successful',
        'You have registered successfully',
      );

      setName('');
      setPassword('');
      setEmail('');
      navigation.replace('MainScreen');
    } catch (error) {
      console.log('unsuccessful ', error);
      Alert.alert('Registration error', 'You have not registered. Try later');
    }
  };
  return (
    <View style={styles.MainContainer}>
      <Image
        source={require('../assets/amazon.png')}
        style={{height: 150, width: 200}}
      />

      <KeyboardAvoidingView>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.RegisterHeader}>Register to Your Accounts</Text>
        </View>

        <View style={{marginTop: 50}}>
          <View>
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              placeholder="enter your name"
              style={styles.InputStyles}
            />
          </View>
        </View>
        <View style={{marginTop: 15}}>
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
        <Pressable onPress={handleRegister} style={styles.LoginButton}>
          <Text style={styles.LoginButtonText}>Register</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('LoginScreen')}
          style={{marginTop: 20}}>
          <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

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
  RegisterHeader: {
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
