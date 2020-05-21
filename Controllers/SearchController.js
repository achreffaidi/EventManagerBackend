const Events = require('../Models/eventsModel');


exports.suggestions = function (req,res) {

    Events.get(function(err,events){

        let list = [];
        events.forEach(function(event){
           list.push({
               id:event._id ,
               name : event.name ,
               start : event.start_date
           })
        });
        res.json({
            message : "Search Suggestions received",
            data : list
        })

    })

}