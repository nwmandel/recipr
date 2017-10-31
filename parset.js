//var input = require('./out1.json');
var axios = require('axios');
const mkey = require('./mashapekey.json');
var out = require('./out2.json');
  
var config = {
    headers: {
      'X-Mashape-Key': mkey.testing,
      'Accept': 'application/json'
    }
 };

function getSiteRecipe_ax(query, config) {
	var result = "";
	axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/site/search?query="+query, config)
		.then(res => {return res.data});
	}

var parsej = (input) => {
	var obj = JSON.parse(input, (key, val) => {
		if (key == "Recipes") {
			console.log("found recipies");
		} else {
			console.log("didnt find recipies" + val);
		}
	});
}


//var api = getSiteRecipe_ax("tomato", config);
//console.log(api);
parsej(out);
