<template>
  <div class="navbar">
    <nuxt-link to="/">
      <img src="../assets/pokeball.png" alt="pokeball home icon">
    </nuxt-link>

    <div class="pokemon-team">
      <div class="team-member" v-for="(pokemon, index) of this.$store.state.list" :key="index">
        <nuxt-link to="/">
          <img 
            :src="require('../assets/official-artwork/' + pokemon + '.png')" 
            alt="illustration of pokemon in the team"
            class="pokemon-team-img"
          >
        </nuxt-link>
        <button @click="removePokemon(index)" class="remove-pokemon reset-focus-style">
          <img src="../assets/x-icon.svg" alt="">
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {}
  },

  methods: {
    removePokemon(id:number) {
      this.$store.commit('remove', id)
    }
  }
})
</script>

<style>
.navbar {
  width: 100%;
  height: 3em;
  background-color: white;
  box-shadow: 0px 2px 10px #e0e0e0;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
}

.navbar a {
  display: flex;
  margin-left: 1em;
}

.navbar a img {
  height: 2.2em;
}

.pokemon-team {
  display: flex;
  margin-right: 1em;
}

.team-member {
  margin: 0em .35em;
  width: 2.5em;
  max-width: 2.5em;
  height: 2.5em;
  max-height: 2.5em;
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
}

.team-member .pokemon-team-img{
  width: 2.5em;
  height: 2.5em;
  border: 1px solid #ff8100;
  border-radius: 20px;
  padding: .2em;
}

.remove-pokemon {
  border: none;
  background-color: transparent;
  position: relative;
  padding: 0;
  right: .7em;
  cursor: pointer;
  display: none;
}

.team-member:hover .remove-pokemon {
  display: inline;
}

.remove-pokemon img {
  width: .9em;
  
}
</style>
