import React, { Component } from 'react';
import {
  Container
} from '@material-ui/core';
import test_events from '../API/test_events.json';
import CollapsibleCard from './CollapsibleCard';

export default class MainCardList extends Component {

  state = {
    events_data: test_events,
    bar: false,
    symbol: true
    // paths_data: test_paths,
  }

  renderCards = () => {
    const events_data = this.state.events_data;

    return (
      Object.keys(events_data).map((event) => (
        <CollapsibleCard
          key={event}
          events_data={events_data[event]}
          bar={this.state.bar}
          symbol={this.state.symbol}
        // darkMode={this.props.darkMode}
        />
      ))
    );
  }

  render() {
    return (
      <Container>
        {this.renderCards()}
      </Container>
    );
  }
}