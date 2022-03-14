const dotenv = require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DATABASEUSERNAME,
  host: process.env.DATABASEHOST,
  database: process.env.DATABASENAME,
  password: process.env.DATABASEPASSWORD,
  port: process.env.DATABASEPORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

exports.GetData = async (startDate, endDate) => {
  console.log(startDate)
  const query = await pool.query("SELECT * FROM my_garden_records WHERE date_time BETWEEN $1 AND $2 ORDER BY id ASC;", [(new Date(startDate + 'T00:00:00')).getTime(), (new Date(endDate + 'T23:59:59')).getTime()])
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw Error("There has been an error retrieving the data.")
    })
  return query
}
