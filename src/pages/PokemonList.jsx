import { Grid } from '@mui/material';
import PokemonCard from '../components/PokemonCard';
import { useEffect, useState } from 'react';
import { fetchPokemons } from '../services/pokemonService';

export default function PokemonList() {

const [pokemons, setPokemons] = useState([]);
useEffect(() => {
  fetchPokemons().then((data) => {
    setPokemons(data);
  }).catch((error) => {
    alert("Error obteniendo los pokemons");
    console.error("Error obteniendo los pokemons:", error);
  });
}, []);

    return(
        <Grid container spacing={2} marginTop={2}>
          {pokemons.map((pokemon, index) =>(
            <Grid key={index}  size= {{xs: 12, sm: 6, md: 4}}>
              <PokemonCard pokemon={pokemon}/>
            </Grid> 
          ))}
        </Grid>

    );
}