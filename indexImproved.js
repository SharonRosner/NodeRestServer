var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send(`${config.applicationTitle} - please try a valid request`);
});

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

for(var dataName in config.data){
    var fileName = config.data[dataName];
    app[dataName] = JSON.parse(fs.readFileSync(fileName, 'utf8'));
}

config.requests.forEach(requestSetting => {
    var paramsString = '';
    requestSetting.parameters.forEach(parameter => {
        paramsString += `/:${parameter}`;
    });
    app.get(`/${requestSetting.name}${paramsString}`, function (req, res) {
        if(requestSetting.parameters.length>0){
            var matchingData = app[requestSetting.dataName].find((dataEntry)=>{ 
                var found = true;
                requestSetting.parameters.forEach(parameter => {
                    found &= (dataEntry[parameter].toString() === req.param(parameter));
                });

                return found;
            });

            res.send(matchingData);
        }
        else res.send(app[requestSetting.dataName]);
    });
});


app.listen(config.port, function () {
    console.log(`${config.applicationTitle} started on port: ${config.port}`);
});