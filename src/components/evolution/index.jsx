import React, { Component } from "react";
import { Grid, Image, Card } from "semantic-ui-react";

import Axios from "axios";

export class Evolution extends Component {
  state = {
    evolutions: []
  };

  async componentDidMount() {
    let evolution = await Axios.get(this.props.url);
    let evolves = this.pokemonEvolution(evolution.data.chain);
    this.setState({
      evolutions: await Promise.all(
        evolves.map(async evol => {
          let poke = await Axios.get(
            `https://pokeapi.co/api/v2/pokemon/${evol.name}`
          );
          return poke.data;
        })
      )
    });
  }

  pokemonEvolution = evolution => {
    if (evolution === undefined) {
      return [];
    }
    return [evolution.species].concat(
      this.pokemonEvolution(evolution.evolves_to[0])
    );
  };

  render() {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Evolutions</Card.Header>
        </Card.Content>
        <Card.Content>
          <Grid columns={3}>
            <Grid.Row>
              {this.state.evolutions.map(pokemon => (
                <Grid.Column key={pokemon.id}>
                  <Image
                    src={pokemon.sprites.front_default}
                    size="small"
                    circular
                  />
                  {pokemon.name}
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}

export default Evolution;
