const Payments = require("../../../../models/Payments")

const createPaymentController = async (req,res) => { 
    const payment = req.body;
    try {
        const paymentResult = await Payments.create(payment);
        res.send(paymentResult)
    } catch (error) {
        res.send("payment error")
    }
  }

  module.exports = createPaymentController;