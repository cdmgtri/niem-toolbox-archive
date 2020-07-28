
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

import Utils from "../../utils";

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
      propertyRoute: Utils.getPropertyRoute(this.property),
      typeRoute: Utils.getTypeRoute({userKey, modelKey, releaseKey, prefix: this.property.typePrefix, name: this.property.typeName})
    }

  }

}
</script>