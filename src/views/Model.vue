
<template>
  <div>
    <b-breadcrumb :items="breadcrumb"/>
    <div>

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

import { breadcrumbs, data } from "../utils/index";

export default {

  name: "Model",

  data() {
    let { userKey, modelKey } = this.$route.params;

    return {
      userKey,
      modelKey,
      breadcrumb: breadcrumbs(this.$route),
      releases: undefined
    }
  },

  methods: {
    releaseLink(releaseKey) {
      return `/${this.userKey}/${this.modelKey}/${releaseKey}/`;
    }
  },

  async mounted() {
    this.releases = await data.releases.find(this.$route.params);
  }

}

</script>
