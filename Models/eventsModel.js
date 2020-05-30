const mongoose = require('mongoose');
const eventModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description :{
        type : String
    } ,
    location : {
        type : String
    },
    start_date : {
        type :Date ,
        required :true
    } ,
    end_date : {
        type : Date
    } ,
    imageLink : {
        type : String ,
        default : null
    },
    tags : {
        type : [mongoose.Schema.Types.ObjectId] ,
        default : []
    }


}, {
    timestamps: true
});
var Event = module.exports = mongoose.model('event', eventModel);
module.exports.get = function (callback, limit) {
    Event.find(callback).limit(limit);
}