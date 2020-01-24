const mysql = require('mysql');
const express = require('express');
const app = express();


var mysqlConnection = mysql.createConnection({
    host: 'local host',
    user: 'root',
    password: 'password',
    database: 'inventory',
});

mysqlConnection.connect((err)=>{
    if(!err)
        console.log('Database connected succesfully!');
    else
        console.log('Database connection failed \n Error :' + JSON.stringify(err, undefined, 2));
});