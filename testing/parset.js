var recipeid = require('./recipeid.json');          // searched beef recipe id
var ethn = require('./ethres.json');                // searched chicken with ethnicity thai
var ingred_nutr = require('./ingredres.json');      // searched apple
var gibberish = require('./gibberish.json');        // invald stuff


// set up for unit tests

// set up for parseRecipeID
var parseRecipeID = (input) => {
    // exercise
    console.log("==========Result for parseRecipeID===================\n");
	var input_ = JSON.stringify(input);
	var parsing = JSON.parse(input_);
	var keys = Object.keys(parsing);
	for (let i = 0; i < keys.length; i++) {
		var key = keys[i];
		var val = parsing[key];
		if (key === "sourceUrl") {

            // verify
            if (val !== "http://www.epicurious.com/recipes/food/views/Char-Grilled-Beef-Tenderloin-with-Three-Herb-Chimichurri-235342") {
                console.log("########### ERROR IN parseRecipeID: "+ val+ "###########");
                break;
            }
			console.log("Source URL is: " + val + "\n");
		}
	}
    // tear down
    console.log("===========END OF parseRecipeID=======================\n\n\n");
}

// set up parseRecpieEthnicity
var parseRecipeEthnicity = (input) => {
    // exercise
    console.log("==========Result for parseRecipeEthnicity===================\n");
    var input_ = JSON.stringify(input);
    var parsing = JSON.parse(input_);
    var keys = Object.keys(parsing);
    for (let i = 0; i < keys.length; i++) {
        var key = keys[i];
        var val = parsing[key];

        if (key === "results") {
              // iterate through each value
              for (let j = 0; j < val.length; j++) {

                // verify title
                if (val[j].title != "Thai Chicken Lettuce Wraps") {
                    console.log("########### ERROR IN parseRecipeEthnicity in title: "+ val[j].title+ " ###########");
                    break;
                }

                // verify image
                if (val[j].image != "thai-chicken-lettuce-wraps-873729.jpg") {
                    console.log("########### ERROR IN parseRecipeEthnicity in image: "+ val[j].image+" ###########");
                    break;
                }

                // verify id
                if (val[j].id != 873729) {
                    console.log("########### ERROR IN parseRecipeEthnicity in id: "+val[j].id+"###########");
                    break;
                }

                console.log("Recipe Name is: " + val[j].title + "\n");
                console.log("Image link is: " + val[j].image + "\n");
                console.log("Recipe ID is: " + val[j].id + "\n");
            }
        }
    }
    // tear down
    console.log("===========END OF parseRecipeEthnicity=====================\n\n\n");
}

// set up parseRecipeIngredients
var parseRecipeIngredients = (input) => {
    // exercise
    console.log("==========Result for parseRecipeIngredients===================\n");
    var input_ = JSON.stringify(input);
    var parsing = JSON.parse(input_);
    var keys = Object.keys(parsing);
    for (let i = 0; i < keys.length; i++) {
        var key = keys[i];
        var val = parsing[key];

        // verify title
        if (val.title != "Apple fritters") {
            console.log("########### ERROR IN parseRecipeIngredients in title: " +val.title+" ###########");
            break;

        }

        // verify image
        if (val.image != "https://spoonacular.com/recipeImages/Apple-fritters-556470.jpg") {
            console.log("########### ERROR IN parseRecipeIngredients in image: "+val.image+" ###########");
            break;
        }

        // verify id
        if (val.id != 556470) {
            console.log("########### ERROR IN parseRecipeIngredients in id: "+ val.id+" ###########");
            break;

        }

        // verify missing ingredients count
        if (val.missedIngredientCount != 0) {
            console.log("########### ERROR IN parseRecipeIngredients in missedIngredientCount: "+val.missedIngredientCount+" ###########");
            break;

        }

        // verify used ingredients count
        if (val.usedIngredientCount != 3) {
            console.log("########### ERROR IN parseRecipeIngredients in usedIngredientCount: "+ val.usedIngredientCount+" ###########");
            break;

        }

        console.log("Recipe Name is: " + val.title + "\n");
        console.log("Image link is: " + val.image + "\n");
        console.log("Recipe ID is: " + val.id + "\n")
        console.log("Missing Ingredients Count: " + val.missedIngredientCount + "\n");
        console.log("Used Ingredients Count: " + val.usedIngredientCount + "\n");

    }
    console.log("===========END OF parseRecipeIngredients=====================\n\n\n");
}

// set up for parseNutrients
var parseNutrients = (input) => {
    // exercise
    console.log("==========Result for parseNutrients====================\n");
    var input_ = JSON.stringify(input);
    var parsing = JSON.parse(input_);
    var keys = Object.keys(parsing);
    for (let i = 0; i < keys.length; i++) {
        var key = keys[i];
        var val = parsing[key];


        // verify title
        if (val.title != "Apple fritters") {
            console.log("########### ERROR IN parseRecipeIngredients in title: "+ val.title+" ###########");
            break;

        }

        // verify image
        if (val.image != "https://spoonacular.com/recipeImages/Apple-fritters-556470.jpg") {
            console.log("########### ERROR IN parseRecipeIngredients in image: "+val.image+" ###########");
            break;
        }

        // verify id
        if (val.id != 556470) {
            console.log("########### ERROR IN parseRecipeIngredients in id: "+val.id+" ###########");
            break;

        }


        console.log("Recipe Name is: " + val.title + "\n");
        console.log("Image link is: " + val.image + "\n");
        console.log("Recipe ID is: " + val.id + "\n");
    }
    // tear down
    console.log("===========END OF parseNutrients=====================\n\n\n");

}


// run all unit tests
function runAllUnitTests() {

    // set up and excersise
    parseRecipeID(recipeid);
    parseRecipeIngredients(ingred_nutr);
    parseRecipeEthnicity(ethn);
    parseNutrients(ingred_nutr);


    // gibberish test
    console.log("\n\n%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\nBeginning Gibberish Test\n")
    parseRecipeIngredients(gibberish);
    parseNutrients(gibberish);
}

runAllUnitTests();

