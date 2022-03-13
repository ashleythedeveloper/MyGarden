import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


export default function MaterialUIPickers(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState({
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10)
    });
  const handleStartDateChange = (date) => {
    props.callback({
        startDate: date.toISOString().slice(0, 10),
        endDate: selectedDate.endDate
    })
    setSelectedDate({
        startDate: date.toISOString().slice(0, 10),
        endDate: selectedDate.endDate
    });
    ;
  };
  const handleEndDateChange = (date) => {
    props.callback({
        startDate: selectedDate.startDate,
        endDate: date.toISOString().slice(0, 10)
    });
    setSelectedDate({
        startDate: selectedDate.startDate,
        endDate: date.toISOString().slice(0, 10)
    });
    
  };
  console.log(selectedDate)
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="start-date-picker-dialog"
          label="Start Date"
          format="dd/MM/yyyy"
          value={selectedDate.startDate}
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
          value={selectedDate.endDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}