
<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"/>
    <b-alert show>
      <h1>{{ userKey }}</h1>
      <hr/>
      <span>All data models published by {{ userKey }}</span>
    </b-alert>
    <models-info :userKey="userKey"/>
    <br/>
  </div>
</template>

<script>

import { getBreadcrumbs } from "../utils/index";
import ModelsInfo from "../components/niem/ModelsInfo.vue";

export default {

  name: "Models",

  components: {
    ModelsInfo
  },

  data() {

    let { userKey } = this.$route.params;

    return {
      /** @type {String} */
      userKey,
      breadcrumbs: getBreadcrumbs(this.$route)
    }
  }

}

</script>
