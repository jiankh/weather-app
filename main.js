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

/***/ "./src/helperFunctions.js":
/*!********************************!*\
  !*** ./src/helperFunctions.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearHourlyContainer: () => (/* binding */ clearHourlyContainer),
/* harmony export */   createElement: () => (/* binding */ createElement),
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

async function formatDate(epoch) {
    const epochtime = epoch*1000 //milliseconds
    const date = new Date(epochtime)
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




let url = "https://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=New York&days=1&aqi=no&alerts=no"

;(0,_currentWeather__WEBPACK_IMPORTED_MODULE_0__.loadCurrentWeather)(url) //initialize some data
;(0,_hourlyWeather__WEBPACK_IMPORTED_MODULE_1__.loadHourlyWeather)(url)

const searchform = document.querySelector("[data-form]")
searchform.addEventListener('submit', async (e) => {
    e.preventDefault()
    const searchInput = document.querySelector("#search").value
    //url = `https://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=${searchInput}&days=1&aqi=no&alerts=no`
    await (0,_currentWeather__WEBPACK_IMPORTED_MODULE_0__.loadCurrentWeather)(`https://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=${searchInput}&days=1&aqi=no&alerts=no`)

    ;(0,_helperFunctions__WEBPACK_IMPORTED_MODULE_2__.clearHourlyContainer)()
    await (0,_hourlyWeather__WEBPACK_IMPORTED_MODULE_1__.loadHourlyWeather)(`https://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=${searchInput}&days=1&aqi=no&alerts=no`)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QiwwREFBUTtBQUN0QztBQUNBLDJGQUEyRiwwQkFBMEI7QUFDckgsb0NBQW9DLDREQUFVO0FBQzlDLGtDQUFrQyw0QkFBNEI7QUFDOUQsc0VBQXNFLG1DQUFtQztBQUN6RztBQUNBO0FBQ0EsK0JBQStCLGlDQUFpQztBQUNoRSxtQ0FBbUMsOEJBQThCO0FBQ2pFLHFDQUFxQyw4REFBOEQ7QUFDbkcsK0JBQStCLDhCQUE4QjtBQUM3RDtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsaUNBQWlDO0FBQ3BFLHNDQUFzQyw0QkFBNEI7QUFDbEU7QUFDQTtBQUNBO0FBQzJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsTUFBTSxFQUFFLE9BQU87QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLE1BQU07QUFDN0MsdUNBQXVDLE1BQU0sRUFBRSxPQUFPO0FBQ3RELGlEQUFpRCxLQUFLO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RCtGO0FBQy9GO0FBQ0E7QUFDQSx1QkFBdUIsMERBQVE7QUFDL0Isb0JBQW9CLDREQUFVO0FBQzlCLDBCQUEwQixlQUFlO0FBQ3pDO0FBQ0E7QUFDQSx1QkFBdUIsNERBQVU7QUFDakMscUJBQXFCLHdFQUFzQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwrREFBYTtBQUNyQjtBQUNBO0FBQ0E7Ozs7Ozs7VUNsQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnFEO0FBQ0Y7QUFDRztBQUN0RDtBQUNBO0FBQ0E7QUFDQSxvRUFBa0I7QUFDbEIsa0VBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpR0FBaUcsWUFBWTtBQUM3RyxVQUFVLG1FQUFrQixzRkFBc0YsWUFBWTtBQUM5SDtBQUNBLElBQUksdUVBQW9CO0FBQ3hCLFVBQVUsaUVBQWlCLHNGQUFzRixZQUFZO0FBQzdIO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNFQUFvQjtBQUM1QixjQUFjLG1FQUFrQjtBQUNoQyxjQUFjLGlFQUFpQjtBQUMvQixNQUFNO0FBQ04sUUFBUSxzRUFBb0I7QUFDNUIsY0FBYyxtRUFBa0I7QUFDaEMsY0FBYyxpRUFBaUI7QUFDL0I7QUFDQSxDQUFDO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jdXJyZW50V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9oZWxwZXJGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaG91cmx5V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxvYWRKc29uLCBmb3JtYXREYXRlIH0gZnJvbSBcIi4vaGVscGVyRnVuY3Rpb25zXCJcclxuXHJcbmNvbnN0IHdlYXRoZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItY29udGFpbmVyXCIpXHJcbmNvbnN0IGxvY2F0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2NhdGlvbi1jb250YWluZXJcIilcclxuY29uc3QgZGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC10aW1lLWNvbnRhaW5lclwiKVxyXG5jb25zdCBjdXJyZW50R3JhcGhpYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1ncmFwaGljc1wiKVxyXG5jb25zdCBjdXJyZW50RGVncmVlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1kZWdyZWVzXCIpXHJcblxyXG5jb25zdCBjdXJyZW50RmVlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1mZWVscy1saWtlXVwiKVxyXG5jb25zdCBjdXJyZW50SHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtaHVtaWRpdHldXCIpXHJcbmNvbnN0IGN1cnJlbnRSYWluQ2hhbmNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXJhaW4tY2hhbmNlXVwiKVxyXG5jb25zdCBjdXJyZW50V2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS13aW5kXVwiKVxyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRDdXJyZW50V2VhdGhlcih1cmwsaW5DZWxzaXVzPWZhbHNlKSB7XHJcbiAgICBjb25zdCBjdXJyZW50RGF0YSA9IGF3YWl0IGxvYWRKc29uKHVybClcclxuICAgIHdlYXRoZXJDb250YWluZXIuaW5uZXJIVE1MID0gY3VycmVudERhdGEuY3VycmVudC5jb25kaXRpb24udGV4dFxyXG4gICAgbG9jYXRpb25Db250YWluZXIuaW5uZXJIVE1MID0gYDxpbWcgZGF0YS1sb2NhdGlvbi1waW4gc3JjPVwiaW1hZ2VzL2xvY2F0aW9uLXBpbi5zdmdcIj4gJHtjdXJyZW50RGF0YS5sb2NhdGlvbi5uYW1lfWBcclxuICAgIGRhdGVDb250YWluZXIuaW5uZXJIVE1MID0gYXdhaXQgZm9ybWF0RGF0ZShjdXJyZW50RGF0YS5sb2NhdGlvbi5sb2NhbHRpbWVfZXBvY2gpXHJcbiAgICBjdXJyZW50RGVncmVlcy5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5jdXJyZW50LnRlbXBfZn0gwrBGYFxyXG4gICAgY3VycmVudEdyYXBoaWMuaW5uZXJIVE1MID0gYDxpbWcgY2xhc3M9Y3VycmVudC1pbWFnZSBzcmM9XCJodHRwczoke2N1cnJlbnREYXRhLmN1cnJlbnQuY29uZGl0aW9uLmljb259XCIgYWx0PVwid2VhdGhlciBpY29uXCI+YFxyXG5cclxuICAgIC8vRXh0cmEgU2VjdGlvblxyXG4gICAgY3VycmVudEZlZWwuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC5mZWVsc2xpa2VfZn0gwrBGYCBcclxuICAgIGN1cnJlbnRIdW1pZGl0eS5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5jdXJyZW50Lmh1bWlkaXR5fSAlYFxyXG4gICAgY3VycmVudFJhaW5DaGFuY2UuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSAlYFxyXG4gICAgY3VycmVudFdpbmQuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC53aW5kX21waH0gTVBIYFxyXG5cclxuICAgIC8vQ2VsY2l1cyAvIEZhcmVuaGVpdFxyXG4gICAgaWYgKGluQ2Vsc2l1cykge1xyXG4gICAgICAgIGN1cnJlbnRGZWVsLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2N9IMKwQ2BcclxuICAgICAgICBjdXJyZW50RGVncmVlcy5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5jdXJyZW50LnRlbXBfY30gwrBDYFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge2xvYWRDdXJyZW50V2VhdGhlcn1cclxuIiwiXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRKc29uKHVybCkge1xyXG4gICAgdHJ5e1xyXG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybClcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YVxyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGZvcm1hdERhdGUoZXBvY2gpIHtcclxuICAgIGNvbnN0IGVwb2NodGltZSA9IGVwb2NoKjEwMDAgLy9taWxsaXNlY29uZHNcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShlcG9jaHRpbWUpXHJcbiAgICByZXR1cm4gZGF0ZS50b0RhdGVTdHJpbmcoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBtaWxpdGFyeVRvU3RhbmRhcmRUaW1lKHRpbWUpIHtcclxuICAgIGNvbnN0IHBlcmlvZCA9IHRpbWUgPj0gMTIgPyBcIlBNXCIgOiBcIkFNXCJcclxuICAgIGNvbnN0IGhvdXIgPSAodGltZSAlIDEyKSB8fCAxMiBcclxuICAgIHJldHVybiBgJHtob3VyfSAke3BlcmlvZH1gIFxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZm9ybWF0SG91cihlcG9jaCkge1xyXG4gICAgY29uc3QgZXBvY2hfdGltZSA9IGVwb2NoKjEwMDBcclxuICAgIGNvbnN0IGhvdXIgPSBuZXcgRGF0ZShlcG9jaF90aW1lKVxyXG4gICAgcmV0dXJuIGhvdXIuZ2V0SG91cnMoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KGhvdXIsIHRlbXAsIGljb24sIGluQ2Vsc2l1cz1mYWxzZSkge1xyXG4gICAgY29uc3QgaG91cmx5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob3VybHktY29udGFpbmVyXCIpXHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaG91cmx5XCIpXHJcblxyXG4gICAgbGV0IGRlZ3JlZSA9IFwiwrBGXCJcclxuICAgIGlmIChpbkNlbHNpdXMpIHtcclxuICAgICAgICBkZWdyZWUgPSBcIsKwQ1wiXHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImhvdXJseVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaG91cmx5LXRpbWVcIj4ke2hvdXJ9IDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaG91cmx5LXRlbXBcIj4ke3RlbXB9ICR7ZGVncmVlfTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaG91cmx5LWltZ1wiPiA8aW1nIHNyYz1cIiR7aWNvbn1cIj4gPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgXHJcblxyXG4gICAgaG91cmx5Q29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFySG91cmx5Q29udGFpbmVyKCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob3VybHktY29udGFpbmVyXCIpXHJcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIlxyXG59XHJcblxyXG5leHBvcnQge2xvYWRKc29uLCBcclxuICAgICAgICBmb3JtYXREYXRlLCBcclxuICAgICAgICBtaWxpdGFyeVRvU3RhbmRhcmRUaW1lLCBcclxuICAgICAgICBmb3JtYXRIb3VyLCBcclxuICAgICAgICBjcmVhdGVFbGVtZW50LFxyXG4gICAgICAgIGNsZWFySG91cmx5Q29udGFpbmVyXHJcbiAgICB9IiwiaW1wb3J0IHsgbG9hZEpzb24sIG1pbGl0YXJ5VG9TdGFuZGFyZFRpbWUsIGZvcm1hdEhvdXIsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi9oZWxwZXJGdW5jdGlvbnNcIlxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZEhvdXJseVdlYXRoZXIodXJsLCBpbkNlbHNpdXM9ZmFsc2UpIHtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBsb2FkSnNvbih1cmwpXHJcbiAgICBjb25zdCB0aW1lTm93ID0gZm9ybWF0SG91cihkYXRhLmxvY2F0aW9uLmxvY2FsdGltZV9lcG9jaClcclxuICAgIGZvciAobGV0IGk9dGltZU5vdysxOyBpPCh0aW1lTm93KzYpOyBpKyspIHsgICAgICBcclxuICAgICAgICBsZXQgdGVtcGVyYXR1cmUgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbaV0udGVtcF9mXHJcbiAgICAgICAgY29uc3QgaWNvbiA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS5jb25kaXRpb24uaWNvblxyXG4gICAgICAgIGNvbnN0IGhvdXIyNCA9IGZvcm1hdEhvdXIoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRpbWVfZXBvY2gpXHJcbiAgICAgICAgY29uc3QgaG91ciA9IG1pbGl0YXJ5VG9TdGFuZGFyZFRpbWUoaG91cjI0KSAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGluQ2Vsc2l1cykge1xyXG4gICAgICAgICAgICB0ZW1wZXJhdHVyZSA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS50ZW1wX2NcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoaG91ciwgdGVtcGVyYXR1cmUsIGljb24sIGluQ2Vsc2l1cylcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtsb2FkSG91cmx5V2VhdGhlcn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGxvYWRDdXJyZW50V2VhdGhlciB9IGZyb20gXCIuL2N1cnJlbnRXZWF0aGVyXCJcclxuaW1wb3J0IHsgbG9hZEhvdXJseVdlYXRoZXIgfSBmcm9tIFwiLi9ob3VybHlXZWF0aGVyXCJcclxuaW1wb3J0IHtjbGVhckhvdXJseUNvbnRhaW5lcn0gZnJvbSBcIi4vaGVscGVyRnVuY3Rpb25zXCJcclxuXHJcbmxldCB1cmwgPSBcImh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWE3OGQ4MDY1YWM5MzRkZjViNzgxNzEwMDMyMzAzMTAmcT1OZXcgWW9yayZkYXlzPTEmYXFpPW5vJmFsZXJ0cz1ub1wiXHJcblxyXG5sb2FkQ3VycmVudFdlYXRoZXIodXJsKSAvL2luaXRpYWxpemUgc29tZSBkYXRhXHJcbmxvYWRIb3VybHlXZWF0aGVyKHVybClcclxuXHJcbmNvbnN0IHNlYXJjaGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtZm9ybV1cIilcclxuc2VhcmNoZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoXCIpLnZhbHVlXHJcbiAgICAvL3VybCA9IGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT1hNzhkODA2NWFjOTM0ZGY1Yjc4MTcxMDAzMjMwMzEwJnE9JHtzZWFyY2hJbnB1dH0mZGF5cz0xJmFxaT1ubyZhbGVydHM9bm9gXHJcbiAgICBhd2FpdCBsb2FkQ3VycmVudFdlYXRoZXIoYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWE3OGQ4MDY1YWM5MzRkZjViNzgxNzEwMDMyMzAzMTAmcT0ke3NlYXJjaElucHV0fSZkYXlzPTEmYXFpPW5vJmFsZXJ0cz1ub2ApXHJcblxyXG4gICAgY2xlYXJIb3VybHlDb250YWluZXIoKVxyXG4gICAgYXdhaXQgbG9hZEhvdXJseVdlYXRoZXIoYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWE3OGQ4MDY1YWM5MzRkZjViNzgxNzEwMDMyMzAzMTAmcT0ke3NlYXJjaElucHV0fSZkYXlzPTEmYXFpPW5vJmFsZXJ0cz1ub2ApXHJcblxyXG59KVxyXG5cclxuXHJcbmNvbnN0IHRvZ2dsZURlZ3JlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGlkZGVuLWNoZWNrYm94XCIpXHJcbnRvZ2dsZURlZ3JlZS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGFzeW5jICgpID0+IHtcclxuICAgIGlmICh0b2dnbGVEZWdyZWUuY2hlY2tlZCkge1xyXG4gICAgICAgIGNsZWFySG91cmx5Q29udGFpbmVyKClcclxuICAgICAgICBhd2FpdCBsb2FkQ3VycmVudFdlYXRoZXIodXJsLHRydWUpXHJcbiAgICAgICAgYXdhaXQgbG9hZEhvdXJseVdlYXRoZXIodXJsLHRydWUpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNsZWFySG91cmx5Q29udGFpbmVyKClcclxuICAgICAgICBhd2FpdCBsb2FkQ3VycmVudFdlYXRoZXIodXJsKVxyXG4gICAgICAgIGF3YWl0IGxvYWRIb3VybHlXZWF0aGVyKHVybClcclxuICAgIH1cclxufSlcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==