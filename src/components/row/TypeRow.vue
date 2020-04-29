
<template>
  <div>
    <b-card>
      <details v-on:toggle="loadContents($event, type)">
        <summary>
          <span>
            <!-- type summary component -->
            <strong><b-link :to="typeRoute">{{ type.qname }} </b-link></strong>

            <!-- base type -->
            <span v-if="type.baseQName && type.prefix != 'structures'">
              <b-link :to="baseRoute">({{type.baseQName}})</b-link>
            </span>

            <!-- copy button -->
            <copy-button v-if="map" label="Type | Base | Def" :text="cellsTypeBaseDefinition"/>
          </span>
        </summary>

        <div class="component-summary">

          <b-row>
            <b-col cols="11">
              <!-- Definition -->
              <p><copy-span :label="'Definition'" :text="type.definition"/></p>
            </b-col>
          </b-row>

          <!-- User-traversed path to component -->
          <component-path-links :path="path"/>
          <br v-if="path.length > 0"/>

          <!-- Base of type's type -->
          <div v-if="base">
            <h4>Base type</h4>
            <type-row :type="base" :path="updatedPath"/>
            <br/>
          </div>

          <div v-if="contentLength > 0">

            <!-- Contents header and badge -->
            <strong class="contents-header">{{ contentStyle }} </strong>
            <b-badge variant="info" pill>{{ contentLength }}</b-badge>
            <br/><br/>

            <div v-if="properties">
              <!-- sub-properties -->
              <property-row v-for="subProperty of properties" :key="subProperty.qname" :property="subProperty" :path="updatedPath" :map="map" :subset="subset"/>
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
import ComponentPathLinks from "../ComponentPathLinks.vue";
import PropertyRow from "./PropertyRow.vue";
import { Type } from "niem-model";

export default {

  name: "TypeRow",

  props: {
    type: Type,
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
    PropertyRow
  },

  data() {
    let { userKey, modelKey, releaseKey } = this.type;

    return {
      userKey,
      modelKey,
      releaseKey,
      base: undefined,
      contentStyle: undefined,
      contentLength: -1,
      facets: undefined,
      properties: undefined,
      typeRoute: Utils.getTypeRoute(this.type),
      baseRoute: Utils.getTypeRoute({userKey, modelKey, releaseKey, prefix: this.type.basePrefix, name: this.type.baseName })
    }
  },

  computed: {

    cellsTypeBaseDefinition() {
      return `${this.type.qname}\t${this.type.baseQName}\t${this.type.definition}`;
    },

    updatedPath() {
      return Utils.updatePath(this.type, this.path);
    },

  },

  methods: {

    async loadContents(event, type) {
      if (event.target.open) {
        let contents = await type.contents();

        if (type.baseQName && type.prefix != "structures") {
          this.base = await type.base();
        }

        if (contents.base) {
          delete contents.base;
        }
        this.contentStyle = Object.keys(contents)[0];
        this.contentLength = contents[this.contentStyle].length;
        this.facets = contents.facets;
        this.properties = contents.properties;

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
    }

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