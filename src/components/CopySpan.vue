
<template>
  <span @click="copy" ref="span" v-b-tooltip.click.v-success="`${label} copied`">
    {{ text }}
  </span>
</template>

<script>

export default {

  name: "CopySpan",
  props: ["label", "text"],

  methods: {

    async copy() {

      // Change the cursor
      let span = this.$refs.span;
      span.style.cursor = "grabbing";

      // Copy text to the clipboard
      await this.$copyText(this.text);

      // Reset the cursor and hide the tooltip
      setTimeout( () => {
        span.style.cursor = "grab";
        this.$root.$emit('bv::hide::tooltip');
      }, 600);

    }
  }

}
</script>

<style scoped>

span {
  cursor: grab;
}

</style>
