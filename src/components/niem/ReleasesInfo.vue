
<template>
  <div v-if="loaded">
    <b-list-group>
      <b-list-group-item v-for="release in releases" :key="release.releaseKey">
        <b-link :to="getReleaseLink(userKey, modelKey, release.releaseKey)">
          Release {{ release.releaseKey }}
        </b-link>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>

import { getReleaseLink, data } from "../../utils/index";

export default {

  name: "ModelsInfo",

  props: {
    userKey: { type: String, required: true },
    modelKey: { type: String, required: true }
  },

  data() {
    return {
      releases: [],
      loaded: false,
      getReleaseLink
    }
  },

  async mounted() {
    this.releases = await data.releases.find({userKey: this.userKey, modelKey: this.modelKey});
    this.loaded = true;
  }

}

</script>
