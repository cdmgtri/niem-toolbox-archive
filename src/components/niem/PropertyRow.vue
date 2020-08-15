
<template>
  <object-row v-if="property" :definition="property.definition" :label="label" :spacer="spacer">

    <template #header>

      <!-- Property qname -->
      <strong><b-link :to="propertyRoute">{{ property.qname }}</b-link></strong>

      <small>
        <!-- (type qname) -->
        <span v-if="property.typeQName">
          (type <b-link :to="typeRoute">{{ property.typeQName }}</b-link>)
        </span>

        <!-- (abstract) [substitution count badge] -->
        <span v-else>
          <span> (abstract)</span>
          <b-badge v-if="substitutions.length > 0" variant="secondary" pill>
            {{ substitutions.length }} substitution<span v-if="substitutions.length>1">s</span>
          </b-badge>
        </span>
      </small>

      <!-- copy button -->
      <copy-button v-if="options.map == true" label="Path + CR spreadsheet fields" :text="cellsPathCR"/>
      <!-- <copy-button v-if="map" label="Property | Type | Def" :text="cellsPropertyTypeDefinition"/> -->

    </template>

    <template #details>
      <ul>
        <li v-if="parentXPath && xpath">
          <!-- Current xpath -->
          <span class="text-muted">XPath: <small class="text-break text-monospace">
            <copy-span :text="xpath" label="XPath"/></small>
          </span>
        </li>
        <li v-if="property.groupQName">
          <!-- Substitution group -->
          <span class="text-muted">Substitutes for property </span>
          <b-link :to="groupRoute">{{ property.groupQName }}</b-link>
        </li>
      </ul>

      <!-- Contents (substitutions, codes, or available properties -->
      <object-contents :property="property" :xpath="xpath"/>

    </template>
  </object-row>

</template>

<script>

import { mapGetters } from "vuex";
import { data, updateXPath } from "../../utils/index";
import CopyButton from "../CopyButton.vue";
import CopySpan from "../CopySpan.vue";
import ObjectRow from "./ObjectRow.vue";

export default {

  name: "PropertyRow",

  props: {
    property: {
      type: Object
    },
    parentXPath: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    spacer: {
      // Trailing line break following the row
      type: Boolean,
      default: false
    }
  },

  components: {
    CopyButton,
    CopySpan,
    ObjectContents: () => import("./ObjectContents.vue"),
    ObjectRow
  },

  data() {
    let {userKey, modelKey, releaseKey} = this.property;

    return {
      // Prevents the property detail templates from invisibly loading if the row hasn't been expanded
      load: false,
      xpath: updateXPath(this.parentXPath, this.property),

      propertyRoute: data.properties.route(this.property),
      typeRoute: data.types.route({userKey, modelKey, releaseKey, qname: this.property.typeQName}),
      groupRoute: data.properties.route({userKey, modelKey, releaseKey, qname: this.property.groupQName}),

      substitutions: []
    }
  },

  computed: {

    ...mapGetters(["options"]),

    cellsPropertyTypeDefinition() {
      if (!this.property) return;
      return `${this.property.qname}\t${this.property.typeQName}\t${this.property.definition}`;
    },

    cellsPathCR() {

      if (!this.property) return "";

      // Leave spreadsheet-default values blank
      let group = this.property.groupQName || "";
      let isElement = this.property.isElement == true ? "" : false;
      let isAbstract = this.property.isAbstract == true ? true : "";

      return `${this.xpath}\t${this.property.prefix}\t${this.property.name}\t${this.property.definition}\t${this.property.typeQName}\t${group}\t${isElement}\t${isAbstract}`;
    }

  },

  async mounted() {
    if (this.property.isAbstract) {
      this.substitutions = await this.property.substitutions();
    }
  }

}

</script>

<style scoped>

div.component-summary {
  padding-top: 10px;
  padding-left: 18px;
}

ul {
  padding-left: 18px;
}

</style>
