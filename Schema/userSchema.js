const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: String,
    doctorName: String,
    password: String,
    hospitalName: String,
    department: String,
    role: String

}, {timestamps:true});

module.exports = mongoose.model('users', userSchema);