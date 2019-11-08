var User = require('../models/user');
var Story = require('../models/story');
var config = require('../../config');

var sKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

function createToken(user)
{
    var token = jsonwebtoken.sign({
        id : user._id,
        name : user.name,
        username : user.username
    },sKey, {
        expiresIn : "2d"                // 2 days
    } );
    return token;
}

module.exports = function(app, express, io){

    var api = express.Router();

// get all stories
    
    api.get('/all_stories',function(req,res){

        Story.find({}, function(err,stories){

            if(err){
                res.json({message: 'Something Wrong Happened', error: err});
                return;
            }

            res.json(stories);
        });

    });


// registration endpoint

    api.post('/signup', function(req,res){

        var user = new User({
            name : req.body.name,
            username : req.body.username,
            password : req.body.password
        });
        var token = createToken(user);
        user.save(function(err){
            if(err)
            {
                console.log(err);
                return err;
            }

            res.json({
                'success' : true,
                'message' : 'User registered successfully !',
                'token' : token
            });
        });

    });

    // get all user info

    api.get('/users', function(req,res){
        User.find({}, function(err,users){
            if(err)
            {
                console.log(err);
                return err;
            }
            res.json(users);
        });
    });

// user login

    api.post('/login',function(req,res){
        User.findOne({
            username : req.body.username
        }).select('name username password').exec(function(err,user){
            if(err) throw err;
            if(!user)
            {
                res.json({message : "User doesn't exist"});
            }
            else if(user)
            {
                var validPassword = user.comparePassword(req.body.password);
                if(!validPassword)
                {
                    res.json({message : 'invalid password'});
                }
                else
                {
                    // create token
                    var token = createToken(user);
                    res.json({
                        success : true,
                        message : "Login Successful",
                        token : token
                    });
                }
            }
        });
    });

    // authentication middleware

    api.use(function(req,res,next){
        console.log('A Visitor is here !');
        var token = req.body.token || req.param('token') ||  req.headers['x-access-token'];

        // check if token exists
        if(token)
        {
            jsonwebtoken.verify(token, sKey, function(err, decoded){
                if(err)
                {
                    res.status(403).send({success : false, message : "Authorization failed !"});
                }
                else
                {
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else
        {
            res.status(403).send({success : false, message : "No Token Provided !"});
        }

    });

    // after middleware, all routes written after it are required to authenticate

    // chaining of routes
    api.route('/')
        .post(function(req,res){                // add a new post
            var story = new Story({
                creator : req.decoded.id,
                content : req.body.content
            });
            story.save(function(err, newStory){
                if(err)
                {
                    console.log(err);
                    res.send(err);
                    return;
                }
                io.emit('story',newStory);
                res.json({message : "New Story Created !"});
            });
        })
        .get(function(req,res){
            Story.find({ creator : req.decoded.id }, function(err, stories){
                if(err)
                {
                    console.log(err);
                    res.send(err);
                }
                res.json(stories);
            });
        });

    // for app frontend
    api.get('/me', function(req,res){
        res.json(req.decoded);
    });

    return api;
}