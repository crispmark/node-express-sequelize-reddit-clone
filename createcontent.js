var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var database = require('./database.js');
var config = require('./config.json');

var port = config.port;
if(!port)
port = process.env.PORT;
var ip = config.server;
if (!ip)
ip = process.env.IP;

var parser = bodyParser.urlencoded({ extended: false });

app.get('/CreateContent', function(req, res){
    res.sendFile('/CreateContent/index.html', {root: __dirname });
});

app.post('/CreateContent', parser, function(request, response){
    database.postContent(request.cookies.sessionId, request.body.title, request.body.url)
    .then(function(result){
        //redirect to content page
        response.send("Content Page");
    })
    .catch(function(e){
        response.send("You are not logged in!!!");
    });
});

var server = app.listen(port, ip, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
