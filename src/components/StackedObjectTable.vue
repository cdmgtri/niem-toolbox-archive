
<template>
  <div>
    <span v-for="key of keys" :key="key">
      <span v-if="object[key] || object[key] === 0">
        <b-row>
          <!-- Field label -->
          <b-col cols="2" class="text-capitalize"><strong>{{ key }}</strong></b-col>

          <!-- Field value rendered as HTML link -->
          <b-col v-if="htmlFields.includes(key)">
            <a :href="object[key]" target="_blank">{{ object[key] }}</a>
          </b-col>

          <!-- Field value as click-to-copy text -->
          <b-col v-else><copy-span :label="key" :text="object[key]"/></b-col>
        </b-row>
        <hr class="small"/>
      </span>
    </span>
  </div>
</template>

<script>

import CopySpan from "../components/CopySpan";

export default {

  name: "StackedObjectTable",
  props: {
    object: {
      type: Object,
      default: () => {}
    },
    htmlFields: {
      type: Array,
      default: () => []
    }
  },

  components: {
    CopySpan
  },

  computed: {
    keys() {
      return Object.keys(this.object);
    },
    fieldCount() {
      return Object.keys(this.object).length;
    }
  }

}

</script>

<style scoped>

hr.small {
  margin: 6px 0;
}

</style>