
<template>
  <div>
    <!-- contained and inherited properties -->
    <details v-if="containedProperties.length > 0" open>
      <summary>
        <strong>
          <span>Properties </span>
          <b-badge variant="info" pill>{{ containedProperties.length }}</b-badge>
        </strong>
      </summary>

      <!-- Inherited properties -->
      <div v-for="parentQName of Object.keys(inheritedProperties)" :key="parentQName" class="ml-3">
        <details>
          <summary>
            <span>Properties inherited from <strong>{{ parentQName }} </strong></span>
            <b-badge variant="info" pill>{{ inheritedProperties[parentQName].length }}</b-badge>
          </summary>
          <property-row v-for="property of inheritedProperties[parentQName]" :key="property.qname" :property="property" :path="updatedPath"/>
        </details>
      </div>

      <!-- Contained properties -->
      <property-row v-for="property of containedProperties" :key="property.qname" :property="property"/>
    </details>

  </div>
</template>

<script>
export default {

  name: "ContainedPropertiesList",

  props: {
    containedProperties: {
      type: Array,
      required: true
    },
    inheritedProperties: {
      type: Object,
      required: false
    },
    path: {
      type: String,
      required: false
    }
  },

  components: {
    PropertyRow: () => import("./PropertyRow.vue")
  }

}
</script>
