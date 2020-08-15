
<template>
  <div v-if="types.length > 0">
    <details open>
      <summary>
        <h4 class="section">
          <span>{{ label }} </span>
          <b-badge variant="info" pill>{{ types.length }}</b-badge>
        </h4>
      </summary>

      <p class="font-weight-light pl-3">Copy results for
        <!-- Copy Markdown list -->
        <b-button variant="link" @click="copyMarkdownList()" v-b-tooltip.click.v-success="'Markdown list copied'">Markdown List</b-button> |

        <!-- Copy Markdown table -->
        <b-button variant="link" @click="copyMarkdownTable()" v-b-tooltip.click.v-success="'Markdown table copied'">Markdown Table</b-button> |

        <!-- Copy Excel -->
        <b-button variant="link" @click="copyExcel()" v-b-tooltip.click.v-success="'Excel cells copied'">Excel</b-button>
      </p>

      <sub-property-table v-for="type of types" :key="type.qname" :type="type" :property="property"/>
    </details>
    <br/>
  </div>
</template>

<script>

import { Property, SubProperty } from "niem-model";
import { SubPropertyInstance, TypeInstance } from "../../utils/index";
import SubPropertyTable from "./SubPropertyTable.vue";

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
      types: [],

      /** @type {SubPropertyInstance[]} */
      subProperties: undefined
    }
  },

  methods: {

    copy(text) {
      this.$copyText(text);
      setTimeout( () => this.$root.$emit("bv::hide::tooltip"), 600);
    },

    copyMarkdownList() {
      let text = `### Types that contain property ${this.property.qname}\n\n`;
      text += this.subProperties.map( subProperty => "- " + subProperty.typeQName).join("\n") + "\n";
      this.copy(text);
    },

    /**
     * @param {"markdown"|"excel"} style
     */
    copyTable(style) {

      let delimiter = (style == "markdown") ? " | " : "\t";
      let text = `Type ${delimiter} Property ${delimiter} Min ${delimiter} Max`;
      text += "\n";

      if (style == "markdown") {
        text += " --- |".repeat(4) + "\n";
      }

      text += this.subProperties.map( subProperty => `${subProperty.typeQName}${delimiter}${subProperty.propertyQName}${delimiter}${subProperty.min}${delimiter}${subProperty.max}`).join("\n") + "\n";

      this.copy(text);

    },

    copyMarkdownTable() {
      return this.copyTable("markdown");
    },

    copyExcel() {
      return this.copyTable("excel");
    },


  },

  async mounted() {

    this.subProperties = (await this.property.subProperties.find()).sort(SubProperty.sortByCoreTypeProperty);

    for (let subProperty of this.subProperties) {
      let type = await subProperty.type();
      this.types.push(type);
    }

  }

}
</script>
