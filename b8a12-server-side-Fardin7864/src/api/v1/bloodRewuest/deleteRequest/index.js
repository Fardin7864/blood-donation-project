const Requests = require("../../../../models/Requests");

const {ObjectId} = require("mongoose").Types

const deleteRequestController = async (req,res) => { 
    
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    console.log(id)
    try {
        const result = await Requests.deleteOne(query);
        res.send(result);
      } catch (error) {
        res.status(500).send("Server Error!!");
      }
 }

 module.exports = deleteRequestController;