const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema(
    {
        temp: Number,
        BPM: Number
    }, {timestamps:true});

module.exports = mongoose.model('temp', tempSchema);
