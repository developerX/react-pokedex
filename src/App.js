import React, { Component } from "react";
import Axios from "axios";
import {
  Container,
  Segment,
  Message,
  Input,
  Button,
  Dimmer,
  Loader,
  Icon,
  Form
} from "semantic-ui-react";
import Pokemon from "./components/pokemon";
import Evolution from "./components/evolution";
import Moves from "./components/moves";

import "./App.css";

class App extends Component {
  state = {
    search: "1",
    pokemon: null,
    species: null,
    language: "en",
    loading: true
  };

  searchPokemon = async () => {
    this.setState({ loading: true });
    try {
      let species = await Axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${this.state.search}`
      );
      let pokemon = await Axios.get(
        `https://pokeapi.co/api/v2/pokemon/${this.state.search}`
      );

      this.setState({
        pokemon: pokemon.data,
        species: species.data,
        error: false,
        loading: false
      });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  };

  componentDidMount() {
    this.searchPokemon();
  }

  render() {
    const { pokemon, language, species, loading, error } = this.state;
    if (!pokemon || !species) return false;
    return (
      <Container>
        <Form
          onSubmit={e => {
            e.preventDefault();
            this.searchPokemon();
          }}
        >
          <Input
            action
            type="text"
            style={{ marginBottom: "40px", marginTop: "20px" }}
            size="massive"
            fluid
            placeholder="Enter Pokemon Name or ID"
            onChange={e => this.setState({ search: e.target.value })}
          >
            <input />
            <Button type="submit" icon="search" size="massive" />
          </Input>
        </Form>

        {error && (
          <Message negative>
            <Message.Header>OH SH**! Not Found</Message.Header>
            <p>
              We couldn't find the pokemon you are searching for! Try that
              ish... again!
            </p>
          </Message>
        )}

        {loading && !error ? (
          <Dimmer active>
            <Loader size="massive">Loading</Loader>
          </Dimmer>
        ) : (
          <div>
            <Pokemon
              pokemon={pokemon}
              url={
                species.varieties.filter(variety => variety.is_default)[0]
                  .pokemon.url
              }
              descriptions={species.flavor_text_entries.filter(
                entry => entry.language.name === language
              )}
            />
            <Evolution url={species.evolution_chain.url} />
            <Moves moves={pokemon.moves} />
          </div>
        )}
        <Segment inverted textAlign="center">
          Made with <Icon name="heart" color="red" size="big" /> in &nbsp;
          <Icon name="react" color="blue" size="big" /> and Semantic UI React
        </Segment>
      </Container>
    );
  }
}

export default App;
