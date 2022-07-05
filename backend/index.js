require('dotenv').config();
const mysql = require('mysql');
const bodyparser = require('body-parser');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(bodyparser.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

let mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'authentication',
  multipleStatements: true
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.status(200).json('Сервер работает123');
})

mysqlConnection.query("INSERT usersdb(Email, Password, ActivationLink ) VALUES(131, 131, 131)",
  function (err, results, fields) {

    console.log(results); // собственно данные

  });

const start = async () => {

  try {
    mysqlConnection.connect((err) => {
      if (!err)
        console.log('Connection Established Successfully');
      else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
    });
    app.listen(PORT, () => console.log(`Server start on PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}
module.exports = mysqlConnection;
start();


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
