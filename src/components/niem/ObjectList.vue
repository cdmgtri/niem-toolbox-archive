
<template>
  <div>
    <details v-if="objects.length > 0" :open="open">
      <summary>
        <span>{{ label }} </span>
        <b-badge variant="info" pill>{{ objects.length }}</b-badge>
      </summary>

      <!-- List property rows -->
      <object-row v-for="property of properties" :key="property.qname" :property="property" :parentXPath="parentXPath"/>

      <!-- List type rows -->
      <object-row v-for="type of types" :key="type.qname" :type="type" :parentXPath="parentXPath"/>

    </details>
    <br v-if="objects.length"/>
  </div>
</template>

<script>

import ObjectRow from "./ObjectRow.vue";

export default {
  name: "ObjectList",

  props: {
    properties: {
      type: Array,
      default: () => []
    },
    types: {
      type: Array,
      default: () => []
    },
    parentXPath: {
      type: String,
      default: ""
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
    ObjectRow
  },

  computed: {

    objects() {
      return this.properties.concat(this.types);
    }

  }
}

</script>
