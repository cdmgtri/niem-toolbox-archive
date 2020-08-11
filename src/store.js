
import Vue from 'vue';
import Vuex from 'vuex';

import model from "../src/assets/releases/niem-5.0-release.json";

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

    availableReleases: [
      { userKey: "niem", modelKey: "model", releaseKey: "5.0", label: "5.0-draft", selected: true },
      { userKey: "niem", modelKey: "model", releaseKey: "4.2", label: "4.2", selected: true },
      { userKey: "niem", modelKey: "model", releaseKey: "4.1", label: "4.1", selected: false },
      { userKey: "niem", modelKey: "model", releaseKey: "4.0", label: "4.0", selected: false },
      { userKey: "niem", modelKey: "model", releaseKey: "3.2", label: "3.2", selected: false },
      { userKey: "niem", modelKey: "model", releaseKey: "3.1", label: "3.1", selected: false },
      { userKey: "niem", modelKey: "model", releaseKey: "3.0", label: "3.0", selected: false },
      { userKey: "niem", modelKey: "model", releaseKey: "2.1", label: "2.1", selected: false },
      { userKey: "niem", modelKey: "model", releaseKey: "2.0", label: "2.0", selected: false },
      { userKey: "niem", modelKey: "model", releaseKey: "1.0", label: "1.0", selected: false },
    ],

    defaultUserKey: "niem",
    defaultModelKey: "model",
    defaultReleaseKey: "5.0",
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
    },

    loadedReleases: (state) => {
      return state.availableReleases.filter( release => release.selected == true );
    }

  },

  mutations: {

    setLoaded(state, progress) {
      state.storeLoaded = progress;
    },

    defaultReleaseKey(state, releaseKey) {
      state.defaultReleaseKey = releaseKey;
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
