<template>
  <v-app light>

    <v-toolbar fixed app clipped-left>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    
    <main>
    <h2>{{ serverdata }}</h2>
      
      <v-content>
        <v-container fluid>
            <!--Recipe and Ingredient Buttons-->
            <h2 class="text-xs-center">Search by</h2>
            <v-container grid-list-md text-xs-center>
              <v-layout row justify-center>
                  <v-card-text>
                    <div>
                      <v-btn color="primary" dark v-on:click="buttonClicked = true; lastClicked = 'Recipe'">Recipe</v-btn>
                    </div>
                  </v-card-text>

                  <v-card-text>
                    <div>
                      <v-btn color="primary" dark v-on:click= "buttonClicked = true; lastClicked = 'Ingredients'">Ingredients</v-btn>
                    </div>
                  </v-card-text>

                  <v-card-text>
                    <div>
                      <v-btn color="primary" dark v-on:click= "buttonClicked = true; lastClicked = 'Ethnicity'">Ethnicity</v-btn>
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
                    <v-flex xs4>
                      <v-subheader>Search</v-subheader>
                    </v-flex>
                    <v-flex xs4 v-if="lastClicked == 'Ethnicity'">
                      <v-subheader>Search: Enter 1 (or more, separated by a comma) of the following: african, chinese, japanese, korean, vietnamese, thai, indian, british, irish, french, italian, mexican, spanish, middle eastern, jewish, american, cajun, southern, greek, german, nordic, eastern european, caribbean, or latin american.</v-subheader>
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
                        label="Ethnicity"
                        v-model="input">
                      </v-text-field>
                    
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <p>Input is {{input}}</p>
              <p>Query Result is {{qres}}</p>
              

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
            </v-container>  
        
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
        serverdata: '',
        title: 'Recipr',
        qres: '',
        input: '',
        buttonClicked: false,
        lastClicked: '',

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
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%',
            iron: '1%',
            image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/9711-200.png'
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '8%',
            iron: '1%',
            image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/9711-200.png'
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            sodium: 337,
            calcium: '6%',
            iron: '7%',
            image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/9711-200.png'
          },
          {
            value: false,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            sodium: 413,
            calcium: '3%',
            iron: '8%',
            image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/9711-200.png'
          },
          {
            value: false,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            sodium: 327,
            calcium: '7%',
            iron: '16%',
            image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/9711-200.png'
          },
          {
            value: false,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            sodium: 50,
            calcium: '0%',
            iron: '0%',
            image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/9711-200.png'
          },
          {
            value: false,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            sodium: 38,
            calcium: '0%',
            iron: '2%',
            image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/9711-200.png'
          },
          {
            value: false,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            sodium: 562,
            calcium: '0%',
            iron: '45%',
            image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/9711-200.png'
          },
          {
            value: false,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            sodium: 326,
            calcium: '2%',
            iron: '22%',
            image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/9711-200.png'
          },
          {
            value: false,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            sodium: 54,
            calcium: '12%',
            iron: '6%',
            image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/9711-200.png'
          }
        ]
      }
    },

    methods: {
      getSiteRecipe: function(query) {
          axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/site/search?query="+query, config)
            .then(res => {this.qres = res.data})
            console.log(res.data);
      },
      getIngredientsRecipe: function(query) {
        this.title = query;
      },
      getEthnicityRecipe: function(query) {
        this.title = query;
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
      }

    }
  }

</script>
