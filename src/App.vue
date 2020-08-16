
<template>
  <div class="container-fluid" @scroll="scrollFunction">

    <Header/>

    <!-- Display alert while loading release data -->
    <div v-if="storeLoaded==false">
      <b-alert show variant="info">
        <h4 class="alert-heading">
          <b-spinner small/>
          <span> {{ loadingProgress}} </span>
        </h4>
        <p>This tool currently loads all selected releases into memory.</p>
      </b-alert>
    </div>

    <b-button id="top" @click="top()" v-if="showTopButton" pill variant="outline-secondary">
      <i class="fa fa-angle-up" aria-hidden="true"/>
    </b-button>

    <keep-alive>
      <router-view :key="$route.fullPath" v-if="storeLoaded==true"/>
    </keep-alive>

    <Footer/>

  </div>
</template>

<script>
  import $ from "jquery";
  import Header from "./components/menu/Header.vue";
  import Footer from "./components/menu/Footer.vue";

  export default {

    components: {
      Header,
      Footer
    },

    data() {
      return {
        showTopButton: false
      }
    },

    computed: {

      storeLoaded() {
        return this.$store.state.storeLoaded;
      },

      loadingProgress() {
        return this.$store.state.loadingProgress;
      }

    },

    methods: {

      scrollFunction() {
        this.showTopButton = window.scrollY > 0;
      },

      top() {
        $(document).scrollTop(0);
      },

    },

    async mounted() {

      // Attach the scroll-to-top button
      this.$nextTick( function() {
        $(document).bind("scroll", this.scrollFunction);
      });

      // Load release data
      setTimeout( async function() {
        await this.$store.dispatch("load");
      }.bind(this), 100);

    }

}

</script>

<style scoped>

#top {
  position: fixed;
  /* bottom: 60px; */
  bottom: 50%;
  left: 15px;
  z-index: 99;
}

</style>

<style>

input:focus {
  border-color: rgba(130, 138, 145, 0.5) !important;
  box-shadow: 0 0 0 0.1rem rgba(130, 138, 145, 0.5) !important;
}

summary {
  color: black;
  padding: 2px 0;
}

summary:focus {
  outline: 0 !important;
  color: #17A2B8;
}

a {
  color: #0359b6;
}

a:focus {
  outline: 0;
  color: #17A2B8;
}

.btn-link {
  padding: 1px !important;
  margin-top: -3px !important;
}

div.card-body {
  padding: 6px 0 6px 15px;
}

h4.section {
  display: inline-block;
  padding-bottom: 2px;
}

span.badge {
  margin: 0 8px;
}

</style>