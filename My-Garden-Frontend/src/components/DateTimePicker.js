import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { alpha } from '@material-ui/core/styles'


export default function MaterialUIPickers(props) {


  const handleStartDateChange = (date) => {
    props.callback({
      startDate: new Date(date).toISOString().slice(0, 10),
      endDate: props.data.endDate
    })
  };


  const handleEndDateChange = (date) => {
    props.callback({
      startDate: props.data.startDate,
      endDate: new Date(date).toISOString().slice(0, 10),
    });

  };


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="start-date-picker-dialog"
          label="Start Date"
          format="dd/MM/yyyy"
          value={props.data.startDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="end-date-picker-dialog"
          label="End Date"
          format="dd/MM/yyyy"
          value={props.data.endDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}