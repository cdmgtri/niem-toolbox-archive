
<template>
  <div v-if="localTerms.length > 0">
    <details>
      <summary>
        <h4 class="section">
          <span>Local Terms </span>
          <b-badge variant="info" pill> {{ localTerms.length }}</b-badge>
        </h4>
      </summary>

      <!-- Local terms table -->
      <b-table :items="items"/>
    </details>
  </div>
</template>

<script>
export default {

  name: "LocalTermTable",

  props: {
    localTerms: {
      type: Array,
      default: () => []
    }
  },

  computed: {

    items() {
      return this.localTerms.map( localTerm => {

        let style = "Literal";
        let value = localTerm.literal;

        if (!localTerm.literal) {
          style = "Definition";
          value = localTerm.definition;
        }

        return {
          term: localTerm.term,
          style,
          "Literal or Definition": value
        }
      });
    },

  }

}
</script>