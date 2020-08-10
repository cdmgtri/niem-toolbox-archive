
<template>
  <div v-if="type">

    <!-- Definition -->
    <p class="definition"><copy-span :label="'Definition'" :text="type.definition"/></p>

    <!-- Type details -->
    <field-value-table :object="details" label="More details" :open="false"/>

    <!-- Namespace -->
    <object-row v-if="namespace" :namespace="namespace" label="Namespace" :spacer="true"/>

    <!-- Parents -->
    <object-list v-if="parents" :types="parents" label="Parent types" :parentXPath="xpath"/>

    <!-- Facets -->
    <facet-table v-if="facets" :facets="facets"/>

    <!-- Inherited and contained properties -->
    <contained-properties-list v-if="type" :type="type" :parentXPath="xpath"/>

    <!-- Full sub-property for each type that contains this property -->
    <sub-property-table :type="type" :spacer="true"/>

    <object-list v-if="properties" :properties="properties" label="Properties of this type"/>

  </div>
</template>

<script>

import { Component } from "niem-model";
import CopySpan from "../CopySpan.vue";
import FieldValueTable from "../FieldValueTable.vue";

import { Type } from "niem-model";
import { NamespaceInstance, PropertyInstance, TypeInstance, FacetInstance } from "../../utils/index";

export default {

  name: "TypeInfo",

  props: {
    /** @type {TypeInstance} */
    type: {
      type: Type,
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
      /** @type {NamespaceInstance} */
      namespace: undefined,

      /** @type {TypeInstance[]} */
      parents: undefined,

      /** @type {FacetInstance[]} */
      facets: undefined,

      /** @type {PropertyInstance[]} */
      properties: undefined,
    }
  },

  computed: {

    /**
     * @returns {Object}
     */
    details() {
      return {
        "Name": this.type.name,
        "Qualified name": this.type.qname,
        "Style": this.type.style
      }
    }

  },

  methods: {

    async load() {
      this.namespace = await this.type.namespace();
      this.parents = await this.type.parents();
      this.facets = await this.type.contents.facets();
      this.properties = (await this.type.dataProperties.find()).sort(Component.sortByCoreQName);
    }

  },

  mounted() {
    this.load();
  }

}
</script>
