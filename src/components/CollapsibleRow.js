import React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Collapse,
  IconButton,
} from '@material-ui/core';
import {
  KeyboardArrowDown,
  KeyboardArrowUp
} from '@material-ui/icons';
import {
  green,
  red,
  yellow,
  blue
} from '@material-ui/core/colors'
import test_paths from '../API/test_paths.json';

export default function CollapsibleRow(props) {
  const { events_data, darkMode } = props;
  const [open, setOpen] = React.useState(false);

  console.log(test_paths[events_data.path])

  var chooseColor = (status) => {
    switch (status) {
      case "Success":
        return darkMode ? green[900] : green[200];
      case "Failure":
        return darkMode ? red[900] : red[200];
      case "Overdue":
        return darkMode ? yellow[900] : yellow[200];
      case "In Progress":
        return darkMode ? blue[900] : blue[200];
      default:
        return "primary";
    }
  }

  var processDate = (dateInt) => {
    var year = Math.floor(dateInt / 10000);
    var month = Math.floor((dateInt - year * 10000) / 100);
    var day = (dateInt - year * 10000 - month * 100);
    return month + "/" + day + "/" + year;
  }

  var processTime = (timeStr) => {
    var hour = timeStr.split(":")[0]
    if (hour >= 12) {
      return timeStr + "PM";
    } else {
      if (hour < 10) {
        timeStr = timeStr.substring(1)
      }
      return timeStr + "AM";
    }
  }

  return (
    <TableBody>
      <TableRow style={{ background: chooseColor(events_data.status) }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{events_data.name}</TableCell>
        <TableCell>{events_data.status}</TableCell>
        {/* <TableCell>{events_data.path}</TableCell> */}
        <TableCell>{events_data.token}</TableCell>
        <TableCell>{events_data.group}</TableCell>
        <TableCell>{processDate(events_data.plan_date)}</TableCell>
        <TableCell>{processTime(events_data.plan_time)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{
          paddingBottom: 0,
          paddingTop: 0
        }} colSpan={8}>
          <Collapse in={open}>
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
                  test_paths[events_data.path].map((path) => (
                    <TableRow style={{ background: chooseColor(path.step_status) }}>
                      <TableCell>{path.step_name}</TableCell>
                      <TableCell>{path.step_description}</TableCell>
                      <TableCell>{path.step_status}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}