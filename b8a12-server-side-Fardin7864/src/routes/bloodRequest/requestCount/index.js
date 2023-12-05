const express = require("express");
const requestCount = require("../../../api/v1/bloodRewuest/totalRequest/totalController");
const router = express.Router();

router.get("/api/v1/request-count",requestCount)

module.exports = router;