import { Grid,Container } from '@mui/material';
import PokemonCard from '../components/PokemonCard';
import { useEffect, useState } from 'react';
import { fetchPokemons, deletePokemon } from '../services/pokemonService';


export default function PokemonList() {
    const [pokemons, setPokemons] = useState([]);

    // Función cargar pokemons
    const loadPokemons = () => {
        fetchPokemons()
            .then((data) => {
                setPokemons(data);
            })
            .catch((err) => { 
                alert("Error obteniendo los pokemons");
                console.error("Detalle del error:", err); 
            });
    };

    useEffect(() => {
        loadPokemons();
    }, []);

    // Función DELETE
    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este Pokémon?")) {
            try {
                await deletePokemon(id);
                // Actualizar para que desaparezca de la vista
                setPokemons(pokemons.filter(p => p.id !== id));
            } catch (err) {
                console.error("Error al eliminar:", err);
                alert("No se pudo eliminar el pokemon");
            }
        }
    };

    return (
        <Container>
            <Grid container spacing={2} marginTop={2}>
                {pokemons.map((pokemon) => (
                    <Grid item key={pokemon.id} xs={12} sm={6} md={4}>
                        <PokemonCard pokemon={pokemon} onDelete={handleDelete} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}