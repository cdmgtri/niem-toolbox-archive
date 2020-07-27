
<template>
  <div v-if="loaded">
    <b-breadcrumb :items="breadcrumb"/>

    <h1>{{ label }} {{ qname }}</h1>

    <property-info v-if="property" :property="property" :xpath="xpath"/>
    <type-info v-if="type" :type="type" :xpath="xpath"/>

  </div>
</template>

<script>

import { mapGetters } from "vuex";

import Utils from "../utils";

export default {

  name: "Object",
  components: {
    PropertyInfo: () => import("../components/niem/PropertyInfo.vue"),
    TypeInfo: () => import("../components/niem/TypeInfo.vue"),
  },

  data() {

    let { userKey, modelKey, releaseKey, prefix, name } = this.$route.params;

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
      label,
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
      if (this.label == "Property") {
        this.property = this.$store.getters.property(this.qname);
        this.xpath = Utils.updateXPath("", this.property);
      }
      else if (this.label == "Type") {
        this.type = this.$store.getters.type(this.qname);
        this.xpath = Utils.updateXPath("", this.type);
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
