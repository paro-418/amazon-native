/* eslint-disable prettier/prettier */
import {
  Image,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigation = useNavigation();
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
        <Pressable style={styles.LoginButton}>
          <Text style={styles.LoginButtonText}>Login</Text>
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
