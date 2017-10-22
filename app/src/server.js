const fs = require('fs');
const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer');
var mkey = require("../../mashapekey.json");		// imports mashapekey from json file
var unirest = require('unirest');				// imports unirest npm package to call apis
const server = express();
const cors = require('cors');

server.use(cors());

const bundleRenderer = createBundleRenderer(
	require('../dist/vue-ssr-bundle.json'),
	{
		template: fs.readFile('../index.html', function read(err, data) {
			if (err) throw err;
			console.log(data);
		})
	}
);

// serve static assets from ./dist on /dist route
server.use('../dist', express.static('dist'));

// render all other routes with bundleRenderer
server.get('*', (req, res) => {
	bundleRenderer
	  // renders directly to response stream
	  // the argument passed as context to main.server.js
	  .renderToStream({url: req.path})
	  .pipe(res);
});

// Function to get spoonacular website recipe
// Input: query string, the result of the search bar
// Output: API callback info and JSON file of articles, menu items, grocery products, and recipes.
// recipes have a name, image, link, kvtable, and dataPoints objects
function getSiteRecipe(query) {
	unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/site/search?query="+query)
	.header("X-Mashape-Key", mkey.testing)
	.header("Accept", "application/json")
	.end(function (result) {
		return result.body;

	  //console.log(result.status, result.headers, result.body);
	});
}


// simple test to host data on server
server.get('http://localhost:8081/api', (req, res) => {
	res.send("hello from server");
});

//var api_res = getSiteRecipe("pasta");

// bind server to this port
const bind = process.env.PORT || 8081;
server.listen(bind, () => {
	console.log('Server listening at ${bind}');
});
