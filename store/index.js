import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import print from "./print/index.js";
import global from "./global/index";

export default new Vuex.Store({
  modules: {
    global,
    print,
  },
});
