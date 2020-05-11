const mongoose = require('mongoose');

const eventImageModel = mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    img: {
        type: String
    }


}, {
    timestamps: true
});
let EventImage = module.exports = mongoose.model('eventImage', eventImageModel);
module.exports.get = function (callback, limit) {
    EventImage.find(callback).limit(limit);
}