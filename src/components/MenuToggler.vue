
<template>
  <!-- Hamburger menu for small screens -->
  <button class="navbar-toggler" data-toggle="collapse" :data-target="'#' + toggleID">
    <span class="sr-only">Toggle navigation</span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
  </button>
</template>

<script>
  export default {
    name: "MenuToggler",
    props: [
      "toggleID"
    ]
  }
</script>

<style scoped>

.navbar-toggler {
  border-color: #fff;
  background-color: #00435d;
}

.navbar-toggler:hover,
.navbar-toggler:focus {
  background-color: #1B7B81
}

.icon-bar {
  background-color: white;
  margin-top: 4px;
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 1px
}

</style>
