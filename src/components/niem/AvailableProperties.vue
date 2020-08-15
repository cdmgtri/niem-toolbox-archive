
<template>
  <div v-if="type && count > 0">

    <details open>
      <summary>
        <h4 class="section">
          <span>Available properties</span>
          <b-badge variant="info" pill>{{ count }}</b-badge>

          <!-- Options -->
          <b-dropdown id="copyAll" variant="link" size="sm" text="options" class="font-weight-light">

            <!-- Display options -->
            <b-dropdown-group header="Display results as">
              <b-form-radio-group stacked plain variant="info" v-model="option" :options="['list', 'table']"/>
            </b-dropdown-group>

            <b-dropdown-divider/>

            <!-- Copy options -->
            <b-dropdown-group header="Optional fields for copy">
              <b-form-checkbox size="sm" v-model="optionDataType">Data type</b-form-checkbox>
              <b-form-checkbox size="sm" v-model="optionDefinition">Definition</b-form-checkbox>
            </b-dropdown-group>

          </b-dropdown>
        </h4>
      </summary>

      <p class="font-weight-light pl-3">Copy all available properties for
        <!-- Copy Markdown list -->
        <b-button variant="link" @click="copyMarkdownList()" v-b-tooltip.click.v-success="'Markdown list copied'">Markdown List</b-button> |

        <!-- Copy Markdown table -->
        <b-button variant="link" @click="copyMarkdownTable()" v-b-tooltip.click.v-success="'Markdown table copied'">Markdown Table</b-button> |

        <!-- Copy Excel -->
        <b-button variant="link" @click="copyExcel()" v-b-tooltip.click.v-success="'Excel cells copied'">Excel</b-button>
      </p>

      <span v-for="group of availableGroups" :key="group.qname">
        <b-card v-if="option=='list'">
          <!-- User has selected option to view available properties as a list -->
          <details :open="group.isDefaultType && group.properties.length < 25">
            <summary>
              <span v-html="group.label"/>
              <b-badge variant="info" pill>{{ group.properties.length }}</b-badge>
              <b-badge variant="secondary" pill v-if="group.isDefaultType">default</b-badge>
            </summary>


            <p class="font-weight-light pl-3 pt-1">Copy properties for
              <!-- Copy Markdown list -->
              <b-button variant="link" @click="copyMarkdownList(group.qname)" v-b-tooltip.click.v-success="'Markdown list copied'">Markdown List</b-button> |

              <!-- Copy Markdown table -->
              <b-button variant="link" @click="copyMarkdownTable(group.qname)" v-b-tooltip.click.v-success="'Markdown table copied'">Markdown Table</b-button> |

              <!-- Copy Excel -->
              <b-button variant="link" @click="copyExcel(group.qname)" v-b-tooltip.click.v-success="'Excel cells copied'">Excel</b-button>
            </p>

            <property-row v-for="property of group.properties" :key="property.qname" :property="property" :parentXPath="parentXPath"/>

          </details>
        </b-card>

        <!-- User has selected option to view available properties as a subProperty table -->
        <sub-property-table v-else :type="group.type"/>
      </span>

    </details>

    <br/>
  </div>
</template>

<script>

import { data } from "../../utils/index";
import { Property } from "niem-model";
import SubPropertyTable from "./SubPropertyTable.vue";


