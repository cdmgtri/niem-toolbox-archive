
<template>
  <niem-object v-slot="{ namespace }">

    <h1>Namespace {{ namespace.fileName }}
      <span v-if="namespace.fileName != namespace.prefix"> ({{ namespace.prefix }})</span>
    </h1>

    <namespace-info :namespace="namespace"/>

  </niem-object>
</template>

<script>

import NiemObject from "./NIEMObject.vue";
import NamespaceInfo from "../components/niem/NamespaceInfo.vue";

export default {

  name: "Namespace",
  components: {
    NiemObject,
    NamespaceInfo,
  }

}

</script>
