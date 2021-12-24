
<template>
  <div>

    <b-breadcrumb :items="breadcrumbs"/>

    <b-alert show>
      <h1>{{ userKey}} {{ modelKey }} {{ releaseKey }} </h1>
      <hr/>
      <span>NIEM Release</span>
    </b-alert>

    <b-list-group>
      <b-list-group-item>
        <b-link :to="pageLink('namespaces')">Namespaces</b-link>
      </b-list-group-item>
      <b-list-group-item>
        <b-link :to="pageLink('qa')">QA</b-link>
      </b-list-group-item>
    </b-list-group>

  </div>
</template>

<script>

import { getBreadcrumbs } from "../utils/index";

export default {

  name: "Release",

  data() {

    let { userKey, modelKey, releaseKey } = this.$route.params;

    return {
      userKey,
      modelKey,
      releaseKey,
      breadcrumbs: getBreadcrumbs(this.$route),
    }
  },

  methods: {

    pageLink(subpath) {
      let path = this.$route.path.replace(/\/$/, "");
      return path + "/" + subpath;
    },

  }

}
</script>
