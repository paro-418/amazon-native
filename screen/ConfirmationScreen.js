/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../constants';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {UserType} from '../context/UserContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {clearCart} from '../redux/CartReducer';
import RazorpayCheckout from 'react-native-razorpay';

const steps = [
  {
    title: 'Address',
    content: 'Address Form',
  },
  {
    title: 'Delivery',
    content: 'Delivery Options',
  },
  {
    title: 'Payment',
    content: 'Payment Details',
  },
  {
    title: 'Place Holder',
    content: 'order Summary',
  },
];
const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddresses, setSelectedAddresses] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState(false);
  const [paymentOption, setPaymentOption] = useState('');
  const cart = useSelector(state => state.cart.cart);
  const total = cart
    ?.map(item => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  console.log('confirmation sc', cart);

  const {userId, setUserId} = useContext(UserType);
  console.log('userID', userId);
  const fetchAddresses = async () => {
    try {
      console.log('fetching address');
      const res = await axios.get(`${BASE_URL}/addresses/${userId}`);
      const {addresses} = res.data;
      console.log('allAddresses', addresses);
      setAddresses(addresses);
    } catch (error) {
      console.log('failed to fetch addresses frontend', error);
    }
  };
  useEffect(() => {
    fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  //   console.log('xxx', addresses);

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddresses,
        paymentMethod: paymentOption,
      };

      const res = await axios.post(`${BASE_URL}/order`, orderData);
      // console.log('response order', res);
      if (res.status === 200) {
        navigation.navigate('ProfileTab');
        dispatch(clearCart());
      }
    } catch (error) {
      console.log('error placing order front end', error);
    }
  };

  const pay = async () => {
    try {
      const options = {
        description: 'Adding to Wallet',
        currency: 'INR',
        name: 'Amazon',
        amount: total * 100,
        key: 'rzp_test_ReWYbekhLS8fvp',
        prefill: {
          email: 'void@razorpay.com',
          contact: '919191919191',
          name: 'RazorPay Software',
        },
        theme: '#f37254',
      };

      const data = await RazorpayCheckout.open(options);
      console.log('razor pay data', data);
      const orderData = {
        userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddresses,
        paymentMethod: 'card',
      };
      const res = await axios.post(`${BASE_URL}/order`, orderData);
      // console.log('response order', res);
      if (res.status === 200) {
        navigation.navigate('ProfileTab');
        dispatch(clearCart());
      }
    } catch (error) {
      console.log('payment failed frontend', error);
    }
  };
  return (
    <ScrollView>
      <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 40}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            justifyContent: 'space-between',
          }}>
          {steps?.map((step, index) => (
            <View
              key={index}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              {index > 0 && (
                <View
                  style={[
                    {flex: 1, backgroundColor: 'green', height: 2},
                    index <= currentStep && {backgroundColor: 'green'},
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: '#ccc',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  index < currentStep && {backgroundColor: 'green'},
                ]}>
                {index < currentStep ? (
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{textAlign: 'center', marginTop: 8}}>
                {step?.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
      {currentStep === 0 && (
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontWeight: 'bold'}}>Select Delivery Address </Text>
          <View>
            {addresses?.map((item, index) => (
              <Pressable
                onPress={() => setSelectedAddresses(item)}
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: '#d0d0d0',
                  flexDirection: 'row',
                  gap: 10,
                  padding: 10,
                  marginVertical: 17,
                  alignItems: 'center',
                  borderRadius: 6,
                }}>
                {selectedAddresses && selectedAddresses?._id === item?._id ? (
                  <MaterialCommunityIcons
                    color="#008397"
                    size={25}
                    name="record-circle-outline"
                  />
                ) : (
                  <MaterialCommunityIcons
                    color="black"
                    size={25}
                    name="circle-outline"
                  />
                )}
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 3,
                    }}>
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
                  <View>
                    {selectedAddresses &&
                      selectedAddresses?._id === item?._id && (
                        <Pressable
                          onPress={() => setCurrentStep(1)}
                          style={{
                            backgroundColor: '#008397',
                            padding: 10,
                            borderRadius: 20,
                            justifyContent: 'center',
                            marginVertical: 20,
                          }}>
                          <Text style={{textAlign: 'center', color: '#fff'}}>
                            Deliver to this Address
                          </Text>
                        </Pressable>
                      )}
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {currentStep === 1 && (
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Choose your delivery options
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 8,
              backgroundColor: '#fff',
              gap: 7,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
            }}>
            {deliveryOption ? (
              <MaterialCommunityIcons
                onPress={() => setDeliveryOption(!deliveryOption)}
                color="black"
                size={25}
                name="record-circle-outline"
              />
            ) : (
              <MaterialCommunityIcons
                onPress={() => setDeliveryOption(!deliveryOption)}
                color="black"
                size={25}
                name="circle-outline"
              />
            )}

            <Text style={{flex: 1}}>
              <Text style={{color: 'green', fontWeight: '500'}}>
                Tomorrow by 9pm
              </Text>
              - Free delivery with your Prime membership
            </Text>
          </View>

          <Pressable
            onPress={() => setCurrentStep(2)}
            style={{
              backgroundColor: '#ffc72c',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}
      {currentStep === 2 && (
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Select your Payment method
          </Text>

          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 8,
              backgroundColor: '#fff',
              gap: 7,
              borderColor: '#d0d0d0',
              marginTop: 10,
              borderWidth: 1,
            }}
            onPress={() => setPaymentOption('cash')}>
            {paymentOption === 'cash' ? (
              <MaterialCommunityIcons
                color="black"
                size={25}
                name="record-circle-outline"
              />
            ) : (
              <MaterialCommunityIcons
                color="black"
                size={25}
                name="circle-outline"
              />
            )}
            <Text>Cash on Delivery</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setPaymentOption('card');
              Alert.alert('UPI/DebitCard', 'Pay Online', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('cancel is pressed'),
                },
                {
                  text: 'Ok',
                  onPress: () => pay(),
                },
              ]);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 8,
              backgroundColor: '#fff',
              gap: 7,
              borderColor: '#d0d0d0',
              marginTop: 10,
              borderWidth: 1,
            }}>
            {paymentOption === 'card' ? (
              <MaterialCommunityIcons
                color="black"
                size={25}
                name="record-circle-outline"
              />
            ) : (
              <MaterialCommunityIcons
                color="black"
                size={25}
                name="circle-outline"
              />
            )}
            <Text>UPI / Credit Card / Debit Card</Text>
          </Pressable>
          <Pressable
            onPress={() => setCurrentStep(3)}
            style={{
              backgroundColor: '#ffc72c',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep === 3 && paymentOption === 'cash' && (
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Order Now</Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 7,
              padding: 7,
              borderColor: '#d7d7d7',
              marginTop: 10,
              borderWidth: 1,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                }}>
                Save 5% and never run out
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: 'gray',
                  marginTop: 5,
                }}>
                Turn on auto deliveries
              </Text>
            </View>
          </View>
          <View
            style={{
              padding: 8,
              borderColor: '#d0d0d0',
              borderWidth: 1,
              marginTop: 10,
              backgroundColor: '#fff',
            }}>
            <Text>Shipping to {selectedAddresses?.name}</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text>Items</Text>
              <Text style={{fontWeight: '500', fontSize: 16, color: 'gray'}}>
                ₹{total}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text>Delivery</Text>
              <Text style={{fontWeight: '500', fontSize: 16, color: 'gray'}}>
                ₹0
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Order total
              </Text>
              <Text style={{fontWeight: '700', fontSize: 17, color: '#c60c30'}}>
                ₹{total}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 8,
              borderColor: '#d0d0d0',
              marginTop: 10,
              borderWidth: 1,
            }}>
            <Text style={{fontSize: 16, color: 'gray'}}>Pay with</Text>
            <Text style={{fontSize: 16, fontWeight: '600', marginTop: 7}}>
              Cash on Delivery
            </Text>
          </View>
          <Pressable
            onPress={handlePlaceOrder}
            style={{
              backgroundColor: '#ffc72c',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text>Place your order</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
