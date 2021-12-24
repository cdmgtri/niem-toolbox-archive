
import Vue from 'vue';
import Router from 'vue-router';

import Home from  "./views/Home.vue";
import Sources from "./views/Sources.vue";
import Search from "./views/Search.vue";
import Model from "./views/Model.vue";
import Models from "./views/Models.vue";
import Release from "./views/Release.vue";
import Namespace from "./views/Namespace.vue";
import Namespaces from "./views/Namespaces.vue";
import Property from "./views/Property.vue";
import Type from "./views/Type.vue";
import QA from "./views/QA.vue";

import Settings from "./views/Settings.vue";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    { path: "/", name: "home", component: Home },

    { path: "/search", name: "search", component: Search },

    { path: "/settings", name: "settings", component: Settings },

    { path: "/sources", name: "browse", component: Sources },

    { path: "/sources/:userKey", name: "user", component: Models },

    { path: "/sources/:userKey/:modelKey", name: "model", component: Model },

    { path: "/sources/:userKey/:modelKey/:releaseKey", name: "release", component: Release },

    { path: "/sources/:userKey/:modelKey/:releaseKey/namespaces", name: "namespaces", component: Namespaces },

    { path: "/sources/:userKey/:modelKey/:releaseKey/qa", name: "qa", component: QA },

    { path: "/sources/:userKey/:modelKey/:releaseKey/namespaces/:prefix", component: Namespace },

    // { path: "/sources/:userKey/:modelKey/:releaseKey/namespaces/:prefix/:contents", component: Namespace },

    // { path: "/sources/:userKey/:modelKey/:releaseKey/properties/", name: "properties", component: Properties },

    { path: "/sources/:userKey/:modelKey/:releaseKey/properties/:qname", name: "property", component: Property, props: true },

    // { path: "/sources/:userKey/:modelKey/:releaseKey/types/", name: "types", component: Types },

    { path: "/sources/:userKey/:modelKey/:releaseKey/types/:qname", name: "type", component: Type },

    // { path: "/sources/:userKey/:modelKey/:releaseKey/terms/", name: "terms", component: Terms },

    // { path: "/sources/:userKey/:modelKey/:releaseKey/terms/:prefix/:term", name: "term", component: Term },

  ]
});
