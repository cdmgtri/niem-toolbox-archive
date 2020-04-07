
<template>
  <div>
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

export default {

  name: "Model",

  data() {
    return {
      userKey: this.$route.params.userKey,
      modelKey: this.$route.params.modelKey
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
