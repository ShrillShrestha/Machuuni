//importing necessary modules
const express = require('express');
require('dotenv').config();
// const Points = require('./Utils/markerPoint');
const mapRoute = require('./Routes/mapRoute');
const corsMiddleware = require ('./Middlewares/corsAllowOrigin');

//intializing web app
const app = express();

//route to the map functions to retrive markers
app.use('/map', corsMiddleware.setCorsAuth, mapRoute);

//listening in port 3000 for client
app.listen(8000, ()=>{
  console.log("Running in port 8000!");
})