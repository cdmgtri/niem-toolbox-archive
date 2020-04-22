
<template>
  <div>

    <b-breadcrumb :items="breadcrumb"/>

    <div v-if="namespace">

      <b-alert show>
        <h1>{{ namespace.fileName }}
        <span v-if="namespace.prefix != namespace.fileName"> ({{ namespace.prefix }})</span></h1>
        <hr/>
        <span>NIEM Namespace</span>
      </b-alert>
      <br/>

      <b-card no-body>
        <b-tabs  card text-secondary>

          <b-tab title="Info" :active="!contents">
            <stacked-object-table :object="summary" :htmlFields="['uri']"/>

            <div v-if="Object.keys(origin).length > 0">
              <br/>
              <h3>Source details</h3>
              <stacked-object-table :object="origin" :htmlFields="['website', 'updateURI']"/>
            </div>

          </b-tab>

          <b-tab :active="contents=='properties'">
            <!-- Tab title -->
            <template v-slot:title>
              <span>Properties <b-badge pill variant="info"> {{ properties.length }}</b-badge></span>
            </template>

            <!-- Property list -->
            <property-row v-for="property in properties" :key="property.qname" :property="property"/>
          </b-tab>

          <b-tab :active="contents=='types'">
            <template v-slot:title>
              <span>Types <b-badge pill variant="info"> {{ types.length }}</b-badge></span>
            </template>

            <type-row v-for="type in types" :key="type.qname" :type="type"/>
            <!-- <b-list-group>
              <b-list-group-item v-for="type of types" :key="type.name">{{ type.name }}</b-list-group-item>
            </b-list-group> -->
          </b-tab>

          <b-tab :active="contents=='terms'">
            <template v-slot:title>
              <span>Local Terms <b-badge pill variant="info"> {{ localTerms.length }}</b-badge></span>
            </template>
            <b-table :items="localTerms" :fields="localTermFields" head-variant="light"/>
          </b-tab>

          <b-tab title="Dependencies"></b-tab>

        </b-tabs>
      </b-card>


    </div>

  </div>
</template>

<script>

import { Namespace } from "niem-model";
import Utils from "../utils";
import PropertyRow from "../components/row/PropertyRow.vue";
import TypeRow from "../components/row/TypeRow.vue";
import StackedObjectTable from "../components/StackedObjectTable.vue";

export default {

  name: "Namespace",
  components: {
    PropertyRow,
    TypeRow,
    StackedObjectTable
  },

  data() {
    let { userKey, modelKey, releaseKey, prefix, contents } = this.$route.params;

    return {
      userKey,
      modelKey,
      releaseKey,
      prefix,
      contents,

      breadcrumb: Utils.getBreadcrumb({userKey, modelKey, releaseKey, prefix}),

      localTermFields: [
        { key: "term" },
        { key: "field", label: "Field" },
        { key: "value", label: "Literal / Definition"}
      ]

    }
  },

  computed: {
    namespace() {
      return this.$store.getters.namespace(this.$route.params.prefix);
    },

    summary() {
      return {
        prefix: this.prefix,
        style: this.namespace.style,
        "file name": this.namespace.fileName,
        definition: this.namespace.definition,
        uri: this.namespace.uri,
      }
    },

    origin() {
      let origin = {};
      for (let key of Object.keys(this.namespace.origin)) {
        if (this.namespace.origin[key]) origin[key] = this.namespace.origin[key];
      }
      return origin;
    },

    properties() {
      return this.$store.getters.properties(this.prefix);
    },

    types() {
      return this.$store.getters.types(this.prefix);
    },

    localTerms() {
      return this.$store.getters.localTerms(this.prefix).map( localTerm => {
        let field = "Literal";
        let value = localTerm.literal;

        if (!localTerm.literal) {
          field = "Definition";
          value = localTerm.definition;
        }

        return {
          term: localTerm.term,
          field,
          value
        }
      });
    },

  },

  methods: {

    async loadPropertyContents(event, property) {
      if (event.target.open) {
        let contents = await property.contents();
        console.log(JSON.stringify(contents, null, 2));
      }
    }

  }


}
</script>

<style scoped>

h1 {
  display: inline;
}

div.property-summary {
  display: inline;
}

</style>