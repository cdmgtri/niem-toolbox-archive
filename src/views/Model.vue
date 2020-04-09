
<template>
  <div>
    <b-breadcrumb :items="breadcrumb"/>
    <div v-if="releases">

      <h1>{{ userKey}} {{ modelKey }}</h1>

      <b-list-group>
        <b-list-group-item v-for="release in releases" :key="release.releaseKey">
          <b-link :to="releaseLink(release.releaseKey)">Release {{ release.releaseKey }}</b-link>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>

import Utils from "../utils";

export default {

  name: "Model",

  data() {
    let { userKey, modelKey } = this.$route.params;

    return {
      userKey,
      modelKey,
      breadcrumb: Utils.getBreadcrumb({userKey, modelKey}),
    }
  },
  computed: {
    releases() {
      return this.$store.state.releases;
    }
  },
  methods: {
    releaseLink(releaseKey) {
      return `/${this.userKey}/${this.modelKey}/${releaseKey}/`;
    }
  }
}
</script>
