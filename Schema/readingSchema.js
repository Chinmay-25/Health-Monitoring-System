const mongoose = require('mongoose');

const readingSchema = mongoose.Schema({
    // patientId: {type: mongoose.Schema.Types.ObjectId, ref:'patients'},
    patientNumber: Number,
    temperature: Object,
    pulse: [Number],
    abnormals : [[String, String]],
    date: String
    // indication:String,
    // conclusion:String
}, {timestamps:true});

module.exports = mongoose.model('readings', readingSchema);