/* eslint-disable prettier/prettier */
const express = require('express');
const User = require('../models/user');
const Order = require('../models/order');
const router = express.Router();

router.post('/', async function (req, res) {
  try {
    const {userId, cartItems, totalPrice, shippingAddress, paymentMethod} =
      req.body;

    console.log(
      'order data received',
      cartItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
      userId,
    );

    const user = await User.findById(userId);
    console.log('found user', user);

    if (!user) {
      return res.status(404).json({
        message: 'no user found',
      });
    }

    // creating product array
    const products = cartItems?.map(item => ({
      name: item?.title,
      quantity: item?.quantity,
      price: item?.price,
      image: item?.image,
    }));
    // console.log('products', products);

    // create a new order
    const newOrder = await Order.create({
      user: userId,
      products,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });
    // console.log('new Order', newOrder);
    await newOrder.save();
    await User.updateOne(
      {_id: user._id},
      {
        orders: [...user.orders, newOrder._id],
      },
    );

    return res.status(200).json({
      message: 'order created successfully',
      order: newOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating order',
    });
  }
});

router.get('/:userId', async function (req, res) {
  try {
    const {userId} = req.params;
    console.log('get order userid', userId);

    const orders = await Order.find({user: userId}).populate('user');

    if (!orders || orders.length === 0) {
      return res.status(404).json({message: 'No orders found for this user'});
    }

    return res.status(200).json({
      orders,
    });
  } catch (error) {
    console.log('Error fetching user orders');
    return res.status(500).json({
      message: 'Error fetching user orders',
    });
  }
});

module.exports = router;
