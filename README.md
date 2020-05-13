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

# Event

## Get All Events

end point 
```http
GET /event
```

 Response example


```javascript
{
    "status": "success",
    "message": "Events retrieved successfully",
    "data": [
        {
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


```javascript
{
     "name" : "" ,
     "admin"  : "" ,
     "start_date" : "" ,
     "end_date" : "" ,
     "description" : "" ,
     "location" : "" ,
}
```


The `admin` attribute contains the `id` of the user who created the event.

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


```javascript
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
        },
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


```javascript
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


```javascript
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


```javascript
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
        },
  
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


```javascript
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
        },
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


```javascript
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


```javascript
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


```javascript
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


```javascript
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
        },
       
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


```javascript
{
  "user":"",
  "event":"" ,
  "plan":""
}
```


The `user` attribute contains the `id` of the user .

The `event` attribute contains the `id` of the event .

The `plan` attribute contains the `id` of the plan .



## update Example

> Update the state of the event

end point 
```http
PUT /event/request
```
| headers  | value |
| :---  | :--- |
| `Content-Type`  | `application/json` |

 body example


```javascript
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

# Users


## Get all users

end point.
```http
GET /users
```
Response example :
```javascript
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
        },
        
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


```javascript
{
     "name" : "" ,
     "email"  : "" ,
     "password" : "" ,
     "number" : "" ,
    }
```



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









