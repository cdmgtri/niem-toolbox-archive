
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
            placeholder="Search..." debounce="800" trim :autofocus="true" ref="input"/>
          <b-input-group-append>
            <b-button @click="reset">x</b-button>
          </b-input-group-append>
        </b-input-group>

        <br/>

        <!-- Advanced search options -->
        <details open>
          <summary>Advanced</summary>
          <br/>

          <b-form-checkbox v-model="searchDefinitions">Include definitions in search?</b-form-checkbox>
          <br/>

          <!-- Data type search box -->
          <b-input-group size="sm">
            <b-form-input
              v-model="dataTypeInput" @change="search" @keydown.esc="dataTypeInput=''"
              size="sm" placeholder="Filter data types..." debounce="500" trim ref="dataTypeInput"/>
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

        <!-- Recent searches -->
        <details v-if="recentSearchStrings.length > 0">
          <summary>Recent searches</summary>
          <br/>
          <b-list-group id="list-group-recentSearches">
            <b-list-group-item v-for="searchString of recentSearchStrings" :key="searchString">
              <span @click="searchRecent(searchString)">{{ searchString }}</span>
              <b-button size="sm" variant="secondary" class="pull-right" @click="deleteSearchString(searchString)">x</b-button>
            </b-list-group-item>
          </b-list-group>
        </details>

        <!-- Filter results -->
        <div v-if="showResults">

          <hr/>

          <h3>Filter results</h3>
          <br/>
          <b-button variant="link" @click="setFilterPrefixesAll()" class="pl-0">Select all</b-button>
          <span> | </span>
          <b-button variant="link" @click="setFilterPrefixesNone()">Select none</b-button>
          <br/>
          <b-form-checkbox-group stacked v-model="selectedPrefixes" :options="resultPrefixes"/>

        </div>

      </b-col>


      <!-- Results panel -->
      <b-col>

        <div v-if="showResults">
          <!-- Results header -->
          <h3>Results <b-badge pill variant="info">{{ resultsCount }}</b-badge></h3>

          <!-- Sort and options row -->
          <span v-if="filteredProperties.length > 0" class="pull-right">

            <!-- Sort options -->
            <b-button variant="link" @click="sortCore" class="options" :class="{active: sortOrder=='core'}">Core first</b-button>
            <b-button variant="link" @click="sortQName" class="options" :class="{active: sortOrder=='qname'}">Namespace</b-button>
            <b-button variant="link" @click="sortName" class="options" :class="{active: sortOrder=='name'}">Name</b-button>

            |

            <!-- Support options -->
            <b-button variant="link" @click="invertOption('map')" class="options" :class="{active: map}">Map</b-button>
            <b-button variant="link" @click="invertOption('subset')" class="options" :class="{active: subset}">Subset</b-button>

          </span>
          <br/><br/>

          <!-- Results -->
          <object-row v-for="property in filteredProperties" :key="property.qname" :property="property"/>
        </div>

      </b-col>
    </b-row>

  </div>
</template>

<script>

import ObjectRow from "../components/niem/ObjectRow.vue";
import { data, PropertyInstance } from "../utils/index";
import { Property } from "niem-model";

