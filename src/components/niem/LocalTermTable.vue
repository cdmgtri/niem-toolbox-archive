
<template>
  <copy-table :items="items" :fields="fields" label="Local Terms" :open="false"/>
</template>

<script>

import CopyTable from "../CopyTable.vue";

export default {

  name: "LocalTermTable",

  props: {
    localTerms: {
      type: Array,
      default: () => []
    }
  },

  components: {
    CopyTable
  },

  data() {
    return {
      fields: [
        { key: "term", label: "Term" },
        { key: "style", label: "Style", tdClass: "td-localTerm-style" },
        { key: "value", label: "Literal / Definition"}
      ]
    }
  },

  computed: {

    items() {
      return this.localTerms.map( localTerm => {

        let style = "Literal";
        let value = localTerm.literal;

        if (!localTerm.literal) {
          style = "Definition";
          value = localTerm.definition;
        }

        return {
          term: localTerm.term,
          style,
          value
        }
      });
    },

  }

}
</script>

<style>


td-localTerm-style {
  width: 100px !important;
}

</style>