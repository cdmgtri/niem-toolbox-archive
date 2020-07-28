
<template>
  <niem-object v-slot="{ property }">

    <h1>Property {{ property.qname }}</h1>
    <property-info :property="property"/>

  </niem-object>
</template>

<script>

import NiemObject from "./NIEMObject.vue";
import PropertyInfo from "../components/niem/PropertyInfo.vue";

export default {

  name: "Property",
  components: {
    NiemObject,
    PropertyInfo
  }

}
</script>
