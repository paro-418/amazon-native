/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {configureStore} from '@reduxjs/toolkit';
import CartReducer from './CartReducer';

export default configureStore({
  reducer: {
    cart: CartReducer,
  },
});
