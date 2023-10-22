const express = require('express');
const { signup, verifyEmail, signin } = require('../controllers/customer');

const router = express.Router();

router.post('/signup', signup);
router.post('/verify', verifyEmail);
router.get('/login', signin);
module.exports = router;
