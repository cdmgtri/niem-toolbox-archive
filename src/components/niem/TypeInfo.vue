
<template>
  <div v-if="type">

    <!-- Definition -->
    <p class="definition"><copy-span :label="'Definition'" :text="type.definition"/></p>

    <!-- Type details -->
    <field-value-table :object="details" label="More details" :open="false"/>

    <!-- Parents -->
    <type-list :types="parents" label="Parent types" :parentXPath="xpath"/>

    <!-- Facets -->
    <facet-table :facets="facets"/>

    <!-- Inherited and contained properties -->
    <contained-properties-list v-if="type" :type="type" :parentXPath="xpath"/>

    <!-- Full sub-property for each type that contains this property -->
    <sub-property-table :typeQName="type.qname"/>

  </div>
</template>

<script>

import CopySpan from "../CopySpan.vue";
import FieldValueTable from "../FieldValueTable.vue";

export default {

  name: "TypeInfo",

  props: {
    type: {
      type: Object,
    },

    xpath: {
      type: String,
      default: ""
    }
  },

  components: {
    CopySpan,
    FieldValueTable,
    TypeList: () => import("./TypeList.vue"),
    FacetTable: () => import("./FacetTable.vue"),
    ContainedPropertiesList: () => import("./ContainedPropertiesList.vue"),
    SubPropertyTable: () => import("./SubPropertyTable.vue")
  },

  data() {
    return {
      parents: [],
      namespace: {},
      facets: [],
    }
  },

  computed: {

    details() {
      return {
        "Name": this.type.name,
        "Qualified name": this.type.qname,
        "Style": this.type.style,
        "Current XPath": this.xpath
      }
    }

  },

  async mounted() {
    this.parents = await this.type.parents();
    this.facets = await this.type.contents.facets();
    this.namespace = await this.type.namespace();
  }

}
</script>
