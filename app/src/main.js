import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import VueSocketIO from 'vue-socket.io';



Vue.use(Vuetify)

new Vue({
  el: '#app',
  render: h => h(App)
})

export const SocketInstance = socketio('http://localhost:8081');

Vue.use(VueSocketIO, SocketInstance)
