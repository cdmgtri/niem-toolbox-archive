
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

import * as Terms from "../workers/terms.worker";

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
    prefixes: {
      type: Array,
      default: () => []
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
      /** @type {[String, Number][]} */
      words: [],
      loaded: false
    }
  },

  methods: {

    search(term) {
      this.$router.push({path: "/search", query: {input: term, prefixes: this.prefixes.join(",")}});
    },

    async loadWords() {
      if (this.loaded == true) return;
      this.words = await Terms.getCloudWords(this.properties, {
        maxTerms: 75,
        dropRepTerms: true,
        prefixes: this.prefixes
      });
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
  border: 1px solid gainsboro;
}
</style>