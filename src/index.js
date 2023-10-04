import { loadCurrentWeather } from "./currentWeather"






const url = "http://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=London&days=3&aqi=no&alerts=no"
const url2 = "http://api.weatherapi.com/v1/current.json?key=a78d8065ac934df5b78171003230310&q=London&aqi=no"

loadCurrentWeather(url)









async function loadToDOM() {
    testerDOM = document.querySelector(".tester")
    const data = await loadJson(url)
    testerDOM.innerHTML = data.location.name
}

// loadToDOM()