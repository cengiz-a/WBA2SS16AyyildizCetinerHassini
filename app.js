var express = require('express');
var bodyParser = require('body-parser');

var redis = require("redis");

var client = redis.createClient();

var app = express();
var jsonParser = bodyParser.json();

app.use(jsonParser);

app.post('/todos', function (req, res) {
	// ressourcen werden erstellt
	// Body in todo speichern
	var todo = req.body;

	client.incr('todoIds', function(err, result ) {
		//in result wird das gespeichert, was die methode (hier .incr) nach seinem aufruf zurückliefert. also 0 in diesem fall
		// Id wurde erhöht
		// Id muss dem todo zugewiesen werden
		// Zum schluss muss das todo nurnoch gespeichert werden
		
		todo.id = result; 

		// mit todo.id wird nicht nur auf id zugegriffen, sondern auch id erstellt. das heist es muss kein id gegeben haben irgendwo.
		// da todo das req.body beinhaltet, wird die id nach JSON.stringify(todo) einfach hinten drangehängt.
		// sehr wichtig noch, dass JS sehr eng mit JSON zusammenhängt. Alle Objekte in JS
		// lassen sich in JSON darstellen.


		// Body in die Datenbank speichern
		client.rpush('todos', JSON.stringify(todo), function(err, result) { //rpush ist eine Methode, die in redis einen Array erzeugt. mit r kann festgelegt werden, welches das erste element ist. danach kann mit lrange alles ausgegeben werden. irgendwie. kann ich alles in der redis api doku nachlesen.
			if(err) {
				console.log('du hast was falsch gemacht, bitch');
			}
			res.end();
		});
	});
});

// delete alles, einfach alles, hahaha
 app.delete ('/todos', function(req, result) {
	client.del('todos', function(err, res) {
		result.end();
	});
});

app.get('/todos', function (req, res) {
	// es wird eine ressource aufgerufen
	client.lrange('todos', 0, -1, function(err, response) {
		var todos = JSON.parse('[' + response + ']');

		var filtered = todos.filter(function(todo) {
			return todo.userId !== null;
		});

		res.json(filtered);
		res.end();
	});
});

app.put('/todos/:id', function(req, res) {
	var todo = req.body;
	todo.id = req.params.id;

	client.lset('todos', req.params.id, JSON.stringify(todo), function(err, response) {
		res.end();
	});
});
 

app.get('/todos/:id', function (req, res) {
	// es wird eine ressource aufgerufen
	client.lrange('todos', 0, -1, function(err, response) {
		var todos = JSON.parse('[' + response + ']');

		var filtered = todos.filter(function(todo) {
			return parseInt(todo.id) === parseInt(req.params.id);
		});

		res.json(filtered[0]);
		res.end();
	});
});

app.delete ('/todos/:id', function (req, result) {
	client.lset('todos', req.params.id, JSON.stringify({
		userId: null,
		place: null,
		time: null,
		name: null
	}), function(err, res) {
		result.end();
	});
});


// USERS
app.post('/users', function (req, res) {
	// ressourcen werden erstellt
	// Body in todo speichern
	var user = req.body;

	client.incr('userIds', function(err, result ) {
		user.id = result; 

		client.rpush('users', JSON.stringify(user), function(err, result) { 
			res.end();
		});
	});
});

// delete alles, einfach alles, hahaha
 app.delete ('/users', function(req, result) {
	client.del('users', function(err, res) {
		result.end();
	});
});

app.get('/users', function (req, res) {
	// es wird eine ressource aufgerufen
	client.lrange('users', 0, -1, function(err, response) {
		var users = JSON.parse('[' + response + ']');

		var filtered = users.filter(function(user) {
			return user.name !== null;
		});

		res.json(filtered);
		res.end();
	});
});

app.put('/users/:id', function(req, res) {
	var user = req.body;
	user.id = req.params.id;

	client.lset('users', req.params.id, JSON.stringify(user), function(err, response) {
		res.end();
	});
});
 

app.get('/users/:id', function (req, res) {
	// es wird eine ressource aufgerufen
	client.lrange('users', 0, -1, function(err, response) {
		var users = JSON.parse('[' + response + ']');

		var filtered = users.filter(function(user) {
			return parseInt(user.id) === parseInt(req.params.id);
		});

		res.json(filtered[0]);
		res.end();
	});
});

app.delete ('/users/:id', function (req, result) {
	client.lset('users', req.params.id, JSON.stringify({
		name: null
	}), function(err, res) {
		result.end();
	});
});

app.listen(3000);