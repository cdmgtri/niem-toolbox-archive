
<template>
  <div>

    <b-row>
      <b-col cols="5">
        <b-input-group size="sm">
          <b-form-input
            v-model="input" @change="search" @keydown.esc="reset"
            size="sm" placeholder="Search..." debounce="800" trim :autofocus="true" ref="input"/>
          <b-input-group-append>
            <b-button @click="reset">x</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>

    <br/>

    <div v-if="properties.length > 0">
      <h3>Results <b-badge pill variant="info">{{ properties.length }}</b-badge></h3>
      <property-row v-for="property in properties" :key="property.qname" :property="property" path=""/>
    </div>

  </div>
</template>

<script>

import Utils from "../utils";
import PropertyRow from "../components/row/PropertyRow.vue";
import { Property } from "niem-model";

export default {

  name: "Property",
  components: {
    PropertyRow
  },

  data() {
    let { userKey, modelKey, releaseKey } = this.$route.params;

    return {
      userKey,
      modelKey,
      releaseKey,

      input: "",

      properties: []

    }
  },

  methods: {

    reset() {
      this.input = "";
      this.properties = [];
      this.$refs.input.$el.focus();
    },

    search(event) {

      if (this.input == "") {
        this.reset();
        return;
      }

      // Get user search terms, convert to lower case, enable wildcards
      let adjustedInput = this.input.trim().toLowerCase().replace(/\*/g, ".*").replace(/ /g, ".*");

      this.properties = this.$store.getters.searchProperties(adjustedInput);

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