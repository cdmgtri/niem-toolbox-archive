
<template>
  <!-- Type details -->
  <stacked-field-table v-if="type" :object="details" :open="false">
    <span>Type </span>
    <strong><b-link :to="typeRoute">{{ type.qname }}</b-link></strong>
    <small>
      <span v-if="type.baseQName"> (extends <b-link :to="baseRoute">{{ type.baseQName }})</b-link></span>
    </small>
    <b-badge variant="secondary" pill>{{ type.style }}</b-badge>
  </stacked-field-table>
</template>

<script>

import { Type } from "niem-model";
import { data, TypeInstance } from "../../utils/index";
import StackedFieldTable from "../StackedFieldTable.vue";

export default {

  name: "TypeDetailsRow",

  props: {
    /** @type {TypeInstance} */
    type: { type: Type, required: false },
    spacer: { type: Boolean, default: false }
  },

  components: {
    StackedFieldTable,
  },

  data() {
    let { userKey, modelKey, releaseKey } = this.type;

    return {
      typeRoute: data.types.route(this.type),
      baseRoute: data.types.route({userKey, modelKey, releaseKey, qname: this.type.baseQName}),
      details: {
        "Definition": this.type.definition,
        "Prefix": this.type.prefix,
        "Name": this.type.name,
        "Style": this.type.style,
        "Base / Parent": this.type.baseQName,
      }
    }

  }

}
</script>
