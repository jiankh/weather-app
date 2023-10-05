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
    dateContainer.innerHTML = await (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_0__.formatDate)(currentData.location.localtime_epoch)
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

    console.log(data.forecast)


    for (let i = 0; i<3; i++) {
        const date = (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_0__.epochToSimpleDate)(data.forecast.forecastday[i].date_epoch)
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
    } else {
        (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_2__.clearHourlyContainer)()
        await (0,_currentWeather__WEBPACK_IMPORTED_MODULE_0__.loadCurrentWeather)(url)
        await (0,_hourlyWeather__WEBPACK_IMPORTED_MODULE_1__.loadHourlyWeather)(url)
    }
})


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpR0FBaUcsWUFBWTtBQUM3RyxVQUFVLG1FQUFrQixzRkFBc0YsWUFBWTtBQUM5SDtBQUNBLElBQUksdUVBQW9CO0FBQ3hCLFVBQVUsaUVBQWlCLHNGQUFzRixZQUFZO0FBQzdIO0FBQ0EsSUFBSSxzRUFBbUIsc0ZBQXNGLFlBQVk7QUFDekgsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNFQUFvQjtBQUM1QixjQUFjLG1FQUFrQjtBQUNoQyxjQUFjLGlFQUFpQjtBQUMvQixNQUFNO0FBQ04sUUFBUSxzRUFBb0I7QUFDNUIsY0FBYyxtRUFBa0I7QUFDaEMsY0FBYyxpRUFBaUI7QUFDL0I7QUFDQSxDQUFDO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jdXJyZW50V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9mb3JlY2FzdFdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaGVscGVyRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2hvdXJseVdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2FkSnNvbiwgZm9ybWF0RGF0ZSB9IGZyb20gXCIuL2hlbHBlckZ1bmN0aW9uc1wiXHJcblxyXG5jb25zdCB3ZWF0aGVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLWNvbnRhaW5lclwiKVxyXG5jb25zdCBsb2NhdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9jYXRpb24tY29udGFpbmVyXCIpXHJcbmNvbnN0IGRhdGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtdGltZS1jb250YWluZXJcIilcclxuY29uc3QgY3VycmVudEdyYXBoaWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtZ3JhcGhpY3NcIilcclxuY29uc3QgY3VycmVudERlZ3JlZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtZGVncmVlc1wiKVxyXG5cclxuY29uc3QgY3VycmVudEZlZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtZmVlbHMtbGlrZV1cIilcclxuY29uc3QgY3VycmVudEh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWh1bWlkaXR5XVwiKVxyXG5jb25zdCBjdXJyZW50UmFpbkNoYW5jZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1yYWluLWNoYW5jZV1cIilcclxuY29uc3QgY3VycmVudFdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtd2luZF1cIilcclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkQ3VycmVudFdlYXRoZXIodXJsLGluQ2Vsc2l1cz1mYWxzZSkge1xyXG4gICAgY29uc3QgY3VycmVudERhdGEgPSBhd2FpdCBsb2FkSnNvbih1cmwpXHJcbiAgICB3ZWF0aGVyQ29udGFpbmVyLmlubmVySFRNTCA9IGN1cnJlbnREYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHRcclxuICAgIGxvY2F0aW9uQ29udGFpbmVyLmlubmVySFRNTCA9IGA8aW1nIGRhdGEtbG9jYXRpb24tcGluIHNyYz1cImltYWdlcy9sb2NhdGlvbi1waW4uc3ZnXCI+ICR7Y3VycmVudERhdGEubG9jYXRpb24ubmFtZX1gXHJcbiAgICBkYXRlQ29udGFpbmVyLmlubmVySFRNTCA9IGF3YWl0IGZvcm1hdERhdGUoY3VycmVudERhdGEubG9jYXRpb24ubG9jYWx0aW1lX2Vwb2NoKVxyXG4gICAgY3VycmVudERlZ3JlZXMuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC50ZW1wX2Z9IMKwRmBcclxuICAgIGN1cnJlbnRHcmFwaGljLmlubmVySFRNTCA9IGA8aW1nIGNsYXNzPWN1cnJlbnQtaW1hZ2Ugc3JjPVwiaHR0cHM6JHtjdXJyZW50RGF0YS5jdXJyZW50LmNvbmRpdGlvbi5pY29ufVwiIGFsdD1cIndlYXRoZXIgaWNvblwiPmBcclxuXHJcbiAgICAvL0V4dHJhIFNlY3Rpb25cclxuICAgIGN1cnJlbnRGZWVsLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2Z9IMKwRmAgXHJcbiAgICBjdXJyZW50SHVtaWRpdHkuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC5odW1pZGl0eX0gJWBcclxuICAgIGN1cnJlbnRSYWluQ2hhbmNlLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbn0gJWBcclxuICAgIGN1cnJlbnRXaW5kLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmN1cnJlbnQud2luZF9tcGh9IE1QSGBcclxuXHJcbiAgICAvL0NlbGNpdXMgLyBGYXJlbmhlaXRcclxuICAgIGlmIChpbkNlbHNpdXMpIHtcclxuICAgICAgICBjdXJyZW50RmVlbC5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jfSDCsENgXHJcbiAgICAgICAgY3VycmVudERlZ3JlZXMuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC50ZW1wX2N9IMKwQ2BcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtsb2FkQ3VycmVudFdlYXRoZXJ9XHJcbiIsImltcG9ydCB7IGxvYWRKc29uLCBlcG9jaFRvU2ltcGxlRGF0ZSB9IGZyb20gXCIuL2hlbHBlckZ1bmN0aW9uc1wiXHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkRm9yZWNhc3RXZWF0aGVyKHVybCwgaW5DZWxzaXVzPWZhbHNlKSB7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgbG9hZEpzb24odXJsLCB7bW9kZTonY29ycyd9KVxyXG5cclxuICAgIGNvbnNvbGUubG9nKGRhdGEuZm9yZWNhc3QpXHJcblxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpPDM7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBlcG9jaFRvU2ltcGxlRGF0ZShkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRhdGVfZXBvY2gpXHJcbiAgICAgICAgY29uc3QgdGVtcE1heCA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF5Lm1heHRlbXBfZlxyXG4gICAgICAgIGNvbnN0IHRlbXBNaW4gPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5taW50ZW1wX2ZcclxuXHJcbiAgICAgICAgY29uc3QgaWNvbiA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF5LmNvbmRpdGlvbi5pY29uXHJcbiAgICAgICAgY29uc3QgZm9yZWNhc3QgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5jb25kaXRpb24udGV4dFxyXG4gICAgICAgIGNvbnN0IHJhaW5DaGFuY2UgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpblxyXG4gICAgICAgIGNvbnN0IHdpbmQgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5tYXh3aW5kX21waFxyXG5cclxuICAgICAgICBjb25zdCBzbG90ID0gaVxyXG4gICAgICAgIGluc2VydEZvcmVjYXN0KHNsb3QsZGF0ZSx0ZW1wTWF4LHRlbXBNaW4saWNvbixmb3JlY2FzdCxyYWluQ2hhbmNlLHdpbmQpXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydEZvcmVjYXN0KHNsb3QsZGF0ZSx0ZW1wTWF4LHRlbXBNaW4saWNvbixmb3JlY2FzdCxyYWluQ2hhbmNlLHdpbmQpIHtcclxuICAgIGNvbnN0IGRhdGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5kYXRlLSR7c2xvdH1gKVxyXG4gICAgY29uc3QgdGVtcEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnRlbXAtJHtzbG90fWApXHJcbiAgICBjb25zdCBpY29uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuaWNvbi0ke3Nsb3R9YClcclxuICAgIGNvbnN0IGZvcmVjYXN0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZm9yZWNhc3QtJHtzbG90fWApXHJcbiAgICBjb25zdCByYWluRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucmFpbi0ke3Nsb3R9YClcclxuICAgIGNvbnN0IHdpbmRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC53aW5kLSR7c2xvdH1gKVxyXG5cclxuICAgIGRhdGVFbC50ZXh0Q29udGVudCA9IGRhdGVcclxuICAgIHRlbXBFbC50ZXh0Q29udGVudCA9IGAke3RlbXBNYXh9IC8gJHt0ZW1wTWlufWBcclxuICAgIGljb25FbC5pbm5lckhUTUwgPSBgPGltZyBhbHQ9XCJmb3JlY2FzdCBpY29uXCIgc3JjPVwiaHR0cHM6JHtpY29ufVwiPmBcclxuICAgIGZvcmVjYXN0RWwudGV4dENvbnRlbnQgPSBmb3JlY2FzdFxyXG4gICAgcmFpbkVsLmlubmVySFRNTCA9IGAgJHtyYWluQ2hhbmNlfSAlYFxyXG4gICAgd2luZEVsLnRleHRDb250ZW50ID0gYCR7d2luZH0gTVBIYFxyXG59XHJcblxyXG5leHBvcnQge2xvYWRGb3JlY2FzdFdlYXRoZXJ9IiwiXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRKc29uKHVybCkge1xyXG4gICAgdHJ5e1xyXG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybClcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YVxyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVwb2NoVG9TaW1wbGVEYXRlKGVwb2NoKSB7XHJcbiAgICBjb25zdCBlcG9jaF90aW1lID0gZXBvY2gqMTAwMFxyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGVwb2NoX3RpbWUpXHJcbiAgICBjb25zdCBkYXlPZldlZWsgPSBkYXRlLmdldERheSgpXHJcbiAgICBjb25zdCBkYXlPZk1vbnRoID0gZGF0ZS5nZXREYXRlKClcclxuICAgIGNvbnN0IGRheU5hbWVzID0gWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXTtcclxuICAgIHJldHVybiBgJHtkYXlOYW1lc1tkYXlPZldlZWtdfSAke2RheU9mTW9udGh9YFxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBmb3JtYXREYXRlKGVwb2NoKSB7XHJcbiAgICBjb25zdCBlcG9jaF90aW1lID0gZXBvY2gqMTAwMCAvL21pbGxpc2Vjb25kc1xyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGVwb2NoX3RpbWUpXHJcbiAgICByZXR1cm4gZGF0ZS50b0RhdGVTdHJpbmcoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBtaWxpdGFyeVRvU3RhbmRhcmRUaW1lKHRpbWUpIHtcclxuICAgIGNvbnN0IHBlcmlvZCA9IHRpbWUgPj0gMTIgPyBcIlBNXCIgOiBcIkFNXCJcclxuICAgIGNvbnN0IGhvdXIgPSAodGltZSAlIDEyKSB8fCAxMiBcclxuICAgIHJldHVybiBgJHtob3VyfSAke3BlcmlvZH1gIFxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZm9ybWF0SG91cihlcG9jaCkge1xyXG4gICAgY29uc3QgZXBvY2hfdGltZSA9IGVwb2NoKjEwMDBcclxuICAgIGNvbnN0IGhvdXIgPSBuZXcgRGF0ZShlcG9jaF90aW1lKVxyXG4gICAgcmV0dXJuIGhvdXIuZ2V0SG91cnMoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KGhvdXIsIHRlbXAsIGljb24sIGluQ2Vsc2l1cz1mYWxzZSkge1xyXG4gICAgY29uc3QgaG91cmx5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob3VybHktY29udGFpbmVyXCIpXHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaG91cmx5XCIpXHJcblxyXG4gICAgbGV0IGRlZ3JlZSA9IFwiwrBGXCJcclxuICAgIGlmIChpbkNlbHNpdXMpIHtcclxuICAgICAgICBkZWdyZWUgPSBcIsKwQ1wiXHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImhvdXJseVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaG91cmx5LXRpbWVcIj4ke2hvdXJ9IDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaG91cmx5LXRlbXBcIj4ke3RlbXB9ICR7ZGVncmVlfTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaG91cmx5LWltZ1wiPiA8aW1nIHNyYz1cIiR7aWNvbn1cIj4gPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgXHJcblxyXG4gICAgaG91cmx5Q29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFySG91cmx5Q29udGFpbmVyKCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob3VybHktY29udGFpbmVyXCIpXHJcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIlxyXG59XHJcblxyXG5leHBvcnQge2xvYWRKc29uLCBcclxuICAgICAgICBmb3JtYXREYXRlLCBcclxuICAgICAgICBtaWxpdGFyeVRvU3RhbmRhcmRUaW1lLCBcclxuICAgICAgICBmb3JtYXRIb3VyLCBcclxuICAgICAgICBjcmVhdGVFbGVtZW50LFxyXG4gICAgICAgIGNsZWFySG91cmx5Q29udGFpbmVyLFxyXG4gICAgICAgIGVwb2NoVG9TaW1wbGVEYXRlXHJcbiAgICB9IiwiaW1wb3J0IHsgbG9hZEpzb24sIG1pbGl0YXJ5VG9TdGFuZGFyZFRpbWUsIGZvcm1hdEhvdXIsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi9oZWxwZXJGdW5jdGlvbnNcIlxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZEhvdXJseVdlYXRoZXIodXJsLCBpbkNlbHNpdXM9ZmFsc2UpIHtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBsb2FkSnNvbih1cmwpXHJcbiAgICBjb25zdCB0aW1lTm93ID0gZm9ybWF0SG91cihkYXRhLmxvY2F0aW9uLmxvY2FsdGltZV9lcG9jaClcclxuICAgIGZvciAobGV0IGk9dGltZU5vdysxOyBpPCh0aW1lTm93KzYpOyBpKyspIHsgICAgICBcclxuICAgICAgICBsZXQgdGVtcGVyYXR1cmUgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbaV0udGVtcF9mXHJcbiAgICAgICAgY29uc3QgaWNvbiA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS5jb25kaXRpb24uaWNvblxyXG4gICAgICAgIGNvbnN0IGhvdXIyNCA9IGZvcm1hdEhvdXIoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRpbWVfZXBvY2gpXHJcbiAgICAgICAgY29uc3QgaG91ciA9IG1pbGl0YXJ5VG9TdGFuZGFyZFRpbWUoaG91cjI0KSAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGluQ2Vsc2l1cykge1xyXG4gICAgICAgICAgICB0ZW1wZXJhdHVyZSA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS50ZW1wX2NcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoaG91ciwgdGVtcGVyYXR1cmUsIGljb24sIGluQ2Vsc2l1cylcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtsb2FkSG91cmx5V2VhdGhlcn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGxvYWRDdXJyZW50V2VhdGhlciB9IGZyb20gXCIuL2N1cnJlbnRXZWF0aGVyXCJcclxuaW1wb3J0IHsgbG9hZEhvdXJseVdlYXRoZXIgfSBmcm9tIFwiLi9ob3VybHlXZWF0aGVyXCJcclxuaW1wb3J0IHtjbGVhckhvdXJseUNvbnRhaW5lcn0gZnJvbSBcIi4vaGVscGVyRnVuY3Rpb25zXCJcclxuaW1wb3J0IHsgbG9hZEZvcmVjYXN0V2VhdGhlciB9IGZyb20gXCIuL2ZvcmVjYXN0V2VhdGhlclwiXHJcblxyXG5sZXQgdXJsID0gXCJodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT1hNzhkODA2NWFjOTM0ZGY1Yjc4MTcxMDAzMjMwMzEwJnE9TmV3IFlvcmsmZGF5cz0zJmFxaT1ubyZhbGVydHM9bm9cIlxyXG5cclxubG9hZEN1cnJlbnRXZWF0aGVyKHVybCkgLy9pbml0aWFsaXplIHNvbWUgZGF0YVxyXG5sb2FkSG91cmx5V2VhdGhlcih1cmwpXHJcbmxvYWRGb3JlY2FzdFdlYXRoZXIodXJsKVxyXG5cclxuY29uc3Qgc2VhcmNoZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1mb3JtXVwiKVxyXG5zZWFyY2hmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFzeW5jIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hcIikudmFsdWVcclxuICAgIC8vdXJsID0gYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWE3OGQ4MDY1YWM5MzRkZjViNzgxNzEwMDMyMzAzMTAmcT0ke3NlYXJjaElucHV0fSZkYXlzPTEmYXFpPW5vJmFsZXJ0cz1ub2BcclxuICAgIGF3YWl0IGxvYWRDdXJyZW50V2VhdGhlcihgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9YTc4ZDgwNjVhYzkzNGRmNWI3ODE3MTAwMzIzMDMxMCZxPSR7c2VhcmNoSW5wdXR9JmRheXM9MyZhcWk9bm8mYWxlcnRzPW5vYClcclxuXHJcbiAgICBjbGVhckhvdXJseUNvbnRhaW5lcigpXHJcbiAgICBhd2FpdCBsb2FkSG91cmx5V2VhdGhlcihgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9YTc4ZDgwNjVhYzkzNGRmNWI3ODE3MTAwMzIzMDMxMCZxPSR7c2VhcmNoSW5wdXR9JmRheXM9MyZhcWk9bm8mYWxlcnRzPW5vYClcclxuXHJcbiAgICBsb2FkRm9yZWNhc3RXZWF0aGVyKGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT1hNzhkODA2NWFjOTM0ZGY1Yjc4MTcxMDAzMjMwMzEwJnE9JHtzZWFyY2hJbnB1dH0mZGF5cz0zJmFxaT1ubyZhbGVydHM9bm9gKVxyXG59KVxyXG5cclxuXHJcbmNvbnN0IHRvZ2dsZURlZ3JlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGlkZGVuLWNoZWNrYm94XCIpXHJcbnRvZ2dsZURlZ3JlZS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGFzeW5jICgpID0+IHtcclxuICAgIGlmICh0b2dnbGVEZWdyZWUuY2hlY2tlZCkge1xyXG4gICAgICAgIGNsZWFySG91cmx5Q29udGFpbmVyKClcclxuICAgICAgICBhd2FpdCBsb2FkQ3VycmVudFdlYXRoZXIodXJsLHRydWUpXHJcbiAgICAgICAgYXdhaXQgbG9hZEhvdXJseVdlYXRoZXIodXJsLHRydWUpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNsZWFySG91cmx5Q29udGFpbmVyKClcclxuICAgICAgICBhd2FpdCBsb2FkQ3VycmVudFdlYXRoZXIodXJsKVxyXG4gICAgICAgIGF3YWl0IGxvYWRIb3VybHlXZWF0aGVyKHVybClcclxuICAgIH1cclxufSlcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==