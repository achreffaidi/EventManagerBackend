// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var timeslot_Schema = mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event',
        required: true
    },
    start_date: {
        type :Date ,
        required: true
    },
    end_date: {
        type :Date ,
    },
    title :{
     type : String ,
     required: true
    } ,
    location: {
        type : String
    }

});
// Export Contact model
var TimeSlot = module.exports = mongoose.model('timeslot', timeslot_Schema);
module.exports.get = function (callback, limit) {
    TimeSlot.find(callback).limit(limit);
}

