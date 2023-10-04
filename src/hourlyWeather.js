import { loadJson } from "./helperFunctions"

async function loadHourlyWeather(url, inCelsius=false) {
    const data = await loadJson(url)

    //Temp and the picture
    for (let i=0; i<5; i++) {
        console.log(data.forecast.forecastday[0].hour[i].time_epoch)
        const hour = await formatHour(data.forecast.forecastday[0].hour[i].time_epoch)
        const temperature = data.forecast.forecastday[0].hour[i].temp_c
        const icon = data.forecast.forecastday[0].hour[i].condition.icon

        createElement(hour, temperature, icon)
    }
}

function formatHour(epoch) {
    const epoch_time = epoch*1000
    const hour = new Date(epoch_time)
    return hour.getHours()
}

function createElement(hour, temp, icon) {
    const hourlyContainer = document.querySelector(".hourly-container")
    const element = document.createElement("div")
    element.classList.add("hourly")
    element.innerHTML = `
        <div class="hourly">
            <div class="hourly-time">${hour}</div>
            <div class="hourly-temp">${temp}</div>
            <div class="hourly-img"> <img src="${icon}"> </div>
        </div>
    `

    hourlyContainer.appendChild(element)
}

export {loadHourlyWeather}