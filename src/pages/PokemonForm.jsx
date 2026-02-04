import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addPokemon, updatePokemon, fetchPokemons } from "../services/pokemonService";
import Spinner from "../components/Spinner";

export default function PokemonForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [loading, setLoading] = useState(false);

    const [pokemonData, setPokemonData] = useState({
        name: "",
        type: "",
        weight: "",
        height: "",
        image: null
    });

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    useEffect(() => {
        if (isEdit) {
            fetchPokemons().then((data) => {
                const pokemon = data.find(p => p.id === parseInt(id));
                if (pokemon) {
                    setPokemonData({
                        name: pokemon.name,
                        type: pokemon.type,
                        weight: pokemon.weight,
                        height: pokemon.height,
                        image: null 
                    });
                }
            });
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setPokemonData({ ...pokemonData, image: files[0] });
        } else {
            setPokemonData({ ...pokemonData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let payload = {
                name: pokemonData.name,
                type: pokemonData.type,
                weight: pokemonData.weight,
                height: pokemonData.height
            };

            if (pokemonData.image instanceof File) {
                payload.image = await toBase64(pokemonData.image);
            }

            if (isEdit) {
                await updatePokemon(id, payload); // PATCH
                alert("Pokemon actualizado exitosamente");
            } else {
                await addPokemon(payload);
                alert("Pokemon agregado exitosamente");
            }

            navigate("/");
        } catch (error) {
            console.error("Error en la operación", error.response?.data);
            alert("Error al procesar la solicitud");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Spinner />;

    return (
        <Box sx={{ maxWidth: 500, margin: "auto", mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                {isEdit ? "Editar Pokemon" : "Nuevo Pokemon"}
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
                <TextField
                    label="Nombre"
                    name="name"
                    value={pokemonData.name}
                    onChange={handleChange}
                    required
                />

                <TextField
                    label="Tipo"
                    name="type"
                    value={pokemonData.type}
                    onChange={handleChange}
                    required
                />

                <TextField
                    label="Peso"
                    name="weight"
                    value={pokemonData.weight}
                    onChange={handleChange}
                />

                <TextField
                    label="Altura"
                    name="height"
                    value={pokemonData.height}
                    onChange={handleChange}
                />

                <Typography variant="body2" color="text.secondary">
                    Foto del Pokemon:
                </Typography>

                <input type="file" name="image" onChange={handleChange} />

                <Button variant="contained" type="submit">
                    {isEdit ? "Guardar Cambios" : "Agregar Pokemon"}
                </Button>

                <Button variant="outlined" onClick={() => navigate("/")}>
                    Cancelar
                </Button>
            </Box>
        </Box>
    );
}