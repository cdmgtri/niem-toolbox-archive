
import Vue from 'vue';
import Vuex from 'vuex';

import NIEMModel from "niem-model";

import model from "../src/assets/data/niem-5.0-release.json";

// eslint-disable-next-line no-unused-vars
let { NIEM, Model, Release, Namespace, Property, Type } = NIEMModel;

Vue.use(Vuex);

export default new Vuex.Store({

  state: {

    /** @type{"not started"|"in progress"|"done"} */
    loaded: "not started",

    niem: new NIEM(),

    /** @type {Release} */
    release: undefined,

    /** @type {Namespace[]} */
    namespaces: [],

    /** @type {Property[]} */
    properties: [],

    /** @type {Type[]} */
    types: []

  },

  getters: {

  },

  mutations: {

    setLoaded(state, progress) {
      state.loaded = progress;
    },

    setRelease(state, release) {
      state.release = release;
    },

    setNamespaces(state, namespaces) {
      state.namespaces = namespaces;
    },

    setProperties(state, properties) {
      state.properties = properties;
    },

    setTypes(state, types) {
      state.types = types;
    }


  },

  actions: {

    /**
     * @param {"not started"|"in progress"|"done"} progress
     */
    setLoaded(context, progress) {
      context.commit("setLoaded", progress);
    },

    setRelease(context, release) {
      context.commit("setRelease", release);
    },

    setNamespaces(context, namespaces) {
      context.commit("setNamespaces", namespaces);
    },

    setProperties(context, properties) {
      context.commit("setProperties", properties);
    },

    setTypes(context, types) {
      context.commit("setTypes", types);
    },

    /**
     * @param {{userKey: string, modelKey: string, releaseKey: string}} options
     */
    async loadRelease(context, options) {

      context.dispatch("setLoaded", "in progress");

      await context.state.niem.load(model);

      let release = await context.state.niem.releases.get(options.userKey, options.modelKey, options.releaseKey);
      context.dispatch("setRelease", release);

      let namespaces = await release.namespaces.find();
      context.dispatch("setNamespaces", namespaces);

      let properties = await release.properties.find();
      context.dispatch("setProperties", properties);

      let types = await release.types.find();
      context.dispatch("setTypes", types);


      context.dispatch("setLoaded", "done");

    }

  }

});
