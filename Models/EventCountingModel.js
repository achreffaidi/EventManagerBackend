const mongoose = require('mongoose');
const planModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event',
        required: true
    },
    description :{
        type : String ,
        default :""
    },
    options: {
        type: [String],
        default : []
    },
    cost : {
        type : Number ,
        default:  0.0
    } ,
    color :  {
        type : Number ,
        default : 0
    }
}, {
    timestamps: true
});
var Plan = module.exports = mongoose.model('plan', planModel);
module.exports.get = function (callback, limit) {
    Plan.find(callback).limit(limit);
}