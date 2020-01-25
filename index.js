const http = require('http');
const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;

const router = express.Router();


//DB//

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
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




//view
app.set('views', path.join(__dirname,'views'));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


//routes
app.get('/', (req, res, next)=>{
    let sql = 'SELECT * FROM items';
    let items = mysqlConnection.query(sql, (err, rows)=>{
        if(err) throw err;
        res.render('user_index',{
            title : 'SIMPLE INVENTORY using NodeJS/ MySQL',
            items : rows
        })
    })
  
})

app.get('/add', (req,res ,next)=>{
    res.render('user_add', {
        title: 'SIMPLE INVENTORY using NodeJS/ MySQL'
    
    })
})

app.post('/save', (req,res, next)=>{
    let data = {name: req.body.name, qty: req.body.qty, amount: req.body.amount };
    let sql = "INSERT INTO items SET ?";
    
    let query = mysqlConnection.query(sql, data,(err, results) =>{
        if(err) throw(err);
        res.redirect('/');
    })
})

app.get('/edit/:itemId', (req, res, next) => {
    const itemId = req.params.itemId;
    let sql = `SELECT * FROM items where id = ${itemId}`;
    let query = mysqlConnection.query(sql, (err, result) => {
        if(err) throw err;
        res.render('user_edit', {
            title:  'SIMPLE INVENTORY using NodeJS/ MySQL',
            items : result[0]
        })
    })
})

app.post('/update', (req, res, next) =>{
    const itemId = req.body.id;
    let sql = "update items SET name='"+req.body.name+"', qty= '"+req.body.qty+"', amount='"+req.body.amount+"' where id ="+req.body.id;
    let query = mysqlConnection.query(sql, (err, results) =>{
        if(err) throw err;
        res.redirect('/');
    })
})
app.get('/delete/:itemId', (req, res, next) => {
    const itemId = req.params.itemId;
    let sql = `DELETE FROM items where id = ${itemId}`;
    let query = mysqlConnection.query(sql, (err, result) => {
        if(err) throw err;
        res.redirect('/');

    })
})

//server//
app.listen(3000, () =>{
    console.log('Server started on 3000...')

})





module.exports = router;