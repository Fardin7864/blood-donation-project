const express = require("express");
const createblogController = require("../../../api/v1/blog/createBlog/createblogController");
const router = express.Router();

router.post('/api/v1/blog',createblogController)

module.exports = router;