
<template>
  <div>
    <div v-for="userKey in users" :key="userKey">

      <h1>{{ userKey}}</h1>

      <div v-for="model in models(userKey)" :key="model.modelKey">
        <h3>{{ model.modelKey }}</h3>

        <b-list-group>
          <b-list-group-item v-for="release in releases(userKey, model.modelKey)" :key="release.releaseKey">
            <b-link :to="releaseLink(userKey, model.modelKey, release.releaseKey)">
              Release {{ release.releaseKey }}
            </b-link>
          </b-list-group-item>
        </b-list-group>
      </div>

    </div>
  </div>
</template>

<script>

import Utils from "../utils";

export default {

  name: "Models",

  data() {
    return {
      users: this.$store.state.users
    }
  },

  methods: {

    models(userKey) {
      return this.$store.getters.models(userKey);
    },

    releases(userKey, modelKey) {
      return this.$store.getters.releases(userKey, modelKey);
    },

    releaseLink(userKey, modelKey, releaseKey) {
      return `/${userKey}/${modelKey}/${releaseKey}/`;
    }
  }

}
</script>
