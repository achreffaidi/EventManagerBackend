const mongoose = require('mongoose');
const presenceModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

}, {
    timestamps: true
});
var Presence = module.exports = mongoose.model('presence', presenceModel);
module.exports.get = function (callback, limit) {
    Presence.find(callback).limit(limit);
}