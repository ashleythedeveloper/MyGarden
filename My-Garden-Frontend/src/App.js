import { useState, useEffect } from 'react';
import LineChart from './components/LineChart';
import Grid from '@material-ui/core/Grid';
import MaterialUIPickers from './components/DateTimePicker';
import { makeStyles } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core/styles';
import axiosInstance from './components/axiosInstance';
import Loader from './components/Loader';


const useStyles = makeStyles((theme) => ({

  DatePickerGridItem: {
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(6)
  },
  ChartCards: {
    paddingBottom: theme.spacing(6)
  }
}))


const App = () => {

  const classes = useStyles();

  const [appData, setAppData] = useState({
    time: null,
    temp: null,
    humidity: null
  });

  const defaultLoadingState = {
    isLoading: false,
    message: 'Retrieving weather data. One moment.'
  };

  const [loading, setLoading] = useState(defaultLoadingState);

  const [startEndDate, setStartEndDate] = useState({
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10)
  });

  const listDestructor = async (list) => {
    let data = {
      timeList: [],
      tempList: [],
      humidityList: []
    };
    for (let item = 0; item < list.length; item++) {
      const UNIXStringToInt = parseInt(list[item].date_time);
      const usersUTCTime = new Date(UNIXStringToInt);
      const localTime = usersUTCTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

      data.timeList.push(localTime)
      data.tempList.push(list[item].temperature)
      data.humidityList.push(list[item].humidity)
    };
    return data
  };


  useEffect(() => {
    setLoading({ ...loading, isLoading: true })
    axiosInstance.get(`/?startDate=${startEndDate.startDate}&endDate=${startEndDate.endDate}`)
      .then(async (response) => {

        const dataList = await listDestructor(response.data);
        console.log(dataList)
        setAppData({
          time: dataList.timeList,
          temp: dataList.tempList,
          humidity: dataList.humidityList
        })
        setLoading(defaultLoadingState);

      })
      .catch((err) => {
        setLoading(defaultLoadingState);
      })
  }, [startEndDate]);

  if (loading.isLoading) {
    return <Loader message={loading.message} />
  } else {
    return (
      <div className="App">
        <Grid container spacing={0}>
          <Grid item xs={12} align={'center'}>
            <Grid item xs={8} className={classes.DatePickerGridItem}>
              < MaterialUIPickers data={startEndDate} callback={setStartEndDate} />
            </Grid>
          </Grid>
          <Grid item xs={12} align={'center'}>
            <Grid item xs={11} sm={7} className={classes.ChartCards}>
              <LineChart xLable={'Temperature'} xData={appData.temp} xValueFormat={'°'} yData={appData.time} x2Lable={'Humidity'} x2Data={appData.humidity} x2ValueFormat={'%'} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
