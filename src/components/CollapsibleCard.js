import React from 'react';
import {
  Collapse,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography
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
// import InnerChild from './InnerChild';
import InnerStepper from './InnerStepper';

export default function CollapsibleCard(props) {
  const { events_data } = props;
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
    <Card>
      <CardHeader
        avatar={
          <div>
            {chooseSymbol(events_data.status, false)}
            {/* <p>{events_data.status}</p> */}
          </div>
        }
        title={
          <div>
            {events_data.name}: {processDate(events_data.plan_date)}, {processTime(events_data.plan_time)}
          </div>
        }
        subheader={
          <CardContent>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </CardContent>
        }
      ></CardHeader>
      <Collapse in={open}>
        <InnerStepper
          path_data={test_paths[events_data.path]}
          chooseColor={chooseColor}
          chooseSymbol={chooseSymbol}
        />
      </Collapse>
    </Card>
  )
}