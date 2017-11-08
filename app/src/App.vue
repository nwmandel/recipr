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
                      
                      <v-text-field v-if="lastClicked === 'Recipe'"
                        label="Recipe"
                        v-model="input">
                      </v-text-field>

                       <v-text-field v-if="lastClicked == 'Ingredients'"
                        label="Ingredients"
                        v-model="input">
                      </v-text-field>

                       <v-text-field v-if="lastClicked == 'Ethnicity'"
                        label="Query"
                        v-model="input">
                      </v-text-field>

                       <v-text-field v-if="lastClicked == 'Nutrients'"
                        label="Query"
                        v-model="input">
                      </v-text-field>


                    
                    </v-flex>
                  </v-layout>

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
              <v-container fluid>
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
              </v-container fluid>

            <!--Search Button-->
              <v-container fluid grid-list-xl v-if="lastClicked == 'Recipe'">
                <v-layout row justify-space-around>
                  <v-flex xs2>
                    <v-btn color="info" class="button-xs-center" v-on:click="getSiteRecipe(input)">Search  
                      <v-icon>search</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-container fluid grid-list-xl v-if="lastClicked == 'Ingredients'">
                <v-layout row justify-space-around>
                  <v-flex xs2>
                    <v-btn color="info" class="button-xs-center" v-on:click="getIngredientsRecipe(input)">Search   
                      <v-icon>search</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-container fluid grid-list-xl v-if="lastClicked == 'Ethnicity'">
                <v-layout row justify-space-around>
                  <v-flex xs2>
                    <v-btn color="info" class="button-xs-center" v-on:click="getEthnicityRecipe(input)">Search
                      <v-icon>search</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
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

<!--Getting the images to display-->			  
			  <li v-for="n in imlink.length">
				<a v-bind:href="rlink[n]"><img v-bind:src="imlink[n]"/></a>
				<!--<img v-bind:src="imlink[n]"/>
				<p>{{rlink[n]}}</p>-->
			  </li>
              

              
        
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
                      <td class="text-xs-right">{{ props.item.sodium }}</td>
                      <td class="text-xs-right">{{ props.item.calcium }}</td>
                      <td class="text-xs-right">{{ props.item.iron }}</td>
                    </tr>
                  </template>
                  <template slot="expand" scope="props">
                    <v-card flat>
                      <v-card-text>{{props.item.name}}</v-card-text>
                    </v-card>
                    <v-card flat>
                      <v-card-text>{{props.item.calories}}</v-card-text>
                    </v-card>
                    <v-card flat>
                      <v-card-text>
                        <img :src="props.item.image">
                      </v-card-text>
                    </v-card>
                                        <v-card flat>
                      <v-card-text>
                        <a :href="props.item.link">{{props.item.link}}</a>
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
        foodid: '',
        title: 'Recipr',
        qres: '',
        pres: '',
        rlink: [],     //array for recepie links
        imlink: [],  //array for the image links
        input: '',
        buttonClicked: false,
        lastClicked: '',
        chosenCuisines: [],
        cuisines: [
           'african', 'chinese', 'japanese', 'korean', 'vietnamese', 'thai', 'indian', 'british', 'irish', 'french', 'italian', 'mexican', 'spanish', 'middle eastern', 'jewish', 'american', 'cajun', 'southern', 'greek', 'german', 'nordic', 'eastern european', 'caribbean', 'latin american'
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
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Sodium (mg)', value: 'sodium' },
          { text: 'Calcium (%)', value: 'calcium' },
          { text: 'Iron (%)', value: 'iron' }
        ],
        items: [
        ]
      }
    },

    methods: {
      getSiteRecipe: function(query) {  
          this.qres = '';   // clear previous input
          this.pres = '';   // clear previous input
          axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/site/search?query="+query, config)
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
            })
      },

      getIngredientsRecipe: function(query) {
        axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=apples%2Cflour%2Csugar&limitLicense=false&number=3&ranking=1", config)
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
            })
        this.title = this.chosenDiet;
      },
      getEthnicityRecipe: function(query) {
        axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?cuisine="+this.chosenCuisines+"&number=3&offset=0&query="+query+"&type=main+course", config)
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
            })
        //console.log(this.chosenCuisines);
      },
      getNutrientsRecipe: function(query) {
        this.title = this.chosenDiet;
      },
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

      getRecipeFromId: function(id) {
        axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+id+"/information?includeNutrition=false")
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
      parsej: function(input) {  
        for (let i = 0; i < 3; i++) {
          if (this.items !== null) 
            this.items.pop();   // pop the last 3 items returned
            this.imlink.pop();   // clear image link
            this.rlink.pop();    // clear recipe link
        }

        var input_ = JSON.stringify(input); // turn return api call to string
        var parsing = JSON.parse(input_);   // parse the string
        var keys = Object.keys(parsing);    // get keys from json

        // loop over keys
        for (let i = 0; i < keys.length; i++) {
          var key = keys[i];    // current key
          var val = parsing[key]; // value of current key
          // if val.id exists then its probably the ingredients call
          if (val.id !== null) {
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

          if (key === "Recipes") {    // if we reach recipes, then parse needed data below

            // loops over each recipe in json 
            for (let j = 0; j < val.length; j++) {
              this.pres += val[j].name;   // returns name
              this.rlink.push(val[j].link);
              this.imlink.push(val[j].image);  // adds to array of image links
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
          // outer key for result of search recipes api call for getEthnicityRecipe
          else if (key === "results") {
            for (let j = 0; j < val.length; j++) {
              this.foodid = val[j].id;
              console.log(this.foodid);
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
        }
      }


    }
  }

</script>
