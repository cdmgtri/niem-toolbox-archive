
import Vue from 'vue';
import Router from 'vue-router';

import Home from  "./views/Home.vue";
import Models from "./views/Models.vue";
import Search from "./views/Search.vue";
import About from  "./views/About.vue";
import Version from  "./views/Version.vue";
import Model from "./views/Model.vue";
import Release from "./views/Release.vue";
import Namespace from "./views/Namespace.vue";
import Object from "./views/Object.vue";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    { path: "/", name: "home", component: Home },

    { path: "/browse", name: "browse", component: Models },

    { path: "/search", name: "search", component: Search },

    { path: "/about", name: "about", component: About },

    { path: "/version", name: "version", component: Version },

    { path: "/:userKey/:modelKey", name: "model", component: Model },

    { path: "/:userKey/:modelKey/:releaseKey", name: "release", component: Release },

    // { path: "/:userKey/:modelKey/:releaseKey/namespaces", name: "namespaces", component: Namespaces },

    { path: "/:userKey/:modelKey/:releaseKey/namespaces/:prefix", name: "namespace", component: Namespace },

    { path: "/:userKey/:modelKey/:releaseKey/namespaces/:prefix/:contents", component: Namespace },

    // { path: "/:userKey/:modelKey/:releaseKey/properties/", name: "properties", component: Properties },

    { path: "/:userKey/:modelKey/:releaseKey/properties/:prefix/:name", component: Object },

    // { path: "/:userKey/:modelKey/:releaseKey/types/", name: "types", component: Types },

    { path: "/:userKey/:modelKey/:releaseKey/types/:prefix/:name", component: Object },

    // { path: "/:userKey/:modelKey/:releaseKey/terms/", name: "terms", component: Terms },

    // { path: "/:userKey/:modelKey/:releaseKey/terms/:prefix/:term", name: "term", component: Term },

  ]
});
