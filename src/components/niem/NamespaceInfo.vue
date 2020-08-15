
<template>
  <div v-if="namespace">

    <!-- Namespace source -->
    <field-value-table v-if="source" :object="source" label="Source" :links="[]"/>

    <!-- Word cloud of common property terms -->
    <word-cloud v-if="properties" :properties="properties" label="Common property terms in namespace" :open="true" :prefixes="[namespace.prefix]"/>

    <!-- Properties -->
    <object-list v-if="properties" :properties="properties" label="Properties" :listHeader="`Properties in namespace ${namespace.prefix}`" :open="false"/>

    <!-- Types -->
    <object-list v-if="types" :types="types" label="Types" :listHeader="`Types in namespace ${namespace.prefix}`" :open="false"/>

    <!-- Local Terms -->
    <local-term-table v-if="localTerms" :localTerms="localTerms" :open="false"/>

    <details v-if="dependents.count > 0">
      <summary>
        <h4 class="section">
          <span>Dependents on this namespace </span>
          <b-badge variant="info" pill>{{ dependents.count }}</b-badge>
        </h4>
      </summary>

      <b-card>

        <!-- Dependent substitutions -->
        <object-list v-if="dependents.substitutions" :properties="dependents.substitutions" label="Dependent substitution properties" :open="false"/>

        <!-- Dependent data properties -->
        <object-list v-if="dependents.dataProperties" :properties="dependents.dataProperties" label="Dependent data properties" :open="false"/>

        <!-- Dependent child types -->
        <object-list v-if="dependents.childTypes" :types="dependents.childTypes" label="Dependent child types" :open="false"/>

        <!-- TODO: Refactor into a subProperty table -->
        <details v-if="dependents.subProperties">
          <summary>
            <h4 class="section">
              <span>Dependent container types </span>
              <b-badge variant="info" pill>{{ dependents.subProperties.length }}</b-badge>
            </h4>
          </summary>
          <b-table :items="dependents.subProperties" :fields="['typeQName', 'propertyQName', 'min', 'max']"/>
        </details>

      </b-card>
    </details>

    <!-- TODO: Dependencies (uses of other namespaces) -->

  </div>
</template>

<script>

import FieldValueTable from "../FieldValueTable.vue";
import WordCloud from "../WordCloud.vue";

import { Namespace } from "niem-model";
import { data, NamespaceInstance, PropertyInstance, TypeInstance, LocalTermInstance } from "../../utils/index";

export default {

  name: "NamespaceInfo",

  props: {
    /** @type {NamespaceInstance} */
    namespace: {
      required: false,
      type: Namespace
    }
  },

  components: {
    FieldValueTable,
    WordCloud,
    LocalTermTable: () => import("./LocalTermTable.vue"),
    ObjectList: () => import("./ObjectList.vue")
  },

  data() {
    return {

      /** @type {PropertyInstance[]} */
      properties: undefined,

      /** @type {TypeInstance[]} */
      types: undefined,

      /** @type {LocalTermInstance[]} */
      localTerms: undefined,

      dependents: {
        count: undefined,
        substitutions: undefined,
        dataProperties: undefined,
        childTypes: undefined,
        subProperties: undefined
      }
    }
  },

  computed: {

    /**
     * @returns {Object<string, string>}
     */
    details() {
      return {
        "Prefix": this.namespace.prefix,
        "File Name": this.namespace.fileName,
        "Style": this.namespace.style,
        "URI": this.namespace.uri
      }
    },

    /**
     * @returns {Object<string, string>}
     */
    source() {
      if (!this.namespace.origin) return undefined;

      let source = {};
      for (let key of Object.keys(this.namespace.origin)) {
        if (this.namespace.origin[key]) {
          source[key] = this.namespace.origin[key];
        }
      }

      if (Object.keys(source).length == 0) return undefined;

      return source;
    }

  },

  async mounted() {
    this.properties = Object.freeze(await data.properties.find(this.$route.params));
    this.types = Object.freeze(await data.types.find(this.$route.params));
    this.localTerms = Object.freeze(await data.localTerms.find(this.$route.params));
    this.dependents = Object.freeze(await this.namespace.dependencies());
  }

}
</script>