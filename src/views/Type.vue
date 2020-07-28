
<template>
  <niem-object v-slot="{ type }">

    <h1>Type {{ type.qname }}</h1>
    <type-info :type="type"/>

  </niem-object>
</template>

<script>

import NiemObject from "./NIEMObject.vue";
import TypeInfo from "../components/niem/TypeInfo.vue";

export default {

  name: "Type",
  components: {
    NiemObject,
    TypeInfo
  }

}
</script>
