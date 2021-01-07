//importing necessary modules
const express = require('express');

//intializing web app
const app = express();

//url end point test
app.get("/", (req, res)=>{
  res.send("Hello World!");
})

//listening in port 3000 for client
app.listen(3000, ()=>{
  console.log("Running in port 3000!");
})