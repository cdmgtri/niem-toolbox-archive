
<template>
  <div v-if="subProperties.length > 0">
    <details open>
      <summary>
        <h4>
          <span>{{ label }} </span>
          <b-badge variant="info" pill>{{ subProperties.length }}</b-badge>
        </h4>
      </summary>

      <sub-property-table v-for="subProperty of subProperties" :key="subProperty.typeQName" :typeQName="subProperty.typeQName" :propertyQName="subProperty.propertyQName"/>
    </details>
    <br/>
  </div>
</template>

<script>

export default {

  name: "SubPropertyList",

  components: {
    SubPropertyTable: () => import("./SubPropertyTable.vue")
  },

  props: {
    property: {
      type: Object,
      required: true
    },

    label: {
      type: String,
      default: "Available within types"
    }

  },

  data() {
    return {
      subProperties: this.$store.getters.subProperties(null, null, this.property.qname),
    }
  }

}
</script>
