
<template>
  <div>
    <p>Store Loaded: {{ this.$store.state.loaded }}</p>
    <p>Store Properties: {{ this.$store.state.properties.length }}</p>
    <strong>Features</strong>
    <ul>
      <li>Select release</li>
      <li>Load release</li>
      <li>Load progress bar</li>
      <li>View namespaces</li>
    </ul>

  </div>
</template>

<script>

export default {

  name: "Browse",

  data: () => {
    return {
      releaseKey: "5.0",
      releaseKeys: [
        { text: "5.0" },
        { text: "4.2", disabled: true }
      ]
    }
  }

}

</script>

<style scoped>

#sidebar {
  padding-top: 70px;
}

</style>


