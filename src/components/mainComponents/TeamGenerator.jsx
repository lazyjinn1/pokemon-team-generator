import { useState, useEffect } from 'react';
import HeroBanner from '../HeroBanner';
import PokemonCard from '../pokemonCard';
import { useSettings } from '../../context/SettingsContext';
import { getRandomLegendary, getRandomNonLegendaryTeam, getMixedTeam } from '../../utils/generationUtils';

export default function TeamGenerator() {
    const [team, setTeam] = useState([]);
    useEffect(() => {
        try {
            const stored = localStorage.getItem('team');
            if (stored) {
                const parsed = JSON.parse(stored);
                setTeam(parsed);
            }
        } catch (err) {
            console.warn('Failed to parse saved team from localStorage:', err);
            localStorage.removeItem('team');
            setTeam([]);
        }
    }, []);

    const { settings } = useSettings();
    const region = settings.region || 'All';

    const [loading, setLoading] = useState(false);

    const getPokemonByRegion = async (region) => {
        const regionUrls = {
            Kanto: 'https://pokeapi.co/api/v2/pokemon?limit=151',
            Johto: 'https://pokeapi.co/api/v2/pokemon?offset=151&limit=100',
            Hoenn: 'https://pokeapi.co/api/v2/pokemon?offset=251&limit=135',
            Sinnoh: 'https://pokeapi.co/api/v2/pokemon?offset=386&limit=107',
            Unova: 'https://pokeapi.co/api/v2/pokemon?offset=493&limit=156',
            Kalos: 'https://pokeapi.co/api/v2/pokemon?offset=649&limit=72',
            Alola: 'https://pokeapi.co/api/v2/pokemon?offset=721&limit=88',
            Galar: 'https://pokeapi.co/api/v2/pokemon?offset=809&limit=89',
            Paldea: 'https://pokeapi.co/api/v2/pokemon?offset=898&limit=105',
            All: 'https://pokeapi.co/api/v2/pokemon?limit=1010',
        };
        const res = await fetch(regionUrls[region]);
        const data = await res.json();
        return data.results;
    };

    const generateTeam = async () => {
        setLoading(true);

        const allPokemon = await getPokemonByRegion(region);
        const legendaryPref = settings.legendarySetting;

        let team = [];

        if (legendaryPref === 'One Legendary') {
            const legendary = await getRandomLegendary(allPokemon, region);
            if (legendary) {
                team.push(legendary);
                team.push(...await getRandomNonLegendaryTeam(allPokemon, 5));
            } else {
                team = await getRandomNonLegendaryTeam(allPokemon, 6);
            }
        } else if (legendaryPref === 'Mixed in (equal chance)') {
            team = await getMixedTeam(allPokemon, 6);
        } else if (legendaryPref === 'No Legendaries') {
            team = await getRandomNonLegendaryTeam(allPokemon, 6);
        }

        setTeam(team);
        localStorage.setItem('team', JSON.stringify(team));
        setLoading(false);
    };

    return (
        <div className={`min-h-screen w-screen overflow-x-hidden ${settings.darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <HeroBanner />
            <div className="fixed right-0 bottom-0  bg-white text-black p-2 rounded-lg shadow-lg z-10 border-4 border-black">
                <div className="text-center text-[1rem]">
                    {settings.region}
                </div>
                <div className="text-center text-[1rem]">
                    {settings.legendarySetting === 'One Legendary'
                        ? 'One Legendary'
                        : settings.legendarySetting === 'Mixed in (equal chance)'
                            ? 'Mixed Legendaries'
                            : 'No Legendaries'}
                </div>
            </div>
            <div className="grid grid-cols-4 p-4">
                <button
                    onClick={generateTeam}
                    className={`mt-4 text-2xl tracking-widest font-bold py-2 px-4 rounded 
                        col-span-2 col-start-2  active:transform active:scale-95 
                        transition-transform duration-200 
                            ${settings.darkMode ? "text-black hover:bg-yellow-500 active:bg-yellow-600 bg-yellow-300" :
                            "bg-red-600 text-white active:bg-red-800 hover:bg-red-700"}`}
                >
                    GENERATE
                </button>
            </div>

            <div className="p-4">
                <h2 className="text-center text-3xl mb-4">Your Team:</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 justify-center">
                    {team.map((pokemon, index) => (
                        <PokemonCard key={index} pokemon={pokemon} loading={loading} />
                    ))}
                </div>
            </div>
        </div>
    );
}
