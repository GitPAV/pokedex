<template>
  <div class="container flex-center">
    <Navbar />
    <div id="List-container">
      <h1 class="title">Pokédex</h1>

      <p v-if="$fetchState.pending">Fetching pokemons...</p>
      <p v-else-if="$fetchState.error">The pokemon run away !(An error occurred) :(</p>
      <div class="pokemon-list flex-center" v-else>
          <div class="pokemon-item flex-center" v-for="(post, index) of pokemonList.results" :key="post.name">
            <p>{{ pokemonList.length }}</p>
            <img :src="require('assets/official-artwork/' + (index + 1) + '.png')" alt="">
            <p>{{ post.name }}</p>
          </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      pokemonList: Array,
    }
  },
  methods: {
  },

  // Pokemon api call
  async fetch() {
    this.pokemonList = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=151'
    ).then(res => res.json())
    console.log(this.pokemonList)
  }

})
</script>

<style>
/* Utilities class */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Regular class & id, sorted by top to bottom */
.container {
  flex-direction: column;
  text-align: center;
}

#List-container {
  margin-top: 100px;
  width: 100%;
}

.pokemon-list {
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
}

.pokemon-item {
  width: 30%;
  flex-direction: column;
  margin: 15px 0 15px 0;
}

.pokemon-item img {
  width: 75%;
}

.pokemon-item p {
  font-size: 1.6em;
  font-style: italic;
}

/* .pokemon-item img:hover {
  transform: scale(.95);
} */
</style>
