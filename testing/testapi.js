// Nick Mandel 10/18/17 
// Simple test to call spoonacular testing key and production key 
// encapsulated inside mashapekey.json

var mkey = require("./mashapekey.json");		// imports mashapekey from json file
//console.log(mkey.testing);					// returns testing key as a string
//console.log(mkey.production);					// returns production key as a string


var unirest = require('unirest');				// imports unirest npm package to call apis


var query = "tomato";							// test query

// function to get spoonacular website recipe
// Input: query string, the result of the search bar
// Output: API callback info and JSON file of articles, menu items, grocery products, and recipes.
// recipes have a name, image, link, kvtable, and dataPoints objects
function getSiteRecipe(query) {
	unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/site/search?query="+query)
	.header("X-Mashape-Key", mkey.testing)
	.header("Accept", "application/json")
	.end(function (result) {
	  console.log(result.status, result.headers, result.body);
	});
}

