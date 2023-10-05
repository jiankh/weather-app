import { loadJson, epochToSimpleDate } from "./helperFunctions"

async function loadForecastWeather(url, inCelsius=false) {
    const data = await loadJson(url, {mode:'cors'})

    console.log(data.forecast)


    for (let i = 0; i<3; i++) {
        const date = epochToSimpleDate(data.forecast.forecastday[i].date_epoch)
        const tempMax = data.forecast.forecastday[i].day.maxtemp_f
        const tempMin = data.forecast.forecastday[i].day.mintemp_f

        const icon = data.forecast.forecastday[i].day.condition.icon
        const forecast = data.forecast.forecastday[i].day.condition.text
        const rainChance = data.forecast.forecastday[i].day.daily_chance_of_rain
        const wind = data.forecast.forecastday[i].day.maxwind_mph

        const slot = i
        insertForecast(slot,date,tempMax,tempMin,icon,forecast,rainChance,wind)
    }
}

function insertForecast(slot,date,tempMax,tempMin,icon,forecast,rainChance,wind) {
    const dateEl = document.querySelector(`.date-${slot}`)
    const tempEl = document.querySelector(`.temp-${slot}`)
    const iconEl = document.querySelector(`.icon-${slot}`)
    const forecastEl = document.querySelector(`.forecast-${slot}`)
    const rainEl = document.querySelector(`.rain-${slot}`)
    const windEl = document.querySelector(`.wind-${slot}`)

    dateEl.textContent = date
    tempEl.textContent = `${tempMax} / ${tempMin}`
    iconEl.innerHTML = `<img alt="forecast icon" src="https:${icon}">`
    forecastEl.textContent = forecast
    rainEl.innerHTML = ` ${rainChance} %`
    windEl.textContent = `${wind} MPH`
}

export {loadForecastWeather}