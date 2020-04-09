
<template>
  <div>
    <b-breadcrumb :items="breadcrumb"/>

    <h1>Property {{ property.qname }}</h1>

    <p>{{ property.definition }}</p>

    <h3>Contents</h3>
    <p>...</p>

    <div v-if="dependents.count > 0">
      <h3>Dependents</h3>

      <div v-if="dependents.substitutions.length > 0">
        <h4>Substitutions</h4>
        <property-row v-for="substitution of dependents.substitutions" :key="substitution.qname" :property="substitution"/>
      </div>

      <div v-if="dependents.subProperties.length > 0">
        <h4>Contained within types</h4>
        <sub-property-row v-for="subProperty of dependents.subProperties" :key="subProperty.qname" :subProperty="subProperty"/>
      </div>
    </div>
  </div>
</template>

<script>

import Utils from "../utils";
import PropertyRow from "../components/row/PropertyRow.vue";
import SubPropertyRow from "../components/row/SubPropertyRow.vue";

export default {

  name: "Property",
  components: {
    PropertyRow,
    SubPropertyRow
  },

  data() {
    let { userKey, modelKey, releaseKey, prefix, name } = this.$route.params;
    let qname = prefix + ":" + name;
    let property = this.$store.getters.property(qname);

    return {
      userKey,
      modelKey,
      releaseKey,
      prefix,
      name,
      qname,
      property,
      breadcrumb: Utils.getBreadcrumb(property, "properties"),
      dependents: {
        count: undefined,
        substitutions: [],
        subProperties: []
      }
    }
  },

  async mounted() {
    this.dependents = await this.property.dependents();
  }

}
</script>