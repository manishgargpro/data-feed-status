import React from 'react';
import {
  TableBody,
  TableCell,
  TableRow,
  Collapse,
  IconButton,
  LinearProgress,
  CircularProgress
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
import InnerChild from './InnerChild';
import InnerStepper from './InnerStepper';

export default function CollapsibleRow(props) {
  const { events_data, bar, symbol } = props;
  const [open, setOpen] = React.useState(false);

  var chooseColor = (status) => {
    // const lightInt = 200;
    const darkInt = "A400";
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
    const darkInt = "A700";
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

  var getProgress = () => {
    var currentPath = test_paths[events_data.path];
    var total = currentPath.length
    var done = 0;
    for (let index = 0; index < total; index++) {
      if (currentPath[index].step_status === "Success") {
        done++;
      }
    }
    return (done / total) * 100
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
        <TableCell>
          {/* {symbol && chooseSymbol(events_data.status, false)} */}
          {events_data.name}
        </TableCell>
        <TableCell>
          <CircularProgress
            variant="determinate"
            value={getProgress()}
            style={{
              color: chooseColor(events_data.status)
            }}
          />
        </TableCell>
        {/* <TableCell>{events_data.path}</TableCell> */}
        <TableCell>{events_data.token}</TableCell>
        <TableCell>{events_data.group}</TableCell>
        <TableCell>{processDate(events_data.plan_date)}</TableCell>
        <TableCell>{processTime(events_data.plan_time)}</TableCell>
      </TableRow>
      {/* <TableRow>
        <TableCell style={{
          padding: 0
        }} colSpan={8}>
          <LinearProgress
            variant="determinate"
            value={getProgress()}
            style={{
              colorPrimary: {
                backgroundColor: chooseColor(events_data.status)
              }
            }}
          />
        </TableCell>
      </TableRow> */}
      <TableRow>
        <TableCell style={{
          paddingBottom: 0,
          paddingTop: 0
        }} colSpan={8}>
          <Collapse in={open}>
            {/* <InnerChild
              path_data={test_paths[events_data.path]}
              bar={bar}
              symbol={symbol}
              chooseColor={chooseColor}
              chooseSymbol={chooseSymbol}
            /> */}
            <InnerStepper
              path_data={test_paths[events_data.path]}
              symbol={symbol}
              chooseColor={chooseColor}
              chooseSymbol={chooseSymbol}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}