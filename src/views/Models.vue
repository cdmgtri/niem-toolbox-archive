
<template>
  <div>
    <div v-for="userKey in userKeys" :key="userKey">

      <b-alert show>
        <h1>{{ userKey }}</h1>
      </b-alert>

      <div v-for="model in userModels(userKey)" :key="model.modelKey">
        <details open>
          <summary>
            <h4 class="section">{{ model.modelKey }}</h4>
          </summary>

          <b-list-group>
            <b-list-group-item v-for="release in modelReleases(userKey, model.modelKey)" :key="release.releaseKey">
              <b-link :to="releaseLink(userKey, model.modelKey, release.releaseKey)">
                Release {{ release.releaseKey }}
              </b-link>
            </b-list-group-item>
          </b-list-group>
        </details>
      </div>
      <br/>

    </div>
  </div>
</template>

<script>

import { data } from "../utils/index";

export default {

  name: "Models",

  data() {
    return {
      /** @type {String[]} */
      userKeys: [],

      models: [],
      releases: [],
    }
  },

  methods: {

    userModels(userKey) {
      return this.models.filter( model => model.userKey == userKey );
    },

    modelReleases(userKey, modelKey) {
      return this.releases.filter( release => release.userKey == userKey && release.modelKey == modelKey );
    },

    releaseLink(userKey, modelKey, releaseKey) {
      return `/${userKey}/${modelKey}/${releaseKey}/`;
    }

  },

  async mounted() {
    this.userKeys = await data.userKeys.find();
    this.models = await data.models.find();
    this.releases = await data.releases.find();
  }

}

</script>
