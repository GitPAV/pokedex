export interface PokemonDetails {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: Array<{
        is_hidden: boolean;
        slot:3;
        ability: {
            name: string;
            url: string;
        }
    }>;
    forms: Array<{
        name: string;
        url: string;
    }>;
    game_indices: Array<{
        game_index: number;
        version: {
            name: string;   
            url: string;    
        }
    }>;
    held_items: Array<{
        item: {
            name: string;
            url: string;
        };
        version_details: Array<{
            rarity: number;
            version: {
                name: string;
                url: string;                
            }
        }>
    }>;
    location_area_encounters: string;
    moves: Array<{
        move: {
            name: string;
            url: string;
        };
        version_group_details: Array <{
            level_learned_at: number;
            version_group: {
                name: string;
                url: string;                
            };
            move_learn_method: {
                name: string;
                url: string;                
            };
        }>;
    }>;
    species: {
        name: string;
        url: string;
    };
    sprites: {
        back_female: string;
        back_shiny_female: string;
        back_default: string;
        front_female: string;
        front_shiny_female: string;
        back_shiny: string;
        front_default: string;
        front_shiny: string;
        other: {
            dream_world: {
                front_default: string;
                front_female: string | null;
            };
            ['official-artwork']: {
                front_default: string;
            };
        };
        versions: {
            ['generation-i']:{
                ['red-blue']: {};
                yellow: {};                
            };
            ['generation-ii']: {
                crystal: {};
                gold: {};
                silver: {};
            };
            ['generation-iii']: {
                emerald: {};
                ['firered-leafgreen']: {};
                ['ruby-sapphire']: {};
            };
            ['generation-iv']: {
                ['diamond-pearl']: {};
                ['heartgold-soulsilver']: {};
                platinum: {};
            };
            ['generation-v']: {
                ['black-white']: {};
            };
            ['generation-vi']: {
                ['omegaruby-alphasapphire']: {};
                ['x-y']: {};
            };
            ['generation-vii']: {
                icons: {};
                ['ultra-sun-ultra-moon']: {};
            };
            ['generation-viii']: {
                icons: {};
            };
        };
        stats: Array <{
            base_stat: number;
            effort: number;
            stat: {
                name: string;
                url: string;                
            };
        }>;
        types: Array<{
            slot: number;
            type: {
                name: string;
                url: string;                
            }
        }>
    }
}
