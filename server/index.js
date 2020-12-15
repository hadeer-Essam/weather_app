// Setup empty JS object to act as endpoint for all routes
let data;
// Express to run server and routes
const express = require("express");

/* Dependencies */
/* Middleware*/
const bodyparser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

// create instance of my app
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
// app.use(express.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static("../weather_app"));
// intialize the port
const port=3000 || process.env.port;
// Callback to debug
app.listen(port,()=>{console.log("I am working on local host",port)});

// Initialize all route with a callback function
// receive user inputs
app.post("/weather",(req,res)=>{
 data = req.body;
 console.log(data);
 res.send("data received");
});

// fetching weather data from the api using zipcode and send it back to client side
app.get("/weather",async(req,res)=>{
    try{  
        const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${data.zipcode},us&units=metric&appid=a8f364580d482c2956199698bc7b566e`);        const weatherData = await weatherResponse.json();
        res.send([weatherData]);
        console.log(weatherData);
    }catch(err){
        res.send(["error",err.message]);
    }
});