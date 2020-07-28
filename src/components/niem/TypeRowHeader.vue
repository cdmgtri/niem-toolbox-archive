
<template>
  <span>

    <!-- type summary component -->
    <strong><b-link :to="typeRoute">{{ type.qname }}</b-link></strong>

    <!-- base type -->
    <span v-if="type.baseQName && type.prefix != 'structures'">
      <small>
        (extends <b-link :to="baseRoute">{{type.baseQName}}</b-link>)
      </small>
    </span>

  </span>
</template>

<script>

import Utils from "../../utils";

export default {
  name: "TypeRowHeader",

  props: {
    type: {
      type: Object,
      required: true
    }
  },

  data() {

    let { userKey, modelKey, releaseKey } = this.type;

    return {
      typeRoute: Utils.getTypeRoute(this.type),
      baseRoute: Utils.getTypeRoute({userKey, modelKey, releaseKey, prefix: this.type.basePrefix, name: this.type.baseName})
    }

  }

}
</script>