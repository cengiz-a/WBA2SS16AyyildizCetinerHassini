var redis = require("redis"),
client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});

client.set("name", "cengiz", redis.print); 

client.get('name', function(error, reply) {
	console.log(reply);
});