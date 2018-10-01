/*
 *
 * In The Name of God
 *
 * +===============================================
 * | Author:        Parham Alvani <parham.alvani@gmail.com>
 * |
 * | Creation Date: 01-10-2018
 * |
 * | File Name:     socketio.js
 * +===============================================
 */
import Vue from 'vue'
import VueSocketio from 'vue-socket.io'

Vue.use(VueSocketio, '/trap/')
Vue.vm.sockets.connect = function () {
  console.log('I am comming with data to you')
}
