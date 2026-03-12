let inputdata = document.querySelector('.head input');
let find = "Landon";
let search = document.querySelector('.searchfield i');

search.addEventListener('click', () => {

    find = capitalize(inputdata.value);
    getdata(find);
});

inputdata.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        find = capitalize(inputdata.value);
        getdata(find);
    }
});

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const getdata = (value) => {
    let url = `https://api.weatherapi.com/v1/forecast.json?key=277f75598eb244809d660436243006&q=${value}&days=7&aqi=yes&alerts=yes`
  let fetchdata=  fetch(url)
        .then((response) => response.json())
        .then((result) => showdata(result))
        .catch((error) => console.log(error))

}

let degree = document.querySelector('.temp');
let degreetext = document.querySelector('.degreetext');
let datetime = document.querySelector('.datetime');


const showdata = (result) => {

    console.log(result)
    let location = document.querySelector('.location');

    degree.innerHTML = `<span class="degree">${result.current.temp_c} <sup>o<sub>C</sub></sup></span><span class="image"><img src="${result.current.condition.icon}" alt="image"></span>`

    degreetext.innerHTML = `<span class="degreedate">${day(result.forecast.forecastday[0].date)}</span><span>${result.current.condition.text}</span>`

    location.innerHTML = `<span class="country"><i class="fa-solid fa-location-dot"></i>${result.location.country}</span><p class="lon-lat"><span class="lon">lon : ${result.location.lon}</span><span class="lat">lat : ${result.location.lat}</span></p>`

    let datetimedata = result.current.last_updated.split(' ');

    let date = new Date()
    let time = date.toLocaleTimeString();

    datetime.innerHTML = ` <p class="date"><i class="fa-solid fa-calendar-days"></i><span class="date">${datetimedata[0]} </span></p><p class="time"><i class="fa-solid fa-clock"></i><span>${time}</span></p> `

    displayinfo(result);
    showborder(0);
}


let quality = document.querySelector('.info .quality');
let suninfo = document.querySelector('.info .suninfo');
let pressure = document.querySelector('.info .presure');
let humidity = document.querySelector('.info .humidity');
let visibility = document.querySelector('.info .visibility');
let wind = document.querySelector('.info .wind');



const displayinfo = (result) => {

    quality.innerHTML = `  <div class="headportion"><span class="headname">Air Quality Index</span> <i class="fa-solid fa-lungs"></i></div><div class="data">
<p><span class="name">CO</span><span class="value">${result.current.air_quality.co}</span></p>
<p><span class="name">NO <sub>2</sub></span><span class="value">${result.current.air_quality.no2}</span></p>
<p><span class="name">SO <sub>2</sub></span><span class="value">${result.current.air_quality.so2}</span></p>
<p><span class="name">O <sub>3</sub></span><span class="value">${result.current.air_quality.o3}</span></p>
</div>`;

    suninfo.innerHTML = `<div class="headportion"><span class="headname">Sunrise & Sunset</span><i class="fa-solid fa-sun"></i></div>
<div class="data"><p class="rise"><i class="fa-solid fa-cloud-sun"></i><span>Sunrise</span><span class="value">${result.forecast.forecastday[0].astro.sunrise}</span>
</p><p class="set"><i class="fa-solid fa-moon"></i><span>Sunset</span><span class="value">${result.forecast.forecastday[0].astro.sunset}</span></p></div>`

    pressure.innerHTML = `  <p class="headname">Pressure</p><div class="data"><p><i class="fa-solid fa-arrows-left-right-to-line"></i>
        <span class="value">${result.current.pressure_mb}mb</span></p></div>`

    humidity.innerHTML = `   <p class="headname">Humidity</p><div class="data"><p><i class="fa-solid fa-droplet"></i>
        <span class="value">${result.current.humidity}%</span></p></div>`

    visibility.innerHTML = `  <p class="headname">Visibility</p><div class="data"><p><i class="fa-solid fa-eye"></i>
        <span class="value">${result.current.vis_km}Km</span></p></div>`

    wind.innerHTML = `<p class="headname">Wind</p><div class="data"><p><i class="fa-solid fa-wind"></i>
        <span class="value">${result.current.wind_kph}Kph</span></p></div> `

    updatehoursdays(result);
}


let hourinfo = document.querySelector('.hourinfo');
let daysinfo = document.querySelector('.daysinfo');

let borderday = 0;

const updatehoursdays = (result) => {
    hourinfo.innerHTML = '';
    daysinfo.innerHTML = '';
    for (let i = 0; i < 24; i++) {
        let div = document.createElement('div');
        div.className = 'hourdata';
        let datetimedata = result.forecast.forecastday[0].hour[i].time.split(' ');
        div.innerHTML = `<span class="time">${datetimedata[1]}</span><span class="image"><img src="${result.forecast.forecastday[0].hour[i].condition.icon}" alt="image"></span><span class="celcius">${result.forecast.forecastday[0].hour[i].temp_c} <sup>o</sup></span>`
        hourinfo.appendChild(div);

        setTimeout(() => {
            div.classList.add('show');
        }, i * 100);
    }

    for (let i = 0; i < result.forecast.forecastday.length; i++) {
        let div = document.createElement('div');
        div.className = `weekday day-${i}`;
        div.innerHTML = `<span class="day">${day(result.forecast.forecastday[i].date)}</span><img src="${result.forecast.forecastday[i].day.condition.icon}" alt="day"><span class="textvalue">${result.forecast.forecastday[i].day.condition.text}</span><span class="dayvalue">${result.forecast.forecastday[i].day.avgtemp_c} <sup>o<sub>C</sub></sup></span>`
        daysinfo.appendChild(div)
        setTimeout(() => {
            div.classList.add('show');
        }, i * 100);
    }

    showborder(borderday);
    displayweekdata(result);
}


