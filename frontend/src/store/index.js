import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import annotate from "./modules/annotate";
import app from "./modules/app";
import errorAnalysis from './modules/errorAnalysis';
import settings from "./modules/settings";
import user from "./modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    annotate,
    errorAnalysis
  },
  getters,
});

export default store;
