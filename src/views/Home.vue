
<template>
  <div>
    <p>NIEM Toolbox is a growing collection of capabilities to support NIEM modeling and development work.</p>

    <div class="card-group">

      <b-card
        v-for="card in cards" :key="card.title"
        :title="card.title"
        :img-src="require('@/assets/images/' + card.img.src)"
        :img-alt="card.img.alt"
        img-top class="text-center">

        <b-card-text>{{card.text}}</b-card-text>

        <b-list-group flush>
          <b-list-group-item v-for="link in card.links" :key="link.route">
            <b-link :to="link.route" :disabled="link.disabled" >{{link.text}}</b-link>
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
