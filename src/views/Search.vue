
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

    <div v-if="showResults">
      <!-- Results header -->
      <h3>Results <b-badge pill variant="info">{{ properties.length }}</b-badge></h3>

      <span v-if="properties.length > 0" class="pull-right">

        <!-- Sort options -->
        <b-button variant="link" @click="sortCore" class="options" :class="{active: sortOrder=='core'}">Core first</b-button>
        <b-button variant="link" @click="sortQName" class="options" :class="{active: sortOrder=='qname'}">Namespace</b-button>
        <b-button variant="link" @click="sortName" class="options" :class="{active: sortOrder=='name'}">Name</b-button>

        |

        <!-- Support options -->
        <b-button variant="link" @click="enableMap" class="options" :class="{active: map}">Map</b-button>
        <b-button variant="link" @click="enableSubset" class="options" :class="{active: subset}">Subset</b-button>

      </span>
      <br/><br/>

      <!-- Results -->
      <property-row v-for="property in properties" :key="property.qname"
        :property="property" :path="[]" :map="map" :subset="subset"/>
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
      showResults: false,
      sortOrder: "core",

      map: false,
      subset: false,

      properties: []

    }
  },

  methods: {

    reset() {
      this.input = "";
      this.properties = [];
      this.$refs.input.$el.focus();
      this.showResults = false;
    },

    search(event) {

      if (this.input == "") {
        this.reset();
        return;
      }

      // Get user search terms, convert to lower case, enable wildcards
      let adjustedInput = this.input.trim().toLowerCase().replace(/\*/g, ".*").replace(/ /g, ".*");

      this.showResults = true;
      this.properties = this.$store.getters.searchProperties(adjustedInput);
      this.sortCore();

    },

    sortCore() {
      this.sortOrder = "core";
      this.properties = this.properties.sort(Utils.sortComponentsCoreFirst);
    },

    sortQName() {
      this.sortOrder = "qname";
      this.properties = this.properties.sort(Property.sortByQName);
    },

    sortName() {
      this.sortOrder = "name";
      this.properties = this.properties.sort(Property.sortByName);
    },

    enableMap() {
      this.map = ! this.map;
    },

    enableSubset() {
      this.subset = ! this.subset;
    }

  }

}
</script>

<style scoped>

h1, h3 {
  display: inline;
}

div.property-summary {
  display: inline;
}

button {
  padding: 6px;
}

button.options.active {
  font-weight: 500;
  /* text-decoration: underline; */
}

button.options.active::before {
  content: "[";
}

button.options.active::after {
  content: "]";
}

</style>