
<template>
  <details v-if="substitutions.length > 0" open>
    <summary>
      <span>Substitutions </span>
      <b-badge variant="info" pill>{{ substitutions.length }}</b-badge>
    </summary>
    <property-row v-for="substitution of substitutions" :key="substitution.qname" :property="substitution" :path="path" :map="map" :subset="subset"/>
  </details>
</template>

<script>

import PropertyRow from "./PropertyRow";

export default {
  name: "Substitutions",

  props: {
    substitutions: {
      type: Array,
      default: () => []
    },
    path: {
      type: Array,
      default: () => []
    },
    map: {
      type: Boolean,
      default: false
    },
    subset: {
      type: Boolean,
      default: false
    }},

  components: {
    PropertyRow
  }
}
</script>