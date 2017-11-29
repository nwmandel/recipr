<template>
  <v-app light>

    <div class = "teal lighten-4">
    <v-toolbar fixed app clipped-left>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    
    <main>

      <v-content>
        <v-container fluid>
            <!--Recipe and Ingredient Buttons-->
            <h2 class="text-xs-center">Search by</h2>
            <p class="text-xs-center">(choose one)</p>
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
                    <v-flex xs4 v-if="lastClicked == 'Recipe' || lastClicked == 'Ingredients'">
                      <v-subheader>Search:</v-subheader>
                    </v-flex>
                    
                    <!--Ethnicity menu-->
                    <v-flex xs12 sm6 v-if="lastClicked == 'Ethnicity'">
                       <v-select
                          label="Ethnicity"
                          v-bind:items="cuisines"
                          v-model="chosenCuisines"
                          multiple
                          max-height="225"
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
                        max-height="225"
                        label="Ingredients: Pick from menu or type your own and press enter"
                        chips
                        tags
                        :items="sampleIngredients">    
                      </v-select>

                      <!--Ethnicity search bar-->
                      <v-text-field v-if="lastClicked == 'Ethnicity'"
                        label="Query"
                        v-model="input">
                      </v-text-field>
                    
                    </v-flex>
                  </v-layout>


                <!-- Nutrients Selection Sliders -->
                <v-container fluid class="sliders" v-if="lastClicked == 'Nutrients'">
                   <p class="text-xs-center">Provide your maximum and/or minimum requirements for Calories, Carbs, Fat, and Protein by either moving the sliders or typing values on the right.</p>
                   <v-card-text> 
                      <v-container fluid grid-list-md>
                        <v-layout row wrap>
                          <v-flex xs9>
                            <v-slider label="Max Calories:" v-bind:max="2000" v-model="maxCalories"></v-slider>
                          </v-flex>
                          <v-flex xs3>
                            <v-text-field v-model="maxCalories" type="number"></v-text-field>
                          </v-flex>
                          <v-flex xs9>

                            <v-slider label="Max Carbs(g):" v-bind:max="400" v-model="maxCarbs"></v-slider>

                          </v-flex>
                          <v-flex xs3>
                            <v-text-field v-model="maxCarbs" type="number"></v-text-field>
                          </v-flex>
                          <v-flex xs9>

                            <v-slider label="Max Fat(g):" v-bind:max="100" v-model="maxFat"></v-slider>

                          </v-flex>
                          <v-flex xs3>
                            <v-text-field v-model="maxFat" type="number"></v-text-field>
                          </v-flex>
                          <v-flex xs9>

                            <v-slider label="Max Protein(g):" v-bind:max="250" v-model="maxProtein"></v-slider>

                          </v-flex>
                          <v-flex xs3>
                            <v-text-field v-model="maxProtein" type="number"></v-text-field>
                          </v-flex>
                          <v-flex xs9>
                            <v-slider label="Min Calories:" v-bind:max="2000" v-model="minCalories"></v-slider>
                          </v-flex>
                          <v-flex xs3>
                            <v-text-field v-model="minCalories" type="number"></v-text-field>
                          </v-flex>
                          <v-flex xs9>
                            <v-slider label="Min Carbs(g):" v-bind:max="400" v-model="minCarbs"></v-slider>
                          </v-flex>
                          <v-flex xs3>
                            <v-text-field v-model="minCarbs" type="number"></v-text-field>
                          </v-flex>
                          <v-flex xs9>
                            <v-slider label="Min Fat(g):" v-bind:max="100" v-model="minFat"></v-slider>
                          </v-flex>
                          <v-flex xs3>
                            <v-text-field v-model="minFat" type="number"></v-text-field>
                          </v-flex>
                          <v-flex xs9>
                            <v-slider label="Min Protein(g):" v-bind:max="250" v-model="minProtein"></v-slider>
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
              
              <!--Selections for Recipe and Ethnicity-->
              <v-container fluid v-if="lastClicked == 'Recipe' || lastClicked == 'Ethnicity'">
              <v-layout row wrap>

                <!--Type of Course Selection-->
                <v-flex xs3>
                  <v-subheader>Type of Recipe:</v-subheader>
                </v-flex>
                <v-flex xs8>
                  <v-select
                    v-bind:items="types"
                    v-model="chosenType"
                    label="main course"
                    single-line
                    bottom
                  ></v-select>
                </v-flex>

                 <!--Dietary Restrictions Selection-->
                <v-flex xs3>
                  <v-subheader>Dietary Restrictions:</v-subheader>
                </v-flex>
                <v-flex xs8>
                  <v-select
                    v-bind:items="diets"
                    v-model="chosenDiet"
                    label="None"
                    single-line
                    bottom
                   ></v-select>
                </v-flex>
                
                <!--Intolerances Selection--> 
                <v-flex xs3>
                  <v-subheader>Intolerances:</v-subheader>
                </v-flex>
                <v-flex xs8>
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

                <!--Exclude Ingredients Selection-->
                <v-flex xs3>
                  <v-subheader>Exclude Ingredients:</v-subheader>
                </v-flex>

                <v-flex xs6>
                  <v-select
                    v-bind:items="types"
                    v-model="chosenType"
                    label="Main Course"
                    single-line
                    bottom
                  ></v-select>
                  </v-flex>

                <v-flex xs8>
                <v-select v-if="lastClicked == 'Recipe' || lastClicked == 'Ethnicity'"
                  v-model="excludeArray"
                  max-height="225"
                  hint="Pick ingredients from menu to exclude, or type your own and press Enter."
                  persistent-hint
                  chips
                  tags
                  :items="sampleExclusions">    
                </v-select>

                </v-flex>
               </v-layout>
              </v-container fluid>

              <!--Minimze or Maximize Ingredients Checkbox-->
              <v-container fluid v-if="lastClicked == 'Ingredients'">
                <v-checkbox
                   label="Prioritize maximizing the use of your ingredients (Uncheck to prioritize minimizing the use of missing ingredients)"
                   v-model="checkbox"
                 ></v-checkbox>
              </v-container fluid>

              <!--Api call section for doing calls in Vue object-->
              <!--Search Buttons for various api calls doing api call when clicked-->
              <!--Recipe api call-->
              <v-container fluid grid-list-xl v-if="lastClicked == 'Recipe'">
                <v-layout row justify-space-around>
                  <v-flex xs2>
                    <v-btn color="info" class="button-xs-center" v-on:click="getRecipe(input)">Search  
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
                     <tr @click="props.expanded = !props.expanded; lastClicked= props.index; lastClickedID = props.item.food_id"> 
                      <td>{{ props.item.name }}</td>
                      
                      <!-- Placeholder for the calories, fat carbs, and protein for each item 
                      <td class="text-xs-right">{{ props.item.calories }}</td>
                      <td class="text-xs-right">{{ props.item.fat }}</td>
                      <td class="text-xs-right">{{ props.item.carbs }}</td>
                      <td class="text-xs-right">{{ props.item.protein }}</td>
                      -->

                    </tr>
                  </template>
                  
                  <!--This shows up when an item in table is clicked-->
                  <template slot="expand" scope="props">
                    <v-layout row wrap>
                    <v-container grid-list-xs text-xs-left fluid>
                      <div class="recName">
                        <v-flex xs4 class="pa-2"> 
                          <v-card flat dark color="primary">
                            <v-card-text>Name of Recipe: {{props.item.name}}</v-card-text>
                          </v-card>
                        </v-flex>
                      </div>
                      <v-flex xs4 class="pa-2">
                        <v-card flat dark color="secondary">
                          <v-card-text v-if="props.item.isIngred == false && props.item.calories != null">Calories: {{props.item.calories}}</v-card-text>
                        </v-card>
                      </v-flex>


                      <v-flex xs4 class="pa-2"> 
                        <v-card dark color="cyan darken-2">
                          <v-card-text v-if="props.item.isIngred == true"class="text-xs-right">Ingredients missing: {{ props.item.missing }}</v-card-text>
                            <v-card-text v-if="props.item.isIngred == true"class="text-xs-right">Ingredients used: {{ props.item.used }}</v-card-text>
                          </v-card>
                        </v-flex>
                      </v-container>
                    </v-layout>

                    <!-- Button to make second api call to get link of recipe -->
  					        <v-flex xs4 class="pa-2">
                      <v-card flat dark color="primary">
                        <v-card-text>
                        <!--<div v-if="props.item.link == 'wat.com'">
                          <v-btn color="info">Get Link</v-btn>
                          </div>
                          <div v-else> 
                            <a v-bind:href="props.item.link" target="_blank">Click here for recipe!</a>
                          </div>
                          
                          <!-Can remove this later. Only for debugging.-->
                          <!--<p> Food ID: {{props.item.food_id}}</p>-->
    						          <div class="recIm">
                            <p> Click on image for recipe! </p>
                              <img :src="props.item.image" v-on:click="getRecipeFromId(props.item.food_id)" style="width:150px;height:150px;"/>
    						          </div>
                        </v-card-text>
                      </v-card>
                    </v-flex>

                  </template>
                </v-data-table>
            </div>

        </v-container>

        <!--Debugging-->
        <div>
          <p>Debug Section</p>
          <p>index - food_id - item.link</p>
          <ul id="debugSection">
            <li v-for="(item, index) in items">
              {{ index }} - {{ item.food_id }} - {{ item.link }}
            </li>
          </ul>
          <p> Last Index Clicked: {{lastClicked}}</p>
          <p> Last Index's ID: {{lastClickedID}}</p>
          <v-btn color="info" v-on:click="clearArray">Clear Array</v-btn>
          <v-btn color="info" v-on:click="setArray">Set Sample Array</v-btn>
        </div>
      
      </v-content>
    </main>
    
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>

</div>

  </v-app>
</template>


<script src="./app.js"></script>
<style src="./sty.css" ></style>
