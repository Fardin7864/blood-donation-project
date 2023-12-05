const express = require("express");
const updateRequestController = require("../../../api/v1/bloodRewuest/updateRequest");
const verify = require("../../../middleware/verifyToken");
const router = express.Router();


router.put('/api/v1/requests/:id',verify, updateRequestController)

module.exports = router;