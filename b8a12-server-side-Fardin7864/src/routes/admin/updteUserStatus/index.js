// In your routes file (e.g., usersRoutes.js)
const express = require('express');
const updateUserStatusController = require('../../../api/v1/admin/updateUserStatus');
// const verify = require('../../../middleware/verifyToken');
// const verifyAdmin = require('../../../middleware/verifyAdmin');
const router = express.Router();

// Define the update route using _id
router.put('/api/v1/update-status/:id', updateUserStatusController);

module.exports = router;
