const { Binary } = require('mongodb');
const mongoose = require('mongoose');

// autoincreament
// var autoIncrement = require('mongoose-auto-increment');
// autoIncrement.initialize(mongoose.connection);


const patientSchema = mongoose.Schema({
    patientNumber: Number,
    name: String,
    address: String,
    hospitalName: String,
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    admittedDate: Date,
    dischargedDate: Date,
    // casePaper: Binary,
    indication:String,
    conclusion:String,
    isActive: {type:Boolean, default: true}
}, {timestamps: true});

// patientSchema.plugin(autoIncrement.plugin, {
//     model: "patients",
//     field: "patientNumber"
// });
module.exports = mongoose.model('patients', patientSchema);