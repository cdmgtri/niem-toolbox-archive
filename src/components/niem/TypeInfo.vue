
<template>
  <div v-if="type">

    <!-- Definition -->
    <p class="definition"><copy-span :label="'Definition'" :text="type.definition"/></p>

    <!-- Type details -->
    <field-value-table :object="details" label="More details" :open="false"/>

    <div v-if="loaded">

      <!-- Namespace -->
      <object-row :namespace="namespace" label="Namespace" :spacer="true"/>

      <!-- Parents -->
      <object-list :types="parents" label="Parent types" :parentXPath="xpath"/>

      <!-- Facets -->
      <facet-table :facets="facets"/>

      <!-- Inherited and contained properties -->
      <contained-properties-list v-if="type" :type="type" :parentXPath="xpath"/>

      <!-- Full sub-property for each type that contains this property -->
      <sub-property-table :typeQName="type.qname"/>

      <object-list :properties="properties" label="Properties of this type"/>

    </div>

  </div>
</template>

<script>

import { Component } from "niem-model";
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
    ObjectList: () => import("./ObjectList.vue"),
    ObjectRow: () => import("./ObjectRow.vue"),
    FacetTable: () => import("./FacetTable.vue"),
    ContainedPropertiesList: () => import("./ContainedPropertiesList.vue"),
    SubPropertyTable: () => import("./SubPropertyTable.vue")
  },

  data() {
    return {
      loaded: false,
      namespace: undefined,
      parents: [],
      facets: [],
      properties: [],
    }
  },

  computed: {

    details() {
      return {
        "Name": this.type.name,
        "Qualified name": this.type.qname,
        "Style": this.type.style
      }
    }

  },

  async mounted() {
    this.namespace = await this.type.namespace();
    this.parents = await this.type.parents();
    this.facets = await this.type.contents.facets();
    this.properties = (await this.type.dataProperties.find()).sort(Component.sortByCoreQName);
    this.loaded = true;
  }

}
</script>
