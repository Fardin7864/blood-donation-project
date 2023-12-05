const  Requests = require("../../../../models/Requests");

const createRequestController = async (req,res) => { 
    const request = req.body;
    try {
        const result = await Requests.create(request)
        res.send(result)
    } catch (error) {
        res.status(500).send("Server error!")
    }
 }

 module.exports = createRequestController;