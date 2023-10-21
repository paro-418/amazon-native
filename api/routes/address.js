/* eslint-disable prettier/prettier */
const express = require('express');
const User = require('../models/user');
const mongoose = require('mongoose');

const router = express.Router();

// end point to save address
router.post('/', async function (req, res) {
  try {
    const {userId, address} = req.body;
    console.log('address received', address);
    console.log('userId received', userId);

    // find the user by user id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'user not found',
      });
    }

    // add the new address to the user's address array

    user.address.push(address);
    // save the update user in backend
    await user.save();

    return res.status(200).json({
      message: 'address created successfully',
    });
  } catch (error) {
    console.log('failed to save address backend', error);
    return res.status(500).json({
      message: 'error adding address, backend',
    });
  }
});

router.get('/:userId', async function (req, res) {
  try {
    const {userId} = req.params;
    console.log('get address received user id', userId);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'user not found',
      });
    }

    const addresses = user.address;
    return res.status(200).json({
      message: 'found all addresses',
      addresses,
    });
  } catch (error) {
    console.log('error getting address , backend', error);
    res.status(500).json({
      message: 'error retrieving the message',
    });
  }
});

module.exports = router;
