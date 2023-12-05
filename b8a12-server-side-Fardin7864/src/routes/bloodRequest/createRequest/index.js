const express = require("express");
const createRequestController = require("../../../api/v1/bloodRewuest/createRequest/createRequestController");
const router = express.Router();


router.post('/api/v1/request', createRequestController)

module.exports = router;