import legendaryList from '../data/legendariesData.json';

const legendaryNames = new Set(
    legendaryList.map((p) => p.name.toLowerCase())
);

export const isLegendary = (name) => {
    return legendaryNames.has(name.toLowerCase());
};

export const getRandomPokemon = async () => {
    const id = Math.floor(Math.random() * 1010) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch Pokémon with ID ${id}`);
    return await res.json();
};

export const getRandomLegendary = async (pokemonList, desiredRegion) => {
    const pool = pokemonList.filter((p) => {
        const match = legendaryList.find(
            (legendary) =>
                legendary.name.toLowerCase() === p.name.toLowerCase() &&
                (desiredRegion.toLowerCase() === 'all' || legendary.region.toLowerCase() === desiredRegion.toLowerCase())
        );
        return Boolean(match);
    });
    if (pool.length === 0) {
        console.warn(`No legendary Pokémon found for region: ${desiredRegion}`);
        return null;
    }
    const randomEntry = pool[Math.floor(Math.random() * pool.length)];
    try {
        const res = await fetch(randomEntry.url);
        if (!res.ok) throw new Error(`Failed to fetch ${randomEntry.name}`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Error fetching legendary Pokémon data:', err);
        return null;
    }
};

export const getRandomNonLegendaryTeam = async (pokemonList, count) => {
    const team = [];
    let attempts = 0;
    while (team.length < count && attempts < 100) {
        const random = pokemonList[Math.floor(Math.random() * pokemonList.length)];
        const name = random.name;
        if (!(isLegendary(name))) {
            const res = await fetch(random.url);
            if (!res.ok) continue;
            const data = await res.json();
            team.push(data);
        }
        attempts++;
    }
    return team;
};

export const getMixedTeam = async (pokemonList, count) => {
    const team = [];
    let attempts = 0;
    while (team.length < count && attempts < 100) {
        const random = pokemonList[Math.floor(Math.random() * pokemonList.length)];
        const res = await fetch(random.url);
        if (!res.ok) {
            console.warn(`Failed to fetch Pokémon data: ${res.status}`);
            continue;
        }
        const data = await res.json();
        team.push(data);
        attempts++;
    }
    return team;
};
