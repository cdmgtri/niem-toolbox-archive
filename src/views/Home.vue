
<template>
  <div>
    <p>The NIEM Assistant is part of a multi-year effort designed to provide better modeling and tool support for NIEM practitioners.  Features will be added incrementally.  The key goal is to support common processes for NIEM model and message development.</p>

    <div class="alert alert-info alert-dismissible fade show">
      <h5>Latest Release: January 26, 2020</h5>
      <p>Initial landing page mockup.  See <router-link to="/version">Version History</router-link> for more.</p>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="card-group">

      <b-card
        v-for="card in cards" :key="card.title"
        :title="card.title"
        :img-src="require('@/assets/images/' + card.img.src)"
        :img-alt="card.img.alt"
        img-top>

        <b-card-text>{{card.text}}</b-card-text>

        <b-list-group flush>
          <b-list-group-item v-for="link in card.links" :key="link.route">
            <router-link :to="link.route">{{link.text}}</router-link>
          </b-list-group-item>
        </b-list-group>

      </b-card>

    </div>

  </div>
</template>

<script>

import cards from "../assets/data/home-menu-cards.json";

export default {
  name: "Home",

  data: () => {
    return {
      cards,
      publicPath: process.env.BASE_URL
    }
  }

}
</script>

<style scoped>

.card-img-top {
  width: 100%;
  height: 15vw;
  object-fit: contain;
  margin-top: 10px;
}

.card-group {
  padding-bottom: 50px;
}

</style>
