/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/CartReducer';

const ProductItem = ({item}) => {
  const dispatch = useDispatch();

  const [addedToCart, setAddedToCart] = useState(false);
  const addItemToCart = item => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  return (
    <Pressable style={{marginHorizontal: 20, marginVertical: 25}}>
      <Image source={{uri: item?.image}} style={{width: 150, height: 150}} />
      <Text style={{width: 150, marginTop: 10}} numberOfLines={1}>
        {item?.title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 5,
        }}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>₹{item?.price}</Text>
        <Text style={{color: '#ffc72c', fontWeight: '500'}}>
          {item?.rating?.rate} ratings
        </Text>
      </View>
      <Pressable
        onPress={() => addItemToCart()}
        style={{
          backgroundColor: '#ffc72c',
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          marginHorizontal: 10,
          marginTop: 10,
          alignItems: 'center',
        }}>
        {addedToCart ? (
          <Text style={{fontWeight: '600'}}>Added to Cart</Text>
        ) : (
          <Text style={{fontWeight: '600'}}>Add to Cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
