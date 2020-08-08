
import Vue from 'vue';
import Router from 'vue-router';

import Home from  "./views/Home.vue";
import Models from "./views/Models.vue";
import Search from "./views/Search.vue";
import Model from "./views/Model.vue";
import Release from "./views/Release.vue";
import Namespace from "./views/Namespace.vue";
import Property from "./views/Property.vue";
import Type from "./views/Type.vue";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    { path: "/", name: "home", component: Home },

    { path: "/browse", name: "browse", component: Models },

    { path: "/search", name: "search", component: Search },

    { path: "/:userKey/:modelKey", name: "model", component: Model },

    { path: "/:userKey/:modelKey/:releaseKey", name: "release", component: Release },

    // { path: "/:userKey/:modelKey/:releaseKey/namespaces", name: "namespaces", component: Namespaces },

    { path: "/:userKey/:modelKey/:releaseKey/namespaces/:prefix", component: Namespace },

    // { path: "/:userKey/:modelKey/:releaseKey/namespaces/:prefix/:contents", component: Namespace },

    // { path: "/:userKey/:modelKey/:releaseKey/properties/", name: "properties", component: Properties },

    { path: "/:userKey/:modelKey/:releaseKey/properties/:qname", name: "property", component: Property },

    // { path: "/:userKey/:modelKey/:releaseKey/types/", name: "types", component: Types },

    { path: "/:userKey/:modelKey/:releaseKey/types/:qname", name: "type", component: Type },

    // { path: "/:userKey/:modelKey/:releaseKey/terms/", name: "terms", component: Terms },

    // { path: "/:userKey/:modelKey/:releaseKey/terms/:prefix/:term", name: "term", component: Term },

  ]
});
