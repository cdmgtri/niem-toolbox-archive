
<template>
  <div>
    <b-breadcrumb :items="breadcrumb" :class="{'release-other': !defaultReleaseIndicator}"/>
  </div>
</template>

<script>

import { breadcrumbs, data } from "../utils/index";

export default {

  name: "Breadcrumb",

  data() {
    return {
      breadcrumb: breadcrumbs(this.$route)
    }
  },

  computed: {

    defaultReleaseIndicator() {
      return this.$store.getters.defaultReleaseIndicator(this.$route.path);
    }

  }

}
</script>

<style scoped>

.breadcrumb.release-other {
  background-color: SEASHELL;
}

.breadcrumb.release-other::after {
  content: "\00a0 \00a0 (release is not currently selected)";
  color: darkgray;
  font-size: smaller;
}

</style>
