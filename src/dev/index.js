import Vue from 'vue';
// var sMd = require('../index.js');
import { VueMavonEditor, VueMavonViewer } from '../index.js';
var demo = require('./demo.vue');

Vue.use(VueMavonEditor);
Vue.use(VueMavonViewer);
var app = new Vue({
  el: '#main',
  render: (h) => h(demo)
});
