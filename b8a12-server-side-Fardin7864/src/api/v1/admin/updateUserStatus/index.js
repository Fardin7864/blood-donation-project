// In your controllers folder (e.g., updateUserStatus.js)
const {ObjectId} = require("mongoose").Types
const Users = require("../../../../models/Users");

const updateUserStatusController = async (req, res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const state = req.query.state;
    const role = req.query.role;
    const option = {};
    if (state) {
        option.$set = { status: state };
    }
    if (role) {
        option.$set = { role: role };
    }
    
    // const option = {
    //     $set: { status:  state}  
    // }
    // console.log('id:',id,'state:',state)
    try {
        const result = await Users.findOneAndUpdate(query,option, { new: true })
        res.send({result, message: "updated"})
    } catch (error) {
        res.status(500).send("server error!")
    }
};

module.exports = updateUserStatusController;
