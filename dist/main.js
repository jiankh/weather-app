/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/currentWeather.js":
/*!*******************************!*\
  !*** ./src/currentWeather.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadCurrentWeather: () => (/* binding */ loadCurrentWeather)
/* harmony export */ });
/* harmony import */ var _helperFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helperFunctions */ "./src/helperFunctions.js");


const weatherContainer = document.querySelector(".weather-container")
const locationContainer = document.querySelector(".location-container")
const dateContainer = document.querySelector(".current-time-container")
const currentGraphic = document.querySelector(".current-graphics")
const currentDegrees = document.querySelector(".current-degrees")

const currentFeel = document.querySelector("[data-feels-like]")
const currentHumidity = document.querySelector("[data-humidity]")
const currentRainChance = document.querySelector("[data-rain-chance]")
const currentWind = document.querySelector("[data-wind]")


async function loadCurrentWeather(url,inCelsius=false) {
    const currentData = await (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_0__.loadJson)(url)
    weatherContainer.innerHTML = currentData.current.condition.text
    locationContainer.innerHTML = `<img data-location-pin src="images/location-pin.svg"> ${currentData.location.name}`
    dateContainer.innerHTML = (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_0__.formatDate)(currentData.location.localtime_epoch)
    currentDegrees.innerHTML = `${currentData.current.temp_f} °F`
    currentGraphic.innerHTML = `<img class=current-image src="https:${currentData.current.condition.icon}" alt="weather icon">`

    //Extra Section
    currentFeel.innerHTML = `${currentData.current.feelslike_f} °F` 
    currentHumidity.innerHTML = `${currentData.current.humidity} %`
    currentRainChance.innerHTML = `${currentData.forecast.forecastday[0].day.daily_chance_of_rain} %`
    currentWind.innerHTML = `${currentData.current.wind_mph} MPH`

    //Celcius / Farenheit
    if (inCelsius) {
        currentFeel.innerHTML = `${currentData.current.feelslike_c} °C`
        currentDegrees.innerHTML = `${currentData.current.temp_c} °C`
    }
}




/***/ }),

/***/ "./src/forecastWeather.js":
/*!********************************!*\
  !*** ./src/forecastWeather.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadForecastWeather: () => (/* binding */ loadForecastWeather)
/* harmony export */ });
/* harmony import */ var _helperFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helperFunctions */ "./src/helperFunctions.js");


async function loadForecastWeather(url, inCelsius=false) {
    const data = await (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_0__.loadJson)(url, {mode:'cors'})

    for (let i = 0; i<3; i++) {
        // const date = epochToSimpleDate(data.forecast.forecastday[i].date_epoch)
        const date = changeDateToSimple(data.forecast.forecastday[i].date)
        
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

function changeDateToSimple(inputDate) {
    const months = ["0","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct", "Nov", "Dec"]
    const inputMonth = inputDate.slice(5,7)
    const inputDay = inputDate.slice(-2)
    return `${months[inputMonth]} ${inputDay}`
}   



/***/ }),

/***/ "./src/helperFunctions.js":
/*!********************************!*\
  !*** ./src/helperFunctions.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearHourlyContainer: () => (/* binding */ clearHourlyContainer),
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   epochToSimpleDate: () => (/* binding */ epochToSimpleDate),
/* harmony export */   formatDate: () => (/* binding */ formatDate),
/* harmony export */   formatHour: () => (/* binding */ formatHour),
/* harmony export */   loadJson: () => (/* binding */ loadJson),
/* harmony export */   militaryToStandardTime: () => (/* binding */ militaryToStandardTime)
/* harmony export */ });

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

function epochToSimpleDate(epoch, timeZone = 'UTC') {
    const epochTime = epoch * 1000
    const date = new Date(epochTime)
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short', timeZone })
    const dayOfMonth = date.getDate()
    return `${dayOfWeek} ${dayOfMonth}`
}

// function epochToSimpleDate(epoch) {
//     const epoch_time = epoch*1000
//     const date = new Date(epoch_time)
//     const dayOfWeek = date.getDay()
//     const dayOfMonth = date.getDate()
//     const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     return `${dayNames[dayOfWeek]} ${dayOfMonth}`
// }

function formatDate(epoch) {
    const epoch_time = epoch*1000 //milliseconds
    const date_epoch = new Date(epoch_time)
    return date_epoch.toDateString()
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



/***/ }),

/***/ "./src/hourlyWeather.js":
/*!******************************!*\
  !*** ./src/hourlyWeather.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadHourlyWeather: () => (/* binding */ loadHourlyWeather)
/* harmony export */ });
/* harmony import */ var _helperFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helperFunctions */ "./src/helperFunctions.js");


async function loadHourlyWeather(url, inCelsius=false) {
    const data = await (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_0__.loadJson)(url)
    const timeNow = (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_0__.formatHour)(data.location.localtime_epoch)
    for (let i=timeNow+1; i<(timeNow+6); i++) {      
        let temperature = data.forecast.forecastday[0].hour[i].temp_f
        const icon = data.forecast.forecastday[0].hour[i].condition.icon
        const hour24 = (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_0__.formatHour)(data.forecast.forecastday[0].hour[i].time_epoch)
        const hour = (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_0__.militaryToStandardTime)(hour24)  
        
        if (inCelsius) {
            temperature = data.forecast.forecastday[0].hour[i].temp_c
        }

        (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_0__.createElement)(hour, temperature, icon, inCelsius)
    }
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _currentWeather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./currentWeather */ "./src/currentWeather.js");
/* harmony import */ var _hourlyWeather__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hourlyWeather */ "./src/hourlyWeather.js");
/* harmony import */ var _helperFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helperFunctions */ "./src/helperFunctions.js");
/* harmony import */ var _forecastWeather__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./forecastWeather */ "./src/forecastWeather.js");





let url = "https://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=New York&days=3&aqi=no&alerts=no"

;(0,_currentWeather__WEBPACK_IMPORTED_MODULE_0__.loadCurrentWeather)(url) //initialize some data
;(0,_hourlyWeather__WEBPACK_IMPORTED_MODULE_1__.loadHourlyWeather)(url)
;(0,_forecastWeather__WEBPACK_IMPORTED_MODULE_3__.loadForecastWeather)(url)

const searchform = document.querySelector("[data-form]")
searchform.addEventListener('submit', async (e) => {
    e.preventDefault()
    const searchInput = document.querySelector("#search").value
    //url = `https://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=${searchInput}&days=1&aqi=no&alerts=no`
    await (0,_currentWeather__WEBPACK_IMPORTED_MODULE_0__.loadCurrentWeather)(`https://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=${searchInput}&days=3&aqi=no&alerts=no`)

    ;(0,_helperFunctions__WEBPACK_IMPORTED_MODULE_2__.clearHourlyContainer)()
    await (0,_hourlyWeather__WEBPACK_IMPORTED_MODULE_1__.loadHourlyWeather)(`https://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=${searchInput}&days=3&aqi=no&alerts=no`)

    ;(0,_forecastWeather__WEBPACK_IMPORTED_MODULE_3__.loadForecastWeather)(`https://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=${searchInput}&days=3&aqi=no&alerts=no`)
})


const toggleDegree = document.querySelector(".hidden-checkbox")
toggleDegree.addEventListener("change", async () => {
    if (toggleDegree.checked) {
        (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_2__.clearHourlyContainer)()
        await (0,_currentWeather__WEBPACK_IMPORTED_MODULE_0__.loadCurrentWeather)(url,true)
        await (0,_hourlyWeather__WEBPACK_IMPORTED_MODULE_1__.loadHourlyWeather)(url,true)
        await (0,_forecastWeather__WEBPACK_IMPORTED_MODULE_3__.loadForecastWeather)(url,true)
    } else {
        (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_2__.clearHourlyContainer)()
        await (0,_currentWeather__WEBPACK_IMPORTED_MODULE_0__.loadCurrentWeather)(url)
        await (0,_hourlyWeather__WEBPACK_IMPORTED_MODULE_1__.loadHourlyWeather)(url)
        await (0,_forecastWeather__WEBPACK_IMPORTED_MODULE_3__.loadForecastWeather)(url)
    }
})


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTnFEO0FBQ0Y7QUFDRztBQUNDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLG9FQUFrQjtBQUNsQixrRUFBaUI7QUFDakIsc0VBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpR0FBaUcsWUFBWTtBQUM3RyxVQUFVLG1FQUFrQixzRkFBc0YsWUFBWTtBQUM5SDtBQUNBLElBQUksdUVBQW9CO0FBQ3hCLFVBQVUsaUVBQWlCLHNGQUFzRixZQUFZO0FBQzdIO0FBQ0EsSUFBSSxzRUFBbUIsc0ZBQXNGLFlBQVk7QUFDekgsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNFQUFvQjtBQUM1QixjQUFjLG1FQUFrQjtBQUNoQyxjQUFjLGlFQUFpQjtBQUMvQixjQUFjLHFFQUFtQjtBQUNqQyxNQUFNO0FBQ04sUUFBUSxzRUFBb0I7QUFDNUIsY0FBYyxtRUFBa0I7QUFDaEMsY0FBYyxpRUFBaUI7QUFDL0IsY0FBYyxxRUFBbUI7QUFDakM7QUFDQSxDQUFDO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jdXJyZW50V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9mb3JlY2FzdFdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaGVscGVyRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2hvdXJseVdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2FkSnNvbiwgZm9ybWF0RGF0ZSB9IGZyb20gXCIuL2hlbHBlckZ1bmN0aW9uc1wiXHJcblxyXG5jb25zdCB3ZWF0aGVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLWNvbnRhaW5lclwiKVxyXG5jb25zdCBsb2NhdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9jYXRpb24tY29udGFpbmVyXCIpXHJcbmNvbnN0IGRhdGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtdGltZS1jb250YWluZXJcIilcclxuY29uc3QgY3VycmVudEdyYXBoaWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtZ3JhcGhpY3NcIilcclxuY29uc3QgY3VycmVudERlZ3JlZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtZGVncmVlc1wiKVxyXG5cclxuY29uc3QgY3VycmVudEZlZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtZmVlbHMtbGlrZV1cIilcclxuY29uc3QgY3VycmVudEh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWh1bWlkaXR5XVwiKVxyXG5jb25zdCBjdXJyZW50UmFpbkNoYW5jZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1yYWluLWNoYW5jZV1cIilcclxuY29uc3QgY3VycmVudFdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtd2luZF1cIilcclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkQ3VycmVudFdlYXRoZXIodXJsLGluQ2Vsc2l1cz1mYWxzZSkge1xyXG4gICAgY29uc3QgY3VycmVudERhdGEgPSBhd2FpdCBsb2FkSnNvbih1cmwpXHJcbiAgICB3ZWF0aGVyQ29udGFpbmVyLmlubmVySFRNTCA9IGN1cnJlbnREYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHRcclxuICAgIGxvY2F0aW9uQ29udGFpbmVyLmlubmVySFRNTCA9IGA8aW1nIGRhdGEtbG9jYXRpb24tcGluIHNyYz1cImltYWdlcy9sb2NhdGlvbi1waW4uc3ZnXCI+ICR7Y3VycmVudERhdGEubG9jYXRpb24ubmFtZX1gXHJcbiAgICBkYXRlQ29udGFpbmVyLmlubmVySFRNTCA9IGZvcm1hdERhdGUoY3VycmVudERhdGEubG9jYXRpb24ubG9jYWx0aW1lX2Vwb2NoKVxyXG4gICAgY3VycmVudERlZ3JlZXMuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC50ZW1wX2Z9IMKwRmBcclxuICAgIGN1cnJlbnRHcmFwaGljLmlubmVySFRNTCA9IGA8aW1nIGNsYXNzPWN1cnJlbnQtaW1hZ2Ugc3JjPVwiaHR0cHM6JHtjdXJyZW50RGF0YS5jdXJyZW50LmNvbmRpdGlvbi5pY29ufVwiIGFsdD1cIndlYXRoZXIgaWNvblwiPmBcclxuXHJcbiAgICAvL0V4dHJhIFNlY3Rpb25cclxuICAgIGN1cnJlbnRGZWVsLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2Z9IMKwRmAgXHJcbiAgICBjdXJyZW50SHVtaWRpdHkuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC5odW1pZGl0eX0gJWBcclxuICAgIGN1cnJlbnRSYWluQ2hhbmNlLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbn0gJWBcclxuICAgIGN1cnJlbnRXaW5kLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmN1cnJlbnQud2luZF9tcGh9IE1QSGBcclxuXHJcbiAgICAvL0NlbGNpdXMgLyBGYXJlbmhlaXRcclxuICAgIGlmIChpbkNlbHNpdXMpIHtcclxuICAgICAgICBjdXJyZW50RmVlbC5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jfSDCsENgXHJcbiAgICAgICAgY3VycmVudERlZ3JlZXMuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC50ZW1wX2N9IMKwQ2BcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtsb2FkQ3VycmVudFdlYXRoZXJ9XHJcbiIsImltcG9ydCB7IGxvYWRKc29uLCBlcG9jaFRvU2ltcGxlRGF0ZSwgZm9ybWF0RGF0ZSB9IGZyb20gXCIuL2hlbHBlckZ1bmN0aW9uc1wiXHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkRm9yZWNhc3RXZWF0aGVyKHVybCwgaW5DZWxzaXVzPWZhbHNlKSB7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgbG9hZEpzb24odXJsLCB7bW9kZTonY29ycyd9KVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpPDM7IGkrKykge1xyXG4gICAgICAgIC8vIGNvbnN0IGRhdGUgPSBlcG9jaFRvU2ltcGxlRGF0ZShkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRhdGVfZXBvY2gpXHJcbiAgICAgICAgY29uc3QgZGF0ZSA9IGNoYW5nZURhdGVUb1NpbXBsZShkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRhdGUpXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHRlbXBNYXggPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5tYXh0ZW1wX2ZcclxuICAgICAgICBsZXQgdGVtcE1pbiA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF5Lm1pbnRlbXBfZlxyXG5cclxuICAgICAgICBjb25zdCBpY29uID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkuY29uZGl0aW9uLmljb25cclxuICAgICAgICBjb25zdCBmb3JlY2FzdCA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF5LmNvbmRpdGlvbi50ZXh0XHJcbiAgICAgICAgY29uc3QgcmFpbkNoYW5jZSA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluXHJcbiAgICAgICAgY29uc3Qgd2luZCA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF5Lm1heHdpbmRfbXBoXHJcblxyXG4gICAgICAgIGNvbnN0IHNsb3QgPSBpXHJcblxyXG4gICAgICAgIGlmIChpbkNlbHNpdXMpIHtcclxuICAgICAgICAgICAgdGVtcE1heCA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF5Lm1heHRlbXBfY1xyXG4gICAgICAgICAgICB0ZW1wTWluID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkubWludGVtcF9jXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnNlcnRGb3JlY2FzdChzbG90LGRhdGUsdGVtcE1heCx0ZW1wTWluLGljb24sZm9yZWNhc3QscmFpbkNoYW5jZSx3aW5kLGluQ2Vsc2l1cylcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0Rm9yZWNhc3Qoc2xvdCxkYXRlLHRlbXBNYXgsdGVtcE1pbixpY29uLGZvcmVjYXN0LHJhaW5DaGFuY2Usd2luZCwgaW5DZWxzaXVzPWZhbHNlKSB7XHJcbiAgICBjb25zdCBkYXRlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZGF0ZS0ke3Nsb3R9YClcclxuICAgIGNvbnN0IHRlbXBFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC50ZW1wLSR7c2xvdH1gKVxyXG4gICAgY29uc3QgaWNvbkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmljb24tJHtzbG90fWApXHJcbiAgICBjb25zdCBmb3JlY2FzdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmZvcmVjYXN0LSR7c2xvdH1gKVxyXG4gICAgY29uc3QgcmFpbkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnJhaW4tJHtzbG90fWApXHJcbiAgICBjb25zdCB3aW5kRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAud2luZC0ke3Nsb3R9YClcclxuXHJcbiAgICBkYXRlRWwudGV4dENvbnRlbnQgPSBkYXRlXHJcbiAgICB0ZW1wRWwudGV4dENvbnRlbnQgPSBgJHt0ZW1wTWF4fcKwRiAvICR7dGVtcE1pbn3CsEZgXHJcbiAgICBpY29uRWwuaW5uZXJIVE1MID0gYDxpbWcgYWx0PVwiZm9yZWNhc3QgaWNvblwiIHNyYz1cImh0dHBzOiR7aWNvbn1cIj5gXHJcbiAgICBmb3JlY2FzdEVsLnRleHRDb250ZW50ID0gZm9yZWNhc3RcclxuICAgIHJhaW5FbC5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cInJhaW4taWNvblwiIHNyYz1cImltYWdlcy9yYWluLnBuZ1wiPiAke3JhaW5DaGFuY2V9ICVgXHJcbiAgICB3aW5kRWwuaW5uZXJIVE1MID0gYDxpbWcgY2xhc3M9XCJ3aW5keS1pY29uXCIgc3JjPVwiaW1hZ2VzL3dpbmR5LnBuZ1wiPiAgJHt3aW5kfSBNUEhgXHJcblxyXG4gICAgaWYgKGluQ2Vsc2l1cykge1xyXG4gICAgICAgIHRlbXBFbC50ZXh0Q29udGVudCA9IGAke3RlbXBNYXh9wrBDIC8gJHt0ZW1wTWlufcKwQ2BcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlRGF0ZVRvU2ltcGxlKGlucHV0RGF0ZSkge1xyXG4gICAgY29uc3QgbW9udGhzID0gW1wiMFwiLFwiSmFuXCIsXCJGZWJcIixcIk1hclwiLFwiQXByXCIsXCJNYXlcIixcIkp1blwiLFwiSnVsXCIsXCJBdWdcIixcIlNlcFwiLFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJdXHJcbiAgICBjb25zdCBpbnB1dE1vbnRoID0gaW5wdXREYXRlLnNsaWNlKDUsNylcclxuICAgIGNvbnN0IGlucHV0RGF5ID0gaW5wdXREYXRlLnNsaWNlKC0yKVxyXG4gICAgcmV0dXJuIGAke21vbnRoc1tpbnB1dE1vbnRoXX0gJHtpbnB1dERheX1gXHJcbn0gICBcclxuXHJcbmV4cG9ydCB7bG9hZEZvcmVjYXN0V2VhdGhlcn0iLCJcclxuYXN5bmMgZnVuY3Rpb24gbG9hZEpzb24odXJsKSB7XHJcbiAgICB0cnl7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKVxyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhXHJcbiAgICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZXBvY2hUb1NpbXBsZURhdGUoZXBvY2gsIHRpbWVab25lID0gJ1VUQycpIHtcclxuICAgIGNvbnN0IGVwb2NoVGltZSA9IGVwb2NoICogMTAwMFxyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGVwb2NoVGltZSlcclxuICAgIGNvbnN0IGRheU9mV2VlayA9IGRhdGUudG9Mb2NhbGVTdHJpbmcoJ2VuLVVTJywgeyB3ZWVrZGF5OiAnc2hvcnQnLCB0aW1lWm9uZSB9KVxyXG4gICAgY29uc3QgZGF5T2ZNb250aCA9IGRhdGUuZ2V0RGF0ZSgpXHJcbiAgICByZXR1cm4gYCR7ZGF5T2ZXZWVrfSAke2RheU9mTW9udGh9YFxyXG59XHJcblxyXG4vLyBmdW5jdGlvbiBlcG9jaFRvU2ltcGxlRGF0ZShlcG9jaCkge1xyXG4vLyAgICAgY29uc3QgZXBvY2hfdGltZSA9IGVwb2NoKjEwMDBcclxuLy8gICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShlcG9jaF90aW1lKVxyXG4vLyAgICAgY29uc3QgZGF5T2ZXZWVrID0gZGF0ZS5nZXREYXkoKVxyXG4vLyAgICAgY29uc3QgZGF5T2ZNb250aCA9IGRhdGUuZ2V0RGF0ZSgpXHJcbi8vICAgICBjb25zdCBkYXlOYW1lcyA9IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J107XHJcbi8vICAgICByZXR1cm4gYCR7ZGF5TmFtZXNbZGF5T2ZXZWVrXX0gJHtkYXlPZk1vbnRofWBcclxuLy8gfVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0RGF0ZShlcG9jaCkge1xyXG4gICAgY29uc3QgZXBvY2hfdGltZSA9IGVwb2NoKjEwMDAgLy9taWxsaXNlY29uZHNcclxuICAgIGNvbnN0IGRhdGVfZXBvY2ggPSBuZXcgRGF0ZShlcG9jaF90aW1lKVxyXG4gICAgcmV0dXJuIGRhdGVfZXBvY2gudG9EYXRlU3RyaW5nKClcclxufVxyXG5cclxuZnVuY3Rpb24gbWlsaXRhcnlUb1N0YW5kYXJkVGltZSh0aW1lKSB7XHJcbiAgICBjb25zdCBwZXJpb2QgPSB0aW1lID49IDEyID8gXCJQTVwiIDogXCJBTVwiXHJcbiAgICBjb25zdCBob3VyID0gKHRpbWUgJSAxMikgfHwgMTIgXHJcbiAgICByZXR1cm4gYCR7aG91cn0gJHtwZXJpb2R9YCBcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdEhvdXIoZXBvY2gpIHtcclxuICAgIGNvbnN0IGVwb2NoX3RpbWUgPSBlcG9jaCoxMDAwXHJcbiAgICBjb25zdCBob3VyID0gbmV3IERhdGUoZXBvY2hfdGltZSlcclxuICAgIHJldHVybiBob3VyLmdldEhvdXJzKClcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudChob3VyLCB0ZW1wLCBpY29uLCBpbkNlbHNpdXM9ZmFsc2UpIHtcclxuICAgIGNvbnN0IGhvdXJseUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG91cmx5LWNvbnRhaW5lclwiKVxyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhvdXJseVwiKVxyXG5cclxuICAgIGxldCBkZWdyZWUgPSBcIsKwRlwiXHJcbiAgICBpZiAoaW5DZWxzaXVzKSB7XHJcbiAgICAgICAgZGVncmVlID0gXCLCsENcIlxyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJob3VybHlcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhvdXJseS10aW1lXCI+JHtob3VyfSA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhvdXJseS10ZW1wXCI+JHt0ZW1wfSAke2RlZ3JlZX08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhvdXJseS1pbWdcIj4gPGltZyBzcmM9XCIke2ljb259XCI+IDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYFxyXG5cclxuICAgIGhvdXJseUNvbnRhaW5lci5hcHBlbmRDaGlsZChlbGVtZW50KVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckhvdXJseUNvbnRhaW5lcigpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG91cmx5LWNvbnRhaW5lclwiKVxyXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCJcclxufVxyXG5cclxuZXhwb3J0IHtsb2FkSnNvbiwgXHJcbiAgICAgICAgZm9ybWF0RGF0ZSwgXHJcbiAgICAgICAgbWlsaXRhcnlUb1N0YW5kYXJkVGltZSwgXHJcbiAgICAgICAgZm9ybWF0SG91ciwgXHJcbiAgICAgICAgY3JlYXRlRWxlbWVudCxcclxuICAgICAgICBjbGVhckhvdXJseUNvbnRhaW5lcixcclxuICAgICAgICBlcG9jaFRvU2ltcGxlRGF0ZVxyXG4gICAgfSIsImltcG9ydCB7IGxvYWRKc29uLCBtaWxpdGFyeVRvU3RhbmRhcmRUaW1lLCBmb3JtYXRIb3VyLCBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4vaGVscGVyRnVuY3Rpb25zXCJcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRIb3VybHlXZWF0aGVyKHVybCwgaW5DZWxzaXVzPWZhbHNlKSB7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgbG9hZEpzb24odXJsKVxyXG4gICAgY29uc3QgdGltZU5vdyA9IGZvcm1hdEhvdXIoZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWVfZXBvY2gpXHJcbiAgICBmb3IgKGxldCBpPXRpbWVOb3crMTsgaTwodGltZU5vdys2KTsgaSsrKSB7ICAgICAgXHJcbiAgICAgICAgbGV0IHRlbXBlcmF0dXJlID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRlbXBfZlxyXG4gICAgICAgIGNvbnN0IGljb24gPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbaV0uY29uZGl0aW9uLmljb25cclxuICAgICAgICBjb25zdCBob3VyMjQgPSBmb3JtYXRIb3VyKGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS50aW1lX2Vwb2NoKVxyXG4gICAgICAgIGNvbnN0IGhvdXIgPSBtaWxpdGFyeVRvU3RhbmRhcmRUaW1lKGhvdXIyNCkgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChpbkNlbHNpdXMpIHtcclxuICAgICAgICAgICAgdGVtcGVyYXR1cmUgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbaV0udGVtcF9jXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVFbGVtZW50KGhvdXIsIHRlbXBlcmF0dXJlLCBpY29uLCBpbkNlbHNpdXMpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7bG9hZEhvdXJseVdlYXRoZXJ9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBsb2FkQ3VycmVudFdlYXRoZXIgfSBmcm9tIFwiLi9jdXJyZW50V2VhdGhlclwiXHJcbmltcG9ydCB7IGxvYWRIb3VybHlXZWF0aGVyIH0gZnJvbSBcIi4vaG91cmx5V2VhdGhlclwiXHJcbmltcG9ydCB7Y2xlYXJIb3VybHlDb250YWluZXJ9IGZyb20gXCIuL2hlbHBlckZ1bmN0aW9uc1wiXHJcbmltcG9ydCB7IGxvYWRGb3JlY2FzdFdlYXRoZXIgfSBmcm9tIFwiLi9mb3JlY2FzdFdlYXRoZXJcIlxyXG5cclxubGV0IHVybCA9IFwiaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9YTc4ZDgwNjVhYzkzNGRmNWI3ODE3MTAwMzIzMDMxMCZxPU5ldyBZb3JrJmRheXM9MyZhcWk9bm8mYWxlcnRzPW5vXCJcclxuXHJcbmxvYWRDdXJyZW50V2VhdGhlcih1cmwpIC8vaW5pdGlhbGl6ZSBzb21lIGRhdGFcclxubG9hZEhvdXJseVdlYXRoZXIodXJsKVxyXG5sb2FkRm9yZWNhc3RXZWF0aGVyKHVybClcclxuXHJcbmNvbnN0IHNlYXJjaGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtZm9ybV1cIilcclxuc2VhcmNoZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoXCIpLnZhbHVlXHJcbiAgICAvL3VybCA9IGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT1hNzhkODA2NWFjOTM0ZGY1Yjc4MTcxMDAzMjMwMzEwJnE9JHtzZWFyY2hJbnB1dH0mZGF5cz0xJmFxaT1ubyZhbGVydHM9bm9gXHJcbiAgICBhd2FpdCBsb2FkQ3VycmVudFdlYXRoZXIoYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWE3OGQ4MDY1YWM5MzRkZjViNzgxNzEwMDMyMzAzMTAmcT0ke3NlYXJjaElucHV0fSZkYXlzPTMmYXFpPW5vJmFsZXJ0cz1ub2ApXHJcblxyXG4gICAgY2xlYXJIb3VybHlDb250YWluZXIoKVxyXG4gICAgYXdhaXQgbG9hZEhvdXJseVdlYXRoZXIoYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWE3OGQ4MDY1YWM5MzRkZjViNzgxNzEwMDMyMzAzMTAmcT0ke3NlYXJjaElucHV0fSZkYXlzPTMmYXFpPW5vJmFsZXJ0cz1ub2ApXHJcblxyXG4gICAgbG9hZEZvcmVjYXN0V2VhdGhlcihgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9YTc4ZDgwNjVhYzkzNGRmNWI3ODE3MTAwMzIzMDMxMCZxPSR7c2VhcmNoSW5wdXR9JmRheXM9MyZhcWk9bm8mYWxlcnRzPW5vYClcclxufSlcclxuXHJcblxyXG5jb25zdCB0b2dnbGVEZWdyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhpZGRlbi1jaGVja2JveFwiKVxyXG50b2dnbGVEZWdyZWUuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAodG9nZ2xlRGVncmVlLmNoZWNrZWQpIHtcclxuICAgICAgICBjbGVhckhvdXJseUNvbnRhaW5lcigpXHJcbiAgICAgICAgYXdhaXQgbG9hZEN1cnJlbnRXZWF0aGVyKHVybCx0cnVlKVxyXG4gICAgICAgIGF3YWl0IGxvYWRIb3VybHlXZWF0aGVyKHVybCx0cnVlKVxyXG4gICAgICAgIGF3YWl0IGxvYWRGb3JlY2FzdFdlYXRoZXIodXJsLHRydWUpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNsZWFySG91cmx5Q29udGFpbmVyKClcclxuICAgICAgICBhd2FpdCBsb2FkQ3VycmVudFdlYXRoZXIodXJsKVxyXG4gICAgICAgIGF3YWl0IGxvYWRIb3VybHlXZWF0aGVyKHVybClcclxuICAgICAgICBhd2FpdCBsb2FkRm9yZWNhc3RXZWF0aGVyKHVybClcclxuICAgIH1cclxufSlcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==