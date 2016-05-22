var express = require("express");

var app = express();


app.get('/', function (req, res, next) {
	next();
})
app.post('/entry/{:id}', jsonParser, function (req, res)
{
	// erstellt einen neuen Entry mit Zeit, Ort und persönlicher Notiz
})

app.listen(3000);
