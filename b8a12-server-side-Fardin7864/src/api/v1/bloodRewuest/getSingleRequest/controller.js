const Requests = require("../../../../models/Requests");
const {ObjectId} = require("mongoose").Types

const getSingleRequest = async (req,res) => { 
    const id = req.params.id;
    const queryObj = {_id: new ObjectId(id)};

    // console.log('this is from get request:',email, pageNumber,pageSize)
    try {
        const result = await Requests.findOne(queryObj);
        res.send(result);
    } catch (error) {
        res.status(500).send("Server Error!")
    }
 }


 module.exports = getSingleRequest;