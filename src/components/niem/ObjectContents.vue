
<template>
  <div v-if="property || type">

    <!-- Substitutions -->
    <object-list v-if="substitutions.length > 0" :properties="substitutions" :parentXPath="xpath" :label="'Substitutions'"/>

    <!-- Facets -->
    <facet-table v-if="facets.length > 0" :facets="facets"/>

    <!-- Inherited, contained, and augmentation properties -->
    <available-properties v-if="computedType" :type="computedType" :parentXPath="xpath"/>

  </div>
</template>

<script>

import { Property } from "niem-model";

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
    ObjectList: () => import("./ObjectList.vue"),
    FacetTable: () => import("./FacetTable.vue"),
    AvailableProperties: () => import("./AvailableProperties.vue")
  },

  data() {
    return {
      computedType: this.type,
      facets: [],
      substitutions: [],
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

  }

}

</script>
