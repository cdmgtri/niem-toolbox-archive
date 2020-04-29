
<template>
  <div>
    <b-card>
      <details v-on:toggle="load($event, property)">
        <summary>
          <span>
            <!-- property summary component -->
            <strong><b-link :to="propertyRoute">{{ property.qname }} </b-link></strong>

            <!-- type -->
            <span v-if="property.typeQName"><b-link :to="typeRoute">({{property.typeQName}})</b-link></span>
            <span v-else>(abstract)</span>

            <!-- copy button -->
            <copy-button v-if="map" label="Property | Type | Def" :text="cellsPropertyTypeDefinition"/>
          </span>
        </summary>

        <div v-if="loaded" class="component-summary">

          <b-row>
            <b-col cols="11">
              <!-- Definition -->
              <p><copy-span :label="'Definition'" :text="property.definition"/></p>
            </b-col>
          </b-row>

          <!-- User-traversed path to component -->
          <component-path-links :path="path"/>
          <br v-if="path.length > 0"/>

          <div v-if="base">
            <h4>Base type</h4>
            <type-row v-if="base" :type="base" :path="updatedPath"/>
            <br/>
          </div>

          <div v-if="group">
            <h4>Substitution group</h4>
            <property-row :property="group" :path="updatedPath"/>
            <br/>
          </div>

          <!-- sub-properties -->
          <details v-if="properties.length > 0">
            <summary>
              <h4>Properties </h4>
              <b-badge variant="info" pill>{{ properties.length }}</b-badge>
            </summary>
            <property-row v-for="subProperty of properties" :key="subProperty.qname" :property="subProperty" :path="updatedPath" :map="map" :subset="subset"/>
          </details>

          <!-- substitutions -->
          <substitutions :substitutions="substitutions" :path="updatedPath"/>

          <!-- facets -->
          <details v-if="facets.length > 0">
            <summary>
              <h4>Facets </h4>
              <b-badge variant="info" pill>{{ facets.length }}</b-badge>
            </summary>
            <b-table small v-if="facets" :items="facets" :fields="['style', 'value', 'definition']" :head-variant="null"/>
          </details>

          <details v-if="containerTypes.length > 0">
            <summary>
              <h4>In types </h4>
              <b-badge variant="info" pill>{{ containerTypes.length }}</b-badge>
            </summary>
            <sub-property-row v-for="subProperty of subProperties" :key="subProperty.typeQName" :subProperty="subProperty" :highlight="subProperty.propertyQName"/>
          </details>

        </div>

      </details>
    </b-card>

  </div>
</template>

<script>

import Utils from "../../utils";
import CopySpan from "../CopySpan.vue";
import CopyButton from "../CopyButton.vue";
import ComponentPathLinks from "../ComponentPathLinks.vue";
import SubPropertyRow from "./SubPropertyRow.vue";
import { Property } from "niem-model";

export default {

  name: "PropertyRow",

  props: {
    property: Property,
    path: {
      type: Array,
      default: () => []
    },
    map: {
      type: Boolean,
      default: false
    },
    subset: {
      type: Boolean,
      default: false
    }},

  components: {
    CopySpan,
    CopyButton,
    ComponentPathLinks,
    SubPropertyRow,
    Substitutions: () => import("./Substitutions.vue"),
    TypeRow: () => import("./TypeRow.vue")
  },

  data() {
    let { userKey, modelKey, releaseKey } = this.property;

    return {
      open: false,
      loaded: false,
      userKey,
      modelKey,
      releaseKey,
      type: undefined,
      base: undefined,
      group: undefined,
      namespace: undefined,
      contentStyle: undefined,
      contentLength: -1,
      facets: [],
      properties: [],
      substitutions: [],
      containerTypes: [],
      subProperties: [],
      propertyRoute: Utils.getPropertyRoute(this.property),
      typeRoute: Utils.getTypeRoute({userKey, modelKey, releaseKey, prefix: this.property.typePrefix, name: this.property.typeName })
    }
  },

  computed: {

    cellsPropertyTypeDefinition() {
      return `${this.property.qname}\t${this.property.typeQName}\t${this.property.definition}`;
    },

    updatedPath() {
      return Utils.updatePath(this.property, this.path);
    },

  },

  methods: {

    async load(event, property) {

      this.$data.open = event.target.open;
      this.$data.loaded = false;

      if (event.target.open) {

        this.type = await property.type();

        if (this.type) {
          this.base = await this.type.base();
        }

        let contents = await property.contents();
        // this.base = contents.base;
        if (contents.base) {
          delete contents.base;
        }

        if (property.groupQName) {
          this.group = await property.group();
        }

        this.namespace = await property.namespace();
        this.$data.loaded = true;

        this.contentStyle = Object.keys(contents)[0];
        this.contentLength = contents[this.contentStyle].length;
        this.facets = contents.facets || [];
        this.properties = contents.properties || [];
        this.substitutions = contents.substitutions || [];

        this.subProperties = await property.subProperties.find();
        this.containerTypes = this.subProperties.map( subProperty => subProperty.typeQName );
      }
    },

    copy(text) {
      this.$copyText(text)
    },

    getPropertyRoute(property) {
      return Utils.getPropertyRoute(property);
    },

    getTypeRoute(type) {
      return Utils.getTypeRoute(type);
    },

},

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

h4 {
  display: inline;
}

</style>