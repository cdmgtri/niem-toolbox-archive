
import Vue from 'vue';
import Vuex from 'vuex';

import NIEMModel from "niem-model";

import model from "../src/assets/data/niem-5.0-release.json";

let { NIEM, Model, Release, Namespace, LocalTerm, Property, Type, Facet, SubProperty } = NIEMModel;

Vue.use(Vuex);

let ModelInstance = new Model();
let ReleaseInstance = new Release();
let NamespaceInstance = new Namespace();
let LocalTermInstance = new LocalTerm();
let PropertyInstance = new Property();
let TypeInstance = new Type();
let FacetInstance = new Facet();
let SubPropertyInstance = new SubProperty();

export default new Vuex.Store({

  state: {

    storeLoaded: false,

    niem: new NIEM(),

    options: {
      map: false,
      subset: false
    },

    /** @type {ReleaseInstance} */
    release: undefined,

    /** @type {string[]} */
    users: [],

    /** @type {ModelInstance[]} */
    models: [],

    /** @type {ReleaseInstance[]} */
    releases: [],

    /** @type {LocalTermInstance[]} */
    localTerms: [],

    /** @type {NamespaceInstance[]} */
    namespaces: [],

    /** @type {PropertyInstance[]} */
    properties: [],

    /** @type {TypeInstance[]} */
    types: [],

    /** @type {FacetInstance[]} */
    facets: [],

    /** @type {SubPropertyInstance[]} */
    subProperties: [],

  },

  getters: {

    storeLoaded: (state) => {
      return state.storeLoaded;
    },

    options: (state) => {
      return state.options;
    },

    routes: (state) => {
      return {
        property({userKey, modelKey, releaseKey, prefix, name}) {
          return `/${userKey}/${modelKey}/${releaseKey}/properties/${prefix}:${name}`;
        },

        type({userKey, modelKey, releaseKey, prefix, name}) {
          return `/${userKey}/${modelKey}/${releaseKey}/types/${prefix}:${name}`;
        },

        namespace({userKey, modelKey, releaseKey, prefix}) {
          return `/${userKey}/${modelKey}/${releaseKey}/namespaces/${prefix}`;
        }
      }
    },

    models: (state) => (userKey) => {
      return state.models.filter( model => model.userKey == userKey );
    },

    releases: (state) => (userKey, modelKey) => {
      return state.releases.filter( release => release.userKey == userKey && release.modelKey == modelKey );
    },

    namespace: (state) => (prefix) => {
      return state.namespaces.find( namespace => namespace.prefix == prefix);
    },

    property: (state) => (qname) => {
      return state.properties.find( property => property.qname == qname );
    },

    properties: (state) => (prefix) => {
      if (!prefix) return state.properties;
      return state.properties.filter( property => property.prefix == prefix );
    },

    searchProperties: (state) => (regex) => {
      return state.properties.filter( property => property.qname.toLowerCase().match(regex))
      // return Property.sortListByNamespaceStyle(state.release, results);
    },

    type: (state) => (qname) => {
      return state.types.find( type => type.qname == qname );
    },

    types: (state) => (prefix) => {
      if (!prefix) return state.types;
      return state.types.filter( type => type.prefix == prefix );
    },

    localTerms: (state) => (prefix) => {
      if (!prefix) return state.localTerms;
      return state.localTerms.filter( localTerm => localTerm.prefix == prefix );
    },

    facets: (state) => (prefix, name) => {
      if (!prefix && !name) return state.facets;
      if (!name) return state.facets.filter( facet => facet.typePrefix == prefix );
      return state.facets.filter( facet => facet.typeQName == prefix + ":" + name);
    },

    subProperty: (state) => (typeQName, propertyQName) => {
      return state.subProperties.find( subProperty => subProperty.typeQName == typeQName && subProperty.propertyQName == propertyQName );
    },

    subProperties: (state) => (prefix, typeQName, propertyQName) => {
      if (prefix) return state.subProperties.filter( subProperty => subProperty.typePrefix == prefix );
      if (typeQName) return state.subProperties.filter( subProperty => subProperty.typeQName == typeQName );
      if (propertyQName) return state.subProperties.filter( subProperty => subProperty.propertyQName == propertyQName );
      return state.subProperties;
    },

  },

  mutations: {

    invertOption(state, option) {
      state.options[option] = !state.options[option];
    },

    setLoaded(state, progress) {
      state.storeLoaded = progress;
    },

    setRelease(state, release) {
      state.release = release;
    },

    setUsers(state, users) {
      state.users = users;
    },

    setModels(state, models) {
      state.models = models;
    },

    setReleases(state, releases) {
      state.releases = releases;
    },

    setNamespaces(state, namespaces) {
      state.namespaces = namespaces;
    },

    setProperties(state, properties) {
      state.properties = properties;
    },

    setTypes(state, types) {
      state.types = types;
    },

    setLocalTerms(state, localTerms) {
      state.localTerms = localTerms;
    },

    setFacets(state, facets) {
      state.facets = facets;
    },

    setSubProperties(state, subProperties) {
      state.subProperties = subProperties;
    }

  },

  actions: {

    setRelease(context, release) {
      context.commit("setRelease", release);
    },

    setUsers(context, users) {
      context.commit("setUsers", users);
    },

    setModels(context, models) {
      context.commit("setModels", models);
    },

    setReleases(context, releases) {
      context.commit("setReleases", releases);
    },

    setNamespaces(context, namespaces) {
      context.commit("setNamespaces", namespaces.sort(Namespace.sortByStyle));
    },

    setProperties(context, properties) {
      context.commit("setProperties", properties.sort(Property.sortByQName));
    },

    setTypes(context, types) {
      context.commit("setTypes", types.sort(Type.sortByQName));
    },

    setLocalTerms(context, localTerms) {
      context.commit("setLocalTerms", localTerms.sort(LocalTerm.sortByPrefixTerm));
    },

    setFacets(context, facets) {
      context.commit("setFacets", facets.sort(Facet.sortFacetsByStyleAdjustedValueDefinition));
    },

    setSubProperties(context, subProperties) {
      context.commit("setSubProperties", subProperties);
    },

    async load(context) {

      // Set timeout first to allow Vue to load the UI before locking on data-intensive operations
      setTimeout( async function () {

        let start = Date.now();
        console.log("LOADING...");

        // Load NIEM data (currently just the 5.0 draft release)
        await context.state.niem.load(model);
        console.log(`model loaded in ${(Date.now() - start) / 1000} secs`, new Date().toLocaleTimeString());

        // Extract data from the currently-selected NIEM release
        await context.dispatch("loadCurrentRelease", {userKey: "niem", modelKey: "model", releaseKey: "5.0"});

        // Mark the release as loaded
        context.state.storeLoaded = true;
        console.log(`LOADED RELEASE in ${(Date.now() - start) / 1000} secs`, new Date().toLocaleTimeString());

      }, 100);
    },

    /**
     * @param {{userKey: string, modelKey: string, releaseKey: string}} options
     */
    async loadCurrentRelease(context, options) {

      let release = await context.state.niem.releases.get(options.userKey, options.modelKey, options.releaseKey);
      context.dispatch("setRelease", release);

      let models = await context.state.niem.models.find();
      context.dispatch("setModels", models);

      let users = new Set( models.map( model => model.userKey ) );
      context.dispatch("setUsers", Array.from(users));

      let releases = await context.state.niem.releases.find();
      context.dispatch("setReleases", releases);

      let namespaces = await release.namespaces.find();
      context.dispatch("setNamespaces", namespaces);

      let properties = await release.properties.find();
      context.dispatch("setProperties", properties);

      let types = await release.types.find();
      context.dispatch("setTypes", types);

      let localTerms = await release.localTerms.find();
      context.dispatch("setLocalTerms", localTerms);

      let facets = await release.facets.find();
      context.dispatch("setFacets", facets);

      let subProperties = await release.subProperties.find();
      context.dispatch("setSubProperties", subProperties);

    }

  }

});
