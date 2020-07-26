
<template>
  <div v-if="hasData == true">

    <details open>
      <summary>
        <h4 class="section">
          <span>Properties </span>
          <b-badge variant="info" pill>{{ containedProperties.length }}</b-badge>
        </h4>
      </summary>

      <!-- Inherited properties -->
      <div v-for="parentQName of parentQNames" :key="parentQName" class="ml-3">
        <details>
          <summary>
            <span>Properties inherited from <strong>{{ parentQName }} </strong></span>
            <b-badge variant="info" pill>{{ inheritedProperties[parentQName].length }}</b-badge>
          </summary>
          <property-row v-for="property of inheritedProperties[parentQName]" :key="property.qname" :property="property" :parentXPath="parentXPath"/>
        </details>
      </div>

      <!-- Contained properties -->
      <property-row v-for="property of containedProperties" :key="property.qname" :property="property" :parentXPath="parentXPath"/>
    </details>

    <br/>
  </div>
</template>

<script>

import Utils from "../../utils";

export default {

  name: "ContainedPropertiesList",

  props: {
    type: {
      type: Object
    },
    parentXPath: {
      type: String,
      required: false
    }
  },

  components: {
    PropertyRow: () => import("./PropertyRow.vue")
  },

  data() {
    return {
      hasData: false,
      containedProperties: [],
      inheritedProperties: {}
    }
  },

  computed: {
    parentQNames() {
      return Object.keys(this.inheritedProperties);
    }
  },

  async mounted() {

    if (!this.type) return;

    this.containedProperties = await this.type.contents.containedProperties();
    this.inheritedProperties = await this.type.contents.inheritedProperties();

    if (this.containedProperties.length > 0 || Object.keys(this.inheritedProperties).length > 0) {
      this.hasData = true;
    }
  }

}
</script>
