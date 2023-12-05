const { Schema, model } = require("mongoose");


const paymentSchema = new Schema ({
    name : String,
    email : String,
    transectionId: String,
    price: String,
    date: String,
    status: String,

},{versionKey: false});

const Payments = model('payment',paymentSchema);

module.exports = Payments;