
<template>
  <object-page v-if="loaded" :definition="namespace.definition" :details="details" :detailsLinks="['URI']" :badge="namespace.style">

    <template #header>
      <h1>Namespace {{ namespace.fileName }}
        <span v-if="namespace.fileName != namespace.prefix"> ({{ namespace.prefix }})</span>
      </h1>
    </template>

    <template #details>
      <namespace-info :namespace="namespace"/>
    </template>

  </object-page>
</template>

<script>

import { data } from "../utils/index";
import ObjectPage from "../components/niem/ObjectPage.vue";
import NamespaceInfo from "../components/niem/NamespaceInfo.vue";

export default {

  name: "Namespace",
  components: {
    ObjectPage,
    NamespaceInfo,
  },

  data() {
    return {
      loaded: false,
      namespace: undefined,
      details: undefined
    }
  },

  async mounted() {
    this.namespace = await data.namespaces.get(this.$route.params);
    this.details = {
      "Definition": this.namespace.definition,
      "Prefix": this.namespace.prefix,
      "File Name": this.namespace.fileName,
      "Style": this.namespace.style,
      "URI": this.namespace.uri,
    }
    this.loaded = true;
  }

}

</script>
