// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var staffSchema = mongoose.Schema({
        user : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
       permissions: {
           type: [Number],
           required: true
         },
       event :{
            type :mongoose.Schema.Types.ObjectId,
           ref: 'event',
           required: true
       }

},{
    timestamps: true
});
// Export Contact model
var Staff = module.exports = mongoose.model('staff', staffSchema);
module.exports.get = function (callback, limit) {
    Staff.find(callback).limit(limit);
}

