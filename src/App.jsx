import { Container, Grid } from '@mui/material'
import Header from './components/Header'

import './App.css'
import PokemonList from './components/PokemonList'


function App() {

  return (
    <>
      <Header/>
      <Container>
        <PokemonList/>
      </Container>
    </>
  )
}

export default App
