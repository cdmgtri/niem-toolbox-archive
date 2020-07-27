
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

          <!-- Properties -->
          <b-tab :active="contents=='properties'">
            <template v-slot:title>
              <span>Properties <b-badge pill variant="info"> {{ properties.length }}</b-badge></span>
            </template>
            <object-row v-for="property in properties" :key="property.qname" :property="property"/>
          </b-tab>

          <!-- Types -->
          <b-tab :active="contents=='types'">
            <template v-slot:title>
              <span>Types <b-badge pill variant="info"> {{ types.length }}</b-badge></span>
            </template>
         component v-for="type in types" :key="type.qname" :type="type"/>
          </b-tab>

          <!-- Local terms -->
          <b-tab :active="contents=='terms'">
            <template v-slot:title>
              <span>Local Terms <b-badge pill variant="info"> {{ localTerms.length }}</b-badge></span>
            </template>
            <b-table :items="localTerms" :fields="localTermFields" head-variant="light"/>
          </b-tab>

          <!-- Dependents -->
          <b-tab :active="contents=='dependents'">
            <template v-slot:title>
              <span>Used By <b-badge pill variant="info"> {{ dependents.count }}</b-badge></span>
            </template>

            <object-list :substitutions="dependents.substitutions" :label="Substitutions"/>

            <details v-if="dependents.dataProperties.length > 0">
              <summary>
                <span>Data Properties </span>
                <b-badge variant="info" pill>{{ dependents.dataProperties.length }}</b-badge>
              </summary>
              <object-row v-for="property in dependents.dataProperties" :key="property.qname" :property="property"/>
            </details>

            <details v-if="dependents.childTypes.length > 0">
              <summary>
                <span>Child Types </span>
                <b-badge variant="info" pill>{{ dependents.childTypes.length }}</b-badge>
              </summary>
              <object-row v-for="type in dependents.childTypes" :key="type.qname" :type="type"/>
            </details>

            <details v-if="dependents.subProperties.length > 0">
              <summary>
                <span>Sub-properties </span>
                <b-badge variant="info" pill>{{ dependents.subProperties.length }}</b-badge>
              </summary>
              <sub-property-table v-for="subProperty in dependents.subProperties" :key="subProperty.label" :subProperty="subProperty" :highlight="subProperty.propertyQName"/>
            </details>
          </b-tab>

        </b-tabs>
      </b-card>


    </div>

  </div>
</template>

<script>

import { Namespace } from "niem-model";
import Utils from "../utils";
import SubPropertyTable from "../components/niem/SubPropertyTable.vue";
import StackedObjectTable from "../components/StackedObjectTable.vue";

export default {

  name: "Namespace",
  components: {
    ObjectRow: () => import("../components/niem/ObjectRow.vue"),
    ObjectList: () => import("../components/niem/ObjectList.vue"),
    SubPropertyTable,
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
      ],

      dependents: {
        substitutions: [],
        dataProperties: [],
        childTypes: [],
        subProperties: [],
        count: 0
      }

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

  },

  async mounted() {
    this.dependents = await this.namespace.dependencies();
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