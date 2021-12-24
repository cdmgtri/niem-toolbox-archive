
<template>
  <div v-if="property || type">

    <!-- Substitutions -->
    <object-list v-if="substitutions.length > 0" :properties="substitutions" :parentXPath="xpath" label="Substitutions" :listHeader="`Substitutions for ${property.qname}`"/>

    <!-- Facets -->
    <facet-table v-if="facets.length > 0" :facets="facets"/>

    <!-- Inherited, contained, and augmentation properties -->
    <available-properties v-if="computedType" :type="computedType" :parentXPath="xpath"/>

    <!-- Type union members -->
    <object-list v-if="members.length > 0" :types="members" label="Type Union Members" :listHeader="`Type union members for ${type.qname}`"/>

    <!-- Base type -->
    <type-row v-if="base" :type="base" label="Base type" :spacer="true"/>

  </div>
</template>

<script>

import { Property } from "niem-model";
import FacetTable from "./FacetTable.vue";

export default {

  name: "ObjectContents",

  props: {
    property: {
      type: Object,
    },

    type: {
      type: Object
    },

    xpath: {
      type: String,
      default: ""
    }
  },

  components: {
    AvailableProperties: () => import("./AvailableProperties.vue"),
    FacetTable,
    ObjectList: () => import("./ObjectList.vue"),
    TypeRow: () => import("./TypeRow.vue")
  },

  data() {
    return {
      computedType: this.type,
      facets: [],
      substitutions: [],
      members: [],
      base: undefined
    }
  },

  async mounted() {
    if (this.property) {
      this.computedType = await this.property.type();
      this.facets = await this.property.contents.facets();
      this.substitutions = (await this.property.substitutions()).sort(Property.sortByCoreQName);
    }
    else if (this.type) {
      this.facets = await this.type.contents.facets();
    }

    if (this.computedType) {
      this.members = await this.computedType.members();

      if (this.computedType.isSimpleContent == true) {
        if (this.facets.length == 0 && this.substitutions.length == 0 && this.members.length == 0) {
          this.base = await this.computedType.base();
        }
      }
    }

  }

}

</script>
