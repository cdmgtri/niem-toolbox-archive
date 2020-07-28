
<template>
  <span>
    <strong><b-link :to="namespaceRoute">{{ namespace.fileName }}</b-link></strong>
    <span v-if="namespace.fileName != namespace.prefix"> ({{ namespace.prefix }})</span>
  </span>
</template>

<script>

import Utils from "../../utils";

export default {
  name: "NamespaceRowHeader",

  props: {
    namespace: {
      type: Object,
      required: true
    }
  },

  data() {

    return {
      namespaceRoute: Utils.getNamespaceRoute(this.namespace),
    }

  }

}
</script>