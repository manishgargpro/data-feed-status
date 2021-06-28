import React, { Component } from 'react';
import {
  Table,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import test_events from '../API/test_events.json';
import CollapsibleRow from './CollapsibleRow';

export default class MainTable extends Component {

  state = {
    events_data: test_events,
    // paths_data: test_paths,
  }

  renderTable = () => {
    const events_data = this.state.events_data;

    return (
      Object.keys(events_data).map((event) => (
        <CollapsibleRow
          key={event}
          events_data={events_data[event]}
          darkMode={this.props.darkMode}
        />
      ))
    );
  }

  render() {
    return (
      <div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                {/* <TableCell>Path</TableCell> */}
                <TableCell>Token</TableCell>
                <TableCell>Group</TableCell>
                <TableCell>Plan Date</TableCell>
                <TableCell>Plan Time</TableCell>
              </TableRow>
            </TableHead>
            {this.renderTable()}
          </Table>
        </TableContainer>
      </div>
    );
  }
}