
<template>
  <div>

    <b-breadcrumb :items="breadcrumbs"/>

    <b-alert show>
      <h1>{{ userKey}} {{ modelKey }} {{ releaseKey }} QA</h1>
      <hr/>
      <span>NIEM Release QA</span>
    </b-alert>

    <h1>Release QA</h1>

    <b-button @click="qa">Run QA</b-button>

    <br/><br/>
    <b-alert variant="info" :show="loadingQA">Running qa...</b-alert>

    <qa-results v-if="tests" :tests="tests"/>

  </div>
</template>

<script>

import { getBreadcrumbs } from "../utils/index";
// import { checkRelease } from "../workers/qa.worker";
import { Test } from "niem-model-qa";
import QaResults from "../components/niem/QAResults.vue";

export default {

  name: "Model",
  components: {
    QaResults
  },

  data() {

    let { userKey, modelKey, releaseKey } = this.$route.params;

    return {
      userKey,
      modelKey,
      releaseKey,

      namespaces: [],

      breadcrumbs: getBreadcrumbs(this.$route),

      tests: undefined,

      loadingQA: false

    }
  },

  methods: {

    /**
     * @todo Update niem-model-qa to add testID only to issues, not the full test object
     */
    async qa() {
      this.loadingQA = true;

      // try {
      //   let results = await checkRelease(this.$route.params);
      //   this.tests = results.map( result => {
      //     let test = Object.assign(new Test(), result)
      //     test.issues.forEach( issue => issue.test = test.id );
      //     return test;
      //   });
      // }
      // catch (err) {
      //   console.log("QA failed", err);
      // }

      this.loadingQA = false;

    }

  },

  async mounted() {

    let jsonTests = require(`../assets/qa/niem-${this.$route.params.releaseKey}-qa.json`);

    if (jsonTests) {
      this.tests = jsonTests.map( jsonTest => {
        let test = Object.assign(new Test(), jsonTest);
        test.issues.forEach( issue => issue.test = test.id );
        return test;
      });
    }

  }

}
</script>
