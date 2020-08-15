
<template>
  <div>
    <div>
      <details v-on:toggle="loadWords" :open="open">
        <summary>{{ label }}</summary>
        <br/>

        <div v-if="progress && !done">
          <p>Loading {{ progress.completedWords }} of {{ progress.totalWords }} most common property terms into tag cloud.</p>
        </div>

        <div class="div-wordCloud">
          <vue-word-cloud :style="style" :words="words" :spacing="0.65" :color="color" :progress.sync="progress">
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
  </div>
</template>

<script>

import { Property } from "niem-model";
import { data, PropertyInstance } from "../utils/index";
import * as Terms from "../workers/terms.worker";

export default {

  name: "WordCloud",

  props: {
    /** @type {PropertyInstance[]} */
    properties: {
      type: Array,
      default: () => [],
      validator: (properties) => properties.every( property => property.constructor.name == "Property" )
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
      loaded: false,
      done: false,

      style: "height: 400px; width: 1000px;",
      parentStyle: "height: 10px; width: 100px;",
      progress: undefined,

      weightTopRange: undefined,
      weightBottomRange: undefined
    }
  },

  watch: {

    progress(newProgress, oldProgress) {
      if (newProgress && newProgress.completedWords == newProgress.totalWords) {
        this.done = true;
      }
    }

  },

  methods: {

    search(term) {
      this.$router.push({path: "/search", query: {input: term, prefixes: this.prefixes.join(",")}});
    },

    async loadWords() {
      if (this.loaded == true) return;

      let terms = data.properties.terms(this.properties, this.prefixes);
      let termCounts = await Terms.getTermCounts(terms, { maxTerms: this.max, dropRepTerms: true })
      this.words = await Terms.getCloudWords(termCounts);

      let weightRange = await Terms.getWeightRanges(termCounts);
      this.weightTopRange = weightRange.topThird;
      this.weightBottomRange = weightRange.bottomThird;
      this.loaded = true;
    },

    color([, weight]) {
      if (weight > this.weightTopRange) return "#005170";
      if (weight > this.weightBottomRange) return "#2d7479";
      return "BLACK";
    }

  },

}

</script>

<style scoped>

div.div-wordCloud {
  border: 1px solid gainsboro;
}

</style>