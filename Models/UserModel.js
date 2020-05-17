const mongoose = require('mongoose');
const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
        email: {
            type: String,
            required: true,
            unique : true
        },
    password : {
        type: String,
        required: true
    },
        number : {
            type: String,
            required: true
        },
        isAdmin : {
            type: Boolean,
            default : false
        }

}
    );


var User = module.exports = mongoose.model('user', userModel);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}