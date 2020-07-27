
<template>
  <div v-if="subProperties.length > 0">
    <b-card>
      <details>
        <summary>
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
        </summary>

        <br/>
        <b-table small :items="subProperties" :fields="fields" :head-variant="null" :tbody-tr-class="rowClass"/>
      </details>
    </b-card>
    <br/>
  </div>
</template>

<script>

import Utils from "../../utils";

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
      if (subProperty.propertyQName == this.propertyQName) return "table-secondary";
    }

  },

  async mounted() {
    // this.type = await this.$store.getters.type(this.typeQName);
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
