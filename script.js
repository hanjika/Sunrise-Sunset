function submitForm(form) {
    const place = form.place.value;
    const date = form.date.value;

    getLatLng(place, date);
}

async function getLatLng(place, date) {
    const response = await fetch ('https://geocode.xyz/' + place + '?json=1');
    const responseObj = await response.json();
    const lat = await responseObj.latt;
    const lng = await responseObj.longt;
    const result = getRiseSet(place, date, lat, lng);
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
    sunriseSun.classList.add('half-sun');

    const sun = document.createElement('img');
    sun.setAttribute('src', 'Images/sun.png');

    const sunsetSun = document.createElement('img');
    sunsetSun.setAttribute('src', 'Images/half-sun.png');
    sunsetSun.classList.add('half-sun');

    const times = document.createElement('div');
    times.classList.add('sunrise-sunset-times');

    const riseDiv = document.createElement('div');
    riseDiv.classList.add('sunrise');
    
    const riseTime = document.createElement('p');
    riseTime.innerText = data.sunrise;

    const noonDiv = document.createElement('div');
    noonDiv.classList.add('noon');

    const noonTime = document.createElement('p');
    noonTime.innerText = data.noon;

    const setDiv = document.createElement('div');
    setDiv.classList.add('sunset');

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
    result.appendChild(placeh2);
    result.appendChild(dateh3);
    result.appendChild(diagram);
    result.appendChild(times);
    document.querySelector('main').appendChild(result);
}