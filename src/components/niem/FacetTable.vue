
<template>
  <copy-table v-if="facets && facets.length > 0" :items="items" :fields="fields" label="Codes / Facets"/>
</template>

<script>

import CopyTable from "../CopyTable.vue";

export default {

  name: "FacetTable",

  props: {
    facets: {
      type: Array,
      required: true
    },

    open: {
      type: Boolean,
      default: true
    }
  },

  components: {
    CopyTable
  },

  data() {
    return {
      fields: [
        { key: "Style", tdClass: "td-facet-style" },
        { key: "Value", tdClass: "td-facet-value" },
        { key: "Definition", tdClass: "td-facet-definition" },
      ],

      items: this.facets.map( facet => {
        return {
          "Qualified Type": facet.typeQName,
          Style: facet.style,
          Value: facet.value,
          Definition: facet.definition
        }
      })
    }
  }

}
</script>

<style>

.td-facet-style {
  width: 130px !important;
}

</style>