const jwt = require('jsonwebtoken');
require('dotenv').config();

const privateKey = process.env.JWT_KEY;

const verifyCustomer = async (req, res, next) => {
  const token = req.header;
  jwt.decode();

  // verify that token is legit
  // if toekn is legit then call next() function
  // else respond with a not authorized code
};

module.exports = { verifyCustomer };
