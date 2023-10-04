import { loadCurrentWeather } from "./currentWeather"
import { loadHourlyWeather } from "./hourlyWeather"

let url = "http://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=New York&days=3&aqi=no&alerts=no"

loadCurrentWeather(url) //initialize some data
loadHourlyWeather(url)

const searchform = document.querySelector("[data-form]")
searchform.addEventListener('submit', async (e) => {
    e.preventDefault()
    const searchInput = document.querySelector("#search").value
    url = `http://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=${searchInput}&days=3&aqi=no&alerts=no`
    await loadCurrentWeather(url);
})


const toggleDegree = document.querySelector(".hidden-checkbox")
toggleDegree.addEventListener("change", async () => {
    if (toggleDegree.checked) {
        await loadCurrentWeather(url,true)
    } else {
        await loadCurrentWeather(url)
    }
})

