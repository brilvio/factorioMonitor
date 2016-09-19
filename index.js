//Lets require/import the HTTP module
var http = require('http');
var pjson = require('./package.json');

//Lets define a port we want to listen to
const PORT = 8080;

//We need a function which handles requests and send response
function handleRequest(request, response) {
    isFactorioRunning(function (res) {
        response.end(res);
    })

}

var exec = require('child_process').exec;


function isFactorioRunning(cb) {
    var res = {};
    res.server = pjson.serverName;
    var child;
    // executes `pwd`
    exec("ps aux | grep factorio", function (error, stdout, stderr) {
        sys.print('stdout: ' + stdout);
        sys.print('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        res.isRunning = true;
        cb(JSON.stringify(res));
    });
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(process.env.PORT || PORT, function () {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", process.env.PORT || PORT);
});