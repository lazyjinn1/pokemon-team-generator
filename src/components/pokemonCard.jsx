import { useEffect, useState } from 'react';
import typeColors from '../data/pokemonData.json';

export default function PokemonCard({ pokemon, loading }) {
    const [moves, setMoves] = useState([]);

    useEffect(() => {
        if (pokemon?.moves?.length) {
            const shuffled = [...pokemon.moves].sort(() => 0.5 - Math.random());
            setMoves(shuffled.slice(0, 4));
        }
    }, [pokemon]);

    if (!pokemon) return null;



    const primaryType = pokemon.types?.[0]?.type.name;
    const secondaryType = pokemon.types?.[1]?.type.name;

    const primaryColor = typeColors[primaryType];
    const secondaryColor = typeColors[secondaryType] || null;

    const gradientFrom = `from-${primaryColor}`;
    const gradientTo = `to-${secondaryColor || primaryColor}`;
    const cardBackgroundClass = `bg-gradient-to-br ${gradientFrom} ${gradientTo}`;

    return (
        <div className={`text-black dark:text-white text-outline-black p-4 rounded-lg shadow-lg w-64 ${cardBackgroundClass}`}>
            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <span className="text-xl font-bold">Loading...</span>
                </div>
            ) : (
                <>
                    <h2 className="text-xl font-bold text-center mb-2 capitalize">{pokemon.name}</h2>
                    <img
                        src={pokemon.sprites?.front_default}
                        alt={pokemon.name}
                        className="mx-auto mb-3 w-32 h-32 object-contain"
                    />
                    <div className="flex justify-center gap-2 mb-3">
                        {pokemon.types?.map((typeObj, idx) => {
                            const type = typeObj.type.name;
                            const color = typeColors[type] || 'gray-200';
                            return (
                                <span key={idx} className={`px-2 py-1 text-xs rounded capitalize bg-${color} border-2 text-outline-black`}>
                                    {type}
                                </span>
                            );
                        })}
                    </div>
                    <ul className="text-sm list-disc list-inside ">
                        {moves.map((move, idx) => (
                            <li key={idx} className="capitalize text-outline-black">{move.move.name}</li>
                        ))}
                    </ul>
                </>
            )}

        </div>
    );
}
