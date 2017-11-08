//var input = require('./out1.json');
var axios = require('axios');
const mkey = require('./mashapekey.json');
var out = require('./ingredres.json');
  
var config = {
    headers: {
      'X-Mashape-Key': mkey.testing,
      'Accept': 'application/json'
    }
 };

var parsej = (input) => {
	var input_ = JSON.stringify(input);
	var parsing = JSON.parse(input_);
	var keys = Object.keys(parsing);
	for (let i = 0; i < keys.length; i++) {
		var key = keys[i];
		var val = parsing[key];
		if (val.id !== null) {
			console.log(val.id);
			console.log(val.title);
			console.log(val.image);
		}
		if (key === "Recipes") {

			// loops over each recipe in json 
			for (let j = 0; j < val.length; j++) {
				console.log(val[j].name);	// returns name
				console.log(val[j].link);	// returns link
				console.log(val[j].image);	// returns image link
				console.log("\n\n");
				console.log(val[j].dataPoints[1].value+"\n");
				console.log(val[j].dataPoints[2].value+"\n");
				console.log(val[j].dataPoints[3].value+"\n");
				console.log(val[j].dataPoints[4].value+"\n");
			}
		}
	}
}

parsej(out);


