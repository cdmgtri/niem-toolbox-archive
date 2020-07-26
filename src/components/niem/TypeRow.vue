
<template>
  <div v-if="type">
    <b-card>
      <details v-on:toggle="load=true">
        <summary>
          <span>
            <!-- Row label -->
            <span v-if="label">{{ label }} </span>

            <!-- type summary component -->
            <strong><b-link :to="typeRoute">{{ type.qname }}</b-link></strong>

            <!-- base type -->
            <span v-if="type.baseQName && type.prefix != 'structures'">
              <small>
                (extends <b-link :to="baseRoute">{{type.baseQName}}</b-link>)
              </small>
            </span>

            <!-- copy button -->
            <copy-button v-if="map" label="Type | Base | Def" :text="cellsTypeBaseDefinition"/>
          </span>
        </summary>

        <div v-if="load==true" class="component-summary">

          <type-info :type="type" :xpath="xpath"/>

        </div>

      </details>
    </b-card>
    <br v-if="spacer"/>
  </div>
</template>

<script>

import Utils from "../../utils";
import CopySpan from "../CopySpan.vue";
import CopyButton from "../CopyButton.vue";
import PropertyRow from "./PropertyRow.vue";
import { Type } from "niem-model";

let TypeInstance = new Type();

export default {

  name: "TypeRow",

  props: {
    type: TypeInstance,
    parentXPath: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    spacer: {
      type: Boolean,
      default: false
    }
  },

  components: {
    // CopySpan,
    CopyButton,
    TypeInfo: () => import("./TypeInfo.vue")
    // PropertyRow
  },

  data() {

    let userKey = this.type ? this.type.userKey : null;
    let modelKey = this.type ? this.type.modelKey : null;
    let releaseKey = this.type ? this.type.releaseKey : null;
    let typeRoute = this.type ? Utils.getTypeRoute(this.type) : null;
    let baseRoute = this.type ? Utils.getTypeRoute({userKey, modelKey, releaseKey, prefix: this.type.basePrefix, name: this.type.baseName}) : "";

    return {

      load: false,

      map: this.$store.getters.options.map,
      subset: this.$store.getters.options.subset,

      xpath: this.parentXPath,

      userKey,
      modelKey,
      releaseKey,
      base: undefined,
      parents: [],
      facets: [],
      properties: [],
      typeRoute,
      baseRoute
    }
  },

  computed: {

    cellsTypeBaseDefinition() {
      return `${this.type.qname}\t${this.type.baseQName}\t${this.type.definition}`;
    },

  },

  methods: {

    async loadContents(event, type) {
      if (event.target.open) {
        if (type.baseQName && type.prefix != "structures") {
          this.base = await type.base();
        }

        this.parents = await type.parents();
        this.facets = await type.contents.facets();
        this.properties = await type.contents.containedProperties();

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