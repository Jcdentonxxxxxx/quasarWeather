require('dotenv').config();
const Sequelize = require("sequelize");
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

const sequelize = new Sequelize("usersdb2", "root", "", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: false
  }
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.status(200).json('Сервер работает123');
})

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

start();

module.exports = mysqlConnection;
