[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/zV6b-ZXN)
# React: Pokédex

## Descripción General
Este repositorio contiene tres laboratorios progresivos para construir una aplicación Pokédex completa usando React, Material UI y consumo de APIs REST.

---

## Laboratorio 9: Introducción a React, Componentes y MUI

### Objetivo
Construir el layout de una aplicación Pokédex utilizando React y Material UI. Se trabajará con datos simulados y se crearán componentes reutilizables.

### Requisitos previos
- Node.js y npm instalados
- Editor de código (recomendado: VS Code)
- Navegador actualizado (recomendado: Chrome)
- React (usar Vite)

### Requisitos técnicos
- Material UI (@mui/material, @emotion/react, @emotion/styled)
- Datos simulados (sin consumo de API)

### Estructura del proyecto
```
/src
  /components
    Header.jsx
    PokemonCard.jsx
  /pages
    App.jsx
  /data
    pokemons.js
  main.jsx
```

---

## Laboratorio 10: Llamadas a API REST con Axios

### Objetivo
Integrar llamadas a una API REST generada en Django (laboratorios 5-8 en otro repositorio) para consumir datos de Pokémon en tiempo real.

### Requisitos técnicos
- Axios para realizar peticiones HTTP
- Variables de entorno (.env) para configurar URLs de API
- Servicios reutilizables para las llamadas a API

### Nuevas características
- Consumo de endpoint `/api/pokemons/` para obtener lista de Pokémon
- Configuración de URL base de API en variables de entorno
- Creación de servicios en `pokemonService.js`

### Estructura actualizada
```
/src
  /components
    #### Tus componentes irán aquí
  /pages
    App.jsx
  /services
    #### Tus servicios irán aquí
  .env
  main.jsx
```

### Variables de entorno (.env)
```
VITE_API_BASE_URL=http://localhost:8000
VITE_API_MEDIA_URL=${VITE_API_BASE_URL}/media/
```

---

## Laboratorio 11: Llamadas a API REST con Axios y Gestión de Autorización

### Objetivo
Implementar un sistema completo de autenticación OAuth con Django, incluyendo login, logout y protección de rutas.

### Requisitos técnicos
- Autenticación OAuth con Django
- Gestión de tokens de acceso en localStorage
- Interceptores de Axios para agregar tokens a las peticiones
- Rutas protegidas con React Router
- Formulario de login y creación de Pokémon

### Nuevas características
- Página de login con autenticación OAuth (`/login`)
- Página para agregar Pokémon (`/add-pokemon`)
- Sistema de logout con revocación de token
- Protección de rutas basada en autenticación
- Conversión de imágenes a base64
- Interceptores de Axios para autorización

### Estructura actualizada
```
/src
  /components
    Header.jsx
    PokemonCard.jsx
  /pages
    App.jsx
    Login.jsx
    AddPokemon.jsx
  /services
    pokemonService.js
  .env
  main.jsx
```

### Variables de entorno (.env)
```
VITE_API_BASE_URL=http://localhost:8000
VITE_API_MEDIA_URL=${VITE_API_BASE_URL}/media/
VITE_API_CLIENT_ID=tu_client_id
VITE_API_CLIENT_SECRET=tu_client_secret
```

---

## Instalación del proyecto

1. **Clonar el repositorio** (este paso lo hará GitHub Classroom automáticamente).
2. Abrir en VS Code la carpeta de tu repositorio clonado
3. Instalar las dependencias base:
   ```bash
   npm install
   ```
4. Instalar Material UI y sus dependencias:
   ```bash
   npm install @mui/material @emotion/react @emotion/styled
   ```
5. Instalar Axios (necesario desde Laboratorio 10):
   ```bash
   npm install axios
   ```
6. Instalar React Router (necesario desde Laboratorio 11):
   ```bash
   npm install react-router-dom
   ```

### Comandos útiles
- Ejecutar el servidor de desarrollo
    ```bash
    npm run dev
    ```
- Comprobar versión de dependencias
    ```bash
    npm list
    ```
- Limpiar dependencias
    ```bash
    rm -rf node_modules
    npm install
    ```

### Comandos git
- Verificar los archivos modificados
    ```bash
    git status
    ```
- Agregar archivos al área de preparación
    ```bash
    git add .
    ```
- Realizar un commit
    ```bash
    git commit -m "Laboratorio [9/10/11]: descripción de cambios"
    ```
- Enviar los cambios a github
    ```bash
    git push
    ```
