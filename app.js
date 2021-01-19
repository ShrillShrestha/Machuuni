const express = require('express');
require('dotenv').config();

const mapRoute = require('./Routes/mapRoute');
const corsMiddleware = require ('./Middlewares/corsAllowOrigin');

const app = express();

app.use('/map', corsMiddleware.setCorsAuth, mapRoute);

//listening in port
app.listen(8000, ()=>{
  console.log("Running in port 8000!");
})