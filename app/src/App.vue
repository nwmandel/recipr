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
                    <v-flex xs8>
                      
                      <v-text-field v-if="lastClicked === 'Recipe'"
                        label="Recipe"
                        v-model="input">
                      </v-text-field>

                       <v-text-field v-if="lastClicked == 'Ingredients'"
                        label="Ingredients"
                        v-model="input">
                      </v-text-field>
                    
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <p>Input is {{input}}</p>
              <p>Query Result is {{qres}}</p>
              

              <!--Search Button-->
              <v-container fluid grid-list-xl>
                <v-layout row justify-space-around>
                  <v-flex xs2>
                    <v-btn color="info" class="button-xs-center" v-on:click="getSiteRecipe(input)">Search  
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
                    class="elevation-1"
                  >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.calories }}</td>
                    <td class="text-xs-right">{{ props.item.fat }}</td>
                    <td class="text-xs-right">{{ props.item.carbs }}</td>
                    <td class="text-xs-right">{{ props.item.protein }}</td>
                    <td class="text-xs-right">{{ props.item.sodium }}</td>
                    <td class="text-xs-right">{{ props.item.calcium }}</td>
                    <td class="text-xs-right">{{ props.item.iron }}</td>
                  </template>
                </v-data-table>
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
            iron: '1%'
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
            iron: '1%'
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
            iron: '7%'
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
            iron: '8%'
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
            iron: '16%'
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
            iron: '0%'
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
            iron: '2%'
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
            iron: '45%'
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
            iron: '22%'
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
            iron: '6%'
          }
        ]
      }
    },

    methods: {
      getSiteRecipe: function(query) {
          axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/site/search?query="+query, config)
            .then(res => {this.qres = res.data})
            console.log(res.data);
        }
    }
  }

</script>
