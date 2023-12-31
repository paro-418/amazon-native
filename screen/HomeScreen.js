/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */

import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from 'react-native';
import {BottomModal, SlideAnimation, ModalContent} from 'react-native-modals';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SliderBox} from 'react-native-image-slider-box';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import ProductItem from '../components/ProductItem';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserType} from '../context/UserContext';
import {BASE_URL} from '../constants';
import Header from '../components/Header';

const list = [
  {
    id: '0',
    image: 'https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg',
    name: 'Home',
  },
  {
    id: '1',
    image:
      'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg',
    name: 'Deals',
  },
  {
    id: '3',
    image:
      'https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg',
    name: 'Electronics',
  },
  {
    id: '4',
    image:
      'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg',
    name: 'Mobiles',
  },
  {
    id: '5',
    image:
      'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg',
    name: 'Music',
  },
  {
    id: '6',
    image: 'https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg',
    name: 'Fashion',
  },
];
const images = [
  'https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg',
  'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif',
  'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg',
];
const deals = [
  {
    id: '20',
    title: 'OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)',
    oldPrice: 25000,
    price: 19000,
    image:
      'https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg',
    carouselImages: [
      'https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg',
      'https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg',
      'https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg',
    ],
    color: 'Stellar Green',
    size: '6 GB RAM 128GB Storage',
  },
  {
    id: '30',
    title:
      'Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers',
    oldPrice: 74000,
    price: 26000,
    image:
      'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg',
    carouselImages: [
      'https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg',
      'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
    ],
    color: 'Cloud Navy',
    size: '8 GB RAM 128GB Storage',
  },
  {
    id: '40',
    title:
      'Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger',
    oldPrice: 16000,
    price: 14000,
    image:
      'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg',
    carouselImages: [
      'https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg',
      'https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg',
    ],
    color: 'Icy Silver',
    size: '6 GB RAM 64GB Storage',
  },
  {
    id: '40',
    title:
      'realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera',
    oldPrice: 12999,
    price: 10999,
    image:
      'https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg',
    carouselImages: [
      'https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg',
      'https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg',
    ],
  },
];
const offers = [
  {
    id: '0',
    title:
      'Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)',
    offer: '72%',
    oldPrice: 7500,
    price: 4500,
    image:
      'https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg',
    carouselImages: [
      'https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg',
    ],
    color: 'Green',
    size: 'Normal',
  },
  {
    id: '1',
    title:
      'Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery',
    offer: '40%',
    oldPrice: 7955,
    price: 3495,
    image: 'https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg',
    carouselImages: [
      'https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg',
    ],
    color: 'black',
    size: 'Normal',
  },
  {
    id: '2',
    title: 'Aishwariya System On Ear Wireless On Ear Bluetooth Headphones',
    offer: '40%',
    oldPrice: 7955,
    price: 3495,
    image: 'https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg',
    carouselImages: ['https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg'],
    color: 'black',
    size: 'Normal',
  },
  {
    id: '3',
    title:
      'Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery',
    offer: '40%',
    oldPrice: 24999,
    price: 19999,
    image: 'https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg',
    carouselImages: [
      'https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg',
      'https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg',
      'https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg',
    ],
    color: 'Norway Blue',
    size: '8GB RAM, 128GB Storage',
  },
];
const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('jewelery');
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([
    {label: "Men's clothing", value: "men's clothing"},
    {label: 'jewelery', value: 'jewelery'},
    {label: 'electronics', value: 'electronics'},
    {label: "women's clothing", value: "women's clothing"},
  ]);
  const {userId, setUserId} = useContext(UserType);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddresses, setSelectedAddresses] = useState('');
  const navigation = useNavigation();

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/addresses/${userId}`);
      const {addresses} = res.data;
      setAddresses(addresses);
    } catch (error) {
      console.log('failed to fetch addresses frontend', error);
    }
  };
  useEffect(() => {
    if (userId) fetchAddresses();
  }, [userId, modalVisible]);

  console.log('selected address', selectedAddresses);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        setProducts(res.data);
      } catch (error) {
        console.log('error fetching products');
      }
    };
    fetchProducts();
  }, []);

  const cart = useSelector(state => state.cart.cart);
  // console.log('home screen cart', cart);

  const onGenderOpen = useCallback(() => {}, []);
  // console.log('hom');
  return (
    <>
      <SafeAreaView style={styles.Container}>
        <ScrollView>
          <Header />
          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              padding: 10,
              backgroundColor: '#afeeee',
            }}>
            <MaterialIcons name="location-on" size={30} color="black" />
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              {selectedAddresses ? (
                <Text>
                  Deliver to : {selectedAddresses?.name} -
                  {selectedAddresses?.street}, {selectedAddresses?.city}
                </Text>
              ) : (
                <Text style={{fontWeight: 'bold'}}>Add an Address</Text>
              )}
            </Pressable>
            <MaterialIcons name="keyboard-arrow-down" size={30} color="black" />
          </Pressable>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  margin: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: item.image}}
                  style={{width: 50, height: 50, resizeMode: 'contain'}}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: '500',
                    marginTop: 5,
                  }}>
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <SliderBox
            images={images}
            autoplay
            circleLoop
            dotColor="#13274f"
            inactiveDotColor="#9084Ae"
            ImageComponentStyle={{width: '100%'}}
          />
          <Text style={{padding: 10, fontSize: 18, fontWeight: 'bold'}}>
            Trending Deals of the week
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {deals.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate('ProductInfoScreen', {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item.color,
                    size: item.size,
                    oldPrice: item.oldPrice,
                    item: item,
                  })
                }
                key={index}
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: item.image}}
                  style={{width: 180, height: 180, resizeMode: 'contain'}}
                />
              </Pressable>
            ))}
          </View>
          <Text style={{height: 1, borderColor: '#d0d0d0', borderWidth: 2}} />
          <Text style={{padding: 10, fontSize: 18, fontWeight: 'bold'}}>
            Today's deals
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.navigate('ProductInfoScreen', {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item.color,
                    size: item.size,
                    oldPrice: item.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{uri: item?.image}}
                  style={{width: 150, height: 150, resizeMode: 'contain'}}
                />
                <View
                  style={{
                    backgroundColor: '#e31837',
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    borderRadius: 4,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 13,
                      color: 'white',
                    }}>
                    Upto {item?.offer} off
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
          <Text style={{height: 1, borderColor: '#d0d0d0', borderWidth: 2}} />

          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: '45%',
              marginBottom: open ? 150 : 15,
            }}>
            <DropDownPicker
              style={{borderColor: '#b7b7b7'}}
              open={open}
              value={category}
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="Choose Category"
              placeholderStyle={{}}
              // onOpen={onGenderOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {products
              ?.filter(item => item.category === category)
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}>
        <ModalContent style={{width: '100%', height: 'fit'}}>
          <View style={{marginBottom: 8}}>
            <Text style={{fontSize: 16, fontWeight: '500'}}>
              Choose your location
            </Text>
            <Text style={{marginTop: 5, fontSize: 16, color: 'gray'}}>
              Select a delivery location to see product availability and
              delivery options
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* already added address */}
            {addresses?.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedAddresses(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: '#d0d0d0',
                  marginTop: 10,
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 3,
                  marginRight: 15,
                  backgroundColor:
                    selectedAddresses === item ? '#fbceb1' : '#fff',
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
              </Pressable>
            ))}
            <Pressable
              style={{
                width: 140,
                height: 140,
                borderColor: '#d0d0d0',
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('AddAddressScreen');
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#0066b2',
                  fontWeight: '500',
                }}>
                Add an address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>
          <View
            style={{
              flexDirection: 'column',
              gap: 7,

              marginTop: 30,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <MaterialIcons name="location-on" size={25} color="#0066b2" />
              <Text style={{color: '#0066b2', fontWeight: '400'}}>
                Enter an Indian pin code
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <MaterialIcons name="my-location" size={25} color="#0066b2" />
              <Text style={{color: '#0066b2', fontWeight: '400'}}>
                Use My current location
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <MaterialCommunityIcons name="earth" size={25} color="#0066b2" />
              <Text style={{color: '#0066b2', fontWeight: '400'}}>
                Deliver Outside India
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
  },
});
