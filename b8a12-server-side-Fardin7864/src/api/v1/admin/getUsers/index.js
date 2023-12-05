const Users = require("../../../../models/Users");


const getUserByAdminController = async (req, res) => {
    const query = {};
    const status = req.query.status;
    const pageNumber = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;

    if (status) {
      query.status = status;
    }
    try {
      // console.log(pageNumber, pageSize)
      const totalRecords = await Users.countDocuments(query);
      const totalPages = Math.ceil(totalRecords / pageSize);
      const result = await Users.find(query)
          .skip((pageNumber - 1) * pageSize)
          .limit(pageSize);
          
          res.send({
          data: result,
          currentPage: pageNumber,
          totalPages: totalPages,
          totalRecords: totalRecords,
          pageSize: pageSize,
      });


      // const result = await Users.find(query);
      // res.send(result);
    } catch (error) {
      res.status(500).send("server error!");
    }
  }

  module.exports = getUserByAdminController;