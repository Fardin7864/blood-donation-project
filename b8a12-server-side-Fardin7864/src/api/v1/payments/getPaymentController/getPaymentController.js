const Payments = require("../../../../models/Payments")

const getPaymentController = async (req,res) => { 
    const query ={email: req.params.email};
    const emailDcode = req.user;
    console.log(emailDcode)
    try {
      const result = await Payments.find(query)
      res.send(result)
    } catch (error) {
      console.log(error);
      res.status(500).send("server error!")
    }
 }

 module.exports = getPaymentController;