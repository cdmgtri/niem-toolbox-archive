
<template>
  <div v-if="namespace">

    <!-- Definition -->
    <p class="definition"><copy-span :label="'Definition'" :text="namespace.definition"/></p>

    <p><a :href="namespace.uri" target="_blank">{{ namespace.uri }}</a></p>

    <!-- Namespace details -->
    <field-value-table :object="details" label="More details" :links="['URI']"/>

    <!-- Namespace source -->
    <field-value-table v-if="source" :object="source" label="Source"/>

    <div v-if="loaded == true">

      <!-- Properties -->
      <object-list :properties="properties" label="Properties" :open="false"/>

      <!-- Types -->
      <object-list :types="types" label="Types" :open="false"/>

      <!-- Local Terms -->
      <local-term-table :localTerms="localTerms" :open="false"/>

      <!-- Dependents (used by other namespaces) -->


      <!-- Dependencies (uses of other namespaces) -->


    </div>

  </div>
</template>

<script>

import CopySpan from "../CopySpan.vue";
import FieldValueTable from "../FieldValueTable.vue";

export default {

  name: "NamespaceInfo",

  props: {
    namespace: {
      loaded: false,
      type: Object
    }
  },

  components: {
    CopySpan,
    FieldValueTable,
    LocalTermTable: () => import("./LocalTermTable.vue"),
    ObjectList: () => import("./ObjectList.vue")
  },

  data() {
    return {
      loaded: false,
      properties: [],
      types: [],
      localTerms: [],
    }
  },

  computed: {

    details() {
      return {
        "Prefix": this.namespace.prefix,
        "File Name": this.namespace.fileName,
        "Style": this.namespace.style,
        "URI": this.namespace.uri
      }
    },

    source() {
      if (!this.namespace.origin) return undefined;

      let source = {};
      for (let key of Object.keys(this.namespace.origin)) {
        if (this.namespace.origin[key]) {
          source[key] = this.namespace.origin[key];
        }
      }

      if (Object.keys(source).length == 0) return undefined;

      return source;
    }

  },

  async mounted() {
    this.properties = this.$store.getters.properties(this.namespace.prefix);
    this.types = this.$store.getters.types(this.namespace.prefix);
    this.localTerms = this.$store.getters.localTerms(this.namespace.prefix);
    this.loaded = true;
  }

}
</script>