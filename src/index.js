import { loadCurrentWeather } from "./currentWeather"

let url = "http://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=New York&days=3&aqi=no&alerts=no"

loadCurrentWeather(url)

const searchform = document.querySelector("[data-form]")


searchform.addEventListener('submit', async (e) => {
    e.preventDefault()
    const searchInput = document.querySelector("#search").value
    url = `http://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=${searchInput}&days=3&aqi=no&alerts=no`
    await loadCurrentWeather(url);
})








async function loadToDOM() {
    testerDOM = document.querySelector(".tester")
    const data = await loadJson(url)
    testerDOM.innerHTML = data.location.name
}

// loadToDOM()