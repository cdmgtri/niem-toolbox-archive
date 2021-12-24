
<template>
  <div>
    <b-card>
      <details v-on:toggle="load=true">

        <summary>
          <span v-if="label">{{ label }} </span>
          <slot name="header"/>

          <!-- Definition -->
          <span v-if="definition && headerDefinition">
            <br/>
            <p class="pl-3"><copy-span :text="definition" label="definition"/></p>
          </span>
        </summary>

        <div v-if="load==true" class="component-summary">

          <!-- Definition -->
          <p v-if="definition && !headerDefinition"><copy-span :text="definition" label="definition"/></p>

          <slot name="details"/>

        </div>

      </details>
    </b-card>

    <br v-if="spacer==true"/>

  </div>
</template>

<script>

import { mapGetters } from "vuex";
import CopySpan from "../CopySpan.vue";

export default {

  name: "ObjectRow",

  components: {
    CopySpan
  },

  props: {
    definition: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ""
    },
    spacer: {
      // Trailing line break following the row
      type: Boolean,
      default: false
    },
    headerDefinition: {
      // Include the definition in the summary header or the details
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      load: false,
    }
  },

}

</script>

<style scoped>

div.component-summary {
  padding-top: 10px;
  padding-left: 18px;
}

</style>
