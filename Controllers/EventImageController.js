
Events = require('../Models/eventsModel');
EventImages = require('../Models/eventImageModel');
const formidable = require('formidable');
var fs = require('fs');
var path = require('path');



exports.new = function (req, res) {



    var form = formidable({ multiples: true });
    form.uploadDir ='./uploads';
    form.keepExtensions = true;
    form.type = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
         console.log(files.image.path);

        EventImages.findOne({'event':req.headers.event} , function (err, result) {
            var eventImages = result ;
            if (err)
                res.send(err);


            console.log(eventImages);
            if(!eventImages){
                eventImages = new EventImages();
                eventImages.event = req.headers.event;
            }


            eventImages.img = files.image.path ;
            eventImages.save(function (err) {
                if (err)
                    res.json(err);
                else
                    res.json({
                        message: 'Image uploaded!',
                        data: eventImages
                    });
            });


        });



    });












};



exports.view = function (req, response) {
    console.log(req.query.event);
    EventImages.findOne({'event':req.query.event} , function (err, eventImage) {
        if (err)
            response.send(err);


        var contentType = 'image/png';
        if(eventImage!=null)
        fs.readFile(eventImage.img, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT'){
                    fs.readFile('./404.html', function(error, content) {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    response.end();
                }
            }
            else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });


    });
};
