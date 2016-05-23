var fs = require('fs');
var myChalk = require('chalk');



fs.readFile("./wolkenkratzer.json", function(err, data) {

	var jsonObjekt = JSON.parse(data.toString());

	for( var i = 0; i < jsonObjekt.wolkenkratzer.length; i++) {

		console.log(myChalk.red.bold("Name: " + jsonObjekt.wolkenkratzer[i].name));
		console.log(myChalk.blue("Stadt: " + jsonObjekt.wolkenkratzer[i].stadt));
		console.log(myChalk.green("Hoehe: " + jsonObjekt.wolkenkratzer[i].hoehe));
		console.log("--------------------");

	}


	jsonObjekt.wolkenkratzer.sort( function(a, b) {

		if (a.hoehe > b.hoehe) {
			return -1;
		}
		if(a.hoehe < b.hoehe) {
			return 1;
		}
		return 0;

	});


	fs.writeFile("./wolkenkratzer_sortiert.json", JSON.stringify(jsonObjekt), function(err) {});

});









































