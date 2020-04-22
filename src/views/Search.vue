
<template>
  <div>

    <b-row>

      <!-- Search panel-->
      <b-col cols="3">

        <h3>Search</h3>
        <br/><br/>

        <!-- Main search box -->
        <b-input-group size="sm">
          <b-form-input
            v-model="input" @change="search" @keydown.esc="reset"
            size="sm" placeholder="Search..." debounce="800" trim :autofocus="true" ref="input"/>
          <b-input-group-append>
            <b-button @click="reset">x</b-button>
          </b-input-group-append>
        </b-input-group>

        <br/>

        <details open>
          <summary>Advanced</summary>
          <br/>

          <!-- Data type search box -->
          <b-input-group size="sm">
            <b-form-input
              v-model="dataTypeInput" @change="search" @keydown.esc="dataTypeInput=''"
              size="sm" placeholder="Filter data types..." debounce="800" trim ref="dataTypeInput"/>
            <b-input-group-append>
              <b-button @click="dataTypeInput=''">x</b-button>
            </b-input-group-append>
          </b-input-group>
          <br/>

          <!-- <b-input-group size="sm">
            <b-form-input
              v-model="containerTypeInput" @change="search" @keydown.esc="containerTypeInput=''"
              size="sm" placeholder="Filter container types..." debounce="800" trim ref="containerTypeInput"/>
            <b-input-group-append>
              <b-button @click="containerTypeInput=''">x</b-button>
            </b-input-group-append>
          </b-input-group> -->

        </details>

      </b-col>


      <!-- Results panel -->
      <b-col>

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

      </b-col>
    </b-row>

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
      dataTypeInput: "",
      containerTypeInput: "",

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

    adjustInput(input) {
    },

    search(event) {

      if (this.input == "" && this.dataTypeInput == "" && this.containerTypeInput == "") {
        this.reset();
        return;
      }

      this.showResults = true;

      this.properties = Utils.searchProperties(this.$store.getters.properties(), "qname", this.input);
      this.properties = Utils.searchProperties(this.properties, "typeQName", this.dataTypeInput);

      // Sort results
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