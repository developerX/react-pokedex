import React, { Component } from "react";
import Axios from "axios";
import { Container } from "semantic-ui-react";
import Pokemon from "./components/pokemon";
import Evolution from "./components/evolution";
import Moves from "./components/moves";

import "./App.css";

class App extends Component {
  state = {
    search: "1",
    pokemon: null,
    language: "en"
  };

  searchPokemon = async () => {
    let pokemon = await Axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${this.state.search}`
    );
    let species = await Axios.get(
      `https://pokeapi.co/api/v2/pokemon/${this.state.search}`
    );

    this.setState({ pokemon: pokemon.data, species: species.data });
  };

  componentDidMount() {
    this.searchPokemon();
  }

  render() {
    const { pokemon, language, species } = this.state;
    if (!pokemon) return false;
    console.warn(this.state);
    return (
      <Container>
        <input
          type="text"
          onChange={e => this.setState({ search: e.target.value })}
        />
        <Pokemon
          url={
            pokemon.varieties.filter(variety => variety.is_default)[0].pokemon
              .url
          }
          descriptions={pokemon.flavor_text_entries.filter(
            entry => entry.language.name === language
          )}
        />
        <Evolution url={pokemon.evolution_chain.url} />
        <Moves moves={species.moves} />
      </Container>
    );
  }
}

export default App;
