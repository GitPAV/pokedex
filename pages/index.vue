<template>
  <div class="container flex-center">

    <Navbar />

    <div id="List-container">
      <h1 class="title">Pokédex</h1>

      <!-- Search & reset -->
      <input @input="filterList()" type="text" v-model="search" placeholder="Search title.."/>
      <button @click="resetSearch()">Reset search</button>

      <!-- Filtered list -->
      <div v-if="filteredList.length > 0 && search.length > 0">
        <div class="pokemon-list flex-center">
          <div 
            class="pokemon-item flex-center" 
            v-for="pokemon of filteredList" :key="pokemon.name"
          >
            <nuxt-link :to="{ path: 'pokemon_detail/' + pokemon.name }">
              <img 
                :src="require('assets/official-artwork/' + pokemonIdFromURL(pokemon.url) + '.png')" 
                alt="pokemon official illustration" loading="lazy"
              >
              <p>{{ pokemon.name }}</p>
            </nuxt-link>
          </div>
        </div>
      </div>

      <!-- Full list -->
      <div v-if="filteredList.length == 0 && search.length == 0">
        <p v-if="$fetchState.pending">Fetching pokemons...</p>
        <p v-else-if="$fetchState.error">The pokemon run away !(An error occurred) :(</p>
        <div v-else class="pokemon-list flex-center">
            <div 
              class="pokemon-item flex-center" 
              v-for="(pokemon, index) of pokemonList.results" :key="pokemon.name"
            >
              <nuxt-link :to="{ path: 'pokemon_detail/' + pokemon.name }">
                <img :src="require('assets/official-artwork/' + (index + 1) + '.png')" alt="" loading="lazy">
                <p>{{ pokemon.name }}</p>
              </nuxt-link>
            </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { Pokemons } from '../static/pokemons_interface'

export default Vue.extend({
  data() {
    return {
      search: '',
      pokemonList: {} as Pokemons,
      filteredList: [] as any
    }
  },

  methods: {
    filterList() {
      this.filteredList = this.pokemonList.results.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(this.search.toLowerCase())
      })

      // Prevent filteredList to be full but not displayed
      if(this.search.length == 0) this.filteredList = []
    },

    resetSearch() {
      this.filteredList = []
      this.search = ''
    },

    pokemonIdFromURL(url:string) {
      let result = url.split('/')
      return result[result.length - 2]
    }
  },

  // Pokemon list api call
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
  margin-top: 2.5em;
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
</style>
