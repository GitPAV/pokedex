<template>
  <div class="container flex-center">

    <Navbar />

    <div id="List-container">
      <h1 class="title">Pokédex: <span class="italic">1st Gen</span></h1>

      <!-- Search & reset -->
      <div class="search-reset reset-focus-style flex-center">
        <input @input="filterList()" type="text" v-model="search" placeholder="Search pokemon.."/>
        <button v-if="search.length > 0" @click="resetSearch()">
          <img src="../assets/x-icon.svg" alt="reset button">
        </button>
      </div>

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

import { Pokemon, PokemonResult } from '../static/pokemons_interface'

export default Vue.extend({
  data():{search:string, pokemonList:Pokemon, filteredList:PokemonResult[]} {
    return {
      search: '',
      pokemonList: <Pokemon>{},
      filteredList: []
    }
  },
  
  methods: {
    filterList():void {
      this.filteredList = this.pokemonList.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(this.search.toLowerCase())
      );

      // Prevent filteredList to be full but not displayed
      if(this.search.length == 0) this.filteredList = [];
    },

    resetSearch():void {
      this.filteredList = [];
      this.search = '';
    },

    // Needed for filtered list to get the right ID
    pokemonIdFromURL(url:string):string {
      let result = url.split('/');
      return result[result.length - 2]
    }
  },

  // Pokemon list api call
  async fetch():Promise<void> {
    this.pokemonList = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=151'
    ).then(res => res.json())
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

.italic {
    font-style: italic;
}

.reset-focus-style:active, .reset-focus-style:focus {
  border: none;
  outline: none;
}

/* Regular class & id, sorted by top to bottom */
.container {
  flex-direction: column;
  text-align: center;
}

#List-container {
  margin-top: 3.7em;
  width: 100%;
}

.search-reset {
  margin-top: .5em;
  margin-bottom: .5em;
}

.search-reset button {
  border: none;
  background-color: white;
  display: flex;
  align-items: center;
}

.search-reset button:hover {
  cursor: pointer;
}

.search-reset img {
  width: 1em;
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

.pokemon-item a {
  color: black;
  text-decoration: unset;
}

.pokemon-item a:hover {
  color: #456982;
}

.pokemon-item img {
  width: 75%;
}

.pokemon-item img:hover {
  transform: scale(.92);
}

.pokemon-item p {
  font-size: 1.6em;
  font-style: italic;
}

/* Media querry */
@media screen and (max-width: 480px) {
  h1 {
    font-size: 1.5em;
  }

  .pokemon-item {
    width: 40%;
  }
  
  .pokemon-item p {
    font-size: 1em;
  }
}
</style>
