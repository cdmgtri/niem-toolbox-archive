
<template>
  <div>
    <b-card>
      <details v-on:toggle="loadContents($event, subProperty)">
        <summary><b-link :to="getTypeRoute(subProperty.typeQName)">{{ subProperty.typeQName }}</b-link></summary>

        <br/>
        <b-table small v-if="subProperties.length > 0" :items="subProperties" :fields="fields" :head-variant="null"/>

      </details>
    </b-card>

  </div>
</template>

<script>

import Utils from "../../utils";
import CopySpan from "../CopySpan.vue";

export default {

  name: "PropertyRow",
  props: ["subProperty", "path"],
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

    async loadContents(event, subProperty) {
      if (event.target.open) {
        let subProperties = this.$store.getters.subP
        // let contents = await property.contents();
        // this.base = contents.base;
        // if (contents.base) {
        //   delete contents.base;
        // }
        // this.contentStyle = Object.keys(contents)[0];
        // this.contentLength = contents[this.contentStyle].length;
        // this.facets = contents.facets;
        // this.properties = contents.properties;
        // this.substitutions = contents.substitutions;

      }
    },

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
