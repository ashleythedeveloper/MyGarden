import axios from 'axios';
import { useState, useEffect } from 'react';
import LineChart from './components/LineChart';
import Grid from '@material-ui/core/Grid';
import MaterialUIPickers from  './components/DateTimePicker';
import { makeStyles } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  DatePickerGridItem: {
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(6)
  },
  ChartCards: {
    paddingBottom: theme.spacing(6)
  }
}))

function App() {
  const classes = useStyles();

  const [appData, setAppData] = useState({
    time: null,
    temp: null,
    humidity: null
  })
  const [loading, setLoading] = useState(false)

  const [startEndDate, setStartEndDate] = useState({
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10)
  })

  


  const baseURL = 'http://localhost:5000';
  const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
  });


  useEffect(() => {
    axiosInstance.get(`/?startDate=${startEndDate.startDate}&endDate=${startEndDate.endDate}`)
      .then(function (response) {
        // handle success
        setAppData({
          time: response.data.timeList,
          temp: response.data.tempList,
          humidity: response.data.humidityList
        })
        setLoading(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [startEndDate]);


  return (
    <div className="App">
      {console.log(appData)}
      <Grid container spacing={0}>
        <Grid item xs={12} align={'center'}>
          <Grid item xs={8} className={classes.DatePickerGridItem}>
            < MaterialUIPickers callback={setStartEndDate}/>
          </Grid>
          </Grid>
          <Grid item xs={12} align={'center'}>
        <Grid item xs={11} sm={7} className={classes.ChartCards}>
          <LineChart xLable={'Temperature'} xData={appData.temp} xValueFormat={'°'} yData={appData.time} pLable={'Humidity'} pData={appData.humidity} pValueFormat={'%'} loading={loading} />
        </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
