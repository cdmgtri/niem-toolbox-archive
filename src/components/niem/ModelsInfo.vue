
<template>
  <div v-if="loaded">
    <b-list-group>
      <b-list-group-item v-for="model in models" :key="model.modelKey">
        <details open>
          <summary>
            <h4 class="section">{{ model.modelKey }}</h4>
          </summary>
          <releases-info :userKey="userKey" :modelKey="model.modelKey"/>
        </details>
        <br/>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>

import { data } from "../../utils/index";
import ReleasesInfo from "./ReleasesInfo.vue";

export default {

  name: "ModelsInfo",

  props: {
    userKey: { type: String, required: true }
  },

  components: {
    ReleasesInfo
  },

  data() {
    return {
      models: [],
      loaded: false,
    }
  },

  async mounted() {
    this.models = await data.models.find({userKey: this.userKey});
    this.loaded = true;
  }

}

</script>
