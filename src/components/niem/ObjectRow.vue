
<template>
  <div v-if="property || type || namespace">
    <b-card>
      <details v-on:toggle="load=true">
        <summary>

          <!-- Row label -->
          <span v-if="label">{{ label }} </span>

          <!-- Label for a property row -->
          <span v-if="property">

            <!-- property summary component -->
            <strong><b-link :to="propertyRoute">{{ property.qname }}</b-link></strong>

            <!-- type -->
            <small>
              <span v-if="property.typeQName"> (type <b-link :to="typeRoute">{{property.typeQName}}</b-link>)</span>
              <span v-else> (abstract)</span>
            </small>

            <!-- copy button -->
            <copy-button v-if="options.map == true" label="Path + CR spreadsheet fields" :text="cellsPathCR"/>
            <!-- <copy-button v-if="map" label="Property | Type | Def" :text="cellsPropertyTypeDefinition"/> -->
          </span>

          <!-- Label for a type row -->
          <span v-else-if="type">

            <!-- type summary component -->
            <strong><b-link :to="typeRoute">{{ type.qname }}</b-link></strong>

            <!-- base type -->
            <span v-if="type.baseQName && type.prefix != 'structures'">
              <small>
                (extends <b-link :to="baseRoute">{{type.baseQName}}</b-link>)
              </small>
            </span>

          </span>

          <!-- Label for a namespace row -->
          <span v-else-if="namespace">
            <strong><b-link :to="namespaceRoute">{{ namespace.fileName }}</b-link></strong>
            <span v-if="namespace.fileName != namespace.prefix"> ({{ namespace.prefix }})</span>
          </span>

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
    PropertyInfo: () => import("./PropertyInfo.vue"),
    TypeInfo: () => import("./TypeInfo.vue"),
    NamespaceInfo: () => import("./NamespaceInfo.vue")
  },

  data() {

    let { userKey, modelKey, releaseKey } = this.property || this.type || ["", "", ""];
    let { propertyRoute, typeRoute, baseRoute, namespaceRoute } = ["", "", "", ""];

    if (this.property) {
      propertyRoute = Utils.getPropertyRoute(this.property);
      typeRoute = Utils.getTypeRoute({userKey, modelKey, releaseKey, prefix: this.property.typePrefix, name: this.property.typeName});
    }

    if (this.type) {
      typeRoute = Utils.getTypeRoute(this.type);
      baseRoute = Utils.getTypeRoute({userKey, modelKey, releaseKey, prefix: this.type.basePrefix, name: this.type.baseName});
    }

    if (this.namespace) {
      namespaceRoute = Utils.getNamespaceRoute(this.namespace);
    }

    return {
      load: false,
      xpath: Utils.updateXPath(this.parentXPath, this.property),
      propertyRoute,
      typeRoute,
      baseRoute,
      namespaceRoute
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
