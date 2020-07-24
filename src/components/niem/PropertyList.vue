
<template>
  <div>
    <details v-if="properties.length > 0" :open="open">
      <summary>
        <span>{{ label }} </span>
        <b-badge variant="info" pill>{{ properties.length }}</b-badge>
      </summary>
      <property-row v-for="property of properties" :key="property.qname" :property="property" :path="path"/>
    </details>
    <br v-if="properties.length"/>
  </div>
</template>

<script>

import PropertyRow from "./PropertyRow";

export default {
  name: "PropertyList",

  props: {
    properties: {
      type: Array,
      default: () => []
    },
    path: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ""
    },
    open: {
      type: Boolean,
      default: true
    }
  },

  components: {
    PropertyRow
  }
}

</script>