export default {

  name: "AvailableProperties",

  props: {
    type: {
      type: Object
    },
    parentXPath: {
      type: String,
      required: false
    }
  },

  components: {
    PropertyRow: () => import("./PropertyRow.vue"),
    SubPropertyTable
  },

  data() {
    return {

      /** @type {"list"|"table"} */
      option: "list",

      /** @type { {qname: String, label: String, isDefaultType: Boolean, type: Object, properties: []}[] } */
      availableGroups: [],

      count: 0,

      optionDataType: false,
      optionDefinition: false

    }
  },

  methods: {

    copy(text) {
      this.$copyText(text);
      setTimeout( () => this.$root.$emit("bv::hide::tooltip"), 600);
    },

    /**
     * Filter availableGroups by qname, if given.
     */
    selectedGroups(qname) {
      return qname ? this.availableGroups.filter( group => group.qname == qname ) : this.availableGroups;
    },

    copyMarkdownList(qname) {
      let text = "";

      for (let group of this.selectedGroups(qname)) {
        // Copy header
        text += `### ${group.qname}\n\n`;

        for (let property of group.properties) {
          text += `- ${property.qname}`;
          if (this.optionDataType) text += ` (${property.typeQName || 'abstract'})`;
          if (this.optionDefinition) text += ` - ${property.definition}`;
          text += "\n";
        }

        text += "\n";
      }

      this.copy(text);
    },

    /**
     * @param {String} qname
     * @param {"markdown"|"excel"} style
     */
    copyTable(qname, style) {

      let delimiter = (style == "markdown") ? " | " : "\t";

      // Set the table header
      let text = `Type ${delimiter} Property`;
      let columns = 2;

      if (this.optionDataType) {
        text += ` ${delimiter} Data Type`;
        columns++;
      }

      if (this.optionDefinition) {
        text += ` ${delimiter} Definition`;
        columns++;
      }

      text += "\n";

      if (style == "markdown") {
        text += " --- |".repeat(columns) + "\n";
      }

      for (let group of this.selectedGroups(qname)) {
        for (let property of group.properties) {
          text += `${group.type.qname}${delimiter}${property.qname}`;
          if (this.optionDataType) text += `${delimiter}${property.typeQName || '(abstract)'}`;
          if (this.optionDefinition) text += `${delimiter}${property.definition}`;
          text += "\n";
        }
      }

      this.copy(text);

    },

    copyMarkdownTable(qname) {
      return this.copyTable(qname, "markdown");
    },

    copyExcel(qname) {
      return this.copyTable(qname, "excel");
    },

    /**
     * Adds the parameters bound together as an object to the given available groups array if
     * the properties array exists and has values.  Also updates the count with the number of
     * newly-added properties.
     *
     * @param {String} qname
     * @param {String} label - Can include html formatted text
     * @param {} type - The type object that contains the given properties
     * @param {[]} properties
     */
    pushGroup(qname, label, type, properties) {
      if (properties && properties.length > 0) {
        let isDefaultType = this.type.qname == type.qname;
        this.availableGroups.push({qname, label, type, isDefaultType, properties});
        this.count += properties.length;
      }
    }


  },

  async mounted() {

    let { userKey, modelKey, releaseKey } = this.type;

    // Properties inherited from each of the given type's parent types
    let parentPropertiesBundle = await this.type.contents.inheritedProperties();

    for (let [qname, properties] of Object.entries(parentPropertiesBundle)) {
      let label = `Properties inherited from <strong>${qname}</strong>`;
      let parent = await data.types.get({userKey, modelKey, releaseKey, qname});
      this.pushGroup(qname, label, parent, properties);
    }


    // Properties contained in the given type
    let label = `Properties contained in type <strong>${this.type.qname}</strong>`;
    let containedProperties = await this.type.contents.containedProperties();
    this.pushGroup(this.type.qname, label, this.type, containedProperties);


    // Properties contained in augmentations for this type
    if (this.type.style == "object" || this.type.style == "association") {
      let augmentationPoint = await this.type.subProperties.augmentationPoint();

      if (augmentationPoint) {
        let augmentations = await augmentationPoint.substitutions();
        augmentations = augmentations.sort(Property.sortByQName);

        for (let augmentation of augmentations) {
          let label = `Properties available via <strong>${augmentation.qname}</strong>`;
          let type = await augmentation.type();
          let properties = await augmentation.contents.containedProperties();
          this.pushGroup(augmentation.qname, label, type, properties);
        }
      }
    }


  }

}
</script>

<style scoped>

ul.dropdown-menu.show {
  padding: 10px !important;
}

ul {
  padding: 10px !important;
}

</style>