
<template>
  <div v-if="property">

    <!-- Definition -->
    <p class="definition"><copy-span :label="'Definition'" :text="property.definition"/></p>

    <!-- Property details -->
    <field-value-table :object="details" label="More details" :open="false"/>

    <div v-if="loaded == true">

      <!-- Namespace -->
      <object-row :namespace="namespace" label="Namespace" :spacer="true"/>

      <!-- Type -->
      <object-row :type="type" label="Type" :parentXPath="xpath" :spacer="true"/>

      <!-- Substitution group -->
      <object-row :property="group" label="Substitutable for element" :parentXPath="xpath" :spacer="true"/>

      <!-- Substitutions -->
      <object-list :properties="substitutions" :parentXPath="xpath" :label="'Substitutions'"/>

      <!-- Facets -->
      <facet-table :facets="facets"/>

      <!-- Inherited and contained properties -->
      <contained-properties-list v-if="type" :type="type" :parentXPath="xpath"/>

      <!-- Full sub-property for each type that contains this property -->
      <sub-property-list :property="property"/>

    </div>

  </div>
</template>

<script>

import { Property } from "niem-model";

import CopySpan from "../CopySpan.vue";
import FieldValueTable from "../FieldValueTable.vue";

export default {

  name: "PropertyInfo",

  props: {
    property: {
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
    ObjectRow: () => import("./ObjectRow.vue"),
    ObjectList: () => import("./ObjectList.vue"),
    FacetTable: () => import("./FacetTable.vue"),
    ContainedPropertiesList: () => import("./ContainedPropertiesList.vue"),
    SubPropertyList: () => import("./SubPropertyList.vue")
  },

  data() {
    return {
      loaded: false,
      type: undefined,
      group: undefined,
      namespace: undefined,
      facets: [],
      substitutions: [],
    }
  },

  computed: {

    details() {
      return {
        "Name": this.property.name,
        "Qualified name": this.property.qname,
        "Style": this.property.style,
        "Substitution group": this.property.groupQName,
        "Keywords": this.property.keywords,
        "Example content": this.property.exampleContent,
        "Usage info": this.property.usageInfo,
        "Qualified type": this.property.typeQName,
        "Current XPath": this.xpath
      }
    }

  },

  async mounted() {
    this.type = await this.property.type();
    this.group = await this.property.group();
    this.namespace = await this.property.namespace();
    this.facets = await this.property.contents.facets();
    this.substitutions = (await this.property.substitutions()).sort(Property.sortByQName);
    this.loaded = true;
  }

}
</script>
