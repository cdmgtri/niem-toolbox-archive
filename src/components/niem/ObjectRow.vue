
<template>
  <div v-if="property || type || namespace">
    <b-card>
      <details v-on:toggle="load=true">
        <summary>

          <!-- Row label -->
          <span v-if="label">{{ label }} </span>

          <property-row-header v-if="property" :property="property"/>
          <type-row-header v-if="type" :type="type"/>
          <namespace-row-header v-if="namespace" :namespace="namespace"/>

          <!-- copy button -->
          <copy-button v-if="property && options.map == true" label="Path + CR spreadsheet fields" :text="cellsPathCR"/>
          <!-- <copy-button v-if="map" label="Property | Type | Def" :text="cellsPropertyTypeDefinition"/> -->

        </summary>

        <div v-if="load==true" class="component-summary">

          <property-info v-if="property" :property="property" :xpath="xpath"/>
          <type-info v-if="type" :type="type" :xpath="xpath"/>
          <namespace-info v-if="namespace" :namespace="namespace"/>

        </div>

      </details>
    </b-card>

    <br v-if="spacer==true"/>

  </div>
</template>

<script>

import { mapGetters } from "vuex";
import Utils from "../../utils";
import CopyButton from "../CopyButton.vue";
import PropertyRowHeader from "./PropertyRowHeader.vue";
import TypeRowHeader from "./TypeRowHeader.vue";
import NamespaceRowHeader from "./NamespaceRowHeader.vue";

export default {

  name: "ObjectRow",

  props: {
    property: {
      type: Object
    },
    type: {
      type: Object
    },
    namespace: {
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
    PropertyRowHeader,
    TypeRowHeader,
    NamespaceRowHeader,
    PropertyInfo: () => import("./PropertyInfo.vue"),
    TypeInfo: () => import("./TypeInfo.vue"),
    NamespaceInfo: () => import("./NamespaceInfo.vue")
  },

  data() {

    return {
      load: false,
      xpath: Utils.updateXPath(this.parentXPath, this.property),
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

  }

}

</script>

<style scoped>

div.component-summary {
  padding-top: 10px;
  padding-left: 18px;
}

</style>
