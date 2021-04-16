<template>
  <div class="navbar">
    <nuxt-link to="/">
      <img src="../assets/pokeball.png" alt="pokeball home icon">
    </nuxt-link>

    <div class="pokemon-team">
      <div class="team-member" v-for="(pokemon, index) of this.$store.state.list" :key="index">
        <img 
          :src="require('../assets/official-artwork/' + pokemon + '.png')" 
          alt="illustration of pokemon in the team"
        >
      </div>
    </div>
  </div>
</template>

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
}

.team-member img{
  width: 2.5em;
  height: 2.5em;
  border: 1px solid #ff8100;
  border-radius: 20px;
  padding: .2em;
}
</style>
