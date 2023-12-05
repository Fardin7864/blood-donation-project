const Blogs = require("../../../../models/Blogs");
const {ObjectId} = require("mongoose").Types


const updateBlogController = async (req,res) => { 
    const id = req.params.id;
    const queryObj = {_id: new ObjectId(id)}
    const blog = req.body;
    
    try {
        const result = await Blogs.findOneAndUpdate(queryObj,blog,{ new: true })
        res.send({result, message: "updated"})
    } catch (error) {
        res.send("server error")
    }
 }

 module.exports = updateBlogController;