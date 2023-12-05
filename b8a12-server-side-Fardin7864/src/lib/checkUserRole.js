const Users = require("../models/Users");

const checkUserRole = async (email) => {
  const query = {email: email};
  // if(email !== req.user.email){
  //   return res.status(403).send("Unauthorized!");
  // }

    try {
      const user = await Users.findOne(query);
      // console.log("email:",email)
      // console.log("user:",user.role)
      let admin = false;
      if(user){
        admin = user.role === "admin";
      }
      return admin;
    } catch (error) {
      console.error("Error in checkUserRole:", error);
    }
  };

module.exports = checkUserRole;
