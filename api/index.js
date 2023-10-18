/* eslint-disable prettier/prettier */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 8000;
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');

mongoose
  .connect(
    'mongodb+srv://paro:VbRaHq0bWggU8Ep3@cluster0.sk547er.mongodb.net/',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch(err => console.log('error connecting mongo db', err));

app.listen(PORT, () => console.log('server is running on', PORT));



// endpoint to register in the app

