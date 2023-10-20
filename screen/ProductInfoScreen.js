/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Pressable,
  ImageBackground,
  Dimensions,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../redux/CartReducer';

const ProductInfoScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const {width} = Dimensions.get('window');
  const cart = useSelector(state => state.cart.cart);

  const [addedToCart, setAddedToCart] = useState(false);
  const addItemToCart = item => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#fff'}}
      showsVerticalScrollIndicator={false}>
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            style={{
              width,
              height: width,
            }}
            resizeMode="contain"
            source={{uri: item}}
            key={index}>
            <View
              style={{
                flexDirection: 'row',
                padding: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#c60c30',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: 12,
                  }}>
                  20% off
                </Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#e0e0e0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="#000"
                />
              </View>
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#e0e0e0',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 'auto',
                marginLeft: 20,
                marginBottom: 20,
              }}>
              <MaterialCommunityIcons
                name="heart-outline"
                size={24}
                color="#000"
              />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 15, fontWeight: '500'}}>
          {route?.params?.title}
        </Text>
        <Text style={{fontSize: 18, fontWeight: '800', marginTop: 6}}>
          ₹{route?.params?.price}
        </Text>
      </View>
      <Text style={{height: 1, borderColor: '#d0d0d0', borderWidth: 1}} />
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <Text>Color: </Text>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>
          {route?.params?.color}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <Text>Size: </Text>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>
          {route?.params?.size}
        </Text>
      </View>
      <Text style={{height: 1, borderColor: '#d0d0d0', borderWidth: 1}} />
      <View style={{padding: 10}}>
        <Text style={{fontSize: 15, fontWeight: 'bold', marginVertical: 5}}>
          Total: ₹{route?.params?.price}
        </Text>
        <Text style={{color: '#00cce1'}}>
          FREE delivery Tomorrow by 3PM if Order within 10hrs 30 mins.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 5,
            alignItems: 'center',
            gap: 5,
          }}>
          <MaterialIcons name="location-on" size={30} color="black" />
          <Text style={{fontSize: 15, fontWeight: '500'}}>
            Deliver to - Giridih 815301
          </Text>
        </View>
      </View>
      <Text style={{color: 'green', fontWeight: '500', marginHorizontal: 10}}>
        In Stock
      </Text>
      <Pressable
        onPress={() => addItemToCart(route?.params?.item)}
        style={{
          backgroundColor: '#ffc72c',
          padding: 12,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        {addedToCart ? (
          <Text style={{fontWeight: '600'}}>Added to Cart</Text>
        ) : (
          <Text style={{fontWeight: '600'}}>Add to Cart</Text>
        )}
      </Pressable>
      <Pressable
        style={{
          backgroundColor: '#ffac1c',
          padding: 12,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        <Text style={{fontWeight: '600'}}> Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

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
