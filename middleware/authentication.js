require('dotenv').config();
const Role = require('../models/role');
const { verifyUser } = require('../utils/authorisation');
const response = require('../utils/response');

const authorizeCustomer = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { userId } = req.params;
    const token = authorization.split(' ')[1];
    const bearer = authorization.split(' ')[0];

    if (bearer !== 'Bearer') {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
    const userInfo = await verifyUser(token);
    const { user } = userInfo;

    if (!user.verified) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }

    if (user.id !== Number(userId)) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Authorization error', error: err.message, data: {},
    });
  }
  next();

  // verify that token is legit
  // if toekn is legit then call next() function
  // else respond with a not authorized code
};

module.exports = { authorizeCustomer };
