
<template>
  <div>
    <b-card v-if="items.length > 0">
      <copy-table :items="items" :fields="fields" :open="false" :spacer="false" :rowClassFunction="rowClassFunction">
        <span v-if="subProperty">
          <!-- Type link -->
          <b-link :to="typeRoute"><strong>{{ type.qname }}</strong></b-link>

          <!-- Property link -->
          <span> - </span>
          <b-link :to="propertyRoute">{{ property.qname }}</b-link>

          <!-- (min occurs, max occurs) -->
          <small> ({{ subProperty.min }}, {{ subProperty.max}})</small>
        </span>

        <span v-else>
          <span>Properties {{ qualifier }} type </span>
          <strong><b-link :to="typeRoute">{{ type.qname }}</b-link></strong>
          <b-badge variant="info" pill>{{ items.length }}</b-badge>
        </span>
      </copy-table>
    </b-card>
    <br v-if="spacer==true"/>
  </div>
</template>

<script>

import { data } from "../../utils/index";
import CopyTable from "../CopyTable.vue";
import { Property, Type } from "niem-model";

export default {

  name: "SubPropertyTable",

  props: {
    type: {
      type: Type,
      required: true
    },

    property: {
      type: Property,
      required: false
    },

    spacer: {
      type: Boolean,
      default: false
    },

    qualifier: {
      type: String,
      default: "in"
    }

  },

  components: {
    CopyTable
  },

  data() {

    let propertyRoute = undefined;
    let subProperty = undefined;

    if (this.property) {
      propertyRoute = data.properties.route(this.property);
    }

    let { userKey, modelKey, releaseKey } = this.type;

    return {
      userKey,
      modelKey,
      releaseKey,

      subProperty: undefined,
      items: [],

      typeRoute: data.types.route(this.type),
      propertyRoute,

      fields: [
        { key: "Type", tdClass: "td-sm-type" },
        { key: "Property", tdClass: "td-sm-property" },
        { key: "Min", tdClass: "td-sm-min" },
        { key: "Max", tdClass: "td-sm-max" },
      ]

    }
  },

  methods: {

    rowClassFunction(item, type) {
      if (this.property && item.Property == this.property.qname) return "table-info";
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
      return data.properties.route({
        userKey: this.userKey,
        modelKey: this.modelKey,
        releaseKey: this.releaseKey,
        qname
      });
    },

    getTypeRoute(qname) {
      return data.types.route({
        userKey: this.userKey,
        modelKey: this.modelKey,
        releaseKey: this.releaseKey,
        qname
      });
    },

    rowClass(subProperty, type) {
      if (subProperty.propertyQName == this.property.qname) return "table-secondary";
    }

  },

  async mounted() {

    if (this.property) {
      this.subProperty = await data.subProperties.get({
        userKey: this.property.userKey,
        modelKey: this.property.modelKey,
        releaseKey: this.property.releaseKey,
        typeQName: this.type.qname,
        propertyQName: this.property.qname
      });
    }

    let subProperties = await data.subProperties.find({
      userKey: this.type.userKey,
      modelKey: this.type.modelKey,
      releaseKey: this.type.releaseKey,
      typeQName: this.type.qname
    });

    this.items = subProperties.map( subProperty => {
      return {
        "Type": subProperty.typeQName,
        "Property": subProperty.propertyQName,
        "Min": subProperty.min,
        "Max": subProperty.max
      }
    });

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
