let locationNameInput=document.getElementById('locatName');
let btnSearch=document.getElementById('search');
let locDate=document.getElementById('day-name');
let locDayNum=document.getElementById('day-num');
let locMonth=document.getElementById('month');

let yourTown=document.getElementById('town');
let tempreture=document.getElementById('temp');
let weatherPic=document.getElementById('picture');
let weathercondition=document.getElementById('condition');
let humidity=document.getElementById('humidity');
let windSpeed=document.getElementById('wind');
let windDirection=document.getElementById('windDir');
////next Day////
let locDate2=document.getElementById('day-name2');
let weatherPic2=document.getElementById('picture-two');
let tempreture2=document.getElementById('temp2');
let tempreture2_min=document.getElementById('temp2_min');
let weathercondition2=document.getElementById('condition2');
///////third Day/////////
let locDate3=document.getElementById('day-name3');
let weatherPic3=document.getElementById('picture3');
let tempreture3=document.getElementById('temp3');
let tempreture3_min=document.getElementById('temp3_min');
let weathercondition3=document.getElementById('condition3');

let apiKey='fa0f445ee099453b87b71751241701';

async function getData(location){
    let date=new Date();

    let response=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=no`);
    let data=await response.json();

    if(response.status==400|| response.status==404||data.error){
        document.querySelector('.error').style.display='block';
        document.querySelector('.dayes').style.display='none'; 
    }
    else{

        locDate.innerHTML=date.toLocaleDateString('en-us',{weekday:'long'});
        locDayNum.innerHTML=date.getDate();
        locMonth.innerHTML=date.toLocaleDateString('en-us',{month:'long'});
        yourTown.innerHTML=data.location.name;
        tempreture.innerHTML=data.current.temp_c+'°C';
        weatherPic.setAttribute('src','https://'+data.current.condition.icon);
        weathercondition.innerHTML=data.current.condition.text;
    
        humidity.innerHTML=data.current.humidity+'%';
        windSpeed.innerHTML=data.current.wind_kph+'km/h';
        windDirection.innerHTML=data.current.wind_dir;
    
        getNextDayes(data);
        getThirdDay(data)
    }
    
    }

function getNextDayes(data){
    let date=new Date(data.forecast.forecastday[1].date)
    locDate2.innerHTML=date.toLocaleDateString('en-us',{weekday:'long'});

    weatherPic2.setAttribute('src','https://'+data.forecast.forecastday[0].day.condition.icon);
    tempreture2.innerHTML=data.forecast.forecastday[0].day.maxtemp_c+' °C';
    tempreture2_min.innerHTML=data.forecast.forecastday[0].day.mintemp_c+'°';
    weathercondition2.innerHTML=data.forecast.forecastday[0].day.condition.text;
      }

function getThirdDay(data){
        let date=new Date(data.forecast.forecastday[2].date)

        locDate3.innerHTML=date.toLocaleDateString('en-us',{weekday:'long'});
        weatherPic3.setAttribute('src','https://'+data.forecast.forecastday[1].day.condition.icon);
        tempreture3.innerHTML=data.forecast.forecastday[1].day.maxtemp_c+' °C';
        tempreture3_min.innerHTML=data.forecast.forecastday[1].day.mintemp_c+'°';
        weathercondition3.innerHTML=data.forecast.forecastday[1].day.condition.text;
    }

function clear(){
    locationNameInput.value=''
}

function onOpen(){
    locationNameInput.value='cairo';
    getData(locationNameInput.value);
}
onOpen()

btnSearch.addEventListener('click',async function(){
    await getData(locationNameInput.value);
    clear();
})

locationNameInput.addEventListener('keyup',async function(){
    await getData(locationNameInput.value);
    clear();
})


