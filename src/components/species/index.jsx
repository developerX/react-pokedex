import React, { Component } from 'react'
import Axios from 'axios';
import Evolution from '../evolution';

export class Species extends Component {
  state = {
    species: null,
    descriptions: []
  }

  async componentDidMount() {
    let species = await Axios.get(this.props.pokemon.url)
    this.setState({ 
      species : species.data,
      descriptions: species.data.flavor_text_entries.filter(entry => entry.language.name === "en")
    });
  }

  render() {
    const { species } = this.state;
    if (!species) return false;
    return (
      <div>
        <Evolution url={species.evolution_chain.url} />
      </div>
    )
  }
}

export default Species
