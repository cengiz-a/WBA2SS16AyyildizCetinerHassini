var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var jsonParser = bodyParser.json();

app.use (express.static(WBA2SS16AyyildizCetinerHassini + '/public'));

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.end(err.status + ' ' + err.messages);

});

app.use(function(req,res,next) {
	console.log('Time: %d ' + ' Request-Pfad: ' + req.path, Date.now());
	next();
})

app.get('/beispiel', jsonParser, function (req, res) {
	// es wird eine ressource aufgerufen
});

app.post('/beispiel', jsonParser, function (req, res) {
	// ressourcen werden erstellt
});

app.all('/beispiel', function (req, res, next) {
	console.log('Irgendwas, irgendwas!');
	next();
});


app listen(3000);