
<template>
  <details v-if="substitutions.length > 0">
    <summary>
      <span>Substitutions </span>
      <b-badge variant="info" pill>{{ substitutions.length }}</b-badge>
    </summary>
    <property-row v-for="substitution of substitutions" :key="substitution.qname" :property="substitution" :path="path"/>
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
    }
  },

  components: {
    PropertyRow
  }
}
</script>