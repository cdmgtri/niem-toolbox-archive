
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

          <b-tab title="Properties" :active="!contents || contents=='properties'">
            <property-row v-for="property in properties" :key="property.qname" :property="property" path=""/>
          </b-tab>

          <b-tab title="Types" :active="contents=='types'">
            <b-list-group>
              <b-list-group-item v-for="type of types" :key="type.name">{{ type.name }}</b-list-group-item>
            </b-list-group>
          </b-tab>

          <b-tab title="Local Terms" :active="contents=='terms'">
            <b-table :items="localTerms" :fields="localTermFields"/>
          </b-tab>

          <b-tab title="Dependencies"></b-tab>

        </b-tabs>
      </b-card>


    </div>

  </div>
</template>

<script>

import Utils from "../utils";
import PropertyRow from "../components/row/PropertyRow.vue";
import { Namespace } from "niem-model";

export default {

  name: "Namespace",
  components: {
    PropertyRow
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