<template>
<div class="container flex-center">

    <Navbar />

    <div id="Pokemon-detail">
        <p v-if="$fetchState.pending">Fetching pokemons...</p>
        <p v-else-if="$fetchState.error">The pokemon run away !(An error occurred) :(</p>
        <div v-else class="pokemon-container flex-center" >

            <!-- Header : name & title -->
            <h1 class="title">{{firstCapitalLetter(pokemon.name)}} #{{pokemon.id}}</h1>
            <div class="pokemon-type flex-center" >
                <p class="italic" v-for="(types, index) of pokemon.types" :key="index">{{types.type.name}}</p>
            </div>

            <!-- Pokemon main infos -->
            <div class="pokemon-entity flex-center">
                <div class="pokemon-main flex-center">
                    <img :src="require('../../assets/official-artwork/' + pokemon.id + '.png')" alt="pokemon official illustration">

                    <div class="pokemon-main-info flex-center">
                        
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

                        <div class="pokemon-mesures">
                            <p class="height">Height : {{pokemon.height}} decimetres</p>
                            <p class="weight">Weight : {{pokemon.weight}} hectograms</p>
                        </div>

                    </div>
                </div>

                <!-- Add pokemon to team  -->
                <button v-if="this.$store.state.list.length < 6" class="add-pokemon reset-focus-style" @click="addPokemon(pokemon.id)">
                    Add to my team
                </button>
                <button v-else class="full-team reset-focus-style">
                    Your team is already full !
                </button>

                <!-- Moves -->
                <div class="pokemon-moves">
                    <h3>{{firstCapitalLetter(pokemon.name)}}'s moves :</h3>
                    <ul>
                        <li
                            
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
        },

        addPokemon(id:number) {
            this.$store.commit('add', id)
        }
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
#Pokemon-detail {
    margin-top: 3.7em;
}

.pokemon-container {
    flex-direction: column;
}

.pokemon-type p {
    margin: 0 .25em;
}

.pokemon-entity {
    flex-direction: column;
    width: auto;
}

.pokemon-entity img {
    width: 60%;
}

.pokemon-main-info {
    flex-direction: column;
}

.pokemon-mesures {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 3em 0em;
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

.add-pokemon {
    background-color: green;
    border: 1px solid green;
    border-radius: 20px;
    padding: .7em;
    color: white;
}

.add-pokemon:hover {
    background-color: rgb(0, 158, 0);
    border: 1px solid black;
}

.full-team {
    background-color: red;
    border: 1px solid red;
    border-radius: 20px;
    padding: .7em;
    color: white;
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
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 0.5em 1.3em;
    padding-left: 0px;
}

.pokemon-moves li {
    list-style: circle;
}
</style>
