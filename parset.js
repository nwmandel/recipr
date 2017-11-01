//var input = require('./out1.json');
var axios = require('axios');
const mkey = require('./mashapekey.json');
var out = require('./out3.json');
  
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
		if (key === "Recipes") {

			// loops over each recipe in json 
			for (let j = 0; j < val.length; j++) {
				console.log(val[j].name);	// returns name
				console.log(val[j].link);	// returns link
				console.log(val[j].image);	// returns image link
			}
		}
	}
}

parsej2(out);


