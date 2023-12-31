/* eslint-disable prettier/prettier */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

require('dotenv').config();
app.use(cors());

const authRoutes = require('./routes/auth');
const addressesRoutes = require('./routes/address');
const orderRoutes = require('./routes/order');
const profileRoutes = require('./routes/profile');
const PORT = 8000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch(err => console.log('error connecting mongo db', err));

app.use('/auth', authRoutes);
app.use('/addresses', addressesRoutes);
app.use('/order', orderRoutes);
app.use('/profile', profileRoutes);
app.listen(PORT, () => console.log('server is running on', PORT));
