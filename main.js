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
    currentGraphic.innerHTML = `<img class=current-image src="${currentData.current.condition.icon}" alt="weather icon">`

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
/* harmony export */   formatDate: () => (/* binding */ formatDate),
/* harmony export */   loadJson: () => (/* binding */ loadJson)
/* harmony export */ });

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

async function formatDate(epoch) {
    const epochtime = epoch*1000 //milliseconds
    const date = new Date(epochtime)
    return date.toDateString()
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



let url = "http://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=New York&days=3&aqi=no&alerts=no"

;(0,_currentWeather__WEBPACK_IMPORTED_MODULE_0__.loadCurrentWeather)(url) //initialize some data
;(0,_hourlyWeather__WEBPACK_IMPORTED_MODULE_1__.loadHourlyWeather)(url)

const searchform = document.querySelector("[data-form]")
searchform.addEventListener('submit', async (e) => {
    e.preventDefault()
    const searchInput = document.querySelector("#search").value
    url = `http://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=${searchInput}&days=3&aqi=no&alerts=no`
    await (0,_currentWeather__WEBPACK_IMPORTED_MODULE_0__.loadCurrentWeather)(url);
})


const toggleDegree = document.querySelector(".hidden-checkbox")
toggleDegree.addEventListener("change", async () => {
    if (toggleDegree.checked) {
        await (0,_currentWeather__WEBPACK_IMPORTED_MODULE_0__.loadCurrentWeather)(url,true)
    } else {
        await (0,_currentWeather__WEBPACK_IMPORTED_MODULE_0__.loadCurrentWeather)(url)
    }
})


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QiwwREFBUTtBQUN0QztBQUNBLDJGQUEyRiwwQkFBMEI7QUFDckgsb0NBQW9DLDREQUFVO0FBQzlDLGtDQUFrQyw0QkFBNEI7QUFDOUQsZ0VBQWdFLG1DQUFtQztBQUNuRztBQUNBO0FBQ0EsK0JBQStCLGlDQUFpQztBQUNoRSxtQ0FBbUMsOEJBQThCO0FBQ2pFLHFDQUFxQyw4REFBOEQ7QUFDbkcsK0JBQStCLDhCQUE4QjtBQUM3RDtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsaUNBQWlDO0FBQ3BFLHNDQUFzQyw0QkFBNEI7QUFDbEU7QUFDQTtBQUNBO0FBQzJCOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkMzQjtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsYUFBYTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCNEM7QUFDNUM7QUFDQTtBQUNBLHVCQUF1QiwwREFBUTtBQUMvQjtBQUNBO0FBQ0Esa0JBQWtCLEtBQUs7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLEtBQUs7QUFDNUMsdUNBQXVDLEtBQUs7QUFDNUMsaURBQWlELEtBQUs7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDcENBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnFEO0FBQ0Y7QUFDbkQ7QUFDQTtBQUNBO0FBQ0Esb0VBQWtCO0FBQ2xCLGtFQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEZBQThGLFlBQVk7QUFDMUcsVUFBVSxtRUFBa0I7QUFDNUIsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLG1FQUFrQjtBQUNoQyxNQUFNO0FBQ04sY0FBYyxtRUFBa0I7QUFDaEM7QUFDQSxDQUFDO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jdXJyZW50V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9oZWxwZXJGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaG91cmx5V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxvYWRKc29uLCBmb3JtYXREYXRlIH0gZnJvbSBcIi4vaGVscGVyRnVuY3Rpb25zXCJcclxuXHJcbmNvbnN0IHdlYXRoZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItY29udGFpbmVyXCIpXHJcbmNvbnN0IGxvY2F0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2NhdGlvbi1jb250YWluZXJcIilcclxuY29uc3QgZGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC10aW1lLWNvbnRhaW5lclwiKVxyXG5jb25zdCBjdXJyZW50R3JhcGhpYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1ncmFwaGljc1wiKVxyXG5jb25zdCBjdXJyZW50RGVncmVlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1kZWdyZWVzXCIpXHJcblxyXG5jb25zdCBjdXJyZW50RmVlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1mZWVscy1saWtlXVwiKVxyXG5jb25zdCBjdXJyZW50SHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtaHVtaWRpdHldXCIpXHJcbmNvbnN0IGN1cnJlbnRSYWluQ2hhbmNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXJhaW4tY2hhbmNlXVwiKVxyXG5jb25zdCBjdXJyZW50V2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS13aW5kXVwiKVxyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRDdXJyZW50V2VhdGhlcih1cmwsaW5DZWxzaXVzPWZhbHNlKSB7XHJcbiAgICBjb25zdCBjdXJyZW50RGF0YSA9IGF3YWl0IGxvYWRKc29uKHVybClcclxuICAgIHdlYXRoZXJDb250YWluZXIuaW5uZXJIVE1MID0gY3VycmVudERhdGEuY3VycmVudC5jb25kaXRpb24udGV4dFxyXG4gICAgbG9jYXRpb25Db250YWluZXIuaW5uZXJIVE1MID0gYDxpbWcgZGF0YS1sb2NhdGlvbi1waW4gc3JjPVwiaW1hZ2VzL2xvY2F0aW9uLXBpbi5zdmdcIj4gJHtjdXJyZW50RGF0YS5sb2NhdGlvbi5uYW1lfWBcclxuICAgIGRhdGVDb250YWluZXIuaW5uZXJIVE1MID0gYXdhaXQgZm9ybWF0RGF0ZShjdXJyZW50RGF0YS5sb2NhdGlvbi5sb2NhbHRpbWVfZXBvY2gpXHJcbiAgICBjdXJyZW50RGVncmVlcy5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5jdXJyZW50LnRlbXBfZn0gwrBGYFxyXG4gICAgY3VycmVudEdyYXBoaWMuaW5uZXJIVE1MID0gYDxpbWcgY2xhc3M9Y3VycmVudC1pbWFnZSBzcmM9XCIke2N1cnJlbnREYXRhLmN1cnJlbnQuY29uZGl0aW9uLmljb259XCIgYWx0PVwid2VhdGhlciBpY29uXCI+YFxyXG5cclxuICAgIC8vRXh0cmEgU2VjdGlvblxyXG4gICAgY3VycmVudEZlZWwuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC5mZWVsc2xpa2VfZn0gwrBGYCBcclxuICAgIGN1cnJlbnRIdW1pZGl0eS5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5jdXJyZW50Lmh1bWlkaXR5fSAlYFxyXG4gICAgY3VycmVudFJhaW5DaGFuY2UuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSAlYFxyXG4gICAgY3VycmVudFdpbmQuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC53aW5kX21waH0gTVBIYFxyXG5cclxuICAgIC8vQ2VsY2l1cyAvIEZhcmVuaGVpdFxyXG4gICAgaWYgKGluQ2Vsc2l1cykge1xyXG4gICAgICAgIGN1cnJlbnRGZWVsLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2N9IMKwQ2BcclxuICAgICAgICBjdXJyZW50RGVncmVlcy5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5jdXJyZW50LnRlbXBfY30gwrBDYFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge2xvYWRDdXJyZW50V2VhdGhlcn1cclxuIiwiXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRKc29uKHVybCkge1xyXG4gICAgdHJ5e1xyXG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge21vZGU6ICdjb3JzJ30pXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFcclxuICAgICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBmb3JtYXREYXRlKGVwb2NoKSB7XHJcbiAgICBjb25zdCBlcG9jaHRpbWUgPSBlcG9jaCoxMDAwIC8vbWlsbGlzZWNvbmRzXHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZXBvY2h0aW1lKVxyXG4gICAgcmV0dXJuIGRhdGUudG9EYXRlU3RyaW5nKClcclxufVxyXG5cclxuZXhwb3J0IHtsb2FkSnNvbiwgZm9ybWF0RGF0ZX0iLCJpbXBvcnQgeyBsb2FkSnNvbiB9IGZyb20gXCIuL2hlbHBlckZ1bmN0aW9uc1wiXHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkSG91cmx5V2VhdGhlcih1cmwsIGluQ2Vsc2l1cz1mYWxzZSkge1xyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGxvYWRKc29uKHVybClcclxuXHJcbiAgICAvL1RlbXAgYW5kIHRoZSBwaWN0dXJlXHJcbiAgICBmb3IgKGxldCBpPTA7IGk8NTsgaSsrKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRpbWVfZXBvY2gpXHJcbiAgICAgICAgY29uc3QgaG91ciA9IGF3YWl0IGZvcm1hdEhvdXIoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRpbWVfZXBvY2gpXHJcbiAgICAgICAgY29uc3QgdGVtcGVyYXR1cmUgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbaV0udGVtcF9jXHJcbiAgICAgICAgY29uc3QgaWNvbiA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS5jb25kaXRpb24uaWNvblxyXG5cclxuICAgICAgICBjcmVhdGVFbGVtZW50KGhvdXIsIHRlbXBlcmF0dXJlLCBpY29uKVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmb3JtYXRIb3VyKGVwb2NoKSB7XHJcbiAgICBjb25zdCBlcG9jaF90aW1lID0gZXBvY2gqMTAwMFxyXG4gICAgY29uc3QgaG91ciA9IG5ldyBEYXRlKGVwb2NoX3RpbWUpXHJcbiAgICByZXR1cm4gaG91ci5nZXRIb3VycygpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoaG91ciwgdGVtcCwgaWNvbikge1xyXG4gICAgY29uc3QgaG91cmx5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob3VybHktY29udGFpbmVyXCIpXHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaG91cmx5XCIpXHJcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaG91cmx5XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJob3VybHktdGltZVwiPiR7aG91cn08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhvdXJseS10ZW1wXCI+JHt0ZW1wfTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaG91cmx5LWltZ1wiPiA8aW1nIHNyYz1cIiR7aWNvbn1cIj4gPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgXHJcblxyXG4gICAgaG91cmx5Q29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQpXHJcbn1cclxuXHJcbmV4cG9ydCB7bG9hZEhvdXJseVdlYXRoZXJ9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBsb2FkQ3VycmVudFdlYXRoZXIgfSBmcm9tIFwiLi9jdXJyZW50V2VhdGhlclwiXHJcbmltcG9ydCB7IGxvYWRIb3VybHlXZWF0aGVyIH0gZnJvbSBcIi4vaG91cmx5V2VhdGhlclwiXHJcblxyXG5sZXQgdXJsID0gXCJodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWE3OGQ4MDY1YWM5MzRkZjViNzgxNzEwMDMyMzAzMTAmcT1OZXcgWW9yayZkYXlzPTMmYXFpPW5vJmFsZXJ0cz1ub1wiXHJcblxyXG5sb2FkQ3VycmVudFdlYXRoZXIodXJsKSAvL2luaXRpYWxpemUgc29tZSBkYXRhXHJcbmxvYWRIb3VybHlXZWF0aGVyKHVybClcclxuXHJcbmNvbnN0IHNlYXJjaGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtZm9ybV1cIilcclxuc2VhcmNoZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoXCIpLnZhbHVlXHJcbiAgICB1cmwgPSBgaHR0cDovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT1hNzhkODA2NWFjOTM0ZGY1Yjc4MTcxMDAzMjMwMzEwJnE9JHtzZWFyY2hJbnB1dH0mZGF5cz0zJmFxaT1ubyZhbGVydHM9bm9gXHJcbiAgICBhd2FpdCBsb2FkQ3VycmVudFdlYXRoZXIodXJsKTtcclxufSlcclxuXHJcblxyXG5jb25zdCB0b2dnbGVEZWdyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhpZGRlbi1jaGVja2JveFwiKVxyXG50b2dnbGVEZWdyZWUuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAodG9nZ2xlRGVncmVlLmNoZWNrZWQpIHtcclxuICAgICAgICBhd2FpdCBsb2FkQ3VycmVudFdlYXRoZXIodXJsLHRydWUpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGF3YWl0IGxvYWRDdXJyZW50V2VhdGhlcih1cmwpXHJcbiAgICB9XHJcbn0pXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=