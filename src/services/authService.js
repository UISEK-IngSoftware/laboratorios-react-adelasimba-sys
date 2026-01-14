import axios from "axios";


const AUTH_BASE_URL = import.meta.env.VITE_AUTH_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

/**
 * Login de Usuario
 * @param username 
 * @param password 
 * @returns 
 */

export async function login(username, password) {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);
    const response = await axios.post(`${AUTH_BASE_URL}/token/`, params,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );
    return response.data;

}

/**
 * Cerrar sesión de usuario
 * @returns 
 */
export async function logout () {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const params = new URLSearchParams();
    params.append('token', token);
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);
    localStorage.removeItem("access_token");
    await axios.post(`${AUTH_BASE_URL}/revoke_token/`, params,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        localStorage.removeItem("access_token");
}