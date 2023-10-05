
async function loadJson(url) {
    try{
        let response = await fetch(url)
        if (response.status == 200) {
            let data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

function epochToSimpleDate(epoch) {
    const epoch_time = epoch*1000
    const date = new Date(epoch_time)
    const dayOfWeek = date.getDay()
    const dayOfMonth = date.getDate()
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return `${dayNames[dayOfWeek]} ${dayOfMonth}`
}

async function formatDate(epoch) {
    const epoch_time = epoch*1000 //milliseconds
    const date = new Date(epoch_time)
    return date.toDateString()
}

function militaryToStandardTime(time) {
    const period = time >= 12 ? "PM" : "AM"
    const hour = (time % 12) || 12 
    return `${hour} ${period}` 
}


function formatHour(epoch) {
    const epoch_time = epoch*1000
    const hour = new Date(epoch_time)
    return hour.getHours()
}

function createElement(hour, temp, icon, inCelsius=false) {
    const hourlyContainer = document.querySelector(".hourly-container")
    const element = document.createElement("div")
    element.classList.add("hourly")

    let degree = "°F"
    if (inCelsius) {
        degree = "°C"
    }

    element.innerHTML = `
        <div class="hourly">
            <div class="hourly-time">${hour} </div>
            <div class="hourly-temp">${temp} ${degree}</div>
            <div class="hourly-img"> <img src="${icon}"> </div>
        </div>
    `

    hourlyContainer.appendChild(element)
}

function clearHourlyContainer() {
    const container = document.querySelector(".hourly-container")
    container.innerHTML = ""
}

export {loadJson, 
        formatDate, 
        militaryToStandardTime, 
        formatHour, 
        createElement,
        clearHourlyContainer,
        epochToSimpleDate
    }