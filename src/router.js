
import Vue from 'vue';
import Router from 'vue-router';

import Home from  "./views/Home.vue";
import Browse from "./views/Browse.vue";
import Search from "./views/Search.vue";
import About from  "./views/About.vue";
import Version from  "./views/Version.vue";
import Model from "./views/Model.vue";
import Release from "./views/Release.vue";
import Namespace from "./views/Namespace.vue";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    { path: "/", name: "home", component: Home },

    { path: "/browse", name: "browse", component: Browse },

    { path: "/search", name: "search", component: Search },

    { path: "/about", name: "about", component: About },

    { path: "/version", name: "version", component: Version },

    { path: "/:userKey/:modelKey", name: "model", component: Model },

    { path: "/:userKey/:modelKey/:releaseKey", name: "release", component: Release },

    { path: "/:userKey/:modelKey/:releaseKey/:prefix", name: "namespace", component: Namespace }

  ]
});
