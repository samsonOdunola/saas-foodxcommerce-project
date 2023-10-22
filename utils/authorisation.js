const jwt = require('jsonwebtoken');
require('dotenv').config();

const privateKey = process.env.JWT_KEY;

// eslint-disable-next-line arrow-body-style
const signUser = async (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ user }, privateKey, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = { signUser };
