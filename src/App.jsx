import { Container, Grid } from '@mui/material'
import Header from './components/Header'
import PokemonForm from './pages/PokemonForm'
import './App.css'
import PokemonList from './pages/PokemonList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'



function App() {

  return (
    <>

      <Container>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<PokemonList />} />
            <Route path='/add-pokemon' element={<PokemonForm />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>

        </BrowserRouter>
      </Container>
    </>
  )
}

export default App
