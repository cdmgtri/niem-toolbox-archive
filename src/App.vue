
<template>
  <div class="container-fluid">
    <Header/>
    <router-view :key="$route.fullPath"/>
    <Footer/>
  </div>
</template>

<script>
  import Header from "./components/menu/Header.vue";
  import Footer from "./components/menu/Footer.vue";

  export default {


    components: {
      Header,
      Footer
    }

}

</script>