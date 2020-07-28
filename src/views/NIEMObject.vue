
<template>
  <div v-if="loaded">
    <b-breadcrumb :items="breadcrumb"/>
    <slot v-bind:namespace="namespace" v-bind:property="property" v-bind:type="type"/>
  </div>
</template>

<script>

import { mapGetters } from "vuex";

import Utils from "../utils";

export default {

  name: "NIEMObject",

  data() {

    let { userKey, modelKey, releaseKey, prefix, qname } = this.$route.params;

    /** @type {"Property"|"Type"|"Namespace"} */
    let label = "";

    if (this.$route.path.includes("properties")) {
      label = "Property";
    }
    else if (this.$route.path.includes("types")) {
      label = "Type";
    }
    else if (this.$route.path.includes("namespaces")) {
      label = "Namespace";
    }

    return {
      loaded: false,
      property: undefined,
      type: undefined,
      namespace: undefined,
      prefix,
      label,
      qname,
      xpath: "",
      breadcrumb: Utils.getBreadcrumb(this.$route.params, label)
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
      if (this.label == "Property") {
        this.property = this.$store.getters.property(this.qname);
        this.xpath = Utils.updateXPath("", this.property);
      }
      else if (this.label == "Type") {
        this.type = this.$store.getters.type(this.qname);
        this.xpath = Utils.updateXPath("", this.type);
      }
      else if (this.label == "Namespace") {
        this.namespace = this.$store.getters.namespace(this.prefix);
      }

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
