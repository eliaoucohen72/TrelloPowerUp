// npm express supervisor mongoose mongodb 

//   setInterval(function(){ }, 3000);

const express = require('express')
var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://daviddcsh:daviddavid1@david-hb1sv.mongodb.net/test?retryWrites=true";

MongoClient.connect(uri, function(err, client) {

//     // const collection = client.db("sprint-tracker").collection("winners");
//   const db = client.db("sprint-tracker");
//   const cursor = db.collection('winners').find({});
//   const list = [];

//   function iterateFunc(doc) {
//       list.push(doc)
//       console.log("doc:", doc)
    
//       // console.log(JSON.stringify(doc, null, 4));
//    }

//   function errorFunc(error) {
//     console.log("GOT AN ERROR: " + error) 
//   }
  
  // cursor.forEach(iterateFunc, errorFunc);

  var app     = express();
  var path    = require("path");

  app.get('/',function(req,res){ 
    res.sendFile(path.join(__dirname + '/burndown.html')) 
  });

  var bodyParser =  require("body-parser");

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  var user_name = '';

  app.post('/',function(req,res){
      console.log(req.body);
      user_name=req.body.name;
      console.log("User name = " + user_name);
  });
  
  app.get('/test', function(req, res, next) {
    
      const db = client.db("sprint-tracker");
      const list = [];

      db.collection('winners').find({}).stream()
          .on('data', function(doc){
            // handle doc
            list.push(doc)
            console.log("doc:", doc);
            console.log("list: ", list);

          })
          .on('error', function(err){
            // handle error
            console.log("GOT AN ERROR: " + err)   
          })
          .on('end', function(){
            // final callback
            res.json({ message: list, userName: user_name});
          });
  });

  
  app.listen(3000);
  console.log("Running at Port 3000");
  // client.close();
  
});











      // const cursor = db.collection('winners').find({});

//       function iterateFunc(doc) {
//           list.push(doc)
//           console.log("doc:", doc);
//           console.log("list: ", list);

//           // res.json({ message: list, userName: user_name});

//           // console.log(JSON.stringify(doc, null, 4));
//        }

//       function errorFunc(error) {
                  
//         res.json({ message: list, userName: user_name});
//         console.log("GOT AN ERROR: " + error) 
//       }
    
    
      // cursor.forEach(iterateFunc, errorFunc);
      