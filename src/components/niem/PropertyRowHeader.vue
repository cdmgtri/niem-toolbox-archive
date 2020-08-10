
<template>
  <span>

    <!-- property qname -->
    <strong><b-link :to="propertyRoute">{{ property.qname }}</b-link></strong>

    <!-- type qname or (abstract) -->
    <small>
      <span v-if="property.typeQName"> (type <b-link :to="typeRoute">{{property.typeQName}}</b-link>)</span>
      <span v-else> (abstract)</span>
    </small>

  </span>
</template>

<script>

import { data } from "../../utils/index";

export default {
  name: "PropertyRowHeader",

  props: {
    property: {
      type: Object,
      required: true
    }
  },

  data() {

    let { userKey, modelKey, releaseKey } = this.property;

    return {
      propertyRoute: data.properties.route(this.property),
      typeRoute: data.types.route({userKey, modelKey, releaseKey, qname: this.property.typeQName})
    }

  }

}
</script>