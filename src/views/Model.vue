
<template>
  <div>
    <b-breadcrumb :items="breadcrumbs"/>
    <b-alert show>
      <h1>{{ userKey }} {{ modelKey }}</h1>
      <hr/>
      <span>All releases from the {{ userKey }} {{ modelKey }}</span>
    </b-alert>
    <releases-info :userKey="userKey" :modelKey="modelKey"/>
  </div>
</template>

<script>

import { getBreadcrumbs } from "../utils/index";
import ReleasesInfo from "../components/niem/ReleasesInfo.vue";

export default {

  name: "Model",

  components: {
    ReleasesInfo
  },

  data() {
    let { userKey, modelKey } = this.$route.params;

    return {
      userKey,
      modelKey,
      breadcrumbs: getBreadcrumbs(this.$route),
    }
  }

}

</script>
