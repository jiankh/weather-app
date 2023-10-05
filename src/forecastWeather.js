import { loadJson, epochToSimpleDate, formatDate } from "./helperFunctions"

async function loadForecastWeather(url, inCelsius=false) {
    const data = await loadJson(url, {mode:'cors'})

    for (let i = 0; i<3; i++) {
        // const date = epochToSimpleDate(data.forecast.forecastday[i].date_epoch)
        const date = (await formatDate(data.forecast.forecastday[i].date_epoch)).slice(0,-4)
        let tempMax = data.forecast.forecastday[i].day.maxtemp_f
        let tempMin = data.forecast.forecastday[i].day.mintemp_f

        const icon = data.forecast.forecastday[i].day.condition.icon
        const forecast = data.forecast.forecastday[i].day.condition.text
        const rainChance = data.forecast.forecastday[i].day.daily_chance_of_rain
        const wind = data.forecast.forecastday[i].day.maxwind_mph

        const slot = i

        if (inCelsius) {
            tempMax = data.forecast.forecastday[i].day.maxtemp_c
            tempMin = data.forecast.forecastday[i].day.mintemp_c
        }

        insertForecast(slot,date,tempMax,tempMin,icon,forecast,rainChance,wind,inCelsius)
    }
}

function insertForecast(slot,date,tempMax,tempMin,icon,forecast,rainChance,wind, inCelsius=false) {
    const dateEl = document.querySelector(`.date-${slot}`)
    const tempEl = document.querySelector(`.temp-${slot}`)
    const iconEl = document.querySelector(`.icon-${slot}`)
    const forecastEl = document.querySelector(`.forecast-${slot}`)
    const rainEl = document.querySelector(`.rain-${slot}`)
    const windEl = document.querySelector(`.wind-${slot}`)

    dateEl.textContent = date
    tempEl.textContent = `${tempMax}°F / ${tempMin}°F`
    iconEl.innerHTML = `<img alt="forecast icon" src="https:${icon}">`
    forecastEl.textContent = forecast
    rainEl.innerHTML = `<img class="rain-icon" src="images/rain.png"> ${rainChance} %`
    windEl.innerHTML = `<img class="windy-icon" src="images/windy.png">  ${wind} MPH`

    if (inCelsius) {
        tempEl.textContent = `${tempMax}°C / ${tempMin}°C`
    }
}

export {loadForecastWeather}