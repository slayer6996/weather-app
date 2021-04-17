const express= require("express");
const bodyParser= require("body-parser");
const https= require("https");
const openweathermapApi= require(__dirname+"/openweathermapApi.js");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname));

var temp;
var description;
var icon;
var iconUrl;
var city;
var options = { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric'
};
var today  = new Date();
var date=today.toLocaleDateString(("en-US"),options);

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    console.log(req.body);
    city=req.body.city;
    var apikey= openweathermapApi.key();
    var url= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apikey;
    https.get(url, function(response){
        response.on("data", function(data){
            var weatherdata= JSON.parse(data);
            temp=weatherdata.main.temp;
            description= weatherdata.weather[0].description;
            icon= weatherdata.weather[0].icon;
            iconUrl= " http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.redirect("/weather");
           
        });
    });
});

app.get("/weather", function(req,res){
    res.render('weather', {date:date, city:city, temp: temp, description: description, iconUrl: iconUrl});
});

app.listen(process.env.PORT || 3000, function(){
    console.log("server running on port 3000")
});
