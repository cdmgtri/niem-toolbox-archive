
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
            v-model.trim="input" @keydown.esc="reset" @keydown.enter="search"
            placeholder="Search..." debounce="800" :autofocus="true" ref="input"/>
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
              v-model.trim="dataTypeInput" @keydown.esc="dataTypeInput=''"
              size="sm" placeholder="Filter data types..." debounce="500" ref="dataTypeInput"/>
            <b-input-group-append>
              <b-button @click="dataTypeInput=''">x</b-button>
            </b-input-group-append>
          </b-input-group>
          <br/>

          <!-- Exclude terms list -->
          <b-input-group size="sm">
            <b-form-input
              v-model.trim="excludeTermsInput" @keydown.esc="excludeTermsInput=''"
              size="sm" placeholder="Exclude terms..." debounce="500" ref="excludeTermsInput"/>
            <b-input-group-append>
              <b-button @click="excludeTermsInput=''">x</b-button>
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
          <b-button class="filter" variant="link" @click="selectFilterPrefixesAll()">Select all</b-button>
          <span> | </span>
          <b-button class="filter" variant="link" @click="selectFilterPrefixesNone()">Select none</b-button>
          <br/>
          <b-form-checkbox-group stacked v-model="selectedPrefixes" :options="resultPrefixes"/>

        </div>

      </b-col>


      <!-- Results panel -->
      <b-col>

        <div v-if="showResults">

          <b-form inline>

            <!-- Results header -->
            <h3>Results <b-badge pill variant="info">{{ resultsCount }}</b-badge></h3>

            <!-- Sort and options row -->
            <span v-if="filteredProperties.length > 0" class="pull-right ml-auto">

              <!-- Sort options -->
              <b-input-group inline class="results-menu sort" prepend="Sort" size="sm">
                <b-form-select id="sortOptions" size="sm" v-model="sortOrder" class="sort">
                  <b-form-select-option value="core" default>Core first</b-form-select-option>
                  <b-form-select-option value="qname">Namespace</b-form-select-option>
                  <b-form-select-option value="name">Name</b-form-select-option>
                </b-form-select>
              </b-input-group>

              <!-- Options dropdown -->
              <b-dropdown right variant="link" class="results-menu" text="Options" v-b-tooltip.manual.v-success="'Copied!'">

                <b-form-checkbox class="ml-4" v-model="$store.state.options.map">Map</b-form-checkbox>
                <b-form-checkbox class="ml-4" v-model="$store.state.options.subset" disabled>Subset</b-form-checkbox>

                <b-dropdown-divider/>

                <b-dropdown-group header="Copy results for...">
                  <b-dropdown-item size="sm" @click="copyResults('excel')">Excel</b-dropdown-item>
                  <b-dropdown-item size="sm" @click="copyResults('markdown')">Markdown list</b-dropdown-item>
                </b-dropdown-group>

              </b-dropdown>

              <b-tooltip title="Copied!" target="results-menu" variant="success"/>

            </span>

          </b-form>
          <br/>

          <!-- Results -->
          <property-row v-for="property in filteredProperties" :key="property.qname" :property="property"/>
        </div>

      </b-col>
    </b-row>

  </div>
</template>

<script>

import PropertyRow from "../components/niem/PropertyRow.vue";
import { data, PropertyInstance } from "../utils/index";
import { Property } from "niem-model";
import { Route } from "vue-router";

export default {

  name: "Search",
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
      excludeTermsInput: "",
      searchDefinitions: false,

      showResults: false,
      sortOrder: "core",
      showTooltip: false,
      disableTooltip: true,

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
    },

    defaultReleaseID() {
      return this.$store.getters.defaultReleaseID;
    }

},

  watch: {

    sortOrder() {
      this.sort();
    },

    selectedPrefixes(prefixes) {
      this.filteredProperties = this.properties.filter( property => prefixes.includes(property.prefix) );
      this.sort();
    },

    input(newValue, oldValue) {
      newValue && newValue.length > 3 ? this.search() : this.reset();
    },

    dataTypeInput(newValue, oldValue) {
      this.filter();
    },

    excludeTermsInput(newValue, oldValue) {
      this.filter();
    },

    searchDefinitions(newValue, oldValue) {
      this.search();
    },

    defaultReleaseID() {
      this.search();
    }

  },

  methods: {

    reset() {
      this.input = "";
      this.dataTypeInput = "";
      this.excludeTermsInput = "";

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

      // Search properties by search terms in input field
      this.properties = await data.properties.search(null, this.input, {
        field: "qname",
        match: true,
        searchDefinitions: this.searchDefinitions
      });

      await this.filter();

    },

    async filter() {

      this.showResults = true;

      if (this.dataTypeInput) {
        // Filter results by data type input field
        this.properties = await data.properties.search(this.properties, this.dataTypeInput, {
          field: "typeQName",
          match: true,
          searchDefinitions: false
        });
      }

      if (this.excludeTermsInput) {
        // Filter results by property terms to exclude
        this.properties = await data.properties.search(this.properties, this.excludeTermsInput, {
          field: "qname",
          match: false,
          searchDefinitions: false
        });
      }

      // Make a copy of the results so filters can be removed later without having to rerun the full search
      this.filteredProperties = this.properties.filter( property => true );

      // Sort results
      this.sort();

      // Set up results filtering
      this.setFilterPrefixes();
      this.selectFilterPrefixesAll();

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

    selectFilterPrefixesAll() {
      this.selectedPrefixes = this.resultPrefixes;
    },

    selectFilterPrefixesNone() {
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

    async copyResults(format) {
      let text = "";

      if (format == "excel") {
        text = "Property\tType\tDefinition\n";
        text += this.filteredProperties.map( property => property.qname + "\t" + (property.typeQName || "(abstract)") + "\t" + property.definition ).join("\n");
      }

      if (format == "markdown") {
        text = this.filteredProperties.map ( property => "- " + property.qname).join("\n");
      }

      await this.$copyText(text);

      this.$root.$emit('bv::show::tooltip');

      // Reset the cursor and hide the tooltip
      setTimeout( () => this.$root.$emit('bv::hide::tooltip'), 600);

    }

  },

  async mounted() {
    let input = this.$route.query.input || "";
    let prefixes = this.$route.query.prefixes ? this.$route.query.prefixes.split(",") : [];

    if (input) {
      this.input = input.replace(",", " ");
      await this.search();

      if (prefixes.length > 0) {
        this.selectedPrefixes = [];

        for (let prefix of prefixes) {
          if (this.resultPrefixes.includes(prefix)) {
            this.selectedPrefixes.push(prefix);
          }
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

button.btn-link.filter:first-of-type {
  padding-left: 0 !important;
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

div.input-group.sort {
  display: inline-flex;
}

.results-menu {
  padding-left: 15px;
}

form.form-inline {
  max-height: 25px;
}

.results-menu label {
  justify-content: left !important;
}

.span-left {
  justify-content: left !important;
}

</style>