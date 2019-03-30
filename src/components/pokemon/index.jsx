import React, { Component, Fragment } from 'react'
import { Card, Table, Image, Label, Icon } from 'semantic-ui-react'
import Axios from 'axios';
import Species from '../species';
import Moves from '../moves';

export class Pokemon extends Component {
  state = {
    pokemon: null,
    currentMove: 0,
    name:'',
    sprites: {},
    isShiny: false,
    isBack: false,
    isFemale: false,
    onDescription: 0,
    descriptions: []
  }

  async componentDidMount() {
    let pokemon = await Axios.get(this.props.url);
    // console.warn(pokemon.data);
    this.setState({ 
      pokemon: pokemon.data,
      sprites: pokemon.data.sprites,
      descriptions: this.props.descriptions,
      name: pokemon.data.name,
      id: pokemon.data.id
    })
  }

  renderType = (type) => {
    let metaInfo = {
      color: 'default',
      iconName: 'info'
    };

    switch (type.name) {
      case 'poison':
        metaInfo.color = "purple";
        metaInfo.iconName = "lab";
        break;
      case 'grass':
        metaInfo.color = "green";
        metaInfo.iconName = "leaf";
        break;
      case 'bug':
        metaInfo.color = "green";
        metaInfo.iconName = "bug";
      break;
      case 'rock':
        metaInfo.color = "brown";
        metaInfo.iconName = "hand rock";
      break;
      case 'ground':
      break;
      case 'psychic':
        metaInfo.color = "purple";
        metaInfo.iconName = "eye"
      break;
      case 'fire':
        metaInfo.color = "red";
        metaInfo.iconName = "fire"
      break;
      case 'water':
        metaInfo.color = "blue";
        metaInfo.iconName = "tint";
      break;
      case 'ice':
        metaInfo.color = "teal";
        metaInfo.iconName = "snowflake";
      break;
      case 'normal':
        metaInfo.color="default";
        metaInfo.iconName = "certificate";
      break;
      case 'fairy':
        metaInfo.color="pink";
        metaInfo.iconName = "magic";
      break;
      default:
        metaInfo.color = "yellow";
        metaInfo.iconName = "lighting";
    }

    return (
      <Label color={metaInfo.color} key={type.name}>
        <Icon name={metaInfo.iconName} />
          {type.name}
      </Label>
    )
  }

  renderSpriteImage = () => {
    const {isShiny, isFemale, sprites, isBack } = this.state;
    let output = ''
    if (!isShiny && !isFemale) {
      output =  isBack ? 'back_default' : 'front_default'
    }
    
    if (isShiny) {
      output =  isBack ? 'back_shiny' : 'front_shiny';
    }

    if (isFemale) {
      output =  isBack ? 'back_female' : 'front_female';
    }

    if (isFemale && isShiny) {
      output =  isBack ? 'back_shiny_female' : 'front_shiny_female'
    }

    if (sprites[output]) {
      return sprites[output];
    } else {
      return sprites['front_default'];
    }
  }

  nextDescription = () => {
    const { descriptions, onDescription } = this.state; 
    let count = onDescription+1 >= descriptions.length ? onDescription : onDescription+1;
    this.setState({
      onDescription: count
    })
  }

  previousDescription = () => {
    const { onDescription } = this.state;
    this.setState({
      onDescription: onDescription-1 < 0 ? 0 : onDescription-1
    })
  }

  render() {
    const { isFemale, pokemon, name, isBack, descriptions, onDescription, isShiny } = this.state;
    if (!pokemon) return false;
    console.warn(this.state);
    return (
      <Fragment>
      <div>
        <h1>{name.toUpperCase()}</h1>
        <hr/>
        <div className="sprites">
          <Image src={this.renderSpriteImage()}></Image>
          <input 
            type="checkbox" 
            checked={isBack} 
            onClick={() => this.setState({ isBack: !isBack })}
          /> Back
          <input 
            type="checkbox" 
            checked={isShiny} 
            onClick={() => this.setState({ isShiny: !isShiny })}
          /> Shiny
          <input type="checkbox" checked={isFemale}/> Female
        </div>
        <div className="description">
          {descriptions[onDescription].flavor_text}
        </div>
        <div className="actions">
          <button onClick={this.previousDescription}>Previous</button>
          <button onClick={this.nextDescription}>
            next
          </button>
        </div>
      </div>
      <Card fluid>
        <Card.Content>
          <Card.Header>
            <Image src={pokemon.sprites.front_default} circular size="tiny"></Image>
            {pokemon.name}
          </Card.Header>
        </Card.Content>
        <Card.Content>
        {
          pokemon.types.map(({type}) => this.renderType(type))
        }
        </Card.Content>
        <Card.Content>
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  ID
                </Table.HeaderCell> 
                <Table.HeaderCell>
                  Base Experience
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Height
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Weight
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  {pokemon.id}
                </Table.Cell>
                <Table.Cell>
                  {pokemon.base_experience}
                </Table.Cell>
                <Table.Cell>
                  {pokemon.height}
                </Table.Cell>
                <Table.Cell>
                  {pokemon.weight}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Card.Content>
        <Card.Content>
          <Species pokemon={pokemon.species} />
        </Card.Content>
        <Card.Content>
          <button type="button" onClick={() =>  this.setState({currentMove: this.state.currentMove + 1})}>Next</button>
          <Moves move={pokemon.moves[this.state.currentMove]} />
        </Card.Content>
      </Card>
      </Fragment>
    )
  }
}

export default Pokemon

