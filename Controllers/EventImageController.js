
Events = require('../Models/eventsModel');
EventImages = require('../Models/eventImageModel');
const formidable = require('formidable');
var azure = require('azure-storage');
var blobService = azure.createBlobService("eventmanagingapp", "ItSS4CnnBzcB+NPsK8eJPu5f7eHHfR+kSv14aIpksDGvcl/IzhvCXxXh+LpKzqbGt25z7XkTWY+DWDvszh1yrA==");
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
        var date = new Date();
        var timestamp = date.getTime();

        blobService.createBlockBlobFromLocalFile('images', timestamp.toString(), files.image.path, function(error, result, response) {
            console.log(result);
            console.log(response);

            if (!error) {
                // file uploaded
                Events.findById(req.headers.event, function(err, event){
                   if(err){
                       res.send(err);
                   }else if (!event){

                   } else{
                       event.imageLink = "https://eventmanagingapp.blob.core.windows.net/images/"+timestamp.toString();
                       event.save(function (err) {
                            if(err){
                               res.send(err);
                            }else{
                                res.send(event.imageLink)
                            }
                       })
                   }
                });
            }

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