export default {

  name: "Search",
  components: {
    ObjectRow
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
      searchDefinitions: false,

      showResults: false,
      sortOrder: "core",

      /** @type {PropertyInstance[]} */
      properties: [],
      filteredProperties: [],
      resultPrefixes: [],
      selectedPrefixes: [],

      /** @type {String[]} */
      recentSearchStrings: []

    }
  },

  computed: {

    /**
     * @returns {Boolean}
     */
    map() {
      return this.$store.getters.options.map;
    },

    /**
     * @returns {Boolean}
     */
    subset() {
      return this.$store.getters.options.subset;
    },

    /**
     * @returns {String}
     */
    resultsCount() {

      if (this.properties.length > 0) {
        if (this.properties.length == this.filteredProperties.length) {
          return this.properties.length;
        }
        return `${this.filteredProperties.length} of ${this.properties.length}`;
      }
      return "";
    }

},

  watch: {

    selectedPrefixes(prefixes) {
      this.filteredProperties = this.properties.filter( property => prefixes.includes(property.prefix) );
      this.sort();
    },

    input(newValue, oldValue) {
      newValue ? this.search() : this.reset();
    },

    dataTypeInput(newValue, oldValue) {
      this.search();
    },

    searchDefinitions(newValue, oldValue) {
      this.search();
    }

  },

  methods: {

    reset() {
      this.input = "";

      this.properties = [];
      this.filteredProperties = [];

      this.resultPrefixes = [];
      this.selectedPrefixes = [];

      this.$refs.input.$el.focus();
      this.showResults = false;

      this.sortOrder = "core";
    },

    async search() {

      if (this.input == "" && this.dataTypeInput == "" && this.containerTypeInput == "") {
        this.reset();
        return;
      }

      // Cache search terms in recent search terms array
      if (!this.recentSearchStrings.includes(this.input)) this.recentSearchStrings.unshift(this.input);
      if (this.recentSearchStrings.length > 10) this.recentSearchStrings.pop();

      this.showResults = true;

      // Search properties by search terms in input field
      this.properties = await data.properties.search(null, "qname", this.input, this.searchDefinitions);

      if (this.dataTypeInput) {
        // Filter results by data type input field
        this.properties = await data.properties.search(this.properties, "typeQName", this.dataTypeInput);
      }

      // Make a copy of the results so filters can be removed later without having to rerun the full search
      this.filteredProperties = this.properties.filter( property => true );

      // Sort results
      this.sortCore();

      // Set up results filtering
      this.setFilterPrefixes();
      this.setFilterPrefixesAll();

    },

    searchRecent(searchString) {
      this.input = searchString;
      this.search();
    },

    deleteSearchString(searchString) {
      let index = this.recentSearchStrings.indexOf(searchString);
      this.recentSearchStrings.splice(index, 1);
    },

    setFilterPrefixes() {
      let prefixes = this.properties.map( property => property.prefix );
      let uniquePrefixes = new Set(prefixes);
      this.resultPrefixes = Array.from(uniquePrefixes).sort();
    },

    setFilterPrefixesAll() {
      this.selectedPrefixes = this.resultPrefixes;
    },

    setFilterPrefixesNone() {
      this.selectedPrefixes = [];
    },

    sort() {
      switch (this.sortOrder) {
        case "core":
          return this.sortCore();
        case "qname":
          return this.sortQName();
        case "name":
          return this.sortName();
      }
    },

    sortCore() {
      this.sortOrder = "core";
      this.filteredProperties = this.filteredProperties.sort(Property.sortByCoreQName);
    },

    sortQName() {
      this.sortOrder = "qname";
      this.filteredProperties = this.filteredProperties.sort(Property.sortByQName);
    },

    sortName() {
      this.sortOrder = "name";
      this.filteredProperties = this.filteredProperties.sort(Property.sortByName);
    },

    invertOption(option) {
      this.$store.commit("invertOption", option);
    }

  },

  async mounted() {
    let input = this.$route.query.input || "";
    let prefixes = (this.$route.query.prefixes || "").split(",");

    if (input) {
      this.input = input;
      await this.search();

      if (prefixes.length > 0) {
        this.selectedPrefixes = [];
      }

      for (let prefix of prefixes) {
        if (this.resultPrefixes.includes(prefix)) {
          this.selectedPrefixes.push(prefix);
        }
      }
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

button.btn-link {
  padding: 6px !important;
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

#list-group-recentSearches span:hover {
  color: cadetblue;
  cursor: pointer;
}

#list-group-recentSearches .list-group-item {
  padding-right: 0;
  padding-top: 0;
  padding-bottom: 0;
}

</style>