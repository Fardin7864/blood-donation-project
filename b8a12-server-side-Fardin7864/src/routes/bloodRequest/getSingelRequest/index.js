const express = require("express");
const getSingleRequest = require("../../../api/v1/bloodRewuest/getSingleRequest/controller");
const router = express.Router();

router.get('/api/v1/request/:id',getSingleRequest)

module.exports = router;