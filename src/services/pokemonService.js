import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchPokemons() {
    const response = await axios.get(`${API_BASE_URL}/pokemons`);
    console.log(response);
    return response.data;
}