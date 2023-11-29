var express = require("express");
var cors = require("cors");
var mongoClient = require("mongodb").MongoClient;

var conString = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/users", (req, res)=>{
    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("projectdb");
        database.collection("tblusers").find({}).toArray().then((docs)=>{
            res.send(docs);
            res.end();
        })
    })
});

app.post("/adduser", (req, res)=>{
     var user = {
        UserId: req.body.UserId,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Mobile: req.body.Mobile
     };
     mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("projectdb");
        database.collection("tblusers").insertOne(user).then(()=>{
            console.log("User Added Successfully.");
            res.redirect("/users");
        })
     })
});

app.listen(3300);
console.log(`Server Started : http://127.0.0.1:3300`);




