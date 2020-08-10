
import Vue from 'vue';
import Vuex from 'vuex';

import model from "../src/assets/data/niem-5.0-release.json";

import { NIEM } from "niem-model";

Vue.use(Vuex);

export default new Vuex.Store({

  state: {

    storeLoaded: false,

    niem: new NIEM(),

    options: {
      map: false,
      subset: false
    },

    defaultUserKey: undefined,
    defaultModelKey: undefined,
    defaultReleaseKey: undefined,
    defaultNIEMReleaseKey: undefined

  },

  getters: {

    storeLoaded: (state) => {
      return state.storeLoaded;
    },

    options: (state) => {
      return state.options;
    },

    niem: (state) => {
      return state.niem;
    },

    defaultSearchCriteria: (state) => {
      let criteria = {};
      if (state.defaultUserKey) criteria.userKey = state.defaultUserKey;
      if (state.defaultModelKey) criteria.modelKey = state.defaultModelKey;
      if (state.defaultReleaseKey) criteria.releaseKey = state.defaultReleaseKey;
      if (state.defaultNIEMReleaseKey) criteria.niemReleaseKey = state.defaultNIEMReleaseKey;
      return criteria;
    }

  },

  mutations: {

    invertOption(state, option) {
      state.options[option] = !state.options[option];
    },

    setLoaded(state, progress) {
      state.storeLoaded = progress;
    }

  },

  actions: {

    async load(context) {

      let start = Date.now();
      console.log("LOADING...");

      // Load NIEM data (currently just the 5.0 draft release)
      await context.state.niem.load(model);
      console.log(`model loaded in ${(Date.now() - start) / 1000} secs`, new Date().toLocaleTimeString());

      context.state.defaultUserKey = "niem";
      context.state.defaultModelKey = "model";
      context.state.defaultReleaseKey = "5.0";

      console.log("set default search criteria", context.getters.defaultSearchCriteria);

      // Mark the release as loaded
      context.state.storeLoaded = true;
      console.log(`LOADED APP in ${(Date.now() - start) / 1000} secs`, new Date().toLocaleTimeString());

    }

  }

});
