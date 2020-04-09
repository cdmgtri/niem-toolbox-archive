
<template>
  <span>
    <b-button @click="copy" :variant="variant" class="pull-right" size="sm">{{ buttonLabel }}</b-button>
  </span>
</template>

<script>

export default {

  name: "CopyButton",
  props: ["label", "text"],

  data() {
    return {
      buttonLabel: "Copy",
      variant: "outline-secondary"
    }
  },

  methods: {

    async copy() {
      await this.$copyText(this.text);
      this.variant = "success";
      this.buttonLabel = "Done";
      let self = this;
      setTimeout( () => {
        self.variant = "outline-secondary";
        self.buttonLabel = "Copy";
      }, 1000);
    }
  }

}
</script>

<style scoped>

button {
  margin-right: 15px;
}
</style>
