
<template>
  <div>
    <h2>Toolbox Settings</h2>

    <br/>

    <details open>
      <summary>
        <h4 class="section">Release options</h4>
      </summary>

      <p>Select which releases should be made available.  These will be loaded into memory.</p>

      <b-form-group>
        <b-form-checkbox v-for="release in availableReleases" :key="release.releaseKey" v-model="release.selected" class="checkbox" @change="reloadReleases">
          {{ release.userKey }}-{{ release.modelKey }}-{{ release.label }}
          <small v-if="release.timestamp"> - generated {{ release.timestamp }}</small>
        </b-form-checkbox>
      </b-form-group>
    </details>

  </div>
</template>

<script>
export default {

  name: "settings",

  data() {
    return {
      selectedReleaseKeys: [],
    }
  },

  computed: {
    availableReleases() {
      return this.$store.state.availableReleases;
    },
    defaultReleaseKey: {
      get: function () {
        return this.$store.state.defaultReleaseKey;
      },
      set: function (newReleaseKey) {
        this.$store.state.defaultReleaseKey = newReleaseKey;
      }
    }
  },

  methods: {
    async reloadReleases() {
      this.$store.dispatch("load");
    }
  }

}
</script>

<style scoped>

select {
  width: auto;
  margin-top: -4px;
  margin-left: 8px;
}

div.checkbox {
  margin-left: 12px;
}

</style>