<template>
  <v-app light>

    <v-toolbar fixed app clipped-left>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    
    <main>
      <v-content>
        <v-container fluid>
            <!--Recipe and Ingredient Buttons-->
            <h2 class="text-xs-center">Search by</h2>
            <v-container grid-list-md text-xs-center>
              <v-layout row justify-center>
                  <v-card-text>
                    <div>
                      <v-btn v-if="lastClicked == 'Recipe'" color="error" dark v-on:click="buttonClicked = true; lastClicked = 'Recipe'">Recipe</v-btn>
                      <v-btn v-if="lastClicked !== 'Recipe'" color="primary" dark v-on:click="buttonClicked = true; lastClicked = 'Recipe'">Recipe</v-btn>
                   </div>
                  </v-card-text>

                  <v-card-text>
                    <div>
                      <v-btn v-if="lastClicked == 'Ingredients'" color="error" dark v-on:click= "buttonClicked = true; lastClicked = 'Ingredients'">Ingredients</v-btn>
                      <v-btn v-if="lastClicked !== 'Ingredients'" color="primary" dark v-on:click= "buttonClicked = true; lastClicked = 'Ingredients'">Ingredients</v-btn>
                    </div>
                  </v-card-text>

                  <v-card-text>
                    <div>
                      <v-btn v-if="lastClicked == 'Ethnicity'" color="error" dark v-on:click= "buttonClicked = true; lastClicked = 'Ethnicity'">Ethnicity</v-btn>
                      <v-btn v-if="lastClicked !== 'Ethnicity'" color="primary" dark v-on:click= "buttonClicked = true; lastClicked = 'Ethnicity'">Ethnicity</v-btn>
                    </div>
                  </v-card-text>

                  <v-card-text>
                    <div>
                      <v-btn v-if="lastClicked == 'Nutrients'" color="error" dark v-on:click= "buttonClicked = true; lastClicked = 'Nutrients'">Nutrients</v-btn>
                      <v-btn v-if="lastClicked !== 'Nutrients'" color="primary" dark v-on:click= "buttonClicked = true; lastClicked = 'Nutrients'">Nutrients</v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-layout>
            </v-container>

            <!--Search Bar area-->
            <v-container fluid v-if="buttonClicked">
              <v-card-text>
                
                <v-container fluid>
                  <v-layout row>
                    <v-flex xs4 v-if="lastClicked == 'Recipe' || lastClicked == 'Ingredients' || lastClicked == 'Nutrients'">
                      <v-subheader>Search</v-subheader>
                    </v-flex>
                    
                    <!--Ethnicity menu-->
                    <v-flex xs12 sm6 v-if="lastClicked == 'Ethnicity'">
                       <v-select
                          label="Select"
                          v-bind:items="cuisines"
                          v-model="chosenCuisines"
                          multiple
                          max-height="400"
                          hint="Select one or more of the following"
                          persistent-hint
                       ></v-select>
                    </v-flex>

                    <v-flex xs8>
                      <!--Recipe search bar-->
                      <v-text-field v-if="lastClicked === 'Recipe'"
                        label="Recipe"
                        v-model="input">
                      </v-text-field>
                      
                      <!--Ingredients search bar-->
                      <v-select v-if="lastClicked == 
                      'Ingredients'"
                        v-model="ingredArray"
                        label="Ingredients"
                        chips
                        tags
                        :items="sampleIngredients">    
                      </v-select>

                      <!--Ethnicity search bar-->
                      <v-text-field v-if="lastClicked == 'Ethnicity'"
                        label="Query"
                        v-model="input">
                      </v-text-field>

                      <!--Nutrients search bar--> 
                      <v-text-field v-if="lastClicked == 'Nutrients'"
                        label="Query"
                        v-model="input">
                      </v-text-field>
                    </v-flex>
                  </v-layout>

                <!-- Nutrients Selection Sliders -->
                <v-container fluid class="sliders" v-if="lastClicked == 'Nutrients'">
                   <v-card-text> 
                      <v-container fluid grid-list-md>
                        <v-layout row wrap>
                          <v-flex xs9>
                            <v-slider label="Max Calories:" v-bind:max="5000" v-model="maxCalories"></v-slider>
                          </v-flex>
                          <v-flex xs3>
                            <v-text-field v-model="maxCalories" type="number"></v-text-field>
                          </v-flex>
                          <v-flex xs9>
                            <v-slider label="Max Carbs(g):" v-bind:max="5000" v-model="maxCarbs"></v-slider>
                          </v-flex>
                          <v-flex xs3>
                            <v-text-field v-model="maxCarbs" type="number"></v-text-field>
                          </v-flex>
                          <v-flex xs9>
                            <v-slider label="Max Fat(g):" v-bind:max="500" v-model="maxFat"></v-slider>
                          </v-flex>
                          <v-flex xs3>
                            <v-text-field v-model="maxFat" type="number"></v-text-field>
                          </v-flex>
                          <v-flex xs9>
                            <v-slider label="Max Protein(g):" v-bind:max="500" v-model="maxProtein"></v-slider>
                          </v-flex>
                          <v-flex xs3>
                            <v-text-field v-model="maxProtein" type="number"></v-text-field>
                          </v-flex>
                          <v-flex xs9>
                            <v-slider label="Min Calories:" v-bind:max="3000" v-model="minCalories"></v-slider>
                          </v-flex>
                          <v-flex xs3>
                            <v-text-field v-model="minCalories" type="number"></v-text-field>
                          </v-flex>
                          <v-flex xs9>
                            <v-slider label="Min Carbs(g):" v-bind:max="3000" v-model="minCarbs"></v-slider>
                          </v-flex>
                          <v-flex xs3>
                            <v-text-field v-model="minCarbs" type="number"></v-text-field>
                          </v-flex>
                          <v-flex xs9>
                            <v-slider label="Min Fat(g):" v-bind:max="300" v-model="minFat"></v-slider>
                          </v-flex>
                          <v-flex xs3>
                            <v-text-field v-model="minFat" type="number"></v-text-field>
                          </v-flex>
                          <v-flex xs9>
                            <v-slider label="Min Protein(g):" v-bind:max="300" v-model="minProtein"></v-slider>
                          </v-flex>
                          <v-flex xs3>
                            <v-text-field v-model="minProtein" type="number"></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                  </v-container fluid>
                </v-container>
              </v-card-text>
              

              <!--
              <p>Input is {{input}}</p>
              <p>Query Result is {{qres}}</p>
              <p>Parsed result is {{pres}}</p>
              -->
              <!--Dietary Needs Selection-->
              <v-container fluid v-if="lastClicked == 'Recipe' || lastClicked == 'Ethnicity'">
                 <!--Dietary Section-->
                <v-flex xs6>
                  <v-subheader>Dietary Restrictions</v-subheader>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    v-bind:items="diets"
                    v-model="chosenDiet"
                    label="Select"
                    single-line
                    bottom
                   ></v-select>
                </v-flex>
                 
                <!--Intolerances Section--> 
                <v-flex xs6>
                  <v-subheader>Intolerances</v-subheader>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    label=""
                    v-bind:items="intolerances"
                    v-model="chosenIntolerances"
                    multiple
                    max-height="400"
                    hint="Select one or more of the following"
                    persistent-hint
                  ></v-select>
                </v-flex>
              </v-container fluid>

              <!--Api call section for doing calls in Vue object-->
              <!--Search Buttons for various api calls doing api call when clicked-->
              <!--Recipe api call-->
              <v-container fluid grid-list-xl v-if="lastClicked == 'Recipe'">
                <v-layout row justify-space-around>
                  <v-flex xs2>
                    <v-btn color="info" class="button-xs-center" v-on:click="getSiteRecipe(input)">Search  
                      <v-icon>search</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
              
              <!--Ingredients api call-->
              <v-container fluid grid-list-xl v-if="lastClicked == 'Ingredients'">
                <v-layout row justify-space-around>
                  <v-flex xs2>
                    <v-btn color="info" class="button-xs-center" v-on:click="getIngredientsRecipe()">Search   
                      <v-icon>search</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
              
              <!--Ethnicity api call-->
              <v-container fluid grid-list-xl v-if="lastClicked == 'Ethnicity'">
                <v-layout row justify-space-around>
                  <v-flex xs2>
                    <v-btn color="info" class="button-xs-center" v-on:click="getEthnicityRecipe(input)">Search
                      <v-icon>search</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
              
              <!--Nutrients api call-->
              <v-container fluid grid-list-xl v-if="lastClicked == 'Nutrients'">
                <v-layout row justify-space-around>
                  <v-flex xs2>
                    <v-btn color="info" class="button-xs-center" v-on:click="getNutrientsRecipe(input)">Search
                      <v-icon>search</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-container>  

            <!--Food table section-->
            <!--Shows all the foods that come up in whatever search is done with buttons-->
            <div id="foodTable">
                <v-data-table
                    v-bind:headers="headers"
                    :items="items"
                    hide-actions
                    class="elevation-2"
                    item-key="name"
                  >
                  <template slot="items" slot-scope="props">
                     <tr @click="props.expanded = !props.expanded"> 
                      <td>{{ props.item.name }}</td>
                      <td class="text-xs-right">{{ props.item.calories }}</td>
                      <td class="text-xs-right">{{ props.item.fat }}</td>
                      <td class="text-xs-right">{{ props.item.carbs }}</td>
                      <td class="text-xs-right">{{ props.item.protein }}</td>
                    </tr>
                  </template>
                  
                  <!--This shows up when an item in table is clicked-->
                  <template slot="expand" scope="props">
                    <v-card flat>
                      <v-card-text>Name: {{props.item.name}}</v-card-text>
                    </v-card>
                    <v-card flat>
                      <v-card-text>Calories: {{props.item.calories}}</v-card-text>
                    </v-card>
                    <v-card flat>
                      <v-card-text>
                        <!--<a v-onhref="props.item.link" onclick="getRecipeFromId(foodid); return false;"/></a>
                        <v-btn v-on:click="getRecipeFromId(foodid)"></v-btn>
                        <a v-bin:href="items.link">{{ rlink }}</a>
                        -->
                        <div v-if="props.item.link === 'wat.com'">
                        <!-- TODO make the link appear after a button is pressed
                        -->
                        </div>
                        <div v-else> 
                          <a v-bind:href="props.item.link" target="_blank"></a>
                        </div>
                        <img v-bind:src="props.item.image" style="width:150px;height:150px;"/></a>
                      </v-card-text>
                    </v-card>
                  </template>
                </v-data-table>
            </div>
            
            <div class="text-xs-center">
              <v-btn round color="primary" dark
              v-on:click="addItem">Add</v-btn>
            </div>

        </v-container>
      </v-content>
    </main>
    
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
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
        foodid: 556470,
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
          'Banana',
          'Chicken',
          'Dill',
          'Orange'
        ],
        lastClicked: '',
        chosenCuisines: [],
        cuisines: [
           'african', 'chinese', 'japanese', 'korean', 'vietnamese', 'thai', 'indian', 'british', 'irish', 'french', 'italian', 'mexican', 'spanish', 'middle eastern', 'jewish', 'american', 'cajun', 'southern', 'greek', 'german', 'nordic', 'eastern european', 'caribbean', 'latin american'
        ],
        chosenIntolerances: [],
        intolerances: [
           'dairy', 'egg', 'gluten', 'peanut', 'sesame', 'seafood', 'shellfish', 'soy', 'sulfite', 'tree nut', 'wheat'
        ],
        maxCalories: '10000',
        maxCarbs: '10000',
        maxFat: '1000',
        maxProtein: '1000',
        minCalories: '0',
        minCarbs: '0',
        minFat: '0',
        minProtein: '0',
        diets: ['none', 'pescatarian', 'lacto vegetarian', 'ovo vegetarian', 'vegan', 'vegetarian'],
        chosenDiet: 'none',
        
        // For the table
        headers: [
          {
            text: 'Recipe',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
        ],
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

      getIngredientsRecipe: function() {
        this.api_call = 2;     // defined to be 2 for api called
        this.ingredList = this.ingredArray.join("%2C ");
        
        axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients="+this.ingredArray+"&limitLicense=false&number=3&ranking=1", config)
          .then(res => {
            this.parsej(res.data);
            this.qres = res.data;
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
                console.log('Error', err.message);
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
          //console.log(this.chosenCuisines);
      },

      // api call for nutrients section 
      getNutrientsRecipe: function(query) {
        this.title = this.chosenDiet;
        this.api_call = 4;    // defined to be 4 for api called
        this.title = query;
      },

      // api call that takes in recipe id and we'll use it to
      // get the link to the original recipe 
      getRecipeFromId: function(id_) {
        this.foodid = id_;
        this.api_call = 5;    // defined to be 5 for api called
        
        axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+id_+"/information?includeNutrition=false",config)
          .then(res => {
            this.parsej(res.data);
            this.qres = res.data;
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

      // Sample adding item call to table
      addItem: function() {
        this.items.push({
          value: false,
          name: 'AddingExample',
          calories: '9000',
          fat: '9000',
          carbs: 9000,
          protein: 9000,
          sodium: 9000,
          calcium: '9000%',
          iron: '9000%',
          image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/9711-200.png'
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
                      sodium: 9000,
                      calcium: '9000%',
                      iron: '9000%',
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
                    value: false,
                    name: val.title,
                    calories: 50,
                    fat: 1,
                    carbs: 10,
                    protein: 9,
                    sodium: 9000,
                    calcium: '9000%',
                    iron: '9000%',
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
                  //TODO put the link in imlink
                  //result of getEtnicityRecipes is in ethres.txt
                  //this.imlink.push(val[j].imageURLs);
                  this.items.push({
                    value: false,
                    name: val[j].title,
                    calories: 10,
                    fat: 10,
                    carbs: 10,
                    protein: 10,
                    sodium: 9000,
                    calcium: '9000%',
                    iron: '9000%',
                    image: val[j].imageURLs,
                    link: 'wat.com'
                  });
                }
              }
              break;

            // 4 is for getNutrientsRecipe
            case 4:

            // 5 is for getRecipeFromId
            case 5:
              console.log("got to this part of [1]\n");
              if (key === "sourceUrl") {
                console.log("got to this part of [2]\n");
                  // adds the link to original recipe
                  this.rlink = val;
                }
                console.log("foodid is: "+this.foodid);
                console.log("link is: "+this.link);
                console.log("rlink is: "+this.rlink);

            default:
              console.log("error in parsing");
              break;
          }
        }
      }
    }
  }

</script>
