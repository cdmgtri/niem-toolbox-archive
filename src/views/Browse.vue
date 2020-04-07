
<template>
  <div>

    <b-table hover small :items="namespaces" :fields="fields" primary-key="uri">
      <template v-slot:cell(prefix)="data">
        <b-link :to="`/niem/model/5.0/${data.value}/`">{{ data.value }}</b-link>
      </template>
    </b-table>

  </div>
</template>

<script>

export default {

  name: "Browse",

  data() {
    return {
      releaseKey: "5.0",
      releaseKeys: [
        { text: "5.0" },
        { text: "4.2", disabled: true }
      ],
      fields: [
        { key: "prefix", sortable: true },
        { key: "style", sortable: true },
        { key: "definition" }
      ]
    }
  },
  computed: {
    namespaces() {
      return this.$store.state.namespaces
    }
  }

}

</script>

<style scoped>

#sidebar {
  padding-top: 70px;
}

</style>


