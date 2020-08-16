
<template>
  <div>
    <breadcrumb/>

    <div class="header">
      <slot name="header"/>
      <b-badge v-if="badge" variant="secondary" pill>{{ badge }}</b-badge>
    </div>

    <!-- Definition -->
    <p v-if="definition"><copy-span :text="definition" label="Definition"/></p>

    <!-- Property details -->
    <stacked-field-table v-if="details" :object="details" :links="detailsLinks" label="Basic fields" :open="false"/>

    <!-- Namespace -->
    <namespace-details-row v-if="namespace" :namespace="namespace" :spacer="true"/>

    <slot name="details"/>

  </div>
</template>

<script>

import { data } from "../../utils/index";
import Breadcrumb from "../Breadcrumb.vue";
import CopySpan from "../CopySpan.vue";
import NamespaceDetailsRow from "./NamespaceDetailsRow.vue";
import StackedFieldTable from "../StackedFieldTable.vue";

export default {

  name: "ObjectPage",

  components: {
    Breadcrumb,
    CopySpan,
    NamespaceDetailsRow,
    StackedFieldTable,
  },

  props: {
    definition: {
      type: String,
      required: true
    },
    details: Object,
    detailsLinks: {
      type: Array,
      default: () => []
    },
    namespace: Object,
    badge: String

  }

}
</script>

<style scoped>

h1 {
  display: inline;
}

div.header {
  align-items: center;
  display: inline-flex;
  padding-bottom: 10px;
}

div.header span.badge {
  margin-bottom: 5px;
}

</style>