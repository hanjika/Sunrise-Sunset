function submitForm(form) {
    const place = form.place.value;
    const date = form.date.value;

    getLatLng(place, date);
}

async function getLatLng(place, date) {
    try {
        const response = await fetch ('https://geocode.xyz/' + place + '?json=1');
        const responseObj = await response.json();
        const lat = await responseObj.latt;
        const lng = await responseObj.longt;
        getRiseSet(place, date, lat, lng);
    } catch (error) {
        console.log('Error')
    }  
}

async function getRiseSet(place, date, lat, lng) {
    const response = await fetch('https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + lng + '&date=' + date);
    const responseObj = await response.json();

    const resultObj = {
        place: place,
        date: date,
        sunrise: await responseObj.results.sunrise,
        sunset: await responseObj.results.sunset,
        noon: await responseObj.results.solar_noon
    }

    displayResults(resultObj);
}

/* TO CORRECT TIME OFFSET */

// async function getRiseSet(place, date, lat, lng) {
//     const response = await fetch('https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + lng + '&date=' + date);
//     const responseObj = await response.json();
//     const sunriseUTC = await responseObj.results.sunrise;
//     const sunsetUTC = await responseObj.results.sunset;
//     const noonUTC = await responseObj.results.solar_noon;

//     const timeresponse = await fetch('http://api.geonames.org/timezoneJSON?lat=' + lat + '&lng=' + lng +'&username=demo');
//     const timeresponseObj = await timeresponse.json();
//     console.log(timeresponseObj);
    // const offset = await timeresponseObj.gmtOffset;
    // console.log(offset);

//     const resultObj = {
//         place: place,
//         date: date,
//         sunrise: sunriseUTC,
//         sunset: await responseObj.results.sunset,
//         noon: await responseObj.results.solar_noon
//     }

//     console.log(sunriseUTC);
//     console.log(resultObj.sunrise)

//     displayResults(resultObj);
// }

function alreadyResult() {
    const result = document.querySelector('.result');

    if (result) {
        result.parentNode.removeChild(result);
    }
}

function formatDate(date) {
    return new Date(date).toDateString();
}

function displayResults(data) {
    alreadyResult();

    const result = document.createElement('div');
    result.classList.add('result');

    const placeh2 = document.createElement('h2');
    placeh2.innerText = data.place;

    const dateh3 = document.createElement('h3');
    const dateFormatted = formatDate(data.date);
    dateh3.innerText = dateFormatted;

    const diagram = document.createElement('div');
    diagram.classList.add('sunrise-sunset-diagram');

    const sunriseSun = document.createElement('img');
    sunriseSun.setAttribute('src', 'Images/half-sun.png');
    sunriseSun.classList.add('sunrise');
    sunriseSun.classList.add('sunrise-half-sun');

    const sun = document.createElement('img');
    sun.setAttribute('src', 'Images/sun.png');
    sun.classList.add('full-sun');

    const sunsetSun = document.createElement('img');
    sunsetSun.setAttribute('src', 'Images/half-sun.png');
    sunsetSun.classList.add('sunset-half-sun');

    const timesDiv = document.createElement('div');
    timesDiv.classList.add('sunrise-sunset-times-div');

    const times = document.createElement('div');
    times.classList.add('sunrise-sunset-times');

    const riseDiv = document.createElement('div');
    riseDiv.classList.add('sunrise-time');
    
    const riseTime = document.createElement('p');
    riseTime.innerText = data.sunrise;

    const noonDiv = document.createElement('div');
    noonDiv.classList.add('noon-time');

    const noonTime = document.createElement('p');
    noonTime.innerText = data.noon;

    const setDiv = document.createElement('div');
    setDiv.classList.add('sunset-time');

    const setTime = document.createElement('p');
    setTime.innerText = data.sunset;

    riseDiv.appendChild(riseTime);
    noonDiv.appendChild(noonTime);
    setDiv.appendChild(setTime);
    diagram.appendChild(sunriseSun);
    diagram.appendChild(sun);
    diagram.appendChild(sunsetSun);
    times.appendChild(riseDiv);
    times.appendChild(noonDiv);
    times.appendChild(setDiv);
    timesDiv.appendChild(times);
    result.appendChild(placeh2);
    result.appendChild(dateh3);
    result.appendChild(diagram);
    result.appendChild(timesDiv);
    document.querySelector('main').appendChild(result);
}