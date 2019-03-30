import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Pokemon from './components/pokemon'
import './App.css';
import Axios from 'axios';

class App extends Component {
  state = {
    search: '1',
    pokemon: null,
    language: 'en'
  }

  searchPokemon = async () => {
    let pokemon = await Axios.get(`https://pokeapi.co/api/v2/pokemon-species/${this.state.search}`);
    this.setState({ pokemon: pokemon.data });
  }

  componentDidMount() {
    this.searchPokemon();
  }

  render() {
    const { pokemon, language } = this.state;
    if (!pokemon) return false; 
    return (
      <Container>
        <input type="text" onChange={(e) => this.setState({ search: e.target.value})}/>
        <Pokemon
          url={pokemon.varieties.filter(variety => variety.is_default)[0].pokemon.url}
          descriptions={pokemon.flavor_text_entries.filter(entry => entry.language.name === language)}
        ></Pokemon>
      </Container>
    );
  }
}

export default App;
