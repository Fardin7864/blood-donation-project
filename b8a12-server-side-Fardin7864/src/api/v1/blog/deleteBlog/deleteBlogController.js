const Blogs = require("../../../../models/Blogs");
const {ObjectId} = require("mongoose").Types

const deleteBlogController = async (req,res) => { 
    const id = req.params.id;
    const queryObj = {_id: new ObjectId(id)};

    try {
        const result = await Blogs.deleteOne(queryObj);
        res.send(result)
    } catch (error) {
        res.status(500).send("Server error!")
    }
 }


 module.exports = deleteBlogController;