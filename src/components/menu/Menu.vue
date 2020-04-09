
<template>
  <nav class="navbar navbar-expand-md">
      <component :is="brandComponent"/>
      <menu-toggler :toggleID="toggleID"/>
      <component :is="linksComponent" :toggleID="label+'Links'"/>
  </nav>
</template>

<script>

import MenuToggler from "./MenuToggler.vue";

export default {
  name: "Menu",
  data() {
    return {
      toggleID: this.label + "Links"
    }
  },
  props: [
    "brandComponent",
    "linksComponent",
    "label"
  ],
  components: {
    MenuToggler
  }
}
</script>