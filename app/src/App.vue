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
          <v-slide-y-transition mode="out-in">
            <v-layout column align-center>
              <img src="/public/v.png" alt="Vuetify.js" class="mb-5" />
              <blockquote class>
                &#8220;Yeeee!!.&#8221;
                <footer>
                  <small>
                    <em>&mdash;Sausage Party</em>
                  </small>
                </footer>
              </blockquote>
            </v-layout>
          </v-slide-y-transition>
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
        title: 'Recipr'
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
