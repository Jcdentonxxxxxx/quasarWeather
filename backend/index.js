require('dotenv').config();
const mysql = require("mysql2");

const Sequelize = require("sequelize");
const dbConfig = require('./config/database.js');


const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const start = async () => {
  try {

    const connection = new Sequelize(dbConfig);

    app.listen(PORT, () => {
      console.log(`Server run! PORT: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
