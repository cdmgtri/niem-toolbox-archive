
<template>
  <object-row v-if="type" :definition="type.definition" :label="label" :spacer="spacer">

    <template #header>
      <!-- type summary component -->
      <strong><b-link :to="typeRoute">{{ type.qname }}</b-link></strong>

      <!-- base type -->
      <span v-if="type.baseQName && type.prefix != 'structures'">
        <small>
          (extends <b-link :to="baseRoute">{{type.baseQName}}</b-link>)
        </small>
      </span>
    </template>

    <template #details>
      <!-- Contents (codes or available properties) -->
      <object-contents :type="type"/>
    </template>

  </object-row>
</template>

<script>

import { data } from "../../utils/index";
import ObjectContents from "./ObjectContents.vue";
import ObjectRow from "./ObjectRow.vue";

export default {

  name: "TypeRow",

  props: {
    type: {
      type: Object
    },
    label: {
      type: String,
      default: ""
    },
    spacer: {
      // Trailing line break following the row
      type: Boolean,
      default: false
    }
  },

  components: {
    ObjectRow,
    ObjectContents: () => import("./ObjectContents.vue"),
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
