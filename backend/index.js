require('dotenv').config();
const mysql = require("mysql2");
const Sequelize = require("sequelize");
const bodyparser = require('body-parser');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index');

require('./database');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(bodyparser.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);




app.listen(PORT);

// const sequelize = new Sequelize("authentications", "root", "", {
//   dialect: "mysql",
//   host: "localhost",
//   define: {
//     timestamps: false
//   }
// });



// sequelize.query("CREATE DATABASE `authentications`;").then((data) => {

// });

// const userSecTable = require(`${__dirname}/models/user`)(sequelize);

// app.post('/', (req, res) => {
//   console.log(req.body);
//   res.status(200).json('Сервер работает123');
// })

// sequelize.sync().then(() => {
//   app.listen(PORT, () => console.log(`Server start on PORT = ${PORT}`));
// }).catch(err => console.log(err));

// const start = async () => {
//   console.log(UserShema);
//   try {
//     mysqlConnection.connect((err) => {
//       if (!err)
//         console.log('Connection Established Successfully');
//       else
//         console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
//     });


//     app.listen(PORT, () => console.log(`Server start on PORT = ${PORT}`));
//   } catch (e) {
//     console.log(e);
//   }
// }

// start();
