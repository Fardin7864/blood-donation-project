const express = require("express");
const updateBlogController = require("../../../api/v1/blog/updateBlog/updateblogController");
const router = express.Router();

router.put('/api/v1/blog/:id',updateBlogController)

module.exports = router;