const {ObjectId} = require("mongoose").Types
const Users = require('../../../models/Users');


const updateUserController =async (req,res) => { 
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const option = {
        $set: req.body,  
    }
    // console.log(option)
    try {
        const result = await Users.updateOne(query,option)
        res.send(result)
    } catch (error) {
        res.status(500).send("server error!")
    }
 }

 module.exports = updateUserController;