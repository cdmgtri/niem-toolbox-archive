
<template>
  <div v-if="hasData == true">

    <details open>
      <summary>
        <h4 class="section">
          <span>Properties </span>
          <b-badge variant="info" pill>{{ containedProperties.length }}</b-badge>
        </h4>
      </summary>

      <p class="copyInstructions">
        Copy [
          <b-button variant="link" @click="copyLocal=true" class="options" :class="{active: copyLocal==true}">local</b-button> |

          <b-button variant="link" @click="copyLocal=false" class="options" :class="{active: copyLocal==false}">all</b-button>
        ] properties as

        <b-button variant="link" @click="copyMarkdownList()" v-b-tooltip.click.v-success="'Markdown list copied'">Markdown List</b-button> |

        <b-button variant="link" @click="copyMarkdownTable()" v-b-tooltip.click.v-success="'Markdown table copied'">Markdown Table</b-button> |

        <b-button variant="link" @click="copyExcel()" v-b-tooltip.click.v-success="'Excel cells copied'">Excel</b-button>
      </p>


      <!-- Inherited properties -->
      <div v-for="parentQName of parentQNames" :key="parentQName" class="ml-3 div-inherited">
        <details>
          <summary>
            <span>Properties inherited from <strong>{{ parentQName }} </strong></span>
            <b-badge variant="info" pill>{{ inheritedProperties[parentQName].length }}</b-badge>
          </summary>
          <object-row v-for="property of inheritedProperties[parentQName]" :key="property.qname" :property="property" :parentXPath="parentXPath"/>
        </details>
      </div>

      <!-- Contained properties -->
      <object-row v-for="property of containedProperties" :key="property.qname" :property="property" :parentXPath="parentXPath"/>
    </details>

    <br/>
  </div>
</template>

<script>

export default {

  name: "ContainedPropertiesList",

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
    ObjectRow: () => import("./ObjectRow.vue")
  },

  data() {
    return {
      hasData: false,
      copyLocal: true,
      containedProperties: [],
      inheritedProperties: {}
    }
  },

  computed: {
    parentQNames() {
      return Object.keys(this.inheritedProperties);
    },

    rows() {
      let rows = [];

      if (this.copyLocal == false) {
        for (let parentQName of this.parentQNames) {
          rows = rows.concat( this.inheritedProperties[parentQName] );
        }
      }

      rows = rows.concat( this.containedProperties );
      return rows;
    }
  },

  methods: {

    copied() {
      setTimeout( () => {
        this.$root.$emit("bv::hide::tooltip");
      }, 600)
    },

    copyMarkdownList() {
      let header = `### ${this.type.qname}\n\n`;
      let text = this.rows.map( property => `- ${property.qname}` ).join("\n");
      this.$copyText(header + text);
      this.copied();
    },

    copyMarkdownTable() {
      let header = "Type | Property\n";
      let separator = "---- | --------\n";
      let text = this.rows.map( property => `${this.type.qname} | ${property.qname}` ).join("\n");
      this.$copyText(header + separator + text);
      this.copied();
    },

    copyExcel() {
      let header = "Type\tProperty\n";
      let text = this.rows.map( property => `${this.type.qname}\t${property.qname}` ).join("\n");
      this.$copyText(header + text);
      this.copied();
    }

  },

  async mounted() {

    if (!this.type) return;

    this.containedProperties = await this.type.contents.containedProperties();
    this.inheritedProperties = await this.type.contents.inheritedProperties();

    if (this.containedProperties.length > 0 || Object.keys(this.inheritedProperties).length > 0) {
      this.hasData = true;
    }
  }

}
</script>

<style scoped>

button.options.active {
  text-decoration: underline;
}

.div-inherited {
  padding-bottom: 6px !important;
}

</style>