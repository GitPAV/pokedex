<template>
<div class="container flex-center">
    <div id="Pokemon-detail">
        <h1 class="title">{{pokemon.name}}</h1>

        <!-- <p v-if="$fetchState.pending">Fetching pokemons...</p>
        <p v-else-if="$fetchState.error">The pokemon run away !(An error occurred) :(</p>
        <div class="pokemon-list flex-center" v-else>
            <div class="pokemon-item flex-center" v-for="(post, index) of pokemonList.results" :key="post.name">
                <p>{{ pokemonList.length }}</p>
                <img :src="require('assets/official-artwork/' + (index + 1) + '.png')" alt="">
                <p>{{ post.name }}</p>
            </div>
        </div> -->
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data() {
        return {
            pokemon: Array,
        }
    },
    
    methods: {
    },

    created(){
        console.log("your id is: " + this.$route.params.id);
    },

    // Pokemon api call
    async fetch() {
        this.pokemon = await fetch(
            'https://pokeapi.co/api/v2/pokemon/' + this.$route.params.id
        ).then(res => res.json())

        console.log(this.pokemon)
    }

})
</script>

<style>
</style>
