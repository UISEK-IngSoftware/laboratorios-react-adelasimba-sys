//Examen Parcial 2
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export async function fetchTrainers() {
    const response = await axios.get(`${API_BASE_URL}/trainers/`);
    return response.data;
}

export async function addTrainer(trainerData) {
    const payload = { ...trainerData };
    if (trainerData.picture instanceof File) {
        payload.picture = await fileToBase64(trainerData.picture);
    }
    const response = await axios.post(`${API_BASE_URL}/trainers/`, payload);
    return response.data;
}

export async function updateTrainer(id, trainerData) {
    const payload = { ...trainerData };
    if (trainerData.picture instanceof File) {
        payload.picture = await fileToBase64(trainerData.picture);
    }
    const response = await axios.put(`${API_BASE_URL}/trainers/${id}/`, payload);
    return response.data;
}

export async function deleteTrainer(id) {
    await axios.delete(`${API_BASE_URL}/trainers/${id}/`);
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}