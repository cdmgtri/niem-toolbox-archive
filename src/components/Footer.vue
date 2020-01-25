
<template>
  <nav class="navbar navbar-footer navbar-expand-md fixed-bottom navbar-light bg-light">
    <div class="navbar-brand d-none d-md-block">National Information Exchange Model (NIEM)</div>
    <div class="navbar-brand d-md-none">National Information Exchange Model</div>

    <menu-toggler :toggleID="toggleID"/>

    <footer-links :toggleID="toggleID"/>

  </nav>
</template>

<script>

import MenuToggler from "./MenuToggler.vue";
import FooterLinks from './FooterLinks.vue';

export default {
  name: "PageFooter",
  data() {
    return {
      toggleID: "footerLinks"
    }
  },
  components: {
    MenuToggler,
    FooterLinks
  }
}
</script>

