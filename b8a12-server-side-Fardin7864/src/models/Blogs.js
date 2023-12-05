const { Schema, model } = require("mongoose");


const blogSchema = new Schema ({
    name : String,
    email : String,
    title: String,
    img: String,
    content: String,
    status: String,

},{versionKey: false});

const Blogs = model('blog',blogSchema);

module.exports = Blogs;