
<template>
  <div class="container-fluid" @scroll="scrollFunction">
    <Header/>
    <b-button id="top" @click="top()" v-if="showTopButton" pill variant="outline-secondary">
      <i class="fa fa-angle-up" aria-hidden="true"/>
    </b-button>
    <router-view :key="$route.fullPath"/>
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

    methods: {

      scrollFunction() {
        this.showTopButton = window.scrollY > 0;
      },

      top() {
        $(document).scrollTop(0);
      },

    },

    mounted() {
      this.$nextTick( function() {
        $(document).bind("scroll", this.scrollFunction);
      })
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
  margin:
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

</style>