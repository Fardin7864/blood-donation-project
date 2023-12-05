const Users = require("../../../../models/Users")


const totalUserController = async (req,res) => { 
    
    try {
        const result = await Users.estimatedDocumentCount();
        res.send({result})
    } catch (error) {
        console.log(error)
        res.status(500).send("server error!")
    }
 }


module.exports = totalUserController;