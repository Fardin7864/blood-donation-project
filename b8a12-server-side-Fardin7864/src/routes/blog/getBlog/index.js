const express = require("express");
const getBlogController = require("../../../api/v1/blog/getBlog/getBlogController");
const router = express.Router();

router.get('/api/v1/blogs',getBlogController)

module.exports = router;