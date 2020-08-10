
<template>
  <span>
    <strong><b-link :to="namespaceRoute">{{ namespace.fileName }}</b-link></strong>
    <span v-if="namespace.fileName != namespace.prefix"> ({{ namespace.prefix }})</span>
  </span>
</template>

<script>

import { data } from "../../utils/index";

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
      namespaceRoute: data.namespaces.route(this.namespace),
    }

  }

}
</script>