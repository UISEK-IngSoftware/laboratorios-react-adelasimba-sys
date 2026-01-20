import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { addPokemon, updatePokemon, fetchPokemons } from "../services/pokemonService";

export default function PokemonForm() {
    const navigate = useNavigate();

    //Evaluacion Parcial 2
    const { id } = useParams(); 
    const isEdit = Boolean(id);

    const [pokemonData, setPokemonData] = useState ({
        name: '',
        type: '',
        weight: '',
        height: '',
        picture: null
    });
    // Efecto para cargar los datos
    useEffect(() => {
        if (isEdit) {
            fetchPokemons().then((data) => {
                const pokemonToEdit = data.find(p => p.id === parseInt(id));
                if (pokemonToEdit) {
                    // Cargar los datos en el formulario
                    setPokemonData({
                        name: pokemonToEdit.name,
                        type: pokemonToEdit.type,
                        weight: pokemonToEdit.weight,
                        height: pokemonToEdit.height,
                        picture: null 
                    });
                }
            });
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'picture') {
            setPokemonData({...pokemonData,picture: files [0]});
        } else {
            setPokemonData({...pokemonData,[name]: value });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                // EDITAR (PUT)
                await updatePokemon(id, pokemonData);
                alert("Pokemon actualizado exitosamente");
            } else {
                // AGREGAR (POST)
                await addPokemon(pokemonData);
                alert("Pokemon agregado exitosamente");
            }
            navigate('/');
        } catch (error) {
            console.error("Error en la operación", error);
            alert("Error al procesar la solicitud");
        }
    };

    return(
            <Box sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                {isEdit ? "Editar Pokemon" : "Nuevo Pokemon"}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Nombre" name="name" variant="outlined" onChange={handleChange} value={pokemonData.name} required />
                <TextField label="Tipo" name="type" variant="outlined" onChange={handleChange} value={pokemonData.type} required />
                <TextField label="Peso" name="weight" variant="outlined" onChange={handleChange} value={pokemonData.weight} />
                <TextField label="Altura" name="height" variant="outlined" onChange={handleChange} value={pokemonData.height} />
                
                <Typography variant="body2" color="text.secondary">
                    Foto del Pokemon:
                </Typography>
                <input type="file" name="picture" onChange={handleChange} />
                
                <Button variant="contained" type="submit" color="primary">
                    {isEdit ? "Guardar Cambios" : "Agregar Pokemon"}
                </Button>
                <Button variant="outlined" onClick={() => navigate('/')}>
                    Cancelar
                </Button>
            </Box>
        </Box>
    );
}