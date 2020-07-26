
<template>
  <div v-if="property">
    <b-card>
      <details v-on:toggle="load=true">
        <summary>
          <span>
            <!-- Row label -->
            <span v-if="label">{{ label }} </span>

            <!-- property summary component -->
            <strong><b-link :to="propertyRoute">{{ property.qname }} </b-link></strong>

            <!-- type -->
            <span v-if="property.typeQName"><b-link :to="typeRoute">({{property.typeQName}})</b-link></span>
            <span v-else>(abstract)</span>

            <!-- copy button -->
            <copy-button v-if="options.map == true" label="Path + CR spreadsheet fields" :text="cellsPathCR"/>
            <!-- <copy-button v-if="map" label="Property | Type | Def" :text="cellsPropertyTypeDefinition"/> -->
          </span>
        </summary>

        <div v-if="load==true" class="component-summary">

          <property-info :property="property" :xpath="xpath"/>

        </div>

      </details>
    </b-card>

    <br v-if="spacer==true"/>

  </div>
</template>

<script>

import { mapGetters } from "vuex";
import { Property } from "niem-model";
import Utils from "../../utils";
import CopyButton from "../CopyButton.vue";

export default {

  name: "PropertyRow",

  props: {
    property: Property,
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
    PropertyInfo: () => import("./PropertyInfo.vue")
  },

  data() {
    let { userKey, modelKey, releaseKey, typePrefix, typeName } = this.property || ["", "", "", "", ""];

    return {
      load: false,
      xpath: Utils.updateXPath(this.parentXPath, this.property),
      propertyRoute: Utils.getPropertyRoute(this.property || {}),
      typeRoute: Utils.getTypeRoute({userKey, modelKey, releaseKey, prefix: typePrefix, name: typeName })
    }
  },

  computed: {

    ...mapGetters(["options"]),

    cellsPropertyTypeDefinition() {
      return `${this.property.qname}\t${this.property.typeQName}\t${this.property.definition}`;
    },

    cellsPathCR() {
      // Leave spreadsheet-default values blank
      let group = this.property.groupQName || "";
      let isElement = this.property.isElement == true ? "" : false;
      let isAbstract = this.property.isAbstract == true ? true : "";

      return `${this.xpath}\t${this.property.prefix}\t${this.property.name}\t${this.property.definition}\t${this.property.typeQName}\t${group}\t${isElement}\t${isAbstract}`;
    }

  },

  methods: {

    copy(text) {
      this.$copyText(text)
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

</style>
