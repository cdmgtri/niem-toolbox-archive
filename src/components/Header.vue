
<template>
  <div class="nav navbar navbar-header fixed-top">
    <HeaderUSA/>
    <HeaderMenu/>
  </div>
</template>

<script>

import HeaderUSA from "./HeaderUSA.vue";
import HeaderMenu from "./HeaderMenu.vue";

export default {
  name: "Header",
  components: {
    HeaderUSA,
    HeaderMenu
  }
}
</script>
