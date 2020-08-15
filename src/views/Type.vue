
<template>
  <object-page v-if="loaded" :definition="type.definition" :details="details" :namespace="namespace" :badge="type.style">

    <template #header>
      <h1>Type {{ type.qname }}</h1>
    </template>

    <template #details>

      <!-- Parents -->
      <object-list v-if="parents" :types="parents" label="Parent types" :listHeader="`Parent type list for type ${type.qname}`"/>

      <!-- Type contents (codes or available properties) -->
      <object-contents :type="type"/>

      <!-- Data properties -->
      <object-list v-if="dataProperties" :properties="dataProperties" label="Properties of this type" :listHeader="`Properties of type ${type.qname}`" :open="false"/>

    </template>

  </object-page>
</template>

<script>

import { data } from "../utils/index";
import { Component } from "niem-model";
import ObjectContents from "../components/niem/ObjectContents.vue";
import ObjectList from "../components/niem/ObjectList.vue";
import ObjectPage from "../components/niem/ObjectPage.vue";

export default {

  name: "Type",
  components: {
    ObjectContents,
    ObjectList,
    ObjectPage,
  },

  data() {
    return {
      loaded: false,
      type: undefined,
      namespace: undefined,
      parents: undefined,
      dataProperties: undefined,
      details: undefined
    }
  },

  async mounted() {
    this.type = await data.types.get(this.$route.params);
    this.namespace = await this.type.namespace();
    this.parents = await this.type.parents();
    this.dataProperties = (await this.type.dataProperties.find()).sort(Component.sortByCoreQName);

    this.details = {
      "Prefix": this.type.prefix,
      "Name": this.type.name,
      "Style": this.type.style,
      "Definition": this.type.definition
    }

    this.loaded = true;
  }

}
</script>
