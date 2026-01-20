import { Container, Grid } from '@mui/material'
import Header from './components/Header'
import PokemonForm from './pages/PokemonForm'
import './App.css'
import PokemonList from './pages/PokemonList'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'

//Evaluacion Parcial 2
import TrainerList from './pages/TrainerList';
import TrainerForm from './pages/TrainerForm';

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/add-pokemon" element={<PokemonForm />} />
        <Route path="/edit-pokemon/:id" element={<PokemonForm />} />

        {/* Rutas de Entrenadores */}
        <Route path="/trainers" element={<TrainerList />} />
        <Route path="/add-trainer" element={<TrainerForm />} />
        <Route path="/edit-trainer/:id" element={<TrainerForm />} />

        {/* Autenticación */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
