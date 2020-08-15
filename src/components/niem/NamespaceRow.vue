
<template>
  <object-row v-if="namespace" :definition="namespace.definition" :spacer="spacer">

    <template #header>
      <strong><b-link :to="namespaceRoute">{{ namespace.fileName }}</b-link></strong>
      <span v-if="namespace.fileName != namespace.prefix"> ({{ namespace.prefix }})</span>
    </template>

    <template #details>
      <p>Properties, types, local terms</p>
    </template>

  </object-row>
</template>

<script>

import { data } from "../../utils/index";
import ObjectRow from "./ObjectRow.vue";

export default {
  name: "NamespaceRow",

  components: {
    ObjectRow
  },

  props: {
    namespace: {
      type: Object,
      required: true
    },
    spacer: {
      // Trailing line break following the row
      type: Boolean,
      default: false
    }
  },

  data() {

    return {
      namespaceRoute: data.namespaces.route(this.namespace),
    }

  }

}
</script>