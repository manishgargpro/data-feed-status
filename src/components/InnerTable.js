import React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow
} from '@material-ui/core';

export default function InnerTable(props) {

  const { path_data, bar, symbol, chooseColor, chooseSymbol } = props;

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Step Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          path_data.map((path) => (
            <TableRow style={{
              borderLeft: bar ? "5px solid" : "0",
              borderColor: chooseColor(path.step_status)
            }}>
              <TableCell>
                {symbol && chooseSymbol(path.step_status, true)}
                {path.step_name}
              </TableCell>
              <TableCell>{path.step_description}</TableCell>
              <TableCell>{path.step_status}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
}