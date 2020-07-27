
<template>
  <div v-if="items.length > 0">
    <details :open="open">
      <summary>
        <h4 class="section">
          <span>{{ label }} </span>
          <b-badge variant="info" pill>{{ items.length }}</b-badge>
        </h4>
      </summary>

      <p>Copy table as:
        <b-button variant="link" @click="copyMarkdown()" v-b-tooltip.click.v-success="'Markdown copied'">Markdown</b-button> |
        <b-button variant="link" @click="copyExcel()" v-b-tooltip.click.v-success="'Excel cells copied'">Excel cells</b-button>
      </p>

      <b-table small :items="items" :fields="fields">
        <template v-slot:cell()="data">
          <copy-span :label="data.field.label" :text="data.value"/>
        </template>
      </b-table>
    </details>
    <br/>
  </div>
</template>

<script>

import CopySpan from "./CopySpan.vue";

export default {


  name: "CopyTable",

  props: {
    items: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      required: true
    },
    open: {
      type: Boolean,
      default: true
    }
  },

  components: {
    CopySpan
  },

  methods: {

    copied() {
      setTimeout( () => {
        this.$root.$emit("bv::hide::tooltip");
      }, 600)
    },

    copyMarkdown() {
      let keys = Object.keys(this.items[0]);
      let header = keys.join(" | ") + "\n";
      let separator = keys.map( key => "---" ).join(" | ") + "\n";
      let text = this.items.map( item => Object.values(item).join(" | ") ).join("\n");
      this.$copyText(header + separator + text);
      this.copied();
    },

    copyExcel() {
      let header = Object.keys(this.items[0]).join("\t") + "\n";
      let text = this.items.map( item => Object.values(item).join("\t") ).join("\n");
      this.$copyText(header + text);
      this.copied();
    }

  }

}

</script>

<style scoped>

.btn-link {
  padding: 1px !important;
  margin-top: -3px !important;
}

p {
  font-weight: 100;
}

</style>