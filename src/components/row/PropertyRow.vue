
<template>
  <div>
    <b-card>
      <details v-on:toggle="load($event, property)">
        <summary>
          <span>
            <!-- Row label -->
            <span v-if="label">{{ label }}</span>

            <!-- property summary component -->
            <strong><b-link :to="propertyRoute">{{ property.qname }} </b-link></strong>

            <!-- type -->
            <span v-if="property.typeQName"><b-link :to="typeRoute">({{property.typeQName}})</b-link></span>
            <span v-else>(abstract)</span>

            <!-- copy button -->
            <copy-button v-if="map" label="Path + CR spreadsheet fields" :text="cellsPathCR"/>
            <!-- <copy-button v-if="map" label="Property | Type | Def" :text="cellsPropertyTypeDefinition"/> -->
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

          <!-- xPath -->
          <b-row v-if="xpath">
            <b-col cols="11">
              <p>XPath: <small><copy-span :label="'XPath'" :text="xpath"/></small></p>
            </b-col>
          </b-row>
          <!-- <br v-if="path.length > 0"/> -->

          <div v-if="base">
            <!-- <h4>Base type</h4> -->
            <type-row v-if="base" :type="base" :label="'Base type - '" :path="updatedPath" :map="map" :subset="subset"/>
            <br/>
          </div>

          <div v-if="group">
            <property-row :property="group" :label="'Substitution group - '" :path="updatedPath"/>
            <br/>
          </div>

          <!-- contained and inherited properties -->
          <details v-if="containedProperties.length > 0" open>
            <summary>
              <h4>Properties </h4>
              <b-badge variant="info" pill>{{ containedProperties.length }}</b-badge>
            </summary>

            <!-- Inherited properties -->
            <div v-for="parentQName of Object.keys(inheritedProperties)" :key="parentQName" class="ml-3">
              <details>
                <summary>
                  <span>Properties inherited from <strong>{{ parentQName }} </strong></span>
                  <b-badge variant="info" pill>{{ inheritedProperties[parentQName].length }}</b-badge>
                </summary>
                <property-row v-for="property of inheritedProperties[parentQName]" :key="property.qname" :property="property" :path="updatedPath" :map="map" :subset="subset"/>
              </details>
            </div>

            <!-- Current sub-properties -->
            <property-row v-for="subProperty of containedProperties" :key="subProperty.qname" :property="subProperty" :path="updatedPath" :map="map" :subset="subset"/>
          </details>

          <!-- substitutions -->
          <substitutions :substitutions="substitutions" :path="updatedPath" :map="map" :subset="subset"/>
          <br v-if="substitutions.length"/>

          <!-- facets -->
          <details v-if="facets.length > 0" open>
            <summary>
              <h4>Facets </h4>
              <b-badge variant="info" pill>{{ facets.length }}</b-badge>
            </summary>
            <b-table small v-if="facets" :items="facets" :fields="['style', 'value', 'definition']" :head-variant="null"/>
          </details>

          <!-- Types in which this property appears -->
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
    label: {
      type: String,
      default: ""
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
      facets: [],
      containedProperties: [],
      inheritedProperties: {},
      substitutions: [],
      containerTypes: [],
      subProperties: [],
      parents: [],

      propertyRoute: Utils.getPropertyRoute(this.property),
      typeRoute: Utils.getTypeRoute({userKey, modelKey, releaseKey, prefix: this.property.typePrefix, name: this.property.typeName })
    }
  },

  computed: {

    cellsPropertyTypeDefinition() {
      return `${this.property.qname}\t${this.property.typeQName}\t${this.property.definition}`;
    },

    cellsPathCR() {
      // Leave spreadsheet-default values blank
      let group = this.groupQName || "";
      let isElement = this.property.isElement == true ? "" : false;
      let isAbstract = this.property.isAbstract == true ? true : "";

      return `${this.xpath}\t${this.property.prefix}\t${this.property.name}\t${this.property.definition}\t${this.property.typeQName}\t${group}\t${isElement}\t${isAbstract}`;
    },

    updatedPath() {
      return Utils.updatePath(this.property, this.path);
    },

    updatedPathText() {
      let path = this.updatedPath;
      let labels = path.map( segment => segment.label );
      return labels.join("/");
    },

    xpath() {
      let path = this.updatedPath;
      let labels = path.map( segment => segment.label );
      return labels.filter( label => !label.endsWith("Abstract") && !label.endsWith("Type") ).join("/");
    }

  },

  methods: {

    async load(event, property) {

      this.$data.open = event.target.open;
      this.$data.loaded = false;

      if (event.target.open) {

        this.type = await property.type();

        if (this.type) {
          this.base = await this.type.base();
          // this.containedProperties = await this.type.contents.containedProperties();
        }

        if (property.groupQName) {
          this.group = await property.group();
        }

        this.namespace = await property.namespace();
        this.$data.loaded = true;

        if (this.type) {
          this.parents = await this.type.parents();
        }

        this.facets = await property.contents.facets();
        this.containedProperties = await property.contents.containedProperties();
        this.inheritedProperties = await property.contents.inheritedProperties();
        this.substitutions = await property.substitutions();
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