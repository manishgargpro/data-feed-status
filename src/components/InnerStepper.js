import React from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@material-ui/core';

export default function InnerStepper(props) {

  const { path_data, chooseSymbol } = props;

  var getActiveStep = () => {
    for (let index = 0; index < path_data.length; index++) {
      if (path_data[index].step_status === "In Progress" ||
        path_data[index].step_status === "Overdue" ||
        path_data[index].step_status === "Failure") {
        return index
      }
    }
  }

  return (
    <Stepper orientation="vertical" activeStep={getActiveStep()}>
      {
        path_data.map((path) => (
          <Step>
            <StepLabel icon={chooseSymbol(path.step_status, false)}>
              {path.step_name}
            </StepLabel>
            <StepContent>{path.step_description}</StepContent>
          </Step>
        ))
      }
    </Stepper>
  );
}