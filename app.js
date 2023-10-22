const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const customerRoute = require('./Routes/customer');

const App = express();
App.use(express.urlencoded({ extended: false }));
App.use(express.json({ limit: '50mb' }));
App.use(helmet());
App.use(cors());
App.get('/', (req, res) => {
  res.send('Welcome to server');
});

App.use('/api/v1/customer', customerRoute);

module.exports = App;