const displayweekdata = (result) => {
    let weekdays = document.querySelectorAll('.weekday');
    weekdays.forEach((day) => {
        day.addEventListener('click', () => {
            showWeekdata(result, day.classList[1].split('-')[1]);
        });
    });
}


const showWeekdata = (result, i) => {
    borderday = i;
    showborder(borderday);

    degree.innerHTML = `<span class="degree">${result.forecast.forecastday[i].day.avgtemp_c} <sup>o<sub>C</sub></sup></span><span class="image"><img src="${result.forecast.forecastday[i].day.condition.icon}" alt="image"></span>`
    degreetext.innerHTML = `<span class="degreedate">Average</span><span>${result.forecast.forecastday[i].day.condition.text}</span>`
    datetime.innerHTML = ` <p class="date"><i class="fa-solid fa-calendar-days"></i><span class="date">${result.forecast.forecastday[i].date} </span></p><p class="time"><i class="fa-solid fa-clock"></i><span>${day(result.forecast.forecastday[i].date)}</span></p> `

    let co = result.forecast.forecastday[i].day.air_quality?.co?.toFixed(1) ?? 'N/A';
    let no2 = result.forecast.forecastday[i].day.air_quality?.no2?.toFixed(1) ?? 'N/A';
    let so2 = result.forecast.forecastday[i].day.air_quality?.so2?.toFixed(1) ?? 'N/A';
    let o3 = result.forecast.forecastday[i].day.air_quality?.o3?.toFixed(1) ?? 'N/A';

    quality.innerHTML = `  <div class="headportion"><span class="headname">Air Quality Index</span> <i class="fa-solid fa-lungs"></i></div><div class="data">
    <p><span class="name">CO</span><span class="value">${co}</span></p>
    <p><span class="name">NO <sub>2</sub></span><span class="value">${no2}</span></p>
    <p><span class="name">SO <sub>2</sub></span><span class="value">${so2}</span></p>
    <p><span class="name">O <sub>3</sub></span><span class="value">${o3}</span></p>
    </div>`;

    suninfo.innerHTML = `<div class="headportion"><span class="headname">Sunrise & Sunset</span><i class="fa-solid fa-sun"></i></div>
    <div class="data"><p class="rise"><i class="fa-solid fa-cloud-sun"></i><span>Sunrise</span><span class="value">${result.forecast.forecastday[i].astro.sunrise}</span>
    </p><p class="set"><i class="fa-solid fa-moon"></i><span>Sunset</span><span class="value">${result.forecast.forecastday[i].astro.sunset}</span></p></div>`

    pressure.innerHTML = `  <p class="headname">Pressure</p><div class="data"><p><i class="fa-solid fa-arrows-left-right-to-line"></i>
            <span class="value">${result.forecast.forecastday[i].hour[0].pressure_mb}mb</span></p></div>`

    humidity.innerHTML = `   <p class="headname">Humidity</p><div class="data"><p><i class="fa-solid fa-droplet"></i>
            <span class="value">${result.forecast.forecastday[i].day.avghumidity}%</span></p></div>`

    visibility.innerHTML = `  <p class="headname">Visibility</p><div class="data"><p><i class="fa-solid fa-eye"></i>
            <span class="value">${result.forecast.forecastday[i].day.avgvis_km}Km</span></p></div>`

    wind.innerHTML = `<p class="headname">Wind</p><div class="data"><p><i class="fa-solid fa-wind"></i>
            <span class="value">${result.forecast.forecastday[i].day.maxwind_kph}Kph</span></p></div> `


    hourinfo.innerHTML = ''

    for (let j = 0; j < 24; j++) {
        let div = document.createElement('div');
        div.className = 'hourdata';
        let datetimedata = result.forecast.forecastday[i].hour[j].time.split(' ');
        div.innerHTML = `<span class="time">${datetimedata[1]}</span><span class="image"><img src="${result.forecast.forecastday[i].hour[j].condition.icon}" alt="image"></span><span class="celcius">${result.forecast.forecastday[i].hour[j].temp_c} <sup>o</sup></span>`
        hourinfo.appendChild(div);

        setTimeout(() => {
            div.classList.add('show');
        }, j * 100);
    }
}

const showborder = (index) => {
    let weekdays = document.querySelectorAll('.weekday');
    weekdays.forEach(day => day.classList.remove('active-day'));
    weekdays[index].classList.add('active-day');
};

const day = (data) => {
    const date = new Date(data);
    const options = { weekday: 'long' };
    const day = date.toLocaleDateString('en-US', options);
    console.log(day)
    return day;
}

getdata(find)

