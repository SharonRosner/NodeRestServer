var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.buses = [
    {id: 1, title: 'MyBus1', Description: 'A new one'},
    {id: 2, title: 'MyBus2', Description: 'An old one'},
    {id: 3, title: 'MyBus3', Description: 'A total loss'}
];

app.drivers = [
    {id: 1, name: 'David Samuels', Description: 'A senior'},
    {id: 2, title: 'Roberta Cohen', Description: 'Chief expert driver'},
    {id: 3, title: 'Harris Feudal', Description: 'A new guy'}
];

app.get('/', function (req, res) {
  res.send('Node rest server - please try a valid request');
});

app.get('/GetBuses', function (req, res) {
    res.send(app.buses);
});

app.get('/GetDrivers', function (req, res) {
    res.send(app.drivers);
});

app.get('/GetBusById/:id', function (req, res) {
    var matchingBus = app.buses.find((bus)=>{ return bus.id.toString() === req.param('id')});
    res.send(matchingBus);
});

var port = 8081;

app.listen(port, function () {
    console.log('Node rest server started on port: ' + port);
});