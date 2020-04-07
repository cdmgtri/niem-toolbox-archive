
<template>
  <div>

    <b-breadcrumb :items="breadcrumb"/>
    <h1>{{ userKey}} {{ modelKey }} {{ releaseKey }} </h1>

    <div v-if="namespaces">
      <b-table :items="namespaces" :fields="fields">
        <template v-slot:cell(prefix)="data">
          <b-link :to="namespaceLink(data.value)">{{ data.value }}</b-link>
        </template>

        <template slot="more" slot-scope="row">
          <!-- Button to display more info -->
          <button class="btn btn-outline-secondary btn-sm" @click.stop="row.toggleDetails">
            <i v-if="!row.detailsShowing" class="fa fa-chevron-circle-down"/>
            <i v-else class="fa fa-chevron-circle-up"/>
          </button>
        </template>

        <!-- Additional IEPD metadata for row -->
        <template slot="row-details" slot-scope="row">
          <b-card>
            <p class="card-text">{{ row.item.uri }}</p>
          </b-card>
        </template>

      </b-table>
    </div>
  </div>
</template>

<script>

export default {

  name: "Model",

  data() {

    let { userKey, modelKey, releaseKey } = this.$route.params;

    return {
      userKey,
      modelKey,
      releaseKey,

      breadcrumb: [
        { text: userKey, to: `/` },
        { text: modelKey, to: `/${userKey}/${modelKey}` },
        { text: releaseKey, active: true },
      ],

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
    namespaceLink(prefix) {
      return `/${this.userKey}/${this.modelKey}/${this.releaseKey}/${prefix}/`;
    }
  }
}
</script>
