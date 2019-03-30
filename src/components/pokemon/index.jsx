import React, { Component, Fragment } from "react";
import {
  Image,
  Label,
  Icon,
  Statistic,
  Grid,
  Segment,
  Button
} from "semantic-ui-react";

export class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.pokemon.id,
      pokemon: props.pokemon,
      currentMove: 0,
      name: props.pokemon.name,
      sprites: props.pokemon.sprites,
      isShiny: false,
      isBack: false,
      isFemale: false,
      onDescription: 0,
      descriptions: props.descriptions
    };
  }

  renderType = type => {
    let metaInfo = {
      color: "grey",
      iconName: "info"
    };

    switch (type.name) {
      case "poison":
        metaInfo.color = "purple";
        metaInfo.iconName = "lab";
        break;
      case "grass":
        metaInfo.color = "green";
        metaInfo.iconName = "leaf";
        break;
      case "bug":
        metaInfo.color = "green";
        metaInfo.iconName = "bug";
        break;
      case "rock":
        metaInfo.color = "brown";
        metaInfo.iconName = "hand rock";
        break;
      case "ground":
        break;
      case "psychic":
        metaInfo.color = "purple";
        metaInfo.iconName = "eye";
        break;
      case "fire":
        metaInfo.color = "red";
        metaInfo.iconName = "fire";
        break;
      case "water":
        metaInfo.color = "blue";
        metaInfo.iconName = "tint";
        break;
      case "ice":
        metaInfo.color = "teal";
        metaInfo.iconName = "snowflake";
        break;
      case "normal":
        metaInfo.color = "default";
        metaInfo.iconName = "certificate";
        break;
      case "fairy":
        metaInfo.color = "pink";
        metaInfo.iconName = "magic";
        break;
      case "fighting":
        metaInfo.color = "brown";
        metaInfo.iconName = "hand rock";
        break;
      case "electric":
        metaInfo.color = "yellow";
        metaInfo.iconName = "lightning";
        break;
      default:
        metaInfo.color = "grey";
        metaInfo.iconName = "info";
    }

    return (
      <Label color={metaInfo.color} key={type.name} size="large">
        <Icon name={metaInfo.iconName} />
        {type.name}
      </Label>
    );
  };

  renderSpriteImage = () => {
    const { isShiny, isFemale, sprites, isBack } = this.state;
    let output = "";
    if (!isShiny && !isFemale) {
      output = isBack ? "back_default" : "front_default";
    }

    if (isShiny) {
      output = isBack ? "back_shiny" : "front_shiny";
    }

    if (isFemale) {
      output = isBack ? "back_female" : "front_female";
    }

    if (isFemale && isShiny) {
      output = isBack ? "back_shiny_female" : "front_shiny_female";
    }

    if (sprites[output]) {
      return sprites[output];
    } else {
      return sprites["front_default"];
    }
  };

  nextDescription = () => {
    const { descriptions, onDescription } = this.state;
    let count =
      onDescription + 1 >= descriptions.length
        ? onDescription
        : onDescription + 1;
    this.setState({
      onDescription: count
    });
  };

  previousDescription = () => {
    const { onDescription } = this.state;
    this.setState({
      onDescription: onDescription - 1 < 0 ? 0 : onDescription - 1
    });
  };

  render() {
    const {
      pokemon,
      name,
      isBack,
      descriptions,
      onDescription,
      isShiny
    } = this.state;
    if (!pokemon) return false;
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <h1>
              #{pokemon.id} {name.toUpperCase()}
            </h1>
          </Grid.Column>
          <Grid.Column width={4} textAlign="right">
            {pokemon.types.map(({ type }) => this.renderType(type))}
          </Grid.Column>
        </Grid>
        <hr />
        <Grid>
          <Grid.Column>
            <Grid.Row>
              <Grid>
                <Grid.Column width={4}>
                  <div className="sprites">
                    <Image
                      src={this.renderSpriteImage()}
                      style={{ width: "100%" }}
                    />
                    <Button
                      toggle
                      circular
                      icon="redo alternate"
                      active={isBack}
                      onClick={() => this.setState({ isBack: !isBack })}
                    />
                    <Button
                      floated="right"
                      circular
                      toggle
                      icon="star"
                      active={isShiny}
                      onClick={() => this.setState({ isShiny: !isShiny })}
                    />
                  </div>
                </Grid.Column>
                <Grid.Column width={12}>
                  <div className="actions">
                    <Button
                      content="Previous"
                      icon="left arrow"
                      labelPosition="left"
                      disabled={onDescription === 0}
                      onClick={this.previousDescription}
                    />
                    <Button
                      floated="right"
                      content="Next"
                      icon="right arrow"
                      labelPosition="right"
                      disabled={descriptions.length - 1 === onDescription}
                      onClick={this.nextDescription}
                    />
                    <div className="description">
                      <p>{descriptions[onDescription].flavor_text}</p>
                    </div>
                  </div>
                </Grid.Column>
              </Grid>
            </Grid.Row>

            <Segment inverted>
              <Statistic.Group widths="six" size="tiny">
                {pokemon.stats.map(({ stat, base_stat }) => (
                  <Statistic key={stat.name} color="green" inverted>
                    <Statistic.Value>{base_stat}</Statistic.Value>
                    <Statistic.Label>{stat.name}</Statistic.Label>
                  </Statistic>
                ))}
              </Statistic.Group>
            </Segment>
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

export default Pokemon;
