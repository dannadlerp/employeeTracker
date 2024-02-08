const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Define routes
router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRoleById);
router.post('/', roleController.createRole);
router.put('/:id', roleController.updateRoleById);
router.delete('/:id', roleController.deleteRoleById);

module.exports = router;