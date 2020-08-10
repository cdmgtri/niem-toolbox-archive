
<template>
  <div>
    <b-breadcrumb :items="breadcrumb"/>
    <slot v-if="loaded" v-bind:namespace="namespace" v-bind:property="property" v-bind:type="type"/>
  </div>
</template>

<script>

import { breadcrumbs, data } from "../utils/index";

export default {

  name: "NIEMObject",

  data() {
    return {
      loaded: false,
      property: undefined,
      type: undefined,
      namespace: undefined,
      breadcrumb: breadcrumbs(this.$route)
    }
  },

  async mounted() {

    if (this.$route.path.includes("properties")) {
      this.property = await data.properties.get(this.$route.params);
    }
    else if (this.$route.path.includes("types")) {
      this.type = await data.types.get(this.$route.params);
    }
    else if (this.$route.path.includes("namespaces")) {
      this.namespace = await data.namespaces.get(this.$route.params);
    }

    this.loaded = true;
  }

}
</script>
