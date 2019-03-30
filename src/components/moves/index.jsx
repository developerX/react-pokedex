import React, { Component } from "react";
import { Card, Table, Grid, Button, Header } from "semantic-ui-react";
import Axios from "axios";

export class Moves extends Component {
  state = {
    moves: this.props.moves,
    currentMove: 0,
    move: null
  };

  async componentDidMount() {
    const { currentMove, moves } = this.state;
    this.getMove(moves[currentMove]);
  }

  getMove = async ({ move: { url } }) => {
    let move = await Axios.get(url);
    this.setState({ move: move.data });
  };

  nextMove = () => {
    const { currentMove, moves } = this.state;
    let count = currentMove + 1 >= moves.length ? currentMove : currentMove + 1;
    this.setState({ currentMove: count });
    this.getMove(moves[count]);
  };

  previousMove = () => {
    const { currentMove, moves } = this.state;
    let count = currentMove - 1 < 0 ? 0 : currentMove - 1;
    this.setState({ currentMove: count });
    this.getMove(moves[count]);
  };

  render() {
    const { move, currentMove, moves } = this.state;
    if (!move) return false;
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            <Grid>
              <Grid.Column width={12}>Moves</Grid.Column>
              <Grid.Column width={4} textAlign="right">
                <Button
                  content="Previous"
                  icon="left arrow"
                  labelPosition="left"
                  disabled={currentMove === 0}
                  onClick={this.previousMove}
                />
                <Button
                  content="Next"
                  icon="right arrow"
                  labelPosition="right"
                  disabled={currentMove === moves.length - 1}
                  onClick={this.nextMove}
                />
              </Grid.Column>
            </Grid>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Header as="h2">{move.name.replace("-", " ").toUpperCase()}</Header>
          {move.effect_entries.map(effect => (
            <p key={move.id}>{effect.effect}</p>
          ))}
        </Card.Content>
        <Card.Content>
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Accuracy</Table.HeaderCell>
                <Table.HeaderCell>Power</Table.HeaderCell>
                <Table.HeaderCell>PP</Table.HeaderCell>
                <Table.HeaderCell>Priority</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{move.accuracy}</Table.Cell>
                <Table.Cell>{move.power}</Table.Cell>
                <Table.Cell>{move.pp}</Table.Cell>
                <Table.Cell>{move.priority}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Card.Content>
      </Card>
    );
  }
}

export default Moves;
