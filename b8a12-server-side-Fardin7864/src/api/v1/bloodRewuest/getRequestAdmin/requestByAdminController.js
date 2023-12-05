const Requests = require("../../../../models/Requests");


const getRequestbyAdminController = async (req,res) => { 
    const queryObj = {};
    const status = req.query.status;
    const id = req.query.id;
    const pageNumber = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const email = req.query.email;
    if (id) {
        queryObj._id= id;
    }
    if (email) {
        queryObj.requesterEmail = email;
    }
    if (status) {
        queryObj.requestStatus = status;
    }
    // console.log('this is from get request:',email, pageNumber,pageSize)
    try {
        // console.log(pageNumber, pageSize)
        const totalRecords = await Requests.countDocuments(queryObj);
        const totalPages = Math.ceil(totalRecords / pageSize);

        const result = await Requests.find(queryObj)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);
            
            res.send({
            data: result,
            currentPage: pageNumber,
            totalPages: totalPages,
            totalRecords: totalRecords,
            pageSize: pageSize,
        });
    } catch (error) {
        res.status(500).send("Server Error!")
    }
 }


 module.exports = getRequestbyAdminController;