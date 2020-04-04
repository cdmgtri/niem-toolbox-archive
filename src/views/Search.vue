
<template>
  <div>
    <b-container>
      <b-row>

        <!-- Sidebar -->
        <b-col cols="4">
          <p>Release: {{ this.$data.releaseKey }}</p>
          <strong>Select release:</strong>
          <b-form-select v-model="releaseKey" :options="releaseKeys" size="sm"/>
          <strong>Features</strong>
          <ul>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
          </ul>
        </b-col>

        <!-- Main panel -->
        <b-col>
          <strong>Features</strong>
          <ul>
            <li>Select release</li>
            <li>Load release</li>
            <li>Load progress bar</li>
            <li>View namespaces</li>
          </ul>

        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>

export default {

  name: "Search",

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


