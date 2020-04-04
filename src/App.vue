
<template>
  <div class="container-fluid">
    <Header/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
  import Header from "./components/Header.vue";
  import Footer from "./components/Footer.vue";
  import NIEMModel from "niem-model";

  let { NIEM } = NIEMModel;

  export default {


    components: {
      Header,
      Footer
    },

    data() {
      return {
        worker: null,
        niem: new NIEM(),
        release: null
      }
    },

    mounted() {
      this.$store.dispatch("loadRelease", {userKey: "niem", modelKey: "model", releaseKey: "5.0"});
    }

}

</script>