import React, { Component } from 'react';
import {
  Table,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  TableSortLabel
} from '@material-ui/core';
import test_events from '../API/test_events.json';
import CollapsibleRow from './CollapsibleRow';

export default class MainTable extends Component {

  state = {
    events_data: test_events,
    bar: false,
    symbol: true
    // paths_data: test_paths,
  }

  renderTable = () => {
    const events_data = this.state.events_data;

    return (
      Object.keys(events_data).map((event) => (
        <CollapsibleRow
          key={event}
          events_data={events_data[event]}
          bar={this.state.bar}
          symbol={this.state.symbol}
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
                <TableCell />
                <TableCell>
                  <TableSortLabel
                    active="true"
                  >Name</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active="true"
                  >Progress</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active="true"
                  >Token</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active="true"
                  >Group</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active="true"
                  >Plan Date</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active="true"
                  >Plan Time</TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            {this.renderTable()}
          </Table>
        </TableContainer>
      </div>
    );
  }
}