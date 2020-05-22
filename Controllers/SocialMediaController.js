const Events = require('../Models/eventsModel');
const Social = require('../Models/SocialMediaLinkModel')


exports.getwebsites = function(req,res){
    let list = [
        "Facebook","Youtube","LinkedIn","Instagram","WhatsApp"
    ]
    res.json({
        message : "List Links",
        data : list
    })
}

exports.createLink = function (req, res) {

    Events.findById(req.body.event, function (err, event) {
        if (err){
            res.status(400);
            res.send("Casting Problem")
        }else{
            if (!event) {
                res.status(404);
                res.send("Can't find the event")
            }else{

                let social = new Social();
                social.title = req.body.title ;
                social.event = req.body.event ;
                social.link = req.body.url ;
                social.website = req.body.website ;

                social.save(function(err){
                    if(err){
                        res.send(err);
                    }else{
                        res.json({
                            message: 'Social Link created',
                            data : social
                        });
                    }
                })


            }
        }
    });

};

exports.updateLink = function(req,res){
    Social.findById(req.body.id, function(err , social){

        if(err){
            res.send(err);
        }else if (!social){
            res.status(444).json({
                message : "can't find this link"
            })
        }else{

            social.title = req.body.title ;
            social.link = req.body.url ;

            social.save(function(err){
                if(err){
                    res.send(err);
                }else{
                    res.json({
                        message: 'Social Link updated',
                        data : social
                    });
                }
            })


        }

    });
}

exports.getLinks = function (req , res){

    Social.find({'event':req.headers.event} , function(err , links){
       if(err){
           res.send(err) ;
       }
       res.json({
           "social_media_links":links
       })
    });
}


exports.deleteLink = function(req,res){

    Social.deleteOne({_id: req.headers.id}, function(err, results) {
        if (err){
            res.send(err);
        }else
        res.json({
            "message":"delete successfully",
            "data":results
        })

    });

}




