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

        console.log(data.forecast.forecastday[i].date)

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
    const inputMonth = parseInt(inputDate.slice(5,7))
    const inputDay = parseInt(inputDate.slice(-2))
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

    await (0,_forecastWeather__WEBPACK_IMPORTED_MODULE_3__.loadForecastWeather)(`https://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=${searchInput}&days=3&aqi=no&alerts=no`)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOcUQ7QUFDRjtBQUNHO0FBQ0M7QUFDdkQ7QUFDQTtBQUNBO0FBQ0Esb0VBQWtCO0FBQ2xCLGtFQUFpQjtBQUNqQixzRUFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlHQUFpRyxZQUFZO0FBQzdHLFVBQVUsbUVBQWtCLHNGQUFzRixZQUFZO0FBQzlIO0FBQ0EsSUFBSSx1RUFBb0I7QUFDeEIsVUFBVSxpRUFBaUIsc0ZBQXNGLFlBQVk7QUFDN0g7QUFDQSxVQUFVLHFFQUFtQixzRkFBc0YsWUFBWTtBQUMvSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0VBQW9CO0FBQzVCLGNBQWMsbUVBQWtCO0FBQ2hDLGNBQWMsaUVBQWlCO0FBQy9CLGNBQWMscUVBQW1CO0FBQ2pDLE1BQU07QUFDTixRQUFRLHNFQUFvQjtBQUM1QixjQUFjLG1FQUFrQjtBQUNoQyxjQUFjLGlFQUFpQjtBQUMvQixjQUFjLHFFQUFtQjtBQUNqQztBQUNBLENBQUM7QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2N1cnJlbnRXZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2ZvcmVjYXN0V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9oZWxwZXJGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaG91cmx5V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxvYWRKc29uLCBmb3JtYXREYXRlIH0gZnJvbSBcIi4vaGVscGVyRnVuY3Rpb25zXCJcclxuXHJcbmNvbnN0IHdlYXRoZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItY29udGFpbmVyXCIpXHJcbmNvbnN0IGxvY2F0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2NhdGlvbi1jb250YWluZXJcIilcclxuY29uc3QgZGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC10aW1lLWNvbnRhaW5lclwiKVxyXG5jb25zdCBjdXJyZW50R3JhcGhpYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1ncmFwaGljc1wiKVxyXG5jb25zdCBjdXJyZW50RGVncmVlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1kZWdyZWVzXCIpXHJcblxyXG5jb25zdCBjdXJyZW50RmVlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1mZWVscy1saWtlXVwiKVxyXG5jb25zdCBjdXJyZW50SHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtaHVtaWRpdHldXCIpXHJcbmNvbnN0IGN1cnJlbnRSYWluQ2hhbmNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXJhaW4tY2hhbmNlXVwiKVxyXG5jb25zdCBjdXJyZW50V2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS13aW5kXVwiKVxyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRDdXJyZW50V2VhdGhlcih1cmwsaW5DZWxzaXVzPWZhbHNlKSB7XHJcbiAgICBjb25zdCBjdXJyZW50RGF0YSA9IGF3YWl0IGxvYWRKc29uKHVybClcclxuICAgIHdlYXRoZXJDb250YWluZXIuaW5uZXJIVE1MID0gY3VycmVudERhdGEuY3VycmVudC5jb25kaXRpb24udGV4dFxyXG4gICAgbG9jYXRpb25Db250YWluZXIuaW5uZXJIVE1MID0gYDxpbWcgZGF0YS1sb2NhdGlvbi1waW4gc3JjPVwiaW1hZ2VzL2xvY2F0aW9uLXBpbi5zdmdcIj4gJHtjdXJyZW50RGF0YS5sb2NhdGlvbi5uYW1lfWBcclxuICAgIGRhdGVDb250YWluZXIuaW5uZXJIVE1MID0gZm9ybWF0RGF0ZShjdXJyZW50RGF0YS5sb2NhdGlvbi5sb2NhbHRpbWVfZXBvY2gpXHJcbiAgICBjdXJyZW50RGVncmVlcy5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5jdXJyZW50LnRlbXBfZn0gwrBGYFxyXG4gICAgY3VycmVudEdyYXBoaWMuaW5uZXJIVE1MID0gYDxpbWcgY2xhc3M9Y3VycmVudC1pbWFnZSBzcmM9XCJodHRwczoke2N1cnJlbnREYXRhLmN1cnJlbnQuY29uZGl0aW9uLmljb259XCIgYWx0PVwid2VhdGhlciBpY29uXCI+YFxyXG5cclxuICAgIC8vRXh0cmEgU2VjdGlvblxyXG4gICAgY3VycmVudEZlZWwuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC5mZWVsc2xpa2VfZn0gwrBGYCBcclxuICAgIGN1cnJlbnRIdW1pZGl0eS5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5jdXJyZW50Lmh1bWlkaXR5fSAlYFxyXG4gICAgY3VycmVudFJhaW5DaGFuY2UuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSAlYFxyXG4gICAgY3VycmVudFdpbmQuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC53aW5kX21waH0gTVBIYFxyXG5cclxuICAgIC8vQ2VsY2l1cyAvIEZhcmVuaGVpdFxyXG4gICAgaWYgKGluQ2Vsc2l1cykge1xyXG4gICAgICAgIGN1cnJlbnRGZWVsLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2N9IMKwQ2BcclxuICAgICAgICBjdXJyZW50RGVncmVlcy5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5jdXJyZW50LnRlbXBfY30gwrBDYFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge2xvYWRDdXJyZW50V2VhdGhlcn1cclxuIiwiaW1wb3J0IHsgbG9hZEpzb24sIGVwb2NoVG9TaW1wbGVEYXRlLCBmb3JtYXREYXRlIH0gZnJvbSBcIi4vaGVscGVyRnVuY3Rpb25zXCJcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRGb3JlY2FzdFdlYXRoZXIodXJsLCBpbkNlbHNpdXM9ZmFsc2UpIHtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBsb2FkSnNvbih1cmwsIHttb2RlOidjb3JzJ30pXHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGk8MzsgaSsrKSB7XHJcbiAgICAgICAgLy8gY29uc3QgZGF0ZSA9IGVwb2NoVG9TaW1wbGVEYXRlKGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF0ZV9lcG9jaClcclxuICAgICAgICBjb25zdCBkYXRlID0gY2hhbmdlRGF0ZVRvU2ltcGxlKGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF0ZSlcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdGVtcE1heCA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF5Lm1heHRlbXBfZlxyXG4gICAgICAgIGxldCB0ZW1wTWluID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkubWludGVtcF9mXHJcblxyXG4gICAgICAgIGNvbnN0IGljb24gPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5jb25kaXRpb24uaWNvblxyXG4gICAgICAgIGNvbnN0IGZvcmVjYXN0ID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkuY29uZGl0aW9uLnRleHRcclxuICAgICAgICBjb25zdCByYWluQ2hhbmNlID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW5cclxuICAgICAgICBjb25zdCB3aW5kID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkubWF4d2luZF9tcGhcclxuXHJcbiAgICAgICAgY29uc3Qgc2xvdCA9IGlcclxuXHJcbiAgICAgICAgaWYgKGluQ2Vsc2l1cykge1xyXG4gICAgICAgICAgICB0ZW1wTWF4ID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXkubWF4dGVtcF9jXHJcbiAgICAgICAgICAgIHRlbXBNaW4gPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheS5taW50ZW1wX2NcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF0ZSlcclxuXHJcbiAgICAgICAgaW5zZXJ0Rm9yZWNhc3Qoc2xvdCxkYXRlLHRlbXBNYXgsdGVtcE1pbixpY29uLGZvcmVjYXN0LHJhaW5DaGFuY2Usd2luZCxpbkNlbHNpdXMpXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydEZvcmVjYXN0KHNsb3QsZGF0ZSx0ZW1wTWF4LHRlbXBNaW4saWNvbixmb3JlY2FzdCxyYWluQ2hhbmNlLHdpbmQsIGluQ2Vsc2l1cz1mYWxzZSkge1xyXG4gICAgY29uc3QgZGF0ZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmRhdGUtJHtzbG90fWApXHJcbiAgICBjb25zdCB0ZW1wRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAudGVtcC0ke3Nsb3R9YClcclxuICAgIGNvbnN0IGljb25FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5pY29uLSR7c2xvdH1gKVxyXG4gICAgY29uc3QgZm9yZWNhc3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5mb3JlY2FzdC0ke3Nsb3R9YClcclxuICAgIGNvbnN0IHJhaW5FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5yYWluLSR7c2xvdH1gKVxyXG4gICAgY29uc3Qgd2luZEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLndpbmQtJHtzbG90fWApXHJcblxyXG4gICAgZGF0ZUVsLnRleHRDb250ZW50ID0gZGF0ZVxyXG4gICAgdGVtcEVsLnRleHRDb250ZW50ID0gYCR7dGVtcE1heH3CsEYgLyAke3RlbXBNaW59wrBGYFxyXG4gICAgaWNvbkVsLmlubmVySFRNTCA9IGA8aW1nIGFsdD1cImZvcmVjYXN0IGljb25cIiBzcmM9XCJodHRwczoke2ljb259XCI+YFxyXG4gICAgZm9yZWNhc3RFbC50ZXh0Q29udGVudCA9IGZvcmVjYXN0XHJcbiAgICByYWluRWwuaW5uZXJIVE1MID0gYDxpbWcgY2xhc3M9XCJyYWluLWljb25cIiBzcmM9XCJpbWFnZXMvcmFpbi5wbmdcIj4gJHtyYWluQ2hhbmNlfSAlYFxyXG4gICAgd2luZEVsLmlubmVySFRNTCA9IGA8aW1nIGNsYXNzPVwid2luZHktaWNvblwiIHNyYz1cImltYWdlcy93aW5keS5wbmdcIj4gICR7d2luZH0gTVBIYFxyXG5cclxuICAgIGlmIChpbkNlbHNpdXMpIHtcclxuICAgICAgICB0ZW1wRWwudGV4dENvbnRlbnQgPSBgJHt0ZW1wTWF4fcKwQyAvICR7dGVtcE1pbn3CsENgXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZURhdGVUb1NpbXBsZShpbnB1dERhdGUpIHtcclxuICAgIGNvbnN0IG1vbnRocyA9IFtcIjBcIixcIkphblwiLFwiRmViXCIsXCJNYXJcIixcIkFwclwiLFwiTWF5XCIsXCJKdW5cIixcIkp1bFwiLFwiQXVnXCIsXCJTZXBcIixcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXVxyXG4gICAgY29uc3QgaW5wdXRNb250aCA9IHBhcnNlSW50KGlucHV0RGF0ZS5zbGljZSg1LDcpKVxyXG4gICAgY29uc3QgaW5wdXREYXkgPSBwYXJzZUludChpbnB1dERhdGUuc2xpY2UoLTIpKVxyXG4gICAgcmV0dXJuIGAke21vbnRoc1tpbnB1dE1vbnRoXX0gJHtpbnB1dERheX1gXHJcbn0gICBcclxuXHJcbmV4cG9ydCB7bG9hZEZvcmVjYXN0V2VhdGhlcn0iLCJcclxuYXN5bmMgZnVuY3Rpb24gbG9hZEpzb24odXJsKSB7XHJcbiAgICB0cnl7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKVxyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhXHJcbiAgICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZXBvY2hUb1NpbXBsZURhdGUoZXBvY2gsIHRpbWVab25lID0gJ1VUQycpIHtcclxuICAgIGNvbnN0IGVwb2NoVGltZSA9IGVwb2NoICogMTAwMFxyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGVwb2NoVGltZSlcclxuICAgIGNvbnN0IGRheU9mV2VlayA9IGRhdGUudG9Mb2NhbGVTdHJpbmcoJ2VuLVVTJywgeyB3ZWVrZGF5OiAnc2hvcnQnLCB0aW1lWm9uZSB9KVxyXG4gICAgY29uc3QgZGF5T2ZNb250aCA9IGRhdGUuZ2V0RGF0ZSgpXHJcbiAgICByZXR1cm4gYCR7ZGF5T2ZXZWVrfSAke2RheU9mTW9udGh9YFxyXG59XHJcblxyXG4vLyBmdW5jdGlvbiBlcG9jaFRvU2ltcGxlRGF0ZShlcG9jaCkge1xyXG4vLyAgICAgY29uc3QgZXBvY2hfdGltZSA9IGVwb2NoKjEwMDBcclxuLy8gICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShlcG9jaF90aW1lKVxyXG4vLyAgICAgY29uc3QgZGF5T2ZXZWVrID0gZGF0ZS5nZXREYXkoKVxyXG4vLyAgICAgY29uc3QgZGF5T2ZNb250aCA9IGRhdGUuZ2V0RGF0ZSgpXHJcbi8vICAgICBjb25zdCBkYXlOYW1lcyA9IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J107XHJcbi8vICAgICByZXR1cm4gYCR7ZGF5TmFtZXNbZGF5T2ZXZWVrXX0gJHtkYXlPZk1vbnRofWBcclxuLy8gfVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0RGF0ZShlcG9jaCkge1xyXG4gICAgY29uc3QgZXBvY2hfdGltZSA9IGVwb2NoKjEwMDAgLy9taWxsaXNlY29uZHNcclxuICAgIGNvbnN0IGRhdGVfZXBvY2ggPSBuZXcgRGF0ZShlcG9jaF90aW1lKVxyXG4gICAgcmV0dXJuIGRhdGVfZXBvY2gudG9EYXRlU3RyaW5nKClcclxufVxyXG5cclxuZnVuY3Rpb24gbWlsaXRhcnlUb1N0YW5kYXJkVGltZSh0aW1lKSB7XHJcbiAgICBjb25zdCBwZXJpb2QgPSB0aW1lID49IDEyID8gXCJQTVwiIDogXCJBTVwiXHJcbiAgICBjb25zdCBob3VyID0gKHRpbWUgJSAxMikgfHwgMTIgXHJcbiAgICByZXR1cm4gYCR7aG91cn0gJHtwZXJpb2R9YCBcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdEhvdXIoZXBvY2gpIHtcclxuICAgIGNvbnN0IGVwb2NoX3RpbWUgPSBlcG9jaCoxMDAwXHJcbiAgICBjb25zdCBob3VyID0gbmV3IERhdGUoZXBvY2hfdGltZSlcclxuICAgIHJldHVybiBob3VyLmdldEhvdXJzKClcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudChob3VyLCB0ZW1wLCBpY29uLCBpbkNlbHNpdXM9ZmFsc2UpIHtcclxuICAgIGNvbnN0IGhvdXJseUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG91cmx5LWNvbnRhaW5lclwiKVxyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhvdXJseVwiKVxyXG5cclxuICAgIGxldCBkZWdyZWUgPSBcIsKwRlwiXHJcbiAgICBpZiAoaW5DZWxzaXVzKSB7XHJcbiAgICAgICAgZGVncmVlID0gXCLCsENcIlxyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJob3VybHlcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhvdXJseS10aW1lXCI+JHtob3VyfSA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhvdXJseS10ZW1wXCI+JHt0ZW1wfSAke2RlZ3JlZX08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhvdXJseS1pbWdcIj4gPGltZyBzcmM9XCIke2ljb259XCI+IDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYFxyXG5cclxuICAgIGhvdXJseUNvbnRhaW5lci5hcHBlbmRDaGlsZChlbGVtZW50KVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckhvdXJseUNvbnRhaW5lcigpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG91cmx5LWNvbnRhaW5lclwiKVxyXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCJcclxufVxyXG5cclxuZXhwb3J0IHtsb2FkSnNvbiwgXHJcbiAgICAgICAgZm9ybWF0RGF0ZSwgXHJcbiAgICAgICAgbWlsaXRhcnlUb1N0YW5kYXJkVGltZSwgXHJcbiAgICAgICAgZm9ybWF0SG91ciwgXHJcbiAgICAgICAgY3JlYXRlRWxlbWVudCxcclxuICAgICAgICBjbGVhckhvdXJseUNvbnRhaW5lcixcclxuICAgICAgICBlcG9jaFRvU2ltcGxlRGF0ZVxyXG4gICAgfSIsImltcG9ydCB7IGxvYWRKc29uLCBtaWxpdGFyeVRvU3RhbmRhcmRUaW1lLCBmb3JtYXRIb3VyLCBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4vaGVscGVyRnVuY3Rpb25zXCJcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRIb3VybHlXZWF0aGVyKHVybCwgaW5DZWxzaXVzPWZhbHNlKSB7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgbG9hZEpzb24odXJsKVxyXG4gICAgY29uc3QgdGltZU5vdyA9IGZvcm1hdEhvdXIoZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWVfZXBvY2gpXHJcbiAgICBmb3IgKGxldCBpPXRpbWVOb3crMTsgaTwodGltZU5vdys2KTsgaSsrKSB7ICAgICAgXHJcbiAgICAgICAgbGV0IHRlbXBlcmF0dXJlID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRlbXBfZlxyXG4gICAgICAgIGNvbnN0IGljb24gPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbaV0uY29uZGl0aW9uLmljb25cclxuICAgICAgICBjb25zdCBob3VyMjQgPSBmb3JtYXRIb3VyKGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS50aW1lX2Vwb2NoKVxyXG4gICAgICAgIGNvbnN0IGhvdXIgPSBtaWxpdGFyeVRvU3RhbmRhcmRUaW1lKGhvdXIyNCkgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChpbkNlbHNpdXMpIHtcclxuICAgICAgICAgICAgdGVtcGVyYXR1cmUgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbaV0udGVtcF9jXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVFbGVtZW50KGhvdXIsIHRlbXBlcmF0dXJlLCBpY29uLCBpbkNlbHNpdXMpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7bG9hZEhvdXJseVdlYXRoZXJ9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBsb2FkQ3VycmVudFdlYXRoZXIgfSBmcm9tIFwiLi9jdXJyZW50V2VhdGhlclwiXHJcbmltcG9ydCB7IGxvYWRIb3VybHlXZWF0aGVyIH0gZnJvbSBcIi4vaG91cmx5V2VhdGhlclwiXHJcbmltcG9ydCB7Y2xlYXJIb3VybHlDb250YWluZXJ9IGZyb20gXCIuL2hlbHBlckZ1bmN0aW9uc1wiXHJcbmltcG9ydCB7IGxvYWRGb3JlY2FzdFdlYXRoZXIgfSBmcm9tIFwiLi9mb3JlY2FzdFdlYXRoZXJcIlxyXG5cclxubGV0IHVybCA9IFwiaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9YTc4ZDgwNjVhYzkzNGRmNWI3ODE3MTAwMzIzMDMxMCZxPU5ldyBZb3JrJmRheXM9MyZhcWk9bm8mYWxlcnRzPW5vXCJcclxuXHJcbmxvYWRDdXJyZW50V2VhdGhlcih1cmwpIC8vaW5pdGlhbGl6ZSBzb21lIGRhdGFcclxubG9hZEhvdXJseVdlYXRoZXIodXJsKVxyXG5sb2FkRm9yZWNhc3RXZWF0aGVyKHVybClcclxuXHJcbmNvbnN0IHNlYXJjaGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtZm9ybV1cIilcclxuc2VhcmNoZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoXCIpLnZhbHVlXHJcbiAgICAvL3VybCA9IGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT1hNzhkODA2NWFjOTM0ZGY1Yjc4MTcxMDAzMjMwMzEwJnE9JHtzZWFyY2hJbnB1dH0mZGF5cz0xJmFxaT1ubyZhbGVydHM9bm9gXHJcbiAgICBhd2FpdCBsb2FkQ3VycmVudFdlYXRoZXIoYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWE3OGQ4MDY1YWM5MzRkZjViNzgxNzEwMDMyMzAzMTAmcT0ke3NlYXJjaElucHV0fSZkYXlzPTMmYXFpPW5vJmFsZXJ0cz1ub2ApXHJcblxyXG4gICAgY2xlYXJIb3VybHlDb250YWluZXIoKVxyXG4gICAgYXdhaXQgbG9hZEhvdXJseVdlYXRoZXIoYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWE3OGQ4MDY1YWM5MzRkZjViNzgxNzEwMDMyMzAzMTAmcT0ke3NlYXJjaElucHV0fSZkYXlzPTMmYXFpPW5vJmFsZXJ0cz1ub2ApXHJcblxyXG4gICAgYXdhaXQgbG9hZEZvcmVjYXN0V2VhdGhlcihgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9YTc4ZDgwNjVhYzkzNGRmNWI3ODE3MTAwMzIzMDMxMCZxPSR7c2VhcmNoSW5wdXR9JmRheXM9MyZhcWk9bm8mYWxlcnRzPW5vYClcclxufSlcclxuXHJcblxyXG5jb25zdCB0b2dnbGVEZWdyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhpZGRlbi1jaGVja2JveFwiKVxyXG50b2dnbGVEZWdyZWUuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAodG9nZ2xlRGVncmVlLmNoZWNrZWQpIHtcclxuICAgICAgICBjbGVhckhvdXJseUNvbnRhaW5lcigpXHJcbiAgICAgICAgYXdhaXQgbG9hZEN1cnJlbnRXZWF0aGVyKHVybCx0cnVlKVxyXG4gICAgICAgIGF3YWl0IGxvYWRIb3VybHlXZWF0aGVyKHVybCx0cnVlKVxyXG4gICAgICAgIGF3YWl0IGxvYWRGb3JlY2FzdFdlYXRoZXIodXJsLHRydWUpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNsZWFySG91cmx5Q29udGFpbmVyKClcclxuICAgICAgICBhd2FpdCBsb2FkQ3VycmVudFdlYXRoZXIodXJsKVxyXG4gICAgICAgIGF3YWl0IGxvYWRIb3VybHlXZWF0aGVyKHVybClcclxuICAgICAgICBhd2FpdCBsb2FkRm9yZWNhc3RXZWF0aGVyKHVybClcclxuICAgIH1cclxufSlcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==