const express = require('express')

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const port = 2000


var cards=[];

app.get("/users/:userid" , (req, res) => {

    console.log("Get user by id : "+ req.params.userid)
    let id=req.params.userid
    console.log(id);
    id= Number(id);
    console.log(id)

    let exists=false
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("users");
      var myobj = req.body
      dbo.collection("list").find({id:id}).toArray(function(err, data) {
        if (err) throw err;
        console.log(data)
  
        res.json(data);
        db.close();
      });
    });


})

app.get("/users/" , (req, res) => {

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("users");
    var myobj = req.body
    dbo.collection("list").find({}).toArray(function(err, data) {
      if (err) throw err;
      console.log(data)

      res.json(data);
      db.close();
    });
  });


})


app.post("/users/new" , (req, res) => {

    console.log("Creating New user")
     console.log(req.body);
     
   

     MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("users");
      var myobj = req.body
      dbo.collection("list").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 user inserted");
        
        db.close();
      });
    });



})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })