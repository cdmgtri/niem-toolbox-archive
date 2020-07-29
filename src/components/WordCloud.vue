
<template>
  <div>
    <details v-on:toggle="loadWords()" :open="open">
      <summary>{{ label }}</summary>

      <br/>
      <div class="div-wordCloud">
        <vue-word-cloud v-if="loaded" style="height: 400px; width: 1000px;" :words="words">
          <template slot-scope="{text}">
            <div style="cursor: pointer;" @click="search(text)">
              {{ text }}
            </div>
          </template>
        </vue-word-cloud>
      </div>

    </details>
    <br/>
  </div>
</template>

<script>
export default {

  name: "WordCloud",

  props: {
    properties: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      required: true
    },
    prefix: {
      type: String
    },
    open: {
      type: Boolean,
      default: true
    },
    max: {
      type: Number,
      default: 75
    }
  },

  data() {
    return {
      words: [],
      loaded: false
    }
  },

  methods: {

    search(term) {
      this.$router.push({path: "/search", query: {input: term, prefixes: this.prefix}});
    },

    loadWords() {

      if (this.loaded == true) return;

      // Count each time a term is used in a property name
      let termInventory = {};

      for (let property of this.properties) {
        let terms = property.terms;
        for (let term of terms) {
          let currentCount = termInventory[term];
          termInventory[term] = currentCount ? currentCount + 1 : 1;
        }
      }

      // Remove common NIEM representation terms
      delete termInventory["Augmentation"];
      delete termInventory["Point"];
      delete termInventory["Association"];
      delete termInventory["Text"];
      delete termInventory["Code"];
      delete termInventory["Date"];
      delete termInventory["DateTime"];
      delete termInventory["Identification"];
      delete termInventory["ID"];
      delete termInventory["Date"];
      delete termInventory["Category"];
      delete termInventory["Description"];
      delete termInventory["Name"];
      delete termInventory["Amount"];
      delete termInventory["Numeric"];
      delete termInventory["Indicator"];
      delete termInventory["Abstract"];
      delete termInventory["Value"];
      delete termInventory["Quantity"];


      // Determine which counts are common enough to include in the results
      let counts = [];

      for (let term in termInventory) {
        counts.push(termInventory[term]);
      }

      // Sort number array descending
      counts = counts.sort( (a, b) => b - a );

      let maxCount = counts.length > this.max ? counts[this.max] : 2;


      // Translate the counts object into an array of arrays: [["term1", 2], ["term2", 5], ...]
      for (let key of Object.keys(termInventory)) {
        let count = termInventory[key];
        if (count >= maxCount) {
          this.words.push([key, termInventory[key]]);
        }
      }

      this.loaded = true;
    }

  },

  mounted() {
    if (this.open == true) {
      this.loadWords();
    }
  }
}

</script>

<style scoped>

div.div-wordCloud {
  border: 1px solid black;
}
</style>