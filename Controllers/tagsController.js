const Tag = require('../Models/TagModel');

// Handle index actions

exports.new = function (req, res) {

    let tag = new Tag();
    tag.name = req.headers.name ;
    tag.save(
        function (err) {
            if(err){
                res.send(err);
            }else{

                res.json({
                    message: 'New Tag created!',
                    data: tag
                });
            }
        }
    )

};


exports.get = function (req, res) {

    Tag.get(
        function (err,tags) {
            if(err){
                res.send(err);
            }else{

                res.json({
                    message: 'tags',
                    data: tags
                });
            }
        }
    )

};


