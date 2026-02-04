import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export async function fetchPokemons() {
    const response = await axios.get(`${API_BASE_URL}/pokemons/`);
    return response.data;
}

export async function getPokemon(id) {
    const response = await axios.get(`${API_BASE_URL}/pokemons/${id}/`);
    return response.data;
}

export async function addPokemon(pokemonData) {
    const payload = { ...pokemonData };

    if (pokemonData.picture && pokemonData.picture instanceof File) {
        payload.picture = await fileToBase64(pokemonData.picture);
    } else {
        delete payload.picture;
    }

    const response = await axios.post(`${API_BASE_URL}/pokemons/`, payload);
    return response.data;
}

export async function updatePokemon(id, pokemonData) {
    const payload = { ...pokemonData };

    if (pokemonData.picture && pokemonData.picture instanceof File) {
        payload.picture = await fileToBase64(pokemonData.picture);
    } else {
        delete payload.picture;
    }

    const response = await axios.patch(`${API_BASE_URL}/pokemons/${id}/`, payload);
    return response.data;
}

export async function deletePokemon(id) {
    await axios.delete(`${API_BASE_URL}/pokemons/${id}/`);
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}