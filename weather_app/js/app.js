// import all of my elements 
import {section,zipCode,feelings,submit,apiErr,weatherIcon,description,city,slider,temperature,time,userFeelings} from './elements.js';


// slide to weather section smoothly
slider.addEventListener('click',(event)=>{
    event.preventDefault();
    const offsetTop=section.offsetTop;
    scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
});

// getting user inputs and send them to server
submit.addEventListener("click",async()=>{
    let userInputs={
        zipcode:zipCode.value,
        feeling:feelings.value
    }
    let date = new Date().toLocaleString();
    await postData(userInputs);
    let weather= await getWeather();
    // console.log(weather);
    
    // check if user entered the write api or not 
    if(weather[0].cod==404 || weather[0].cod==400){
        apiErr.innerHTML = weather[0].message;
        apiErr.style.display="block";

    }else if(weather[0].cod==200 ){
        apiErr.style.display="none";
        displayWeather(weather[0],date,userInputs.feeling);
    }
    
});

//to send data to server
async function postData(data){
    const response = await fetch("/weather",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    });
    try{
        const check = response.text();
        // console.log(check);
      
    }catch(err){
        console.log(err);
    }
};

// get the weather info from server
async function getWeather(){
    const res= await fetch("/weather");
    try{
        const weather = await res.json();
        return weather;
    }catch(error){
        console.log(error);
    }
   
}

function displayWeather(weather,date,feeling){
    document.querySelector(".widget .forecast").style.visibility="visible";
    document.querySelector(".widget .feelings").style.visibility="visible";
    city.innerHTML = `${weather.name} , ${weather.sys.country}`;
    temperature.innerHTML = weather.main.temp.toFixed(1);
    let span = document.createElement("span");
    span.innerHTML="&deg;C";
    span.setAttribute("id","degree");
    temperature.appendChild(span);
    description.innerHTML = weather.weather[0].description;
    userFeelings.innerHTML = feeling;
    time.innerHTML = date;
    let icon = weather.weather[0].icon;
    weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
}