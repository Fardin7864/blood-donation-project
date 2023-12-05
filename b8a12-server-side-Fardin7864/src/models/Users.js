const { Schema, model } = require("mongoose");

const userSchema = new Schema ({
    name: String,
    email: String,
    role: String,
    bloodGroup: String,
    district: String,
    upazila: String,
    profile: String,
    roll: String,
    status: String,
},{versionKey: false});

const Users = model('user',userSchema);

module.exports = Users;