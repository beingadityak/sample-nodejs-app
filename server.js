var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');


var config = require('./config')
var database_name = "userstoriesdb";
var db_url = config.database + "/" + database_name;
mongoose.connect(db_url,config.options,function(err){
    if(err)
    {
        console.log('Database connection error : '+err);
    }
    else
    {
        console.log('Database connection success');
    }
});

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// handle frontend
app.use(express.static(__dirname + '/public'));

var api = require('./app/routes/api')(app,express, io);
app.use('/api',api);

app.get('*',function(req,res){
    res.sendFile(__dirname + '/public/app/views/index.html');
});

http.listen(config.PORT, function(err){
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log('Server Started @ Port : '+config.PORT);
    }
});