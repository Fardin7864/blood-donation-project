const Users = require("../../../models/Users");


const getUsersController = async (req, res) => {
    const query = {};
    const email = req.query.email;
    if (email !== req.user.email) {
      return res.status(401).send("forbidden")
    }
    if (email === req.user.email) {
      query.email = email;
    }
    try {
      const result = await Users.find(query);
      // console.log(result)
      res.send(result);
    } catch (error) {
      res.status(500).send("server error!");
    }
  }

module.exports = getUsersController;