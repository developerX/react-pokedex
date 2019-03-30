import React, { Component } from 'react'
import { Card, Table } from 'semantic-ui-react';
import Axios from 'axios';

export class Moves extends Component {
  state = {
    move: null
  }

  async componentDidMount() {
    console.log(this.props);
    let move = await Axios.get(this.props.move.move.url);
    this.setState({move: move.data})
  }

  async componentWillReceiveProps(nextProps) {
    let move = await Axios.get(nextProps.move.move.url);
    this.setState({move: move.data})
  }

  render() {
    const {move} = this.state;
    if (!move) return false;
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>{move.name}</Card.Header>
        </Card.Content>
        <Card.Content>
          {move.effect_entries.map(effect => (
            <p key={move.id}>{effect.effect}</p>
          ))}
        </Card.Content>
        <Card.Content>
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Accuracy
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Power
                </Table.HeaderCell>
                <Table.HeaderCell>
                  PP
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Priority
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  {move.accuracy}
                </Table.Cell>
                <Table.Cell>
                  {move.power}
                </Table.Cell>
                <Table.Cell>
                  {move.pp}
                </Table.Cell>
                <Table.Cell>
                  {move.priority}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Card.Content>
      </Card>
    )
  }
}

export default Moves
