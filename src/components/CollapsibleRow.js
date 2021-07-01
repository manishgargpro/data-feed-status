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
  KeyboardArrowUp,
  Done,
  Cancel,
  HourglassEmpty,
  HourglassFull,
  Warning,
  Remove
} from '@material-ui/icons';
import {
  green,
  red,
  yellow,
  blue,
  grey
} from '@material-ui/core/colors'
import test_paths from '../API/test_paths.json';

export default function CollapsibleRow(props) {
  const { events_data, bar, symbol } = props;
  const [open, setOpen] = React.useState(false);

  console.log(test_paths[events_data.path])

  var chooseColor = (status) => {
    // const lightInt = 200;
    const darkInt = 700;
    switch (status) {
      case "Success":
        return green[darkInt];
      case "Failure":
        return red[darkInt];
      case "Overdue":
        return yellow[darkInt];
      case "In Progress":
        return blue[darkInt];
      default:
        return grey[400];
    }
  }

  var chooseSymbol = (status, size) => {
    // const lightInt = 200;
    const darkInt = 700;
    var style = size ? { fontSize: "medium" } : {};
    switch (status) {
      case "Success":
        style.color = green[darkInt];
        return <Done style={style} />;
      case "Failure":
        style.color = red[darkInt];
        return <Cancel style={style} />;
      case "Overdue":
        style.color = yellow[darkInt];
        return <Warning style={style} />;
      case "In Progress":
        style.color = blue[darkInt];
        return <HourglassFull style={style} />;
      case "Due":
        return <HourglassEmpty style={style} />;
      default:
        return <Remove style={style} />;
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
      <TableRow style={{
        borderLeft: bar ? "10px solid" : "0",
        borderColor: chooseColor(events_data.status)
      }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{events_data.name}</TableCell>
        <TableCell>
          {symbol ? chooseSymbol(events_data.status, false) : <React.Fragment />}
          {events_data.status}
        </TableCell>
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
                    <TableRow style={{
                      borderLeft: bar ? "5px solid" : "0",
                      borderColor: chooseColor(path.step_status)
                    }}>
                      <TableCell>{path.step_name}</TableCell>
                      <TableCell>{path.step_description}</TableCell>
                      <TableCell>
                        {symbol ? chooseSymbol(path.step_status, true) : <React.Fragment />}
                        {path.step_status}
                      </TableCell>
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