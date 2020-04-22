
<template>
  <div>

    <b-breadcrumb :items="breadcrumb"/>

    <b-alert show>
      <h1>{{ userKey}} {{ modelKey }} {{ releaseKey }} </h1>
      <hr/>
      <span>NIEM Release</span>
    </b-alert>

    <div v-if="namespaces">
      <b-table :items="namespaces" :fields="fields">

        <!-- Namespace prefix as hyperlink column -->
        <template v-slot:cell(prefix)="data">
          <b-link :to="namespaceLink(data.value)">{{ data.value }}</b-link>
        </template>

        <!-- More info column -->
        <template v-slot:cell(more)="row">
          <button class="btn btn-outline-secondary btn-sm" @click="row.toggleDetails">
            <i v-if="!row.detailsShowing" class="fa fa-chevron-circle-down"/>
            <i v-else class="fa fa-chevron-circle-up"/>
          </button>
        </template>

        <!-- Additional IEPD metadata for row -->
        <template v-slot:row-details="row">
          <b-card>
            <stacked-object-table :object="summary(row.item)" :htmlFields="['uri', 'website', 'updateURI']"/>
          </b-card>
        </template>

      </b-table>
    </div>
  </div>
</template>

<script>

import Utils from "../utils";
import StackedObjectTable from "../components/StackedObjectTable.vue";

export default {

  name: "Model",
  components: {
    StackedObjectTable
  },

  data() {

    let { userKey, modelKey, releaseKey } = this.$route.params;

    return {
      userKey,
      modelKey,
      releaseKey,

      breadcrumb: Utils.getBreadcrumb({userKey, modelKey, releaseKey}),

      fields: [
        { key: "prefix", sortable: true },
        { key: "style", sortable: true },
        { key: "definition" },
        { key: "more" },
      ]

    }
  },
  computed: {
    namespaces() {
      return this.$store.state.namespaces;
    }
  },
  methods: {
    summary(namespace) {
      let properties = this.$store.getters.properties(namespace.prefix);
      let types = this.$store.getters.types(namespace.prefix);
      let localTerms = this.$store.getters.localTerms(namespace.prefix);

      return {
        prefix: namespace.prefix,
        "file name": namespace.fileName,
        definition: namespace.definition,
        uri: namespace.uri,
        "property count": properties.length,
        "type count": types.length,
        "local term count": localTerms.length,
        ...namespace.origin
      }
    },
    namespaceLink(prefix) {
      return `/${this.userKey}/${this.modelKey}/${this.releaseKey}/namespaces/${prefix}/`;
    }
  }
}
</script>
