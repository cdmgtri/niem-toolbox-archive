
<template>
  <div>

    <b-breadcrumb :items="breadcrumbs"/>

    <b-alert show>
      <h1>{{ userKey}} {{ modelKey }} {{ releaseKey }} Namespaces</h1>
      <hr/>
      <span>NIEM release namespaces</span>
    </b-alert>

    <div v-if="namespaces.length > 0">
      <b-table :items="namespaces" :fields="fields">

        <!-- Namespace prefix as hyperlink column -->
        <template v-slot:cell(prefix)="data">
          <b-link :to="namespaceLink(data.value)">{{ data.value }}</b-link>
        </template>

        <!-- More info column -->
        <template v-slot:cell(more)="row">
          <button class="btn btn-outline-secondary btn-sm" @click="toggleRow(row, row.item)">
            <i v-if="!row.detailsShowing" class="fa fa-chevron-circle-down"/>
            <i v-else class="fa fa-chevron-circle-up"/>
          </button>
        </template>

        <!-- Additional IEPD metadata for row -->
        <template v-slot:row-details="row">
          <stacked-field-table v-if="namespaceSummaries[row.item.prefix]" :object="namespaceSummaries[row.item.prefix]" :links="['uri', 'website', 'updateURI']" label="Namespace overview" :open="true"/>
        </template>

      </b-table>
    </div>

  </div>
</template>

<script>

import { getBreadcrumbs, data } from "../utils/index";
import StackedFieldTable from "../components/StackedFieldTable.vue";

export default {

  name: "Model",
  components: {
    StackedFieldTable,
  },

  data() {

    let { userKey, modelKey, releaseKey } = this.$route.params;

    return {
      userKey,
      modelKey,
      releaseKey,

      namespaces: [],

      breadcrumbs: getBreadcrumbs(this.$route),

      fields: [
        { key: "prefix", sortable: true },
        { key: "style", sortable: true },
        { key: "definition" },
        { key: "more" },
      ],

      tests: undefined,

      namespaceSummaries: {},

      loadingQA: false

    }
  },

  methods: {

    async toggleRow(row, namespace) {
      // Open or close the row
      row.toggleDetails();
      await this.loadNamespaceSummary(namespace);
    },

    async loadNamespaceSummary(namespace) {

      if (this.namespaceSummaries[namespace.prefix] != undefined) return;

      let criteria = {...this.$route.params, prefix: namespace.prefix};

      let properties = await data.properties.find(criteria);
      let types = await data.types.find(criteria);
      let localTerms = await data.localTerms.find(criteria);

      let summary = {
        prefix: namespace.prefix,
        "file name": namespace.fileName,
        definition: namespace.definition,
        uri: namespace.uri,
        "# properties": properties.length,
        "# types": types.length,
        "# local terms": localTerms.length,
        ...namespace.origin
      }

      this.$set(this.namespaceSummaries, namespace.prefix, summary);

    },

    namespaceLink(prefix) {
      return data.namespaces.route({...this.$route.params, prefix});
    },

  },

  async mounted() {
    this.namespaces = await data.namespaces.find(this.$route.params);
  }

}
</script>
