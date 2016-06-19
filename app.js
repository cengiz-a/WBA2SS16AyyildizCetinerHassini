var express = require('express');
var bodyParser = require('body-parser');

var redis = require("redis"),
    client = redis.createClient();

var app = express();
var jsonParser = bodyParser.json();

app.use(jsonParser);

app.post('/beispiel', function (req, res) {
	// ressourcen werden erstellt
	console.log(JSON.stringify(req.body));
	client.set('beispiel', JSON.stringify(req.body));
	res.end();
});

app.get('/beispiel', function (req, res) {
	// es wird eine ressource aufgerufen
	client.get("beispiel", function (err, reply) {
		console.log(reply);
		res.write(reply);
		//res.json(JSON.parse(reply));
		res.end();
	});
});

app.listen(3000);