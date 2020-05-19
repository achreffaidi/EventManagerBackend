const Event = require('../Models/eventsModel');
const User = require('../Models/UserModel');
const EventCounting = require('../Models/EventCountingModel')
const Presence = require('../Models/PresenceModel')
const Request = require('../Models/RequestModel')

exports.index = function (req, res) {
    EventCounting.get(function (err, event_counting) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else
            res.json({
                status: "success",
                message: "Event_Counting retrieved successfully",
                data: event_counting
            });


    });
};


exports.new = function (req, res) {

    Event.findById(req.body.event, function (err, event) {

        if (err || !event) {
            res.writeHead(404);
            res.end("Can't Find the Event .");
        }

        let event_counting = new EventCounting();

        console.log(req.body)
        event_counting.name = req.body.name;
        event_counting.event = req.body.event;


        event_counting.save(function (err) {
            if (err)
                res.json(err);
            else
                res.json({
                    message: 'New Event_Counting created!',
                    data: event_counting
                });
        });

    })


};


exports.getEventCountingList = function (req, res) {


    Request.find({event: req.headers.event, state: 2}, function (err, requests) {

        //get all requests

        EventCounting.find({event: req.headers.event}, function (err, event_counting) {

            //get all counting related to  that event .
            if (err){
                res.send(err);
            }
            else if (!event_counting || event_counting.length === 0) {
                res.json({
                    message: 'Event_Counting : Empty List',
                    data: []
                });

            } else {

                let c = 0;  //total number of event counting
                let list = [];
                event_counting.forEach(function (event) {

                    let count = 0;
                    let list_in = []
                    let list_out = []

                    if (event.presence_list.length === 0) {
                        //if no one attended the event yet

                        requests.forEach(function (request) {
                            list_out.push(request.user);
                        });
                        list.push({
                            id: event.id,
                            name: event.name,
                            state: event.state,
                            count_in: 0,
                            count_out: list_out.length,
                        });
                        c++;
                        if (event_counting.length === c) {

                            res.json({
                                message: 'Event_Counting Info updated',
                                data: list
                            });

                        }
                    } else

                        event.presence_list.forEach(function (id) {

                            Presence.findById(id, function (err, presence) {


                                if (err) {
                                    res.send(err);
                                } else if (!presence) {
                                    res.writeHead(404);
                                    res.end("Can't Find presence :" + id);
                                } else {
                                    list_in.push(presence.user);

                                    count++;

                                    if (count === event.presence_list.length) {
                                        requests.forEach(function (request) {
                                            if (!list_in.includes(request.user)) {
                                                list_out.push(request.user);
                                            }
                                        });
                                        list.push({
                                            id: event.id,
                                            name: event.name,
                                            state: event.state,
                                            count_in: list_in.length,
                                            count_out: list_out.length,
                                        });
                                        c++;


                                        if (event_counting.length === c) {

                                            res.json({
                                                message: 'Event_Counting Info updated',
                                                data: list
                                            });

                                        }
                                    }
                                }
                            })
                        });
                });
            }
        });

    });
}

exports.getEventCountingById = function (req, res) {

    EventCounting.findById(req.headers.id, function (err, event_counting) {
        if (err)
            res.send(err);


        let count = 0;
        let list_in = []
        let list_out = []

        Request.find({event: event_counting.event, state: 2}, function (err, requests) {
            if (err) {
                res.send(err);
            } else if (!requests) {
                res.writeHead(404);
                res.end("Can't Find users");
            } else if (requests.length === 0) {

                res.json({
                    message: 'Event_Counting details loading..',
                    list_in: [],
                    list_out: []
                });

            } else {

                if (event_counting.presence_list.length === 0) {
                    let list_out_user = [];
                    let list_in_user = [];
                    requests.forEach(function (x) {

                        User.findById(x.user, function (err, user) {

                            if (err) {
                                res.send(err);
                            } else if (!user) {
                                res.writeHead(404);
                                res.end("Can't Find user :" + x.user);
                            } else {
                                list_out_user.push(user);
                                count++;
                                if (count === requests.length) {
                                    res.json({
                                        message: 'Event_Counting details loading..',
                                        list_in: list_in_user,
                                        list_out: list_out_user
                                    });
                                }
                            }


                        });

                    });


                } else

                    event_counting.presence_list.forEach(function (id) {
                        Presence.findById(id, function (err, presence) {
                            if (err) {
                                res.send(err);
                            } else if (!presence) {
                                res.writeHead(404);
                                res.end("Can't Find presence :" + id);
                            } else {
                                list_in.push(presence.user);
                                count++;
                                if (count === event_counting.presence_list.length) {
                                    requests.forEach(function (request) {
                                        if (!list_in.includes(request.user)) {
                                            list_out.push(request.user);
                                        }
                                    });
                                    let total = list_in.length + list_out.length;

                                    let list_in_user = [];
                                    let list_out_user = [];

                                    count = 0;
                                    list_in.forEach(function (x) {
                                        User.findById(x, function (err, user) {

                                            if (err) {
                                                res.send(err);
                                            } else if (!user) {
                                                res.writeHead(404);
                                                res.end("Can't Find user :" + presence.user);
                                            } else {
                                                list_in_user.push(user);
                                                count++;
                                                if (count === total) {
                                                    res.json({
                                                        message: 'Event_Counting details loading..',
                                                        list_in: list_in_user,
                                                        list_out: list_out_user
                                                    });
                                                }
                                            }


                                        });
                                    });
                                    list_out.forEach(function (x) {
                                        User.findById(x, function (err, user) {

                                            if (err) {
                                                res.send(err);
                                            } else if (!user) {
                                                res.writeHead(404);
                                                res.end("Can't Find user :" + presence.user);
                                            } else {
                                                list_out_user.push(user);
                                                count++;
                                                if (count === total) {
                                                    res.json({
                                                        message: 'Event_Counting details loading..',
                                                        list_in: list_in_user,
                                                        list_out: list_out_user
                                                    });
                                                }
                                            }
                                        });
                                    });

                                }
                            }
                        })
                    });
            }

        });
    });


};


exports.update = function (req, res) {
    EventCounting.findById(req.body.id, function (err, event_counting) {
        if (err)
            res.send(err);
        event_counting.name = req.body.name;
        event_counting.state = req.body.state;

        event_counting.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Event_Counting Info updated',
                data: event_counting
            });
        });
    });
};

exports.addPresence = function (req, res) {

    EventCounting.findById(req.body.event_counting, function (err, event_counting) {
        if (err) {
            res.send(err);
        } else if (!event_counting) {
            res.writeHead(404);
            res.end("Can't Find the EventCounting .");
        } else if (!event_counting.state) {

            res.writeHead(400);
            res.end("Counting is Disabled by the Admin");

        } else {


            Request.findOne({user : req.body.user}, function (err, request) {

                if (err) {
                    console.log(err);
                    res.send(err);
                } else if (!request) {
                    res.writeHead(404);
                    res.end("Can't Find the User .");
                } else if(request.state!==2){
                    res.status(444).json({
                        message:"This User doesn't have a proved Ticket"
                    });

                }else {

                    let presence = new Presence();
                    presence.user = request.user;
                    presence.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        } else {
                            let list = event_counting.presence_list;
                            list.push(presence._id);
                            event_counting.presence_list = list;
                            console.log(event_counting);

                            event_counting.save(function (err) {
                                if (err) {
                                    console.log(err);
                                    res.send(err);
                                } else {
                                    res.json(
                                        {
                                            message: "Presence add Successfullt",
                                            date: {
                                                event_counting: event_counting
                                            }
                                        }
                                    )
                                }

                            })
                        }
                    })
                }
            });
        }

    });


}


exports.delete = function (req, res) {
    EventCounting.remove({
        _id: req.headers.id
    }, function (err, event) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Event_Counting deleted'
        });
    });
};