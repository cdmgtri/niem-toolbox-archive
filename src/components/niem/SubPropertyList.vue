
<template>
  <div v-if="types.length > 0">
    <details open>
      <summary>
        <h4 class="section">
          <span>{{ label }} </span>
          <b-badge variant="info" pill>{{ types.length }}</b-badge>
        </h4>
      </summary>

      <sub-property-table v-for="type of types" :key="type.qname" :type="type" :property="property"/>
    </details>
  </div>
</template>

<script>

import SubPropertyTable from "./SubPropertyTable.vue";
import { SubPropertyInstance, TypeInstance } from "../../utils/index";
import { Property } from "niem-model";

export default {

  name: "SubPropertyList",

  components: {
    SubPropertyTable
  },

  props: {
    property: {
      type: Property,
      required: true
    },

    label: {
      type: String,
      default: "Available within types"
    }

  },

  data() {
    return {
      /** @type {TypeInstance[]} */
      types: []
    }
  },

  async mounted() {
    /** @type {SubPropertyInstance[]} */
    let subProperties = await this.property.subProperties.find();

    for (let subProperty of subProperties) {
      let type = await subProperty.type();
      this.types.push(type);
    }

  }

}
</script>
