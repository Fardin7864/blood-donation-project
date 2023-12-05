const express = require("express");
const getUserByAdminController = require("../../../api/v1/admin/getUsers");
const verify = require("../../../middleware/verifyToken");
const verifyAdmin = require("../../../middleware/verifyAdmin");
// const verifyAdmin = require("../../../middleware/verifyAdmin");
// const verify = require("../../../middleware/verifyToken");
const router = express.Router();

router.get('/api/v1/all-user',verify, verifyAdmin, getUserByAdminController)

module.exports = router;