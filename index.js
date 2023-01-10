const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({

  host: "localhost",
  user: "root",
  password: "12345",
  database: "pravindb"
});

connection.connect(function (error) {
  if (error) {
    console.log("error : " + error.message);
  }
  else {
    console.log("Connected Ho gaya Bhai Saab");
    connection.query("select * from login", func = (error, result) => {
      if (error) throw error;
      console.log(result);
    })
  }
})



// get request for register html file form
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})


// Post request for register form
app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const lastname = req.body.lastname;
  connection.connect(function (error) {
    if (error) throw error;
    const sql = "INSERT INTO login (username,password,lastname) VALUES ('" + username + "','" + password + "','" + lastname + "')";
    connection.query(sql, function (error, result) {
      if (error) throw error;
      res.send('Registration Successfull.' + result.insertId);
    })



  })
})

// get request for login html file form

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});


// Post request for Login form

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.connect(function (error) {
    if (error) throw error;
    const sql = "SELECT * FROM login WHERE username = '" + username + "' AND password = '" + password + "'";
    connection.query(sql, function (error, result) {
      if (error) throw error;
      if (result.length > 0) {
        res.send('Logged in successfully');
      } else {
        res.send('Invalid username or password');
      }
    });
  });
});


//  HTML OPEN WITH LIVE SERVER AND OPEN AT PORT 3000
// http://127.0.0.1:3000/login
app.listen(3000, () => {
  console.log('Listening on port 3000...');
});