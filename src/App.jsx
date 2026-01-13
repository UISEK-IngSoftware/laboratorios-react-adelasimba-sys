import { Container, Grid } from '@mui/material'
import Header from './components/Header'
import PokemonForm from './pages/PokemonForm'
import './App.css'
import PokemonList from './pages/PokemonList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'



function App() {

  return (
    <>
      <Header/>
      <Container>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<PokemonList />} />
          <Route path='/add-pokemon' element={<PokemonForm />} />
        </Routes>
        
        </BrowserRouter>
      </Container>
    </>
  )
}

export default App
