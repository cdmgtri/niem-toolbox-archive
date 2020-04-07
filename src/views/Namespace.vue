
<template>
  <div>

    <b-breadcrumb :items="breadcrumb"/>

    <div v-if="namespace">

      <b-alert show>
        <details open>
          <summary>
            <h1>{{ namespace.fileName }} ({{ namespace.prefix }})</h1>
          </summary>

          <hr/>
          <b-row v-for="field of Object.keys(summary)" :key="field">
            <b-col cols="2"><strong>{{ field }}</strong></b-col>
            <b-col v-html="summary[field]"></b-col>
          </b-row>
        </details>
      </b-alert>
      <br/>

      <b-card no-body>
        <b-tabs  card text-secondary>

          <b-tab title="Properties" active>
            <b-table small hover :items="properties" :fields="['name', 'typeQName']"/>
          </b-tab>

          <b-tab title="Types">
            <b-list-group>
              <b-list-group-item v-for="type of types" :key="type.name">{{ type.name }}</b-list-group-item>
            </b-list-group>
          </b-tab>

          <b-tab title="Local Terms">
            <b-table :items="localTerms" :fields="localTermFields"/>
          </b-tab>

          <b-tab title="Dependencies"></b-tab>

        </b-tabs>
      </b-card>


    </div>

  </div>
</template>

<script>

import { Namespace } from "niem-model";

export default {


  name: "Namespace",

  data() {
    let { userKey, modelKey, releaseKey, prefix } = this.$route.params;

    return {
      userKey,
      modelKey,
      releaseKey,
      prefix,

      breadcrumb: [
        { text: userKey, to: `/` },
        { text: modelKey, to: `/${userKey}/${modelKey}` },
        { text: releaseKey, to: `/${userKey}/${modelKey}/${releaseKey}` },
        { text: prefix, active: true },
      ],

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
        uri: `<a href="${this.namespace.uri}" target="_blank">${ this.namespace.uri }</a>`,
      }
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

  }


}
</script>

<style scoped>

h1 {
  display: inline;
}

td ::before {
  width: 20% !important;
  text-align: left;
}

</style>