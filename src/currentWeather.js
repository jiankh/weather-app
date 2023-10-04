const weatherContainer = document.querySelector(".weather-container")
const locationContainer = document.querySelector(".location-container")
const dateContainer = document.querySelector(".current-time-container")
const currentGraphic = document.querySelector(".current-graphics")
const currentDegrees = document.querySelector(".current-degrees")

const currentFeel = document.querySelector("[data-feels-like]")
const currentHumidity = document.querySelector("[data-humidity]")
const currentRainChance = document.querySelector("[data-rain-chance]")
const currentWind = document.querySelector("[data-wind]")


async function loadJson(url) {
    try{
        let response = await fetch(url, {mode: 'cors'})
        if (response.status == 200) {
            let data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
    }
}




async function loadCurrentWeather(url) {
    const currentData = await loadJson(url)
    weatherContainer.innerHTML = currentData.current.condition.text
    locationContainer.innerHTML = currentData.location.name
    dateContainer.innerHTML = await formatDate(currentData.location.localtime_epoch)
    currentDegrees.innerHTML = currentData.current.temp_f
    currentGraphic.innerHTML = `<img class=current-image src="${currentData.current.condition.icon}" alt="weather icon">`

    //Extra Section
    currentFeel.innerHTML = currentData.current.feelslike_f
    currentHumidity.innerHTML = currentData.current.humidity
    currentRainChance.innerHTML = currentData.forecast.forecastday[0].day.daily_chance_of_rain
    currentWind.innerHTML = currentData.current.wind_mph
}



async function formatDate(epoch) {
    const epochtime = epoch*1000 //milliseconds
    const date = new Date(epochtime)
    return date.toDateString()
}

export {loadCurrentWeather}
