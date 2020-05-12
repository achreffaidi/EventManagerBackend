# Event Manager Backend

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

## Get all  Plans for a Event

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





# Status Codes

Gophish returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |
