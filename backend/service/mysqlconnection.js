// let mysql = require('mysql');
// // let exports = module.exports;

// let mysqlConnection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'authentication',
//   multipleStatements: true
// });


// exports.selectUserName = function (email, callback) {
//   var sql = `SELECT Id FROM usersdb WHERE Email = "${email}";`;
//   mysqlConnection.query(sql, email, function (err, result) {
//     if (err) {
//       Console.log('Ошибка соединения');
//       return;
//     }
//     console.log(result)
//   });
// };
