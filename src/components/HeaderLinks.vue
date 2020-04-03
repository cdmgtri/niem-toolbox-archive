
<template>
  <div :id="toggleID" class="collapse navbar-collapse menu-links">
    <b-nav class="navbar-nav ml-auto">

      <b-nav-item :to="'/'" exact>Home</b-nav-item>
      <b-nav-item :to="'/about'">About</b-nav-item>
      <b-nav-item :to="'/version'">Version History</b-nav-item>


      <b-nav-item-dropdown text="gpburdell">
        <b-nav-item :to="'/account'">Account</b-nav-item>
        <b-nav-item :to="'/gpburdell/messages'">My messages</b-nav-item>
        <b-nav-item :to="'/gpburdell/models'">My models</b-nav-item>
        <b-nav-item :to="'/logout'">Log out</b-nav-item>

      </b-nav-item-dropdown>

    </b-nav>
  </div>
</template>

<script>
  export default {
    name: "HeaderLinks",
    props: [
      "toggleID"
    ]
  }
</script>