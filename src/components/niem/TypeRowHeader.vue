
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

import { data } from "../../utils/index";

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
      typeRoute: data.types.route(this.type),
      baseRoute: data.types.route({userKey, modelKey, releaseKey, qname: this.type.baseQName})
    }

  }

}
</script>