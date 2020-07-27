
<template>
  <b-card>
    <copy-table :items="items" :fields="fields" :open="false" :spacer="false" :rowClassFunction="rowClassFunction">
      <span v-if="subProperty">
        <!-- Type link -->
        <b-link :to="typeRoute"><strong>{{ typeQName }}</strong></b-link>

        <!-- Property link -->
        <span> - </span>
        <b-link :to="propertyRoute">{{ propertyQName }}</b-link>

        <!-- (min occurs, max occurs) -->
        <small> ({{ subProperty.min }}, {{ subProperty.max}})</small>
      </span>

      <span v-else>
        <span>Properties (alternate table format) in type <strong>{{ typeQName }}</strong></span>
      </span>
    </copy-table>
  </b-card>
</template>

<script>

import Utils from "../../utils";
import CopyTable from "../CopyTable.vue";

export default {

  name: "SubPropertyTable",

  props: {
    typeQName: {
      type: String,
      required: true
    },

    propertyQName: {
      type: String,
      required: false
    }
  },

  components: {
    CopyTable
  },

  data() {

    let property = undefined;
    let propertyRoute = undefined;
    let subProperty = undefined;

    if (this.propertyQName) {
      property = this.$store.getters.property(this.propertyQName);
      propertyRoute = Utils.getPropertyRoute(property);
      subProperty = this.$store.getters.subProperty(this.typeQName, this.propertyQName);
    }

    let type = this.$store.getters.type(this.typeQName);

    let { userKey, modelKey, releaseKey } = type;

    return {
      userKey,
      modelKey,
      releaseKey,

      property,
      type,
      subProperty,
      subProperties: this.$store.getters.subProperties(undefined, this.typeQName),

      typeRoute: Utils.getTypeRoute(type),
      propertyRoute,

      fields: [
        { key: "Type", tdClass: "td-sm-type" },
        { key: "Property", tdClass: "td-sm-property" },
        { key: "Min", tdClass: "td-sm-min" },
        { key: "Max", tdClass: "td-sm-max" },
      ]

    }
  },

  computed: {

    items() {
      return this.subProperties.map( subProperty => {
        return {
          "Type": subProperty.typeQName,
          "Property": subProperty.propertyQName,
          "Min": subProperty.min,
          "Max": subProperty.max
        }
      })
    }

  },

  methods: {

    rowClassFunction(item, type) {
      if (item.Property == this.propertyQName) return "table-info";
      return "";
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
    },

    rowClass(subProperty, type) {
      if (subProperty.propertyQName == this.propertyQName) return "table-secondary";
    }

  },

  async mounted() {
    // this.type = await this.$store.getters.type(this.typeQName);
  }

}

</script>

<style>

.td-sm-min {
  width: 60px !important;
}

.td-sm-max {
  width: 120px !important;
}

</style>
