/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../redux/CartReducer';
import {useNavigation} from '@react-navigation/native';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cart = useSelector(state => state.cart.cart);
  const total = cart
    ?.map(item => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  console.log('cart screen', cart);
  console.log('total', total);

  const increaseQuantity = item => {
    dispatch(incrementQuantity(item));
  };
  const decreaseQuantity = item => {
    dispatch(decrementQuantity(item));
  };
  const deleteItem = item => {
    dispatch(removeFromCart(item));
  };
  return (
    <ScrollView style={{flex: 1, borderColor: '#fff'}}>
      <Header />
      <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: '400'}}>Subtotal: </Text>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{total}</Text>
      </View>
      <Text style={{marginHorizontal: 10}}>EMI details Available</Text>
      <Pressable
        onPress={() => navigation.navigate('ConfirmationScreen')}
        style={{
          backgroundColor: '#ffc72c',
          padding: 10,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginTop: 10,
        }}>
        <Text>Proceed to Buy ({cart?.length}) items</Text>
      </Pressable>
      <Text
        style={{
          height: 1,
          borderColor: '#d0d0d0',
          borderWidth: 1,
          marginTop: 16,
        }}
      />
      <View style={{marginHorizontal: 10}}>
        {cart.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: 'white',
              marginVertical: 10,
              borderBottomColor: '#f0f0f0',
              borderWidth: 2,
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
            }}>
            <Pressable
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                gap: 50,
              }}>
              <View>
                <Image
                  source={{uri: item.image}}
                  style={{width: 140, height: 140, resizeMode: 'contain'}}
                />
              </View>
              <View style={{marginTop: 10}}>
                <Text style={{width: 150, marginTop: 5}} numberOfLines={3}>
                  {item?.title}
                </Text>
                <Text style={{fontSize: 20, marginTop: 5, fontWeight: 'bold'}}>
                  {item?.price}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 5,
                    fontWeight: 'bold',
                    color: 'green',
                  }}>
                  In Stock
                </Text>
              </View>
            </Pressable>
            <Pressable
              style={{
                marginTop: 10,
                marginBottom: 10,
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 7,
                }}>
                {item?.quantity > 1 ? (
                  <Pressable
                    onPress={() => decreaseQuantity(item)}
                    style={{
                      backgroundColor: '#d8d8d8',
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}>
                    <MaterialCommunityIcons
                      name="minus"
                      size={30}
                      color="black"
                    />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => deleteItem(item)}
                    style={{
                      backgroundColor: '#d8d8d8',
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}>
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={30}
                      color="black"
                    />
                  </Pressable>
                )}
                <Pressable
                  style={{
                    backgroundColor: '#fff',
                    paddingHorizontal: 18,
                    paddingVertical: 6,
                  }}>
                  <Text>{item?.quantity}</Text>
                </Pressable>
                <Pressable
                  onPress={() => increaseQuantity(item)}
                  style={{
                    backgroundColor: '#d8d8d8',
                    padding: 7,
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                  }}>
                  <MaterialCommunityIcons name="plus" size={30} color="black" />
                </Pressable>
              </View>
              <Pressable
                onPress={() => deleteItem(item)}
                style={{
                  backgroundColor: '#fff',
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                  borderWidth: 0.6,
                }}>
                <Text>Delete</Text>
              </Pressable>
            </Pressable>
            <Pressable
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Pressable
                style={{
                  backgroundColor: '#fff',
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                  borderWidth: 0.6,
                }}>
                <Text>Save for Later</Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: '#fff',
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: '#c0c0c0',
                  borderWidth: 0.6,
                }}>
                <Text>See more like this</Text>
              </Pressable>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
