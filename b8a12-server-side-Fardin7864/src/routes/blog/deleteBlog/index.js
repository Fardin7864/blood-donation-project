const express = require("express");
const deleteBlogController = require("../../../api/v1/blog/deleteBlog/deleteBlogController");
const router = express.Router();

router.delete('/api/v1/blog/:id',deleteBlogController)

module.exports = router;