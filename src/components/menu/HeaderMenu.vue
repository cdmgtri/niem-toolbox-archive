
<template>
  <Menu
    :brand-component="HeaderBrand"
    :links-component="HeaderLinks"
    :label="'header'"
    />
</template>

<script>

import Menu from "./Menu.vue";
import HeaderLinks from "./HeaderLinks.vue";
import HeaderBrand from "./HeaderBrand.vue";

export default {
  name: "HeaderMenu",
  data() {
    return {
      HeaderLinks,
      HeaderBrand
    }
  },
  components: {
    Menu
  }
}
</script>
