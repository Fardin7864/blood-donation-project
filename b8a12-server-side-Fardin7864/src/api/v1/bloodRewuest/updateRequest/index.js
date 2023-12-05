const Requests = require("../../../../models/Requests");

const {ObjectId} = require("mongoose").Types

const updateRequestController = async (req,res) => { 
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const updateRequest = req.body;
    try {
        const result = await Requests.findOneAndUpdate(query,updateRequest, { new: true })
        res.send({result, message: "updated"})
    } catch (error) {
        res.status(500).send("server error!")
    }
 }

 module.exports = updateRequestController;