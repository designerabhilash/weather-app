const key = '8a5b8f62300c2b2d8f95e5bf25fd4a36';
const requestCity = async (city) => {
    const proxy = 'https://cors-anywhere.herokuapp.com';
    const api = `${proxy}//api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    const response = await fetch(api)
    const data = await response.json();
    return data;
}

const ktoC = (k) => {
    const celcius = Math.round(k - 273.15)
    return celcius
}

const date = document.querySelector('.date');
const weatherday = document.querySelector('.weather-day');
const temperature = document.querySelector('.temperature');
const icon = document.querySelector('.icon');
const tempdescp = document.querySelector('.temp-descp');
const citys = document.querySelector('.citys');
const country = document.querySelector('.country');
// const feelslike = document.querySelector('.feels-like')
const time = document.querySelector('.time')

const updateWeatherapp = (city) => {
    // console.log(city)
    const present = new Date();
    const presentTime = new Date().toLocaleTimeString()

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date(present);
    let dayName = days[d.getDay()];

    date.innerHTML = `${present.getDate()}-${(present.getMonth())+1}-${present.getFullYear()}`
    weatherday.textContent = dayName
    // feelslike.innerHTML = `${ktoC(city.main.feels_like)} <sup>o</sup>C`
    time.textContent = presentTime
    temperature.innerHTML = `${ktoC(city.main.temp)} <sup>o</sup>C`
    tempdescp.textContent =  city.weather[0].description
    citys.textContent = city.name
    country.textContent = city.sys.country
    icon.innerHTML = `<img src='http://openweathermap.org/img/wn/${city.weather[0].icon}.png'>`
}

const searchsubmit = document.querySelector('.searchsubmit')
const searchcity = document.querySelector('#searchcity')

searchsubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    const citySearch = searchcity.value;
    searchsubmit.reset();

    requestCity(citySearch)
    .then(data => {
        updateWeatherapp(data)
    })
    .catch(err => {
        console.error(err)
    })
})