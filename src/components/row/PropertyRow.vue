
<template>
  <div>
    <b-card>
      <details v-on:toggle="loadContents($event, property)">
        <summary>
          <span>
            <!-- property summary component -->
            <strong><b-link :to="propertyRoute">{{ property.qname }} </b-link></strong>

            <!-- type -->
            <span v-if="property.typeQName"><b-link :to="typeRoute">({{property.typeQName}})</b-link></span>
            <span v-else>(abstract)</span>

            <!-- copy button -->
            <copy-button label="Property | Type | Def" :text="cellsPropertyTypeDefinition"/>
          </span>
        </summary>

        <div class="component-summary">

          <b-row>
            <b-col cols="11">
              <!-- Definition -->
              <p><copy-span :label="'Definition'" :text="property.definition"/></p>
            </b-col>
          </b-row>

          <!-- Base of property's type -->
          <b-row v-if="base">
            <b-col cols="2">Base type:</b-col>
            <b-col cols="9">{{ base }}</b-col>
          </b-row>

          <!-- User-traversed path to component -->
          <b-row v-if="path">
            <b-col cols="2">Path:</b-col>
            <b-col cols="9">{{ path }}</b-col>
          </b-row>

          <br v-if="base || path"/>


          <div v-if="contentLength > 0">

            <!-- Contents header and badge -->
            <strong class="contents-header">{{ contentStyle }} </strong>
            <b-badge variant="info" pill>{{ contentLength }}</b-badge>
            <br/><br/>

            <div v-if="properties">
              <!-- sub-properties -->
              <property-row v-for="subProperty of properties" :key="subProperty.qname" :property="subProperty" :path="`${path}/${property.qname}/`"/>
            </div>

            <div v-if="substitutions">
              <!-- substitutions -->
              <property-row v-for="substitution of substitutions" :key="substitution.qname" :property="substitution"/>
            </div>

            <!-- facets -->
            <b-table small v-if="facets" :items="facets" :fields="['style', 'value', 'definition']" :head-variant="null"/>

          </div>
        </div>

      </details>
    </b-card>

  </div>
</template>

<script>

import Utils from "../../utils";
import CopySpan from "../CopySpan.vue";
import CopyButton from "../CopyButton.vue";

export default {

  name: "PropertyRow",
  props: ["property", "path"],
  components: {
    CopySpan,
    CopyButton
  },

  data() {
    let { userKey, modelKey, releaseKey } = this.property;

    return {
      userKey,
      modelKey,
      releaseKey,
      base: undefined,
      contentStyle: undefined,
      contentLength: -1,
      facets: undefined,
      properties: undefined,
      substitutions: undefined,
      propertyRoute: Utils.getPropertyRoute(this.property),
      typeRoute: Utils.getTypeRoute({userKey, modelKey, releaseKey, prefix: this.property.typePrefix, name: this.property.typeName })
    }
  },

  computed: {

    cellsPropertyTypeDefinition() {
      return `${this.property.qname}\t${this.property.typeQName}\t${this.property.definition}`;
    }

  },

  methods: {

    async loadContents(event, property) {
      if (event.target.open) {
        let contents = await property.contents();
        this.base = contents.base;
        if (contents.base) {
          delete contents.base;
        }
        this.contentStyle = Object.keys(contents)[0];
        this.contentLength = contents[this.contentStyle].length;
        this.facets = contents.facets;
        this.properties = contents.properties;
        this.substitutions = contents.substitutions;

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

    getPropertyRoute(property) {
      return Utils.getPropertyRoute(property);
    },

    getTypeRoute(type) {
      return Utils.getTypeRoute(type);
    }

  }

}

</script>

<style scoped>

div.card-body {
  padding: 10px 15px;
  padding-right: 0;
}

div.component-summary {
  padding-top: 10px;
  padding-left: 18px;
}

</style>