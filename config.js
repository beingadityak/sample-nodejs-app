module.exports = {
    "database" : process.env["MONGO_URL"],
    "PORT" : process.env.PORT || 5000,
    "secretKey" : "JSnPyRocks",
    "options": {
            "server":
                {
                    "socketOptions":
                         {
                             "keepAlive": 300000,
                             "connectTimeoutMS": 30000
                         }
                }, 
            "replset": 
                { 
                    "socketOptions":
                    {
                         "keepAlive": 300000,
                         "connectTimeoutMS" : 30000
                    }
                }
            }
};
