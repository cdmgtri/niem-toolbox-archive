
<template>
  <div>
    <b-card>
      <details>
        <summary><b-link :to="getTypeRoute(subProperty.typeQName)">{{ subProperty.label }}</b-link></summary>

        <br/>
        <b-table small v-if="subProperties.length > 0" :items="subProperties" :fields="fields" :head-variant="null" :tbody-tr-class="rowClass"/>

      </details>
    </b-card>

  </div>
</template>

<script>

import Utils from "../../utils";
import CopySpan from "../CopySpan.vue";

export default {

  name: "PropertyRow",
  props: ["subProperty", "path", "highlight"],
  components: {
    // CopySpan
  },

  data() {
    let { userKey, modelKey, releaseKey } = this.subProperty;

    return {
      userKey,
      modelKey,
      releaseKey,

      typeRoute: Utils.getTypeRoute({userKey, modelKey, releaseKey, prefix: this.subProperty.typePrefix, name: this.subProperty.typeName }),

      propertyRoute: Utils.getTypeRoute({userKey, modelKey, releaseKey, prefix: this.subProperty.propertyPrefix, name: this.subProperty.propertyName }),

      subProperties: this.$store.getters.subProperties(undefined, this.subProperty.typeQName),

      fields: [
        { key: "typeQName", label: "Type"},
        { key: "propertyQName", label: "Property"},
        "min",
        "max"
      ]

    }
  },

  methods: {

    copy(text) {
      this.$copyText(text)
    },

    getPathLinks() {
      let links = "";
      let qnames = this.path.split("/");

      for (let qname of qnames) {
        links += `<b-router :to="getPropertyLink(qname)">qname</b-router> `;
      }
    },

    getPropertyRoute(qname) {
      let [prefix, name] = qname.split(":");
      return Utils.getPropertyRoute({
        userKey: this.userKey,
        modelKey: this.modelKey,
        releaseKey: this.releaseKey,
        prefix,
        name
      });
    },

    getTypeRoute(qname) {
      let [prefix, name] = qname.split(":");
      return Utils.getTypeRoute({
        userKey: this.userKey,
        modelKey: this.modelKey,
        releaseKey: this.releaseKey,
        prefix,
        name
      });
    },

    rowClass(subProperty, type) {
      if (subProperty.propertyQName == this.highlight) return "table-secondary";
    }

  }

}

</script>

<style scoped>

div.card-body {
  padding: 10px 15px;
}

div.component-summary {
  padding-top: 10px;
  padding-left: 18px;
}

</style>
