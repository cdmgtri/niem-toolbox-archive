
<template>
  <div v-if="facets.length > 0">
    <details :open="open">
      <summary>
        <h4>
          <span>Codes and other facets </span>
          <b-badge variant="info" pill> {{ facets.length }}</b-badge>
        </h4>
      </summary>
      <b-table small v-if="facets" :items="facets" :fields="fields" :head-variant="null"/>
    </details>
    <br/>
  </div>
</template>

<script>
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

  data() {
    return {
      fields: [
        { key: "style", tdClass: "td-facet-style" },
        { key: "value", tdClass: "td-facet-value" },
        { key: "definition", tdClass: "td-facet-definition" },
      ]
    }
  }
}
</script>

<style>

.td-facet-style {
  width: 130px !important;
}

</style>