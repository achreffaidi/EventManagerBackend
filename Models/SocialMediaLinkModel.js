const mongoose = require('mongoose');
const socialmedia = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    link :{
        type : String ,
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event',
        required: true
    },

});
var Social = module.exports = mongoose.model('social_media_link', socialmedia);
module.exports.get = function (callback, limit) {
    Social.find(callback).limit(limit);
}