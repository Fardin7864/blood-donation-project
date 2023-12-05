const { Schema, model } = require("mongoose");

const bloodRequest = new Schema ({
    requesterName : String,
    requesterEmail : String,
    recipientName : String,
    recipientBloodGroup : String,
    recipientDistrict : String,
    recipientUpazila : String,
    recipientHospital : String,
    fullAddress : String,
    donationDate : String,
    donationTime : String,
    requesterMessage : String,
    requestStatus: String,
    requestDate: String,
    donorName: String,
    donorEmail: String,
},{versionKey: false});

const Requests = model('request',bloodRequest);

module.exports = Requests;