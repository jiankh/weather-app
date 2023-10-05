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

    for (let i = 0; i<3; i++) {
        // const date = epochToSimpleDate(data.forecast.forecastday[i].date_epoch)
        const date = (await (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_0__.formatDate)(data.forecast.forecastday[i].date_epoch)).slice(0,-4)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOcUQ7QUFDRjtBQUNHO0FBQ0M7QUFDdkQ7QUFDQTtBQUNBO0FBQ0Esb0VBQWtCO0FBQ2xCLGtFQUFpQjtBQUNqQixzRUFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlHQUFpRyxZQUFZO0FBQzdHLFVBQVUsbUVBQWtCLHNGQUFzRixZQUFZO0FBQzlIO0FBQ0EsSUFBSSx1RUFBb0I7QUFDeEIsVUFBVSxpRUFBaUIsc0ZBQXNGLFlBQVk7QUFDN0g7QUFDQSxJQUFJLHNFQUFtQixzRkFBc0YsWUFBWTtBQUN6SCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0VBQW9CO0FBQzVCLGNBQWMsbUVBQWtCO0FBQ2hDLGNBQWMsaUVBQWlCO0FBQy9CLGNBQWMscUVBQW1CO0FBQ2pDLE1BQU07QUFDTixRQUFRLHNFQUFvQjtBQUM1QixjQUFjLG1FQUFrQjtBQUNoQyxjQUFjLGlFQUFpQjtBQUMvQixjQUFjLHFFQUFtQjtBQUNqQztBQUNBLENBQUM7QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2N1cnJlbnRXZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2ZvcmVjYXN0V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9oZWxwZXJGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaG91cmx5V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxvYWRKc29uLCBmb3JtYXREYXRlIH0gZnJvbSBcIi4vaGVscGVyRnVuY3Rpb25zXCJcclxuXHJcbmNvbnN0IHdlYXRoZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItY29udGFpbmVyXCIpXHJcbmNvbnN0IGxvY2F0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2NhdGlvbi1jb250YWluZXJcIilcclxuY29uc3QgZGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC10aW1lLWNvbnRhaW5lclwiKVxyXG5jb25zdCBjdXJyZW50R3JhcGhpYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1ncmFwaGljc1wiKVxyXG5jb25zdCBjdXJyZW50RGVncmVlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1kZWdyZWVzXCIpXHJcblxyXG5jb25zdCBjdXJyZW50RmVlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1mZWVscy1saWtlXVwiKVxyXG5jb25zdCBjdXJyZW50SHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtaHVtaWRpdHldXCIpXHJcbmNvbnN0IGN1cnJlbnRSYWluQ2hhbmNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXJhaW4tY2hhbmNlXVwiKVxyXG5jb25zdCBjdXJyZW50V2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS13aW5kXVwiKVxyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRDdXJyZW50V2VhdGhlcih1cmwsaW5DZWxzaXVzPWZhbHNlKSB7XHJcbiAgICBjb25zdCBjdXJyZW50RGF0YSA9IGF3YWl0IGxvYWRKc29uKHVybClcclxuICAgIHdlYXRoZXJDb250YWluZXIuaW5uZXJIVE1MID0gY3VycmVudERhdGEuY3VycmVudC5jb25kaXRpb24udGV4dFxyXG4gICAgbG9jYXRpb25Db250YWluZXIuaW5uZXJIVE1MID0gYDxpbWcgZGF0YS1sb2NhdGlvbi1waW4gc3JjPVwiaW1hZ2VzL2xvY2F0aW9uLXBpbi5zdmdcIj4gJHtjdXJyZW50RGF0YS5sb2NhdGlvbi5uYW1lfWBcclxuICAgIGRhdGVDb250YWluZXIuaW5uZXJIVE1MID0gYXdhaXQgZm9ybWF0RGF0ZShjdXJyZW50RGF0YS5sb2NhdGlvbi5sb2NhbHRpbWVfZXBvY2gpXHJcbiAgICBjdXJyZW50RGVncmVlcy5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5jdXJyZW50LnRlbXBfZn0gwrBGYFxyXG4gICAgY3VycmVudEdyYXBoaWMuaW5uZXJIVE1MID0gYDxpbWcgY2xhc3M9Y3VycmVudC1pbWFnZSBzcmM9XCJodHRwczoke2N1cnJlbnREYXRhLmN1cnJlbnQuY29uZGl0aW9uLmljb259XCIgYWx0PVwid2VhdGhlciBpY29uXCI+YFxyXG5cclxuICAgIC8vRXh0cmEgU2VjdGlvblxyXG4gICAgY3VycmVudEZlZWwuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC5mZWVsc2xpa2VfZn0gwrBGYCBcclxuICAgIGN1cnJlbnRIdW1pZGl0eS5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5jdXJyZW50Lmh1bWlkaXR5fSAlYFxyXG4gICAgY3VycmVudFJhaW5DaGFuY2UuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSAlYFxyXG4gICAgY3VycmVudFdpbmQuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC53aW5kX21waH0gTVBIYFxyXG5cclxuICAgIC8vQ2VsY2l1cyAvIEZhcmVuaGVpdFxyXG4gICAgaWYgKGluQ2Vsc2l1cykge1xyXG4gICAgICAgIGN1cnJlbnRGZWVsLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2N9IMKwQ2BcclxuICAgICAgICBjdXJyZW50RGVncmVlcy5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5jdXJyZW50LnRlbXBfY30gwrBDYFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge2xvYWRDdXJyZW50V2VhdGhlcn1cclxuIiwiaW1wb3J0IHsgbG9hZEpzb24sIGVwb2NoVG9TaW1wbGVEYXRlLCBmb3JtYXREYXRlIH0gZnJvbSBcIi4vaGVscGVyRnVuY3Rpb25zXCJcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRGb3JlY2FzdFdlYXRoZXIodXJsLCBpbkNlbHNpdXM9ZmFsc2UpIHtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBsb2FkSnNvbih1cmwsIHttb2RlOidjb3JzJ30pXHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGk8MzsgaSsrKSB7XHJcbiAgICAgICAgLy8gY29uc3QgZGF0ZSA9IGVwb2NoVG9TaW1wbGVEYXRlKGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF0ZV9lcG9jaClcclxuICAgICAgICBjb25zdCBkYXRlID0gKGF3YWl0IGZvcm1hdERhdGUoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXRlX2Vwb2NoKSkuc2xpY2UoMCwtNClcclxuICAgICAgICBsZXQgdGVtcE1heCA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF5Lm1heHRlbXBfZlxyXG4gICAgICAgIGxldCB0ZW1wTWluID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkubWludGVtcF9mXHJcblxyXG4gICAgICAgIGNvbnN0IGljb24gPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5jb25kaXRpb24uaWNvblxyXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0ID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkuY29uZGl0aW9uLnRleHRcclxuICAgICAgICBjb25zdCByYWluQ2hhbmNlID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW5cclxuICAgICAgICBjb25zdCB3aW5kID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkubWF4d2luZF9tcGhcclxuXHJcbiAgICAgICAgY29uc3Qgc2xvdCA9IGlcclxuXHJcbiAgICAgICAgaWYgKGluQ2Vsc2l1cykge1xyXG4gICAgICAgICAgICB0ZW1wTWF4ID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkubWF4dGVtcF9jXHJcbiAgICAgICAgICAgIHRlbXBNaW4gPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5taW50ZW1wX2NcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluc2VydEZvcmVjYXN0KHNsb3QsZGF0ZSx0ZW1wTWF4LHRlbXBNaW4saWNvbixmb3JlY2FzdCxyYWluQ2hhbmNlLHdpbmQsaW5DZWxzaXVzKVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRGb3JlY2FzdChzbG90LGRhdGUsdGVtcE1heCx0ZW1wTWluLGljb24sZm9yZWNhc3QscmFpbkNoYW5jZSx3aW5kLCBpbkNlbHNpdXM9ZmFsc2UpIHtcclxuICAgIGNvbnN0IGRhdGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5kYXRlLSR7c2xvdH1gKVxyXG4gICAgY29uc3QgdGVtcEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnRlbXAtJHtzbG90fWApXHJcbiAgICBjb25zdCBpY29uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuaWNvbi0ke3Nsb3R9YClcclxuICAgIGNvbnN0IGZvcmVjYXN0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZm9yZWNhc3QtJHtzbG90fWApXHJcbiAgICBjb25zdCByYWluRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucmFpbi0ke3Nsb3R9YClcclxuICAgIGNvbnN0IHdpbmRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC53aW5kLSR7c2xvdH1gKVxyXG5cclxuICAgIGRhdGVFbC50ZXh0Q29udGVudCA9IGRhdGVcclxuICAgIHRlbXBFbC50ZXh0Q29udGVudCA9IGAke3RlbXBNYXh9wrBGIC8gJHt0ZW1wTWlufcKwRmBcclxuICAgIGljb25FbC5pbm5lckhUTUwgPSBgPGltZyBhbHQ9XCJmb3JlY2FzdCBpY29uXCIgc3JjPVwiaHR0cHM6JHtpY29ufVwiPmBcclxuICAgIGZvcmVjYXN0RWwudGV4dENvbnRlbnQgPSBmb3JlY2FzdFxyXG4gICAgcmFpbkVsLmlubmVySFRNTCA9IGA8aW1nIGNsYXNzPVwicmFpbi1pY29uXCIgc3JjPVwiaW1hZ2VzL3JhaW4ucG5nXCI+ICR7cmFpbkNoYW5jZX0gJWBcclxuICAgIHdpbmRFbC5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cIndpbmR5LWljb25cIiBzcmM9XCJpbWFnZXMvd2luZHkucG5nXCI+ICAke3dpbmR9IE1QSGBcclxuXHJcbiAgICBpZiAoaW5DZWxzaXVzKSB7XHJcbiAgICAgICAgdGVtcEVsLnRleHRDb250ZW50ID0gYCR7dGVtcE1heH3CsEMgLyAke3RlbXBNaW59wrBDYFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge2xvYWRGb3JlY2FzdFdlYXRoZXJ9IiwiXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRKc29uKHVybCkge1xyXG4gICAgdHJ5e1xyXG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybClcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YVxyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVwb2NoVG9TaW1wbGVEYXRlKGVwb2NoLCB0aW1lWm9uZSA9ICdVVEMnKSB7XHJcbiAgICBjb25zdCBlcG9jaFRpbWUgPSBlcG9jaCAqIDEwMDBcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShlcG9jaFRpbWUpXHJcbiAgICBjb25zdCBkYXlPZldlZWsgPSBkYXRlLnRvTG9jYWxlU3RyaW5nKCdlbi1VUycsIHsgd2Vla2RheTogJ3Nob3J0JywgdGltZVpvbmUgfSlcclxuICAgIGNvbnN0IGRheU9mTW9udGggPSBkYXRlLmdldERhdGUoKVxyXG4gICAgcmV0dXJuIGAke2RheU9mV2Vla30gJHtkYXlPZk1vbnRofWBcclxufVxyXG5cclxuLy8gZnVuY3Rpb24gZXBvY2hUb1NpbXBsZURhdGUoZXBvY2gpIHtcclxuLy8gICAgIGNvbnN0IGVwb2NoX3RpbWUgPSBlcG9jaCoxMDAwXHJcbi8vICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZXBvY2hfdGltZSlcclxuLy8gICAgIGNvbnN0IGRheU9mV2VlayA9IGRhdGUuZ2V0RGF5KClcclxuLy8gICAgIGNvbnN0IGRheU9mTW9udGggPSBkYXRlLmdldERhdGUoKVxyXG4vLyAgICAgY29uc3QgZGF5TmFtZXMgPSBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddO1xyXG4vLyAgICAgcmV0dXJuIGAke2RheU5hbWVzW2RheU9mV2Vla119ICR7ZGF5T2ZNb250aH1gXHJcbi8vIH1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGZvcm1hdERhdGUoZXBvY2gpIHtcclxuICAgIGNvbnN0IGVwb2NoX3RpbWUgPSBlcG9jaCoxMDAwIC8vbWlsbGlzZWNvbmRzXHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZXBvY2hfdGltZSlcclxuICAgIHJldHVybiBkYXRlLnRvRGF0ZVN0cmluZygpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1pbGl0YXJ5VG9TdGFuZGFyZFRpbWUodGltZSkge1xyXG4gICAgY29uc3QgcGVyaW9kID0gdGltZSA+PSAxMiA/IFwiUE1cIiA6IFwiQU1cIlxyXG4gICAgY29uc3QgaG91ciA9ICh0aW1lICUgMTIpIHx8IDEyIFxyXG4gICAgcmV0dXJuIGAke2hvdXJ9ICR7cGVyaW9kfWAgXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBmb3JtYXRIb3VyKGVwb2NoKSB7XHJcbiAgICBjb25zdCBlcG9jaF90aW1lID0gZXBvY2gqMTAwMFxyXG4gICAgY29uc3QgaG91ciA9IG5ldyBEYXRlKGVwb2NoX3RpbWUpXHJcbiAgICByZXR1cm4gaG91ci5nZXRIb3VycygpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoaG91ciwgdGVtcCwgaWNvbiwgaW5DZWxzaXVzPWZhbHNlKSB7XHJcbiAgICBjb25zdCBob3VybHlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvdXJseS1jb250YWluZXJcIilcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJob3VybHlcIilcclxuXHJcbiAgICBsZXQgZGVncmVlID0gXCLCsEZcIlxyXG4gICAgaWYgKGluQ2Vsc2l1cykge1xyXG4gICAgICAgIGRlZ3JlZSA9IFwiwrBDXCJcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaG91cmx5XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJob3VybHktdGltZVwiPiR7aG91cn0gPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJob3VybHktdGVtcFwiPiR7dGVtcH0gJHtkZWdyZWV9PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJob3VybHktaW1nXCI+IDxpbWcgc3JjPVwiJHtpY29ufVwiPiA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGBcclxuXHJcbiAgICBob3VybHlDb250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbWVudClcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJIb3VybHlDb250YWluZXIoKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvdXJseS1jb250YWluZXJcIilcclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiXHJcbn1cclxuXHJcbmV4cG9ydCB7bG9hZEpzb24sIFxyXG4gICAgICAgIGZvcm1hdERhdGUsIFxyXG4gICAgICAgIG1pbGl0YXJ5VG9TdGFuZGFyZFRpbWUsIFxyXG4gICAgICAgIGZvcm1hdEhvdXIsIFxyXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQsXHJcbiAgICAgICAgY2xlYXJIb3VybHlDb250YWluZXIsXHJcbiAgICAgICAgZXBvY2hUb1NpbXBsZURhdGVcclxuICAgIH0iLCJpbXBvcnQgeyBsb2FkSnNvbiwgbWlsaXRhcnlUb1N0YW5kYXJkVGltZSwgZm9ybWF0SG91ciwgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuL2hlbHBlckZ1bmN0aW9uc1wiXHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkSG91cmx5V2VhdGhlcih1cmwsIGluQ2Vsc2l1cz1mYWxzZSkge1xyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGxvYWRKc29uKHVybClcclxuICAgIGNvbnN0IHRpbWVOb3cgPSBmb3JtYXRIb3VyKGRhdGEubG9jYXRpb24ubG9jYWx0aW1lX2Vwb2NoKVxyXG4gICAgZm9yIChsZXQgaT10aW1lTm93KzE7IGk8KHRpbWVOb3crNik7IGkrKykgeyAgICAgIFxyXG4gICAgICAgIGxldCB0ZW1wZXJhdHVyZSA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS50ZW1wX2ZcclxuICAgICAgICBjb25zdCBpY29uID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLmNvbmRpdGlvbi5pY29uXHJcbiAgICAgICAgY29uc3QgaG91cjI0ID0gZm9ybWF0SG91cihkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbaV0udGltZV9lcG9jaClcclxuICAgICAgICBjb25zdCBob3VyID0gbWlsaXRhcnlUb1N0YW5kYXJkVGltZShob3VyMjQpICBcclxuICAgICAgICBcclxuICAgICAgICBpZiAoaW5DZWxzaXVzKSB7XHJcbiAgICAgICAgICAgIHRlbXBlcmF0dXJlID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRlbXBfY1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlRWxlbWVudChob3VyLCB0ZW1wZXJhdHVyZSwgaWNvbiwgaW5DZWxzaXVzKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge2xvYWRIb3VybHlXZWF0aGVyfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbG9hZEN1cnJlbnRXZWF0aGVyIH0gZnJvbSBcIi4vY3VycmVudFdlYXRoZXJcIlxyXG5pbXBvcnQgeyBsb2FkSG91cmx5V2VhdGhlciB9IGZyb20gXCIuL2hvdXJseVdlYXRoZXJcIlxyXG5pbXBvcnQge2NsZWFySG91cmx5Q29udGFpbmVyfSBmcm9tIFwiLi9oZWxwZXJGdW5jdGlvbnNcIlxyXG5pbXBvcnQgeyBsb2FkRm9yZWNhc3RXZWF0aGVyIH0gZnJvbSBcIi4vZm9yZWNhc3RXZWF0aGVyXCJcclxuXHJcbmxldCB1cmwgPSBcImh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWE3OGQ4MDY1YWM5MzRkZjViNzgxNzEwMDMyMzAzMTAmcT1OZXcgWW9yayZkYXlzPTMmYXFpPW5vJmFsZXJ0cz1ub1wiXHJcblxyXG5sb2FkQ3VycmVudFdlYXRoZXIodXJsKSAvL2luaXRpYWxpemUgc29tZSBkYXRhXHJcbmxvYWRIb3VybHlXZWF0aGVyKHVybClcclxubG9hZEZvcmVjYXN0V2VhdGhlcih1cmwpXHJcblxyXG5jb25zdCBzZWFyY2hmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWZvcm1dXCIpXHJcbnNlYXJjaGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYXN5bmMgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaFwiKS52YWx1ZVxyXG4gICAgLy91cmwgPSBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9YTc4ZDgwNjVhYzkzNGRmNWI3ODE3MTAwMzIzMDMxMCZxPSR7c2VhcmNoSW5wdXR9JmRheXM9MSZhcWk9bm8mYWxlcnRzPW5vYFxyXG4gICAgYXdhaXQgbG9hZEN1cnJlbnRXZWF0aGVyKGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT1hNzhkODA2NWFjOTM0ZGY1Yjc4MTcxMDAzMjMwMzEwJnE9JHtzZWFyY2hJbnB1dH0mZGF5cz0zJmFxaT1ubyZhbGVydHM9bm9gKVxyXG5cclxuICAgIGNsZWFySG91cmx5Q29udGFpbmVyKClcclxuICAgIGF3YWl0IGxvYWRIb3VybHlXZWF0aGVyKGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT1hNzhkODA2NWFjOTM0ZGY1Yjc4MTcxMDAzMjMwMzEwJnE9JHtzZWFyY2hJbnB1dH0mZGF5cz0zJmFxaT1ubyZhbGVydHM9bm9gKVxyXG5cclxuICAgIGxvYWRGb3JlY2FzdFdlYXRoZXIoYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWE3OGQ4MDY1YWM5MzRkZjViNzgxNzEwMDMyMzAzMTAmcT0ke3NlYXJjaElucHV0fSZkYXlzPTMmYXFpPW5vJmFsZXJ0cz1ub2ApXHJcbn0pXHJcblxyXG5cclxuY29uc3QgdG9nZ2xlRGVncmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oaWRkZW4tY2hlY2tib3hcIilcclxudG9nZ2xlRGVncmVlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKHRvZ2dsZURlZ3JlZS5jaGVja2VkKSB7XHJcbiAgICAgICAgY2xlYXJIb3VybHlDb250YWluZXIoKVxyXG4gICAgICAgIGF3YWl0IGxvYWRDdXJyZW50V2VhdGhlcih1cmwsdHJ1ZSlcclxuICAgICAgICBhd2FpdCBsb2FkSG91cmx5V2VhdGhlcih1cmwsdHJ1ZSlcclxuICAgICAgICBhd2FpdCBsb2FkRm9yZWNhc3RXZWF0aGVyKHVybCx0cnVlKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjbGVhckhvdXJseUNvbnRhaW5lcigpXHJcbiAgICAgICAgYXdhaXQgbG9hZEN1cnJlbnRXZWF0aGVyKHVybClcclxuICAgICAgICBhd2FpdCBsb2FkSG91cmx5V2VhdGhlcih1cmwpXHJcbiAgICAgICAgYXdhaXQgbG9hZEZvcmVjYXN0V2VhdGhlcih1cmwpXHJcbiAgICB9XHJcbn0pXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=