
<template>
  <!-- Converts an object with string values to a table with key-value rows -->
  <div>
    <b-card>
      <details :open="open">
        <summary>
          <slot>{{ label }}</slot>
        </summary>

        <b-table small :items="items" :fields="fields" thead-class="d-none">
          <template v-slot:cell(value)="data">
            <copy-span :label="data.item.field" :text="data.value"/>

            <span v-if="links.includes(data.item.field)">
              <a :href="data.value" target="_blank">
                <i class="fa fa-external-link" aria-hidden="true"></i>
              </a>
            </span>
          </template>
        </b-table>

      </details>
    </b-card>
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
      default: false
    },
    links: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      items: [],
      fields: [
        { key: "field", tdClass: "td-field" },
        { key: "value" }
      ],

    }
  },

  mounted() {
    // Convert the given object to an array of field-value rows
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
