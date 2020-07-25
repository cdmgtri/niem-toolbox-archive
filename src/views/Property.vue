
<template>
  <div v-if="loaded">
    <b-breadcrumb :items="breadcrumb"/>

    <h1>Property {{ property.qname }}</h1>

    <p>{{ property.definition }}</p>

    <!-- Property details -->
    <field-value-table :object="details" label="More details" :open="false"/>

    <!-- TODO: Add namespace row -->

    <!-- Type -->
    <type-row :type="type" :label="'Type'" :space="true"/>

    <!-- Substitution group -->
    <property-row v-if="group" :property="group" label="Substitutable for element"/>
    <br v-if="group"/>

    <!-- Substitutions -->
    <property-list :properties="substitutions" label="Substitutions"/>

    <!-- Facets -->
    <facet-table :facets="facets"/>

    <!-- Inherited and contained properties -->
    <contained-properties-list :containedProperties="containedProperties" :inheritedProperties="inheritedProperties" :xpath="xpath"/>

    <!-- Full sub-property for each type that contains this property -->
    <sub-property-list :property="property"/>

  </div>
</template>

<script>

import { Property } from "niem-model";

import { mapGetters } from "vuex";

import Utils from "../utils";
import FieldValueTable from "../components/FieldValueTable.vue";
import FacetTable from "../components/niem/FacetTable.vue";

export default {

  name: "Property",
  components: {
    PropertyRow: () => import("../components/niem/PropertyRow.vue"),
    PropertyList: () => import("../components/niem/PropertyList.vue"),
    SubPropertyList: () => import("../components/niem/SubPropertyList.vue"),
    TypeRow: () => import("../components/niem/TypeRow.vue"),
    ContainedPropertiesList: () => import("../components/niem/ContainedPropertiesList.vue"),
    FacetTable,
    FieldValueTable
  },

  data() {

    let { userKey, modelKey, releaseKey, prefix, name } = this.$route.params;
    let qname = prefix + ":" + name;

    return {

      loaded: false,

      userKey,
      modelKey,
      releaseKey,
      prefix,
      name,
      qname,
      xpath: "",

      property: {},
      type: {},
      namespace: {},

      facets: [],
      group: undefined,
      containedProperties: [],
      inheritedProperties: {},
      substitutions: [],
      subProperties: [],
      containerTypes: [],

      breadcrumb: Utils.getBreadcrumb(this.$route.params, "properties")
    }
  },

  computed: {

    ...mapGetters(["storeLoaded"]),

    details() {

      let object = {
        "Namespace": this.namespace.fileName,
        "URI": this.namespace.uri,
        "Name": this.property.name,
        "Qualified name": this.property.qname,
        "Style": this.property.style,
        "Substitution group": this.property.groupQName,
        "Keywords": this.property.keywords,
        "Example content": this.property.exampleContent,
        "Usage info": this.property.usageInfo,
        "Qualified type": this.property.typeQName
      }

      return object;

    },

  },

  watch: {

    /**
     * Load information about this property once the store has finished loading the release
     */
    storeLoaded(newValue, oldValue) {
      if (oldValue == false && newValue == true) {
        this.load();
      }
    }

  },

  methods: {

    async load() {

      this.property = this.$store.getters.property(this.qname);
      this.type = this.$store.getters.type(this.property.typeQName);
      this.namespace = this.$store.getters.namespace(this.property.prefix);

      this.group = await this.property.group();
      this.facets = await this.property.contents.facets();
      this.containedProperties = await this.property.contents.containedProperties();
      this.inheritedProperties = await this.property.contents.inheritedProperties();
      this.substitutions = (await this.property.substitutions()).sort(Property.sortByQName);
      this.subProperties = await this.property.subProperties.find();
      this.containerTypes = this.subProperties.map( subProperty => subProperty.typeQName );

      this.xpath = Utils.updateXPath("", this.property);

      this.loaded = true;
    }

  },

  async created() {
    if (this.storeLoaded == true) {
      await this.load();
    }
  }

}
</script>

<style>

h4 {
  display: inline-block;
  padding-bottom: 8px;
}

</style>
