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

            <h2 class="text-xs-center">Search by</h2>
            
            <v-container grid-list-md text-xs-center>
              <v-layout row justify-center>
                  <v-card-text>
                    <div>
                      <v-btn color="primary" dark>Recipe</v-btn>
                    </div>
                  </v-card-text>

                  <v-card-text>
                    <div>
                      <v-btn color="primary" dark>Ingredients</v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-layout>
            </v-container>

            <v-card-text>
              <v-container fluid>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Search</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                      label="Recipe/Ingredients"
                      v-model="input">
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <p transition='expand'>Input is: {{input}}</p>

          
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

  export default {
    data () {
      return {
        serverdata: '',
        title: 'Recipr',
        input: ''
      }
    },

    mounted() {
      axios.get('http://localhost:8081/api')
        .then((res) => {
          console.log(res.data);
          this.serverdata = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }

  
  }
</script>
