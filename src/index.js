import { loadCurrentWeather } from "./currentWeather"
import { loadHourlyWeather } from "./hourlyWeather"
import {clearHourlyContainer} from "./helperFunctions"
import { loadForecastWeather } from "./forecastWeather"

let url = "https://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=New York&days=3&aqi=no&alerts=no"

loadCurrentWeather(url) //initialize some data
loadHourlyWeather(url)
loadForecastWeather(url)

const searchform = document.querySelector("[data-form]")
searchform.addEventListener('submit', async (e) => {
    e.preventDefault()
    const searchInput = document.querySelector("#search").value
    //url = `https://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=${searchInput}&days=1&aqi=no&alerts=no`
    await loadCurrentWeather(`https://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=${searchInput}&days=3&aqi=no&alerts=no`)

    clearHourlyContainer()
    await loadHourlyWeather(`https://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=${searchInput}&days=3&aqi=no&alerts=no`)

    await loadForecastWeather(`https://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=${searchInput}&days=3&aqi=no&alerts=no`)
})


const toggleDegree = document.querySelector(".hidden-checkbox")
toggleDegree.addEventListener("change", async () => {
    if (toggleDegree.checked) {
        clearHourlyContainer()
        await loadCurrentWeather(url,true)
        await loadHourlyWeather(url,true)
        await loadForecastWeather(url,true)
    } else {
        clearHourlyContainer()
        await loadCurrentWeather(url)
        await loadHourlyWeather(url)
        await loadForecastWeather(url)
    }
})

