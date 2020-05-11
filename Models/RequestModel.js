const mongoose = require('mongoose');
const requestModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event',
        required: true
    },
    plan :{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'plan',
        required: true
    },
    state: {
        type: Number,
        //0 : pending
        //1 : unpaid
        //2 : accepted
        //3 : refused
        default : 0
    },

}, {
    timestamps: true
});
var Plan = module.exports = mongoose.model('request', requestModel);
module.exports.get = function (callback, limit) {
    Plan.find(callback).limit(limit);
}