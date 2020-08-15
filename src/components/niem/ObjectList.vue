
<template>
  <div>
    <details v-if="objects.length > 0" :open="open" v-on:toggle="load=true">
      <summary>
        <h4 class="section">
          <span>{{ label }} </span>
          <b-badge variant="info" pill>{{ objects.length }}</b-badge>
        </h4>
      </summary>

      <div v-if="load == true">

        <!-- List property rows -->
        <property-row v-for="property of properties" :key="property.qname" :property="property" :parentXPath="parentXPath"/>

        <!-- List type rows -->
        <type-row v-for="type of types" :key="type.qname" :type="type" :parentXPath="parentXPath"/>

      </div>

    </details>
    <br v-if="objects.length"/>
  </div>
</template>

<script>

import PropertyRow from "./PropertyRow.vue";
import TypeRow from "./TypeRow.vue";

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
    PropertyRow,
    TypeRow
  },

  data() {
    return {
      load: this.open
    }
  },

  computed: {

    objects() {
      return this.properties.concat(this.types);
    }

  }
}

</script>
