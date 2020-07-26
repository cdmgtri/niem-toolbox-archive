
<template>
  <div v-if="loaded">
    <b-breadcrumb :items="breadcrumb"/>

    <h1>Property {{ property.qname }}</h1>

    <property-info :property="property" :xpath="xpath"/>

  </div>
</template>

<script>

import { Property } from "niem-model";

import { mapGetters } from "vuex";

import Utils from "../utils";

export default {

  name: "Property",
  components: {
    PropertyInfo: () => import("../components/niem/PropertyInfo.vue"),
  },

  data() {

    let { userKey, modelKey, releaseKey, prefix, name } = this.$route.params;

    return {
      loaded: false,
      property: {},
      qname: prefix + ":" + name,
      xpath: "",
      breadcrumb: Utils.getBreadcrumb(this.$route.params, "properties")
    }
  },

  computed: {

    ...mapGetters(["storeLoaded"]),

  },

  watch: {

    /**
     * Load information about this property once the store has finished loading the release
     */
    storeLoaded(newValue, oldValue) {
      if (oldValue == false && newValue == true) {
        this.load();
      }
    }

  },

  methods: {

    async load() {
      this.property = this.$store.getters.property(this.qname);
      this.xpath = Utils.updateXPath("", this.property);
      this.loaded = true;
    }

  },

  async created() {
    if (this.storeLoaded == true) {
      await this.load();
    }
  }

}
</script>
