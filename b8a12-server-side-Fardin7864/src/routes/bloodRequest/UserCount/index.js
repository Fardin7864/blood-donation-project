const express = require("express");
const totalUserController = require("../../../api/v1/bloodRewuest/totalUserCount/totalUserController");
const router = express.Router();

router.get("/api/v1/user-count",totalUserController)

module.exports = router;