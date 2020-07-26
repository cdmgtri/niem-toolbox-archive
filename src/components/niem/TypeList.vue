
<template>
  <div>
    <details v-if="types.length > 0" :open="open">
      <summary>
        <span>{{ label }} </span>
        <b-badge variant="info" pill>{{ types.length }}</b-badge>
      </summary>
      <type-row v-for="type of types" :key="type.qname" :type="type" :parentXPath="parentXPath"/>
    </details>
    <br v-if="types.length"/>
  </div>
</template>

<script>

import TypeRow from "./TypeRow";

export default {
  name: "TypeList",

  props: {
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
    TypeRow
  }
}

</script>
