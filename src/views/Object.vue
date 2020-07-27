
<template>
  <div v-if="loaded">
    <b-breadcrumb :items="breadcrumb"/>

    <h1 v-if="label=='Namespace'">Namespace {{ namespace.fileName }} ({{ namespace.prefix }})</h1>
    <h1 v-else>{{ label }} {{ qname }}</h1>

    <namespace-info v-if="namespace" :namespace="namespace"/>
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
    NamespaceInfo: () => import("../components/niem/NamespaceInfo.vue"),
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
      namespace: undefined,
      prefix,
      label,
      qname: prefix + ":" + name,
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
        console.log("IN NS LOAD", this.prefix);
        this.namespace = this.$store.getters.namespace(this.prefix);
        console.log("IN NS LOAD", this.namespace.prefix);
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
