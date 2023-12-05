const express = require("express");
const verify = require("../../../middleware/verifyToken");
const getRequestbyAdminController = require("../../../api/v1/bloodRewuest/getRequestAdmin/requestByAdminController");
const verifyAdmin = require("../../../middleware/verifyAdmin");
const router = express.Router();


router.get('/api/v1/requests', getRequestbyAdminController)

module.exports = router;