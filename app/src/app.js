import axios from 'axios';
import Vue from 'vue';
const mkey = require('../../mashapekey.json');

var config = {
  headers: {
    'X-Mashape-Key': mkey.testing,
    'Accept': 'application/json'
  }
};

export default {
  data () {
    return {
      api_call: 0,
      curr_id: 0,
	  curr_source: '',
      title: 'Recipr',
      qres: '',
      pres: '',
      rlink: [],     //array for recipe links
      imlink: [],    //array for the image links
      input: '',
      buttonClicked: false,
      ingredArray: [],
      ingredList: "",
      sampleIngredients: [
        'Egg', 'Butter', 'Milk', 'Flour', 'Cheese', 'Rice', 'Onion', 'Garlic', 'Sugar', 'Salt', 'Pepper', 'Vegetable Oil', 'Olive Oil'
      ],
      lastClicked: '',
      chosenCuisines: [],
      cuisines: [
         'African', 'American','British','Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American','Mexican', 'Middle eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'
      ],

      chosenIntolerances: [],
      intolerances: [
         'dairy', 'egg', 'gluten', 'peanut', 'sesame', 'seafood', 'shellfish', 'soy', 'sulfite', 'tree nut', 'wheat'
      ],

      maxCalories: '2000',
      maxCarbs: '400',
      maxFat: '100',
      maxProtein: '250',
      minCalories: '0',
      minCarbs: '0',
      minFat: '0',
      minProtein: '0',

      diets: ['none', 'pescatarian', 'lacto vegetarian', 'ovo vegetarian', 'vegan', 'vegetarian'],
      chosenDiet: 'none',
      checkbox: true,
      
      // For the table
      headers: [
        {

          text: 'Recipe',
          text: 'Results',

          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
      ],
      
      // Holds actual items from the api calls
      // Currently holds food_id, value, name, calories,
      // fat, carbs, protein, image, and link of the item
      items: [
      ]
    }
  },

  methods: {
    getSiteRecipe: function(query) {  
        this.api_call = 1;    // defined to be 1 for api called
        this.qres = '';       // clear previous input
        this.pres = '';       // clear previous input
        var dietSelection = "";
        if(this.chosenDiet != "none") {
           dietSelection = this.chosenDiet + " ";
        }
        axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/site/search?query="+dietSelection+query, config)
          .then(res => {
            this.parsej(res.data);
            this.qres = res.data;
            this.api_limit(res);
            console.log(res.status, res.header);
          })
          // catch errors and print messages to log
          .catch((err) => {
            if (err.res) {
              console.log(err.res.data);
              console.log(err.res.status);
              console.log(err.res.headers);
            } else if (err.req) {
              console.log(err.req);
            } else {
              console.log('Error in getSiteRecipe: ', err.message);
            }
          });
    },

    getIngredientsRecipe: function() {
      this.api_call = 2;     // defined to be 2 for api called
      this.ingredList = this.ingredArray.join("%2C ");
      var ranking;
      if(this.checkbox){
         ranking = "&ranking=1";
      }else{
         ranking = "&ranking=2";
      }
      axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients="+this.ingredList+"&limitLicense=false&number=3"+ranking, config)
        .then(res => {
          this.parsej(res.data);
          this.qres = res.data;
          this.api_limit(res);
          console.log(res.status, res.header);
        })
        .catch((err) => {
            if (err.res) {
              console.log(err.res.data);
              console.log(err.res.status);
              console.log(err.res.headers);
            } else if (err.req) {
              console.log(err.req);
            } else {
              console.log('Error in getIngredientsRecipe: ', err.message);
            }
          });
    },
    
    getEthnicityRecipe: function(query) {
      this.api_call = 3;    // defined to be 3 for api called
      var dietSelection = "";
      if(this.chosenDiet != "none") {
         dietSelection = "&diet=" + this.chosenDiet;
      }
      var cuisineString = this.chosenCuisines.join("%2C");
      var intoleranceString = "";
      if(this.chosenIntolerances.length > 0){
         intoleranceString = "&intolerances=" + this.chosenIntolerances.join("%2C");
      }
      
      axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?cuisine="+cuisineString+dietSelection+intoleranceString+"&number=3&offset=0&query="+query+"&type=main+course", config)
        .then(res => {
          this.parsej(res.data);
          this.qres  = res.data;
          this.api_limit(res);
          console.log(res.status, res.header);   
        })

          // catch errors and print messages to log
          .catch((err) => {
            if (err.res) {
              console.log(err.res.data);
              console.log(err.res.status);
              console.log(err.res.headers);
            } else if (err.req) {
              console.log(err.req);
            } else {
              console.log('Error', err.message);
            }
          });
    },

    // api call for nutrients section 
    getNutrientsRecipe: function() {
      //this.api_call = 4;    // defined to be 4 for api called
      this.api_call = 2; //same api call as ingredients
        axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByNutrients?maxCalories="+this.maxCalories+"&maxCarbs="+this.maxCarbs+"&maxFat="+this.maxFat+"&maxProtein="+this.maxProtein+"&minCalories="+this.minCalories+"&minCarbs="+this.minCarbs+"&minFat="+this.minFat+"&minProtein="+this.minProtein+"&number=10&offset=0&random=false", config)

        .then(res => {
          this.parsej(res.data);
          this.qres = res.data;
          this.api_limit(res);
          console.log(res.status, res.headers);
        })

        .catch((err) => {
          if (err.res) {
            console.log(err.res.data);
            console.log(err.res.status);
            console.log(err.res.headers);
          } else if (err.req) {
            console.log(err.req);
          } else {
            console.log('Error in getNutrientsRecipe: ', err.message);
          }
        })
    },

    // api call that takes in recipe id and we'll use it to
    // get the link to the original recipe 
    getRecipeFromId: function(id_) {
      this.curr_id = id_;
      
      axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+id_+"/information?includeNutrition=false",config)
        .then(res => {
          this.parseFromID(res.data);
          this.qres = res.data;
          this.api_limit(res);
          console.log(res.status, res.header);   
        })

          // catch errors and print messages to log
          .catch((err) => {
            if (err.res) {
              console.log(err.res.data);
              console.log(err.res.status);
              console.log(err.res.headers);
            } else if (err.req) {
              console.log(err.req);
            } else {
              console.log('Error in getRecipeFromId: ', err.message);
            }
        });
          
    },

    parsej: function(input) {        
      for (let i = 0; i < this.items.length; i++) {
        if (this.items !== null) 
          this.items.pop();    // pop each of the elements in items
          this.imlink.pop();   // clear image link
          this.rlink.pop();    // clear recipe link
      }

      var input_ = JSON.stringify(input); // turn return api call to string
      var parsing = JSON.parse(input_);   // parse the string
      var keys = Object.keys(parsing);    // get keys from json

      // loop over keys
      for (let i = 0; i < keys.length; i++) {
        var key = keys[i];       // current key
        var val = parsing[key];  // value of current key
        // if val.id exists then its probably the ingredients call
        switch(this.api_call) {
          
          // 1 is for getSiteRecipe
          case 1:
              // if we reach recipes, then parse needed data below
              if (key === "Recipes") {
                // loops over each recipe in json 
                for (let j = 0; j < val.length; j++) {
                  this.pres += val[j].name;        // returns name
                  this.rlink.push(val[j].link);
                  // adds to array of image links
                  this.imlink.push(val[j].image);
                  this.items.push({
                    value: false,
                    name: val[j].name,
                    calories: parseFloat(val[j].dataPoints[1].value),
                    fat: parseFloat(val[j].dataPoints[3].value),
                    carbs: parseFloat(val[j].dataPoints[4].value),
                    protein: parseFloat(val[j].dataPoints[2].value),
                    image: val[j].image,
                    link: val[j].link
                  });
                 }
              }
              break;

          // 2 is for getIngredients
          case 2: 
              {
                this.pres += val.title;
                this.imlink.push(val.image);
                this.items.push({
                  food_id: val.id,
                  value: false,
                  name: val.title,
                  calories: 50,
                  fat: 1,
                  carbs: 10,
                  protein: 9,
                  image: val.image,
                  link: "wat.com"
                });
              }
              break;

          // 3 is for getEthnicityRecipe
          case 3: 
            if (key === "results") {
              for (let j = 0; j < val.length; j++) {
                this.foodid = val[j].id;
                this.items.push({
                  food_id: val[j].id,
                  value: false,
                  name: val[j].title,
                  calories: 10,
                  fat: 10,
                  carbs: 10,
                  protein: 10,
                  sodium: 9000,
                  calcium: '9000%',
                  iron: '9000%',
                  image: "https://spoonacular.com/recipeImages/" + val[j].image,
                  link: 'wat.com'
                });
              }
            }
            break;
        }
      }
    },

    api_limit: (callback) => {
      var input_ = JSON.stringify(callback); // turn return header
      var parsing = JSON.parse(input_);   // parse the string
      var keys = Object.keys(parsing);    // get keys from json
      for (let i = 0; i < keys.length; i++) {
        var key = keys[i];       // current key
        var val = parsing[key];  // value of current key
        if (i==3){
          // prints information about requests remaining
          console.log(val);
        }
      }
    },
     // Clears the item array
    clearArray: function() {
      this.items = [];
    },

    // Sets the items array as a set sample one
    setArray: function() {
      this.items.push({
        food_id: 1,
        value: false,
        name: 'In-N-Out Burger Copycat',
        calories: 10,
        fat: 11,
        carbs: 12,
        protein: 13,
        image: 'https://spoonacular.com/recipeImages/In-N-Out-Burger-Copycat-485845.jpg',
        link: 'wat.com'
      });
      this.items.push({
        food_id: 2,
        value: false,
        name: 'BBQ Burgers \"Jibarito Style\"',
        calories: 20,
        fat: 21,
        carbs: 22,
        protein: 23,
        image: 'https://spoonacular.com/recipeImages/BBQ-Burgers-Jibarito-Style-268478.jpg',
        link: 'wat.com'
      });
      this.items.push({
        food_id: 3,
        value: false,
        name: 'The All American Classic Bacon Cheese Burger',
        calories: 30,
        fat: 31,
        carbs: 32,
        protein: 33,
        image: 'https://spoonacular.com/recipeImages/The-All-American-Classic-Bacon-Cheese-Burger-480050.jpg',
        link: 'wat.com'
      });
    },
	
	parseFromID: function(input) {
		var input_ = JSON.stringify(input); // turn return api call to string
		var parsing = JSON.parse(input_);   // parse the string
		var keys = Object.keys(parsing);    // get keys from json

		this.curr_source = parsing.sourceUrl; //Sets current wanted URL
		window.open(this.curr_source);        // Opens new window for URL
	},
  }
}
