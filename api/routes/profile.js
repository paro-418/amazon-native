/* eslint-disable prettier/prettier */
const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/:userId', async function (req, res) {
  try {
    const {userId} = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'no user found',
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log('error profile backend');
    return res.status(500).json({
      message: 'error retrieving error message',
    });
  }
});
module.exports = router;
