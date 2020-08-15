
<template>
  <object-page v-if="loaded" :definition="property.definition" :details="details" :namespace="namespace" :badge="property.style">

    <template #header>
      <h1>Property <copy-span label="Qualified name" :text="$route.params.qname"/> </h1>
    </template>

    <template #details>

      <!-- Type -->
      <type-details-row v-if="type" :type="type" label="Type" :spacer="true"/>

      <!-- Substitution group -->
      <property-row v-if="group" :property="group" label="Substitutable for element" parentXPath="" :spacer="true"/>

      <!-- Contents -->
      <object-contents :property="property"/>

      <!-- Full sub-property table for each type that contains this property -->
      <sub-property-list :property="property" label="Types that use this property"/>

    </template>

  </object-page>
</template>

<script>

import { data } from "../utils";
import ObjectPage from "../components/niem/ObjectPage.vue";

import CopySpan from "../components/CopySpan.vue";
import ObjectContents from "../components/niem/ObjectContents.vue";
import PropertyRow from "../components/niem/PropertyRow.vue";
import TypeDetailsRow from "../components/niem/TypeDetailsRow.vue";

export default {

  name: "Property",

  components: {
    ObjectPage,

    CopySpan,
    ObjectContents,
    PropertyRow,
    TypeDetailsRow,
    SubPropertyList: () => import("../components/niem/SubPropertyList.vue")
  },

  data() {
    return {
      loaded: false,
      property: undefined,
      type: undefined,
      namespace: undefined,
      group: undefined,
      details: undefined
    }
  },

  async mounted() {
    this.property = await data.properties.get(this.$route.params);
    this.type = await this.property.type();
    this.group = await this.property.group();
    this.namespace = await this.property.namespace();

    this.details = {
      "Prefix": this.property.prefix,
      "Name": this.property.name,
      "Style": this.property.style,
      "Definition": this.property.definition,
      "Substitution group": this.property.groupQName,
      "Keywords": this.property.keywords,
      "Example content": this.property.exampleContent,
      "Usage info": this.property.usageInfo,
      "Type": this.property.typeQName,
    }

    this.loaded = true;

  }

}

</script>
