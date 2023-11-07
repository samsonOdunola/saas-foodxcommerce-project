const response = require('../utils/response');
const Role = require('../models/role');

const createRole = async (req, res) => {
  let role;
  try {
    const { title } = req.body;
    role = await Role.create({ title });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in creating resource', error: err.message, data: {},
    });
  }
  return res.status(response.CREATED).json({ success: true, message: 'Resource created successfully', data: role });
};

const AddPermissionToRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { permissionId, resource } = req.body;
    const role = await Role.findByPk(roleId);
    await role.addPermission(permissionId, { through: { resource } });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in creating resource', error: err.message, data: {},
    });
  }
  return res.status(response.CREATED).json({ success: true, message: 'Resource updated successfully', data: {} });
};
// const editRole = async (req, res) => { };

module.exports = {
  createRole, AddPermissionToRole,
};
