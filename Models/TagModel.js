const mongoose = require('mongoose');
const tagModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    count : {
    type : Number,
        default : 0
    }
    }
   );


var Tags = module.exports = mongoose.model('tags', tagModel);
module.exports.get = function (callback, limit) {
    Tags.find(callback).limit(limit);
}