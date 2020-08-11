
import Vue from 'vue';
import Vuex from 'vuex';

import { NIEM } from "niem-model";

Vue.use(Vuex);

export default new Vuex.Store({

  state: {

    storeLoaded: false,
    loadingProgress: "",

    niem: new NIEM(),

    options: {
      map: false,
      subset: false
    },

    availableReleases: [
      { userKey: "niem", modelKey: "model", releaseKey: "5.0", label: "5.0-draft", selected: true },
      { userKey: "niem", modelKey: "model", releaseKey: "4.2", label: "4.2", selected: false },
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

    defaultReleaseIndicator: (state, getters) => (releaseRoute) => {
      return releaseRoute.includes(getters.defaultReleaseRoute);
    },

    defaultReleaseID: (state) => {
      return state.defaultUserKey + "-" + state.defaultModelKey + "-" + state.defaultReleaseKey;
    },

    defaultReleaseRoute: (state) => {
      return "/" + state.defaultUserKey + "/" + state.defaultModelKey + "/" + state.defaultReleaseKey;
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

    resetNIEM(state) {
      state.niem.sources[0].releases.data = [];
      state.niem.sources[0].namespaces.data = [];
      state.niem.sources[0].localTerms.data = [];
      state.niem.sources[0].properties.data = [];
      state.niem.sources[0].types.data = [];
      state.niem.sources[0].facets.data = [];
      state.niem.sources[0].subProperties.data = [];
      // state.niem = new NIEM();
    },

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

      context.state.storeLoaded = false;

      // Resets the existing NIEM data store
      context.commit("resetNIEM");

      let loadedReleases = context.getters.loadedReleases;

      for (let rel of loadedReleases) {
        context.state.loadingProgress = "Loading release " + rel.releaseKey + "...";
        await new Promise(resolve => setTimeout(resolve, 100));
        let json = require("./assets/releases/niem-release-" + rel.releaseKey + ".json");
        await context.state.niem.load(json);
      }

      // Mark the release as loaded
      context.state.storeLoaded = true;
      context.state.loadingProgress = "";
      console.log(`LOADED APP in ${(Date.now() - start) / 1000} secs`, new Date().toLocaleTimeString());

    }

  }

});
