const Blogs = require("../../../../models/Blogs");

const createblogController = async (req,res) => { 
    const blog = req.body;

    try {
        const result = await Blogs.create(blog)
        res.send(result)
    } catch (error) {
        res.status(500).send("Server error!")
    }
 }


module.exports = createblogController;