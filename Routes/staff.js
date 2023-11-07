const express = require('express');

const router = express.Router();
const {
  addStaff, editStaff, removeStaff, resetPassword, verifyStaff, loginStaff, getAllStaff, getStaff,
} = require('../controllers/staff');

const { createRole, AddPermissionToRole } = require('../controllers/role_permission');

// Staff Logic
router.post('/', addStaff);
router.get('/all', getAllStaff);
router.get('/:userId', getStaff);
router.get('/', verifyStaff);
router.get('/login', loginStaff);
router.put('/:userId', editStaff);
router.put('/password/:userId', resetPassword);
router.delete('/:userId', removeStaff);

// Roles and Permissions
router.post('/role', createRole);
router.put('/role/permission/:roleId', AddPermissionToRole);

module.exports = router;
