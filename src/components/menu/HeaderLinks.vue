
<template>
  <div :id="toggleID" class="collapse navbar-collapse menu-links">
    <b-nav class="navbar-nav ml-auto">

      <b-nav-item :to="'/'" exact>Home</b-nav-item>
      <b-nav-item :to="'/sources'" exact>Browse</b-nav-item>
      <b-nav-item :to="'/search'" exact>Search</b-nav-item>

      <b-nav-item :to="'/settings'" exact>
        <i class="fa fa-gear"></i>
      </b-nav-item>

      <b-nav-form>
        <b-input-group class="text-success" prepend="Selected release" size="sm">
          <!-- <b-form-select v-model="releaseKey" :options="releaseKeys" size="sm"/> -->
          <b-form-select v-model="defaultReleaseKey" :options="loadedReleases" size="sm" value-field="releaseKey" text-field="label"/>
        </b-input-group>
      </b-nav-form>

<!--
      <b-nav-item-dropdown text="Help">
        <b-nav-item :to="'/about'">About</b-nav-item>
        <b-nav-item :to="'/version'">Version History</b-nav-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown text="gpburdell">
        <b-nav-item :to="'/account'">Account</b-nav-item>
        <b-nav-item :to="'/gpburdell/messages'">My messages</b-nav-item>
        <b-nav-item :to="'/gpburdell/models'">My models</b-nav-item>
        <b-nav-item :to="'/logout'">Log out</b-nav-item>
      </b-nav-item-dropdown>
 -->

    </b-nav>
  </div>
</template>

<script>
  export default {
    name: "HeaderLinks",
    props: [
      "toggleID"
    ],
    computed: {
      loadedReleases() {
        return this.$store.getters.loadedReleases;
      },
      defaultReleaseKey: {
        get() {
          return this.$store.state.defaultReleaseKey;
        },
        set(newReleaseKey) {
          this.$store.state.defaultReleaseKey = newReleaseKey;
        }
      },
      loaded() {
        return this.$store.state.loaded;
      },
      loadedIndicator() {
        if (this.loaded == "in progress") return "spinner";
        else if (this.loaded == "yes") return "check";
        return "!"
      }
    },
    data: () => {
      return {
        releaseKey: "5.1",
        releaseKeys: [
          { text: "NIEM 5.0", value: "5.1", default: true },
          { text: "NIEM 5.0", value: "5.0", default: false },
          { text: "NIEM 4.2", value: "4.2", disabled: true }
        ]
      }
    }
  }
</script>

<style scoped>

.nav-link {
  padding-right: 5px;
  /* font-weight: 400 !important; */
}

.form-inline {
  padding-left: 10px;
}

.router-link-active {
  text-decoration: underline !important;
}

</style>