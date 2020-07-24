
<template>
  <div>

    <!-- Converts an object with string values to a table with key-value rows -->

    <details :open="open">
      <summary>{{ label }}</summary>

      <b-table small :items="items" :fields="fields" thead-class="d-none">
        <template v-slot:cell()="data">
          <copy-span :label="data.item.field" :text="data.value"/>
        </template>
      </b-table>

    </details>
    <br/>
  </div>
</template>

<script>

import CopySpan from "./CopySpan.vue";

export default {

  name: "FieldValueTable",
  components: {
    CopySpan
  },
  props: {
    object: Object,
    label: String,
    open: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      items: [],
      fields: [
        {
          key: "field",
          tdClass: "td-field"
        },
        {
          key: "value"
        }
      ],

    }
  },

  mounted() {
    Object.keys( this.object ).forEach( key => {
      let row = {
        field: key,
        value: this.object[key]
      }
      if (row.value) this.items.push(row);
    });
  }
}
</script>

<style>

table {
  word-wrap: break-word;
}

.td-field {
  width: 150px !important;
}

</style>