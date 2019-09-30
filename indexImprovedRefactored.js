
function requireDependencies() {
    this.express = require('express');
    this.bodyParser = require('body-parser');
    this.fs = require('fs');
}

function establishAppContext() {
    var app = express();
    app.use(bodyParser.json());
    app.get('/', function (req, res) {
        res.send(`${config.applicationTitle} - please try a valid request`);
    });
    this.app = app;
}

function loadConfiguration() {
    this.config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
}

function readDataFromFiles() {
    for (var dataName in config.data) {
        var fileName = config.data[dataName];
        app[dataName] = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    }
}

function setupRequestsFromConfig() {
    config.requests.forEach(requestSetting => {
        setupRequest(requestSetting);
    });
}

function setupRequest(requestSetting) {
    var paramsString = buildParameterString(requestSetting);
    app.get(`/${requestSetting.name}${paramsString}`, function (req, res) {
        if (requestSetting.parameters.length > 0) {
            var matchingData = app[requestSetting.dataName].find((dataEntry) => {
                var found = true;
                requestSetting.parameters.forEach(parameter => {
                    found &= (dataEntry[parameter].toString() === req.param(parameter));
                });
                return found;
            });
            res.send(matchingData);
        }
        else
            res.send(app[requestSetting.dataName]);
    });
}

function buildParameterString(requestSetting) {
    var paramsString = '';
    requestSetting.parameters.forEach(parameter => {
        paramsString += `/:${parameter}`;
    });
    return paramsString;
}

function startServer() {
    app.listen(config.port, function () {
        console.log(`${config.applicationTitle} started on port: ${config.port}`);
    });
}


requireDependencies();

establishAppContext();
loadConfiguration();
readDataFromFiles();

setupRequestsFromConfig();

startServer();