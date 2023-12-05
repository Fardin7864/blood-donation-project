const express = require("express");
const updateUserController = require("../../../api/v1/updateUser/updateUserController");
const router = express.Router();

router.patch('/api/v1/user/:id',updateUserController);

module.exports = router;