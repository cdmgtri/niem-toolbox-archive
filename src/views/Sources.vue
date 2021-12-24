
<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"/>

    <b-alert show>
      <h1>Browse NIEM content</h1>
      <hr/>
      <span>Content is available from NIEM releases and community data models and IEPDs.</span>
    </b-alert>

    <div v-for="userKey in userKeys" :key="userKey">
      <details open>
        <summary><strong>{{ userKey }}</strong></summary>
        <models-info :userKey="userKey"/>
      </details>
    </div>
  </div>
</template>

<script>

import { getBreadcrumbs, data } from "../utils/index";
import ModelsInfo from "../components/niem/ModelsInfo.vue";

export default {

  name: "Sources",

  components: {
    ModelsInfo
  },

  data() {
    return {
      /** @type {String[]} */
      userKeys: [],
      breadcrumbs: getBreadcrumbs(this.$route)
    }
  },

  async mounted() {
    this.userKeys = await data.userKeys.find();
  }

}

</script>
