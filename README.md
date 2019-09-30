# NodeRestServer
A highly configurable node rest server that can serve as a mock server, or even as a real one. Implemented via 3 different ways, emphasizing the benefits of clean code

```javascript
{
    "applicationTitle": "Node rest server(improved)",
    "port": 8081,

    "data":{
        "buses": "buses.json",
        "drivers": "drivers.json"
    },

    "requests":[
        {
            "name": "GetBuses",
            "parameters":[],
            "dataName": "buses"
        },
        {
            "name": "GetDrivers",
            "parameters":[],
            "dataName": "drivers"
        },
        {
            "name": "GetBusById",
            "parameters":["id"],
            "dataName": "buses"
        }
    ]
}
```
