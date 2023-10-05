import { loadJson, militaryToStandardTime, formatHour, createElement } from "./helperFunctions"

async function loadHourlyWeather(url, inCelsius=false) {
    const data = await loadJson(url)
    const timeNow = formatHour(data.location.localtime_epoch)
    for (let i=timeNow+1; i<(timeNow+6); i++) {      
        let temperature = data.forecast.forecastday[0].hour[i].temp_f
        const icon = data.forecast.forecastday[0].hour[i].condition.icon
        const hour24 = formatHour(data.forecast.forecastday[0].hour[i].time_epoch)
        const hour = militaryToStandardTime(hour24)  
        
        if (inCelsius) {
            temperature = data.forecast.forecastday[0].hour[i].temp_c
        }

        createElement(hour, temperature, icon, inCelsius)
    }
}

export {loadHourlyWeather}