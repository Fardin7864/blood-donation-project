const Users = require("../../../models/Users");

const addUser = async (req, res) => {
    const user = req.body;
    // console.log(user)
    const query = { email: user.email };
    try {
      const signleUser = await Users.findOne(query);
      if (signleUser) {
        return res.send({ message: "This email already exist!" });
      }
      const result = await Users.create(user);
      res.send(result);
    } catch (err) {
        // next(err)
      res.status(5000).send("Server error!");
    }
  }

module.exports = addUser;