const database = require('./database');

exports.RetrieveData = async (req, res) => {
  const defaultDate = new Date().toISOString()
  const startDate = req.query.startDate ? req.query.startDate : defaultDate.slice(0, 10)
  const endDate = req.query.endDate ? req.query.endDate : defaultDate.slice(0, 10)


  const listDestructor = (list) => {
    let data = {
      timeList: [],
      tempList: [],
      humidityList: []
    };

    for (item in list) {
      const timestamp = new Date(list[item].date_time + 'z');

      const localTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      data.timeList.push(localTime)
      data.tempList.push(list[item].temperature)
      data.humidityList.push(list[item].humidity)
    };
    return data
  };

  try {
    const data = await database.GetData(startDate, endDate);
    const formattedData = listDestructor(data.rows);
    res.send(formattedData)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

