const mongoose = require('mongoose');
const eventCountingModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event',
        required: true
    },

    state :{
        // Can the Staff count or not .
        type : Boolean ,
        default :"false"
    },


    presence : {
        type : [mongoose.Schema.Types.ObjectId] ,
        default:  0.0
    } ,

}, {
    timestamps: true
});
var EventCounting = module.exports = mongoose.model('event_counting', eventCountingModel);
module.exports.get = function (callback, limit) {
    EventCounting.find(callback).limit(limit);
}