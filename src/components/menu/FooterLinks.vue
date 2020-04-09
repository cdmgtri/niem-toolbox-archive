
<template>
  <div class="collapse navbar-collapse" :id="toggleID">
    <b-nav class="navbar-nav ml-auto">
      <a href="https://www.niem.gov/Pages/default.aspx" target="_blank" class="nav-link">NIEM.gov</a>
      <a href="https://niem.github.io" target="_blank" class="nav-link">Resources</a>
      <a href="https://www.niem.gov/Pages/contact.aspx" target="_blank" class="nav-link">Contact Us</a>
    </b-nav>
  </div>
</template>

<script>
  export default {
    name: "PageFooter",
    props: [
      "toggleID"
    ]
  }
</script>

