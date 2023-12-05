const Blogs = require("../../../../models/Blogs");

const getBlogController = async (req,res) => { 
    const queryObj = {};
    const status = req.query.status;
    if (status) {
        queryObj.status = status;
    }

    try {
        const result = await Blogs.find(queryObj);
        res.send(result)
    } catch (error) {
        res.send("server error!")
    }
 }

 module.exports = getBlogController;