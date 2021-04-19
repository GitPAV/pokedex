export interface Pokemon {
    count: number;
    next: string;
    previous: boolean | null;
    results: Array<PokemonResult>;
}

export interface PokemonResult {
    name: string;
    url: string;
}
