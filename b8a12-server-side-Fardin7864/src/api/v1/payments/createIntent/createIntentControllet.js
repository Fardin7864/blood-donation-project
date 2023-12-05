require('dotenv').config();
const stripe = require("stripe")(process.env.payment_key);


const intentController = async (req,res) => { 
    const { price } = req.body;
    const amount = parseInt(price * 100);
    console.log(amount, "total amount!");
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
 }

 module.exports = intentController;