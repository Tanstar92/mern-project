const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
var app = express();
var path = require('path'); 
//Configuring express server
app.use(bodyparser.json());


//MySQL details
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1955',
    database: 'tanicadb',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.post("/submitForm", (req, res) =>{
    console.log(req.body)
    var today = new Date();
    mysqlConnection.query("INSERT INTO `tanicadb`.`bettercontacts` (`email`, `phone`, `message`, `name`, `title`, `timestamp`) VALUES ('" + req.body.email + "', '" + req.body.phone + "', '" + req.body.message +"', '" + req.body.name +"', '" + req.body.title +"', '" + today.toLocaleString() + "');")

    res.send("lol")
})