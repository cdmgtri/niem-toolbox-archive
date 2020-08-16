
<template>
  <!-- Namespace details -->
  <stacked-field-table v-if="namespace" :object="details" :links="['URI']" :open="false">
    <span>Namespace </span>
    <strong><b-link :to="namespaceRoute">{{ namespace.fileName }}</b-link></strong>
    <span v-if="namespace.fileName != namespace.prefix"> ({{ namespace.prefix }})</span>
    <b-badge variant="secondary" pill>{{ namespace.style }}</b-badge>
  </stacked-field-table>
</template>

<script>

import StackedFieldTable from "../StackedFieldTable.vue";

import { Namespace } from "niem-model";
import { data, NamespaceInstance } from "../../utils/index";

export default {

  name: "NamespaceDetailsRow",

  props: {
    /** @type {NamespaceInstance} */
    namespace: {
      required: false,
      type: Namespace
    },

    spacer: {
      type: Boolean,
      default: false
    }
  },

  components: {
    StackedFieldTable,
  },

  data() {
    return {
      namespaceRoute: data.namespaces.route(this.namespace),
      details: {
        "Definition": this.namespace.definition,
        "Prefix": this.namespace.prefix,
        "File Name": this.namespace.fileName,
        "Style": this.namespace.style,
        "URI": this.namespace.uri,
      }
    }

  }

}
</script>
