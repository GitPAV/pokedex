<template>
<div class="container flex-center">

    <Navbar />

    <div id="Pokemon-detail">
        <p v-if="$fetchState.pending">Fetching pokemons...</p>
        <p v-else-if="$fetchState.error">The pokemon run away !(An error occurred) :(</p>
        <div v-else class="pokemon-container flex-center" >

        <h1 class="title">{{firstCapitalLetter(pokemon.name)}} #{{pokemon.id}}</h1>
        <div class="pokemon-type flex-center" >
            <p class="italic" v-for="(types, index) of pokemon.types" :key="index">{{types.type.name}}</p>
        </div>

            <div class="pokemon-item flex-center">
                <!-- <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" alt=""> -->
                <img :src="pokemon.sprites.other['official-artwork'].front_default" alt="">
                
                <div class="pokemon-mesures">
                    <p class="height">Height : {{pokemon.height}} decimetres</p>
                    <p class="weight">Weight : {{pokemon.weight}} hectograms</p>
                </div>

                <div class="pokemon-stats-container flex-center">
                    <h3>{{firstCapitalLetter(pokemon.name)}}'s stats :</h3>
                    <div class="pokemon-stats">
                        <p 
                            v-for="(stats, index) of pokemon.stats" 
                            :key="index">
                            <span class="italic">{{firstCapitalLetter(stats.stat.name)}}</span> : {{stats.base_stat}}
                            <span class="italic">|  EV: {{stats.effort}}</span>
                        </p>
                    </div>
                </div>

                <div class="pokemon-moves">
                    <h3>{{firstCapitalLetter(pokemon.name)}}'s moves :</h3>
                    <ul>
                        <li
                            class="flex-center"
                            v-for="(moves, index) of pokemon.moves" 
                            :key="index"                    
                        >
                            {{moves.move.name}}
                        </li>
                    </ul>
                </div>
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
            pokemon: {},
        }
    },
    
    methods: {
        firstCapitalLetter(name:string) {
            let changedName = name.charAt(0).toUpperCase() + name.slice(1)
            return changedName
        }
    },

    computed: {
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
/* Utilities class */
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.italic {
    font-style: italic;
}

/* Regular class & id, sorted by top to bottom */
#Pokemon-detail {
    margin-top: 2.5em;
}

.pokemon-container {
    flex-direction: column;
}

.pokemon-type p {
    margin: 0 .25em;
}

.pokemon-item {
    flex-direction: column;
}

.pokemon-item img {
    width: 60%;
}

.pokemon-mesures {
    display: flex;
    justify-content: space-between;
    width: 75%;
    margin: 1em 0em;
}

.pokemon-stats-container {
    flex-direction: column;
}

.pokemon-stats-container h3 {
    margin: .5em 0em .5em 0em;
}

.pokemon-stats {
    display: flex;
    flex-direction: column;
    align-items: inherit;
    border: 1px solid grey;
    border-radius: 20px;
    padding: .5em;
}

.pokemon-moves {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.pokemon-moves h3 {
    margin: 1em 0em .5em 0em;
}

.pokemon-moves ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: .5em;
    padding-left: 0px;
}
</style>
