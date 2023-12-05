const express = require("express");
const deleteRequestController = require("../../../api/v1/bloodRewuest/deleteRequest");
const verify = require("../../../middleware/verifyToken");
const router = express.Router();


router.delete("/api/v1/requests/:id", deleteRequestController);

module.exports = router;