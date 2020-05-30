# Event Manager Backend

 You can edit this file from this [link](https://www.makeareadme.com/).

# End point 

 For local host 
```sh
http://localhost:8080/api
```
 For Heroku host 
```sh
https://event-manager-red.herokuapp.com/api
```

# Using Guide 

# Authentication


* The verification is done by a middleware function `verifyToken` located in the `UserController.js` file.
* The authentication is not required for all requests now but it will be soon.
* User should attach the `token` to the headers of each request.
  
| headers  | value |
| :---  | :--- |
| `x-access-token`  | the token |

# Event

## Get All Events

end point 
```http
GET /event
```

 Response example

```json
{
    "status": "success",
    "message": "Events retrieved successfully",
    "data": [
            {
                "imageLink": "https://eventmanagingapp.blob.core.windows.net/images/1590801587942",
                "tags": [
                    "5ec3c999af4e6d0017aa503b"
                ],
                "_id": "5eb9d9a86f813a3970e9ad68",
                "name": "Event A",
                "admin": "5ec1a1ccf5114925a815ce66",
                "start_date": "2020-06-12T23:02:00.000Z",
                "end_date": "2020-05-19T23:03:00.000Z",
                "description": "this is event A",
                "location": "Tunis",
                "createdAt": "2020-05-11T23:03:04.665Z",
                "updatedAt": "2020-05-30T01:19:48.252Z",
                "__v": 98
            }
    ]
}
```

## Get Nearest `n` Events

end point 
```http
GET /events/lasts
```

| headers  | value |
| :---  | :--- |
| `count`  | number of events to get |

 Response example

```json
{
    "message": "Events",
    "data": [
        {
                        "imageLink": "https://eventmanagingapp.blob.core.windows.net/images/1590801587942",
                        "tags": [
                            "5ec3c999af4e6d0017aa503b"
                        ],
                        "_id": "5eb9d9a86f813a3970e9ad68",
                        "name": "Event A",
                        "admin": "5ec1a1ccf5114925a815ce66",
                        "start_date": "2020-06-12T23:02:00.000Z",
                        "end_date": "2020-05-19T23:03:00.000Z",
                        "description": "this is event A",
                        "location": "Tunis",
                        "createdAt": "2020-05-11T23:03:04.665Z",
                        "updatedAt": "2020-05-30T01:19:48.252Z",
                        "__v": 98
                    }
}
```

## Get Events by most used Tags

> return a list of events divided in categories of most used tags

end point 
```http
GET /events/categories
```

| headers  | value |
| :---  | :--- |
| `number_tags`  | number of Tags|
| `number_events`  | number of events per tag |

 Response example

```json
{
    "message": "Categories",
    "data": [
        {
            "tag": {
                "count": 3,
                "_id": "5ec3add35b3b1c001757bb19",
                "name": "tagB",
                "__v": 0
            },
            "events": [
                {
                                "imageLink": "https://eventmanagingapp.blob.core.windows.net/images/1590801587942",
                                "tags": [
                                    "5ec3c999af4e6d0017aa503b"
                                ],
                                "_id": "5eb9d9a86f813a3970e9ad68",
                                "name": "Event A",
                                "admin": "5ec1a1ccf5114925a815ce66",
                                "start_date": "2020-06-12T23:02:00.000Z",
                                "end_date": "2020-05-19T23:03:00.000Z",
                                "description": "this is event A",
                                "location": "Tunis",
                                "createdAt": "2020-05-11T23:03:04.665Z",
                                "updatedAt": "2020-05-30T01:19:48.252Z",
                                "__v": 98
                            }
            ]
        }
    ]
}
```

## Get Events by  Tag

> return a list of events divided in categories of most used tags

end point 
```http
GET /events/tag
```

| headers  | value |
| :---  | :--- |
| `tag`  | the `id` of Tag|

 Response example

```json
{
    "message": "Events retrieved Successfully",
    "data": [
        {
                        "imageLink": "https://eventmanagingapp.blob.core.windows.net/images/1590801587942",
                        "tags": [
                            "5ec3c999af4e6d0017aa503b"
                        ],
                        "_id": "5eb9d9a86f813a3970e9ad68",
                        "name": "Event A",
                        "admin": "5ec1a1ccf5114925a815ce66",
                        "start_date": "2020-06-12T23:02:00.000Z",
                        "end_date": "2020-05-19T23:03:00.000Z",
                        "description": "this is event A",
                        "location": "Tunis",
                        "createdAt": "2020-05-11T23:03:04.665Z",
                        "updatedAt": "2020-05-30T01:19:48.252Z",
                        "__v": 98
                    }
    ]
}

```

## Get all  Events for a specific Staff

end point 
```http
Get /staff/events
```
| headers  | value |
| :---  | :--- |
| `user`  | the `id` of the staff |

 Response example


```json
{
    "events": [
        {
                        "imageLink": "https://eventmanagingapp.blob.core.windows.net/images/1590801587942",
                        "tags": [
                            "5ec3c999af4e6d0017aa503b"
                        ],
                        "_id": "5eb9d9a86f813a3970e9ad68",
                        "name": "Event A",
                        "admin": "5ec1a1ccf5114925a815ce66",
                        "start_date": "2020-06-12T23:02:00.000Z",
                        "end_date": "2020-05-19T23:03:00.000Z",
                        "description": "this is event A",
                        "location": "Tunis",
                        "createdAt": "2020-05-11T23:03:04.665Z",
                        "updatedAt": "2020-05-30T01:19:48.252Z",
                        "__v": 98
                    }
    ]
}
```

## Create Event

end point 
```http
POST /event
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |

 body example


```json
{
     "name" : "" ,
     "admin"  : "" ,
     "start_date" : "" ,
     "end_date" : "" ,
     "description" : "" ,
     "location" : "" 
}
```


The `admin` attribute contains the `id` of the user who created the event.

# Users


## Get all users

end point.
```http
GET /users
```
Response example :
```json
{
    "status": "success",
    "message": "User retrieved successfully",
    "data": [
        {
            "_id": "5eb9d8ea6f813a3970e9ad65",
            "name": "ahmed",
            "password": "ahmed",
            "email": "ahmed@gmail.com",
            "__v": 0
        }
        
    ]
}
```

# Tags

## Get All Tags

end point 
```http
GET /tags
```

 Response example

```json
{
    "message": "tags",
    "data": [
        {
            "count": 2,
            "_id": "5ec3120a4e373533e069fea1",
            "name": "fun",
            "__v": 0
        }
    ]
}
```

## Get Tags of an Event

end point 
```http
Get /event/tags
```
| headers  | value |
| :---  | :--- |
| `event`  | the `id` of the event |

 Response example


```json
{
    "message": "Event Tags",
    "data": [
        "5ec3120a4e373533e069fea1"
    ]
}
```

## Create new Tag

end point 
```http
POST /tags
```
| headers  | value |
| :---  | :--- |
| `name`  | tag name |

 Response example


```json
{
    "message": "New Tag created!",
    "data": {
        "count": 0,
        "_id": "5ec3126cebfc531238c445b2",
        "name": "music",
        "__v": 0
    }
}
```

## add Tag to Event

end point 
```http
POST /event/tags
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |
 body example


```json
{
	"event":"5eb9da096f813a3970e9ad6a",
	"tag":"5ec3120a4e373533e069fea1"
}
```


The `event` attribute contains the `id` of the event.
The `tag` attribute contains the `id` of the tag.

## Remove Tag from Event

end point 
```http
DELETE /event/tags
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |
 body example


```json
{
	"event":"5eb9da096f813a3970e9ad6a",
	"tag":"5ec3120a4e373533e069fea1"
}
```


The `event` attribute contains the `id` of the event.
The `tag` attribute contains the `id` of the tag.

# SocialMediaLinks ( Event )

## Get all  possible websites 

end point 
```http
GET /sociallinks
```


 Response example


```json
{
    "message": "List Links",
    "data": [
        "Facebook",
        "Youtube",
        "LinkedIn",
        "Instagram",
        "WhatsApp"
    ]
}
```

## Get all  Social Links for an Event

end point 
```http
Get /event/sociallinks
```
| headers  | value |
| :---  | :--- |
| `event`  | the `id` of the event |

 Response example


```json
{
    "social_media_links": [
        {
            "_id": "5ec7a52c87ae4c43ac26cb59",
            "title": "Event",
            "event": "5eb9d9a86f813a3970e9ad68",
            "link": "facebook.com",
            "website": "facebook",
            "__v": 0
        }
    ]
}
```


## Create Social Link

end point 
```http
POST /event/sociallinks
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |

 body example


```json
{
      "title":"Event",
      "event":"5eb9d9a86f813a3970e9ad68" ,
      "url":"facebook.com/achref.faidi",
      "website": "facebook"
    }
```


The `event` attribute contains the `id` of the event .

The `website` attribute contains the name of social media website , like `facebook` or `instagram` , this name will be used to get the correct icon for the socail media button . 

## update Social Link

end point 
```http
PUT /event/sociallinks
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |

 body example


```json
{
      "id": "",
      "title":"Event",
      "event":"5eb9d9a86f813a3970e9ad68" ,
      "url":"facebook.com/achref.faidi",
      "website": "facebook"
    }
```

The `id` attribute contains the `id` of the SocialMedia Link object .

The `event` attribute contains the `id` of the event .

## Delete Socail link

end point 
```http
DELETE /event/sociallinks
```
| headers  | value |
| :---  | :--- |
| `id`  | the `id` of the Social Link |

# Plan ( Offer )

## Get all  Plans for an Event

end point 
```http
Get /plan
```
| headers  | value |
| :---  | :--- |
| `event`  | the `id` of the event |

 Response example


```json
{
    "plans": [
        {
            "description": "this is Plan A",
            "options": [
                "option 1",
                "option 2"
            ],
            "cost": 12,
            "color": 0,
            "_id": "5eb9da786f813a3970e9ad6e",
            "name": "Plan A",
            "event": "5eb9d9a86f813a3970e9ad68",
            "createdAt": "2020-05-11T23:06:32.854Z",
            "updatedAt": "2020-05-11T23:16:56.688Z",
            "__v": 0
        }
    ]
}
```

## Create Plan

end point 
```http
POST /plan
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |

 body example


```json
{
      "name":"",
      "event":"" ,
      "description":"",
      "options": "",
      "cost": "",
      "color":""
    }
```


The `event` attribute contains the `id` of the event associated to the Plan.

## update Plan

end point 
```http
PUT /plan
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |

 body example


```json
{
      "id":"",
      "name":"",
      "event":"" ,
      "description":"",
      "options": "",
      "cost": "",
      "color":""
    }
```

The `id` attribute contains the `id` of the Plan .

The `event` attribute contains the `id` of the event associated to the Plan.

## Delete Plan

end point 
```http
DELETE /plan
```
| headers  | value |
| :---  | :--- |
| `id`  | the `id` of the Plan |

# Users


## Get all users

end point.
```http
GET /users
```
Response example :
```json
{
    "status": "success",
    "message": "User retrieved successfully",
    "data": [
        {
            "_id": "5eb9d8ea6f813a3970e9ad65",
            "name": "ahmed",
            "password": "ahmed",
            "email": "ahmed@gmail.com",
            "__v": 0
        }
        
    ]
}
```

## Add a new user
end .point
```http
POST /users
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |

 body example


```json
{
     "name" : "" ,
     "email"  : "" ,
     "password" : "" ,
     "number" : "" 
    }
```

# Plan ( Offer )

## Get all  Plans for an Event

end point 
```http
Get /plan
```
| headers  | value |
| :---  | :--- |
| `event`  | the `id` of the event |

 Response example


```json
{
    "plans": [
        {
            "description": "this is Plan A",
            "options": [
                "option 1",
                "option 2"
            ],
            "cost": 12,
            "color": 0,
            "_id": "5eb9da786f813a3970e9ad6e",
            "name": "Plan A",
            "event": "5eb9d9a86f813a3970e9ad68",
            "createdAt": "2020-05-11T23:06:32.854Z",
            "updatedAt": "2020-05-11T23:16:56.688Z",
            "__v": 0
        }
    ]
}
```

## Create Plan

end point 
```http
POST /plan
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |

 body example


```json
{
      "name":"",
      "event":"" ,
      "description":"",
      "options": "",
      "cost": "",
      "color":""
    }
```


The `event` attribute contains the `id` of the event associated to the Plan.

## update Plan

end point 
```http
PUT /plan
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |

 body example


```json
{
      "id":"",
      "name":"",
      "event":"" ,
      "description":"",
      "options": "",
      "cost": "",
      "color":""
    }
```

The `id` attribute contains the `id` of the Plan .

The `event` attribute contains the `id` of the event associated to the Plan.

## Delete Plan

end point 
```http
DELETE /plan
```
| headers  | value |
| :---  | :--- |
| `id`  | the `id` of the Plan |

# Staff 

## Get all  Staffs 

end point 
```http
Get /staff
```

 Response example


```json
{
    "status": "success",
    "message": "Staff retrieved successfully",
    "data": [
        {
            "permissions": [
                2,
                3
            ],
            "_id": "5eba114a7aaef4164cf583a4",
            "user": "5eb9d8ea6f813a3970e9ad65",
            "event": "5eb9d9a86f813a3970e9ad68",
            "createdAt": "2020-05-12T03:00:26.082Z",
            "updatedAt": "2020-05-12T14:57:24.785Z",
            "__v": 2
        }
  
    ]
}
```

## Get all  Staffs for an Event

end point 
```http
Get /event/staff
```
| headers  | value |
| :---  | :--- |
| `event`  | the `id` of the event |

 Response example


```json
{
    "staffs": [
        {
            "id": "5eba114a7aaef4164cf583a4",
            "permissions": [
                0,
                1,
                2
            ],
            "user": {
                "_id": "5eb9d8ea6f813a3970e9ad65",
                "name": "ahmed",
                "password": "ahmed",
                "email": "ahmed@gmail.com",
                "__v": 0
            }
        }
    ]
}
```


## Create Staff

end point 
```http
POST /plan
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |

 body example


```json
{
      "email": "",
      "event":"",
      "permissions":[1,5,8,9]
    }
```


The `email` attribute contains the `email` of the user  and The `event` attribute contains the `id` of the event.

The `permissions` attribute contains the list indexs of permissions allowed for a stuff.
//todo : add example 

## update Staff

end point 
```http
PUT /event/staff
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |

 body example


```json
 {
      "id": "",
      "permissions":[1,2,5]
    }
```

The `id` attribute contains the `id` of Staff .

The `event` attribute contains the `id` of the event associated to the Plan.

## Delete Staff

end point 
```http
DELETE /event/staff
```
| headers  | value |
| :---  | :--- |
| `id`  | the `id` of the Staff|

## Stuff Permissions 

> Show all possible Permissions

end point 
```http
GET /event/staff/permissions
```
 Response example


```json
{
    "permissions": [
        "permission 1",
        "permission 2",
        "permission 3",
        "permission 4",
        "permission 5"
    ]
}
```

# Requests 

| state code  | meaning |
| :---  | :--- |
| `0`  | Pending Request |
| `1`  | Unpaid Request |
| `2`  | Accepted Request |
| `3`  | Refused Request |



## Get all  Requests for an Event

end point 
```http
Get /event/request
```
| headers  | value |
| :---  | :--- |
| `event`  | the `id` of the event |

 Response example


```json
{
    "requests": [
        {
            "request": {
                "state": 2,
                "_id": "5ebb25ed285f53171c79f9ab",
                "user": "5eb9d8ea6f813a3970e9ad65",
                "event": "5eb9d9a86f813a3970e9ad68",
                "plan": "5eb9daf73765762ddc851c39",
                "createdAt": "2020-05-12T22:40:45.258Z",
                "updatedAt": "2020-05-12T23:52:01.690Z",
                "__v": 0
            },
            "user": {
                "_id": "5eb9d8ea6f813a3970e9ad65",
                "name": "ahmed",
                "password": "ahmed",
                "email": "ahmed@gmail.com",
                "__v": 0
            },
            "plan": {
                "description": "this is plan C",
                "options": [
                    "a",
                    "b",
                    "c"
                ],
                "cost": 8,
                "color": 1,
                "_id": "5eb9daf73765762ddc851c39",
                "name": "Plan C",
                "event": "5eb9d9a86f813a3970e9ad68",
                "createdAt": "2020-05-11T23:08:39.745Z",
                "updatedAt": "2020-05-11T23:08:39.745Z",
                "__v": 0
            }
        }
       
    ]
}
```

## Get all  Requests for a specific user

end point 
```http
GET /user/request
```
| headers  | value |
| :---  | :--- |
| `user`  | the `id` of the user |

 Response example


```json
{
    "requests": [
        {
            "request": {
                "state": 3,
                "_id": "5ebb25cd285f53171c79f9aa",
                "user": "5eb9d8ea6f813a3970e9ad65",
                "event": "5eb9d9a86f813a3970e9ad68",
                "plan": "5eb9da786f813a3970e9ad6e",
                "createdAt": "2020-05-12T22:40:13.361Z",
                "updatedAt": "2020-05-12T23:56:49.270Z",
                "__v": 0
            },
            "event": {
                "_id": "5eb9d9a86f813a3970e9ad68",
                "name": "Event A",
                "admin": "5eb9d8fd6f813a3970e9ad66",
                "start_date": "2020-05-12T23:02:00.000Z",
                "end_date": "2020-05-19T23:03:00.000Z",
                "description": "this is event A",
                "location": "Tunis",
                "createdAt": "2020-05-11T23:03:04.665Z",
                "updatedAt": "2020-05-11T23:03:04.665Z",
                "__v": 0
            },
            "plan": {
                "description": "this is Plan A",
                "options": [
                    "option 1",
                    "option 2"
                ],
                "cost": 12,
                "color": 0,
                "_id": "5eb9da786f813a3970e9ad6e",
                "name": "Plan A",
                "event": "5eb9d9a86f813a3970e9ad68",
                "createdAt": "2020-05-11T23:06:32.854Z",
                "updatedAt": "2020-05-11T23:16:56.688Z",
                "__v": 0
            }
        }
    ]
}
```

## Create Request

end point 
```http
POST /event/request
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |

 body example


```json
{
  "user":"",
  "event":"" ,
  "plan":""
}
```


The `user` attribute contains the `id` of the user .

The `event` attribute contains the `id` of the event .

The `plan` attribute contains the `id` of the plan .


## update Request

> Update the state of the request

end point 
```http
PUT /event/request
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |

 body example


```json
 {
      "id": "",
      "state":2
    }
```

The `id` attribute contains the `id` of Request .


## Delete Request

end point 
```http
DELETE /event/request
```
| headers  | value |
| :---  | :--- |
| `id`  | the `id` of the Request|

# Event Counting 

> Counting workshop's presence for example


## Get all  Event_Counting for an Event

end point 
```http
GET /event/presence
```
| headers  | value |
| :---  | :--- |
| `event`  | the `id` of the event |

 Response example


```json
{
    "message": "Event_Counting Info updated",
    "data": [
        {
            "id": "5ebc26592efff4311c42b34c",
            "name": "testing name",
	    "state": false,
            "count_in": 2,
            "count_out": 2
        }
    ]
}
```

## Get a Single Event_Counting By Id

end point 
```http
GET /presence
```
| headers  | value |
| :---  | :--- |
| `id`  | the `id` of the Event_Counting |

 Response example


```json
{
    "message": "Event_Counting details loading..",
    "list_in": [
        {
            "_id": "5eb9d8ea6f813a3970e9ad65",
            "name": "ahmed",
            "password": "ahmed",
            "email": "ahmed@gmail.com",
            "__v": 0
        }
    ],
    "list_out": [
        {
            "_id": "5eb9d8ea6f813a3970e9ad65",
            "name": "ahmed",
            "password": "ahmed",
            "email": "ahmed@gmail.com",
            "__v": 0
        }
    ]
}
```


## Create Event_Counting

end point 
```http
POST /event/presence
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |

 body example


```json
{
	"name" :"Morning Presence",
	"event":"5eb9d9d46f813a3970e9ad69"
}
```

## Add User To Presence List

end point 
```http
POST /event/presence/user
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |

 body example


```json
{
	"event_counting" :"5ebc26592efff4311c42b34c",
	"user":"5eb9d8ea6f813a3970e9ad65"
}
```


The `event_counting` attribute contains the `id` of the Event_Counting .
The `user` attribute contains the `id` of the user .




## update Event_Counting

> Update the name of the Event_Counting

end point 
```http
PUT /event/presence
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |

 body example


```json
 {
 	"id" : "5ebc26592efff4311c42b34c",
 	"name":"new name",
	"state":true
 }
```

The `id` attribute contains the `id` of Event_Counting .


## Delete Event_Counting

end point 
```http
DELETE /event/presence
```
| headers  | value |
| :---  | :--- |
| `id`  | the `id` of the Event_Counting|

# Event TimeLine 

## Get Time Slots for an Event

end point 
```http
Get /Event/timeslot
```
| headers  | value |
| :---  | :--- |
| `event`  | the `id` of the event |

 Response example


```json
{
    "timeslots": [
        {
            "_id": "5ebdfe8d65c84b23a842908c",
            "event": "5eb9d9a86f813a3970e9ad68",
            "start_date": "2020-05-14T21:04:58.816Z",
            "end_date": "2020-05-14T21:04:58.816Z",
            "title": "breakfast",
            "location": "resto",
            "__v": 0
        }
    ]
}
```

## Create TimeSlot

end point 
```http
POST /Event/timeslot
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |

 body example


```json
{
	"title" : "Workshop C" , 
	"location":"Amphi C",
	"event":"5eb9d9a86f813a3970e9ad68", 
	"start_date":"2020-05-15T03:04:58.816Z",
	"end_date":"2020-05-15T04:04:58.816Z"
}
```


The `event` attribute contains the `id` of the event associated to the TimeSlot.


## Delete TimeSlot

end point 
```http
DELETE /Event/timeslot
```
| headers  | value |
| :---  | :--- |
| `id`  | the `id` of the TimeSlot |

# Status Codes

EventManager returns the following status codes in its API:

> We should change these values

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 202 | `UPDATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |









