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
    console.log(`time now: ${timeNow}`)
    for (let i=timeNow+1; i<(timeNow+6); i++) {
        
        let temperature = data.forecast.forecastday[0].hour[0].temp_f
        console.log(temperature)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QiwwREFBUTtBQUN0QztBQUNBLDJGQUEyRiwwQkFBMEI7QUFDckgsb0NBQW9DLDREQUFVO0FBQzlDLGtDQUFrQyw0QkFBNEI7QUFDOUQsc0VBQXNFLG1DQUFtQztBQUN6RztBQUNBO0FBQ0EsK0JBQStCLGlDQUFpQztBQUNoRSxtQ0FBbUMsOEJBQThCO0FBQ2pFLHFDQUFxQyw4REFBOEQ7QUFDbkcsK0JBQStCLDhCQUE4QjtBQUM3RDtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsaUNBQWlDO0FBQ3BFLHNDQUFzQyw0QkFBNEI7QUFDbEU7QUFDQTtBQUNBO0FBQzJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsTUFBTSxFQUFFLE9BQU87QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLE1BQU07QUFDN0MsdUNBQXVDLE1BQU0sRUFBRSxPQUFPO0FBQ3RELGlEQUFpRCxLQUFLO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RCtGO0FBQy9GO0FBQ0E7QUFDQSx1QkFBdUIsMERBQVE7QUFDL0Isb0JBQW9CLDREQUFVO0FBQzlCLDZCQUE2QixRQUFRO0FBQ3JDLDBCQUEwQixlQUFlO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDREQUFVO0FBQ2pDLHFCQUFxQix3RUFBc0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsK0RBQWE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3ZCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOcUQ7QUFDRjtBQUNHO0FBQ3REO0FBQ0E7QUFDQTtBQUNBLG9FQUFrQjtBQUNsQixrRUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlHQUFpRyxZQUFZO0FBQzdHLFVBQVUsbUVBQWtCLHNGQUFzRixZQUFZO0FBQzlIO0FBQ0EsSUFBSSx1RUFBb0I7QUFDeEIsVUFBVSxpRUFBaUIsc0ZBQXNGLFlBQVk7QUFDN0g7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0VBQW9CO0FBQzVCLGNBQWMsbUVBQWtCO0FBQ2hDLGNBQWMsaUVBQWlCO0FBQy9CLE1BQU07QUFDTixRQUFRLHNFQUFvQjtBQUM1QixjQUFjLG1FQUFrQjtBQUNoQyxjQUFjLGlFQUFpQjtBQUMvQjtBQUNBLENBQUM7QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2N1cnJlbnRXZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2hlbHBlckZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9ob3VybHlXZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbG9hZEpzb24sIGZvcm1hdERhdGUgfSBmcm9tIFwiLi9oZWxwZXJGdW5jdGlvbnNcIlxyXG5cclxuY29uc3Qgd2VhdGhlckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci1jb250YWluZXJcIilcclxuY29uc3QgbG9jYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvY2F0aW9uLWNvbnRhaW5lclwiKVxyXG5jb25zdCBkYXRlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50LXRpbWUtY29udGFpbmVyXCIpXHJcbmNvbnN0IGN1cnJlbnRHcmFwaGljID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50LWdyYXBoaWNzXCIpXHJcbmNvbnN0IGN1cnJlbnREZWdyZWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50LWRlZ3JlZXNcIilcclxuXHJcbmNvbnN0IGN1cnJlbnRGZWVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWZlZWxzLWxpa2VdXCIpXHJcbmNvbnN0IGN1cnJlbnRIdW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1odW1pZGl0eV1cIilcclxuY29uc3QgY3VycmVudFJhaW5DaGFuY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtcmFpbi1jaGFuY2VdXCIpXHJcbmNvbnN0IGN1cnJlbnRXaW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXdpbmRdXCIpXHJcblxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZEN1cnJlbnRXZWF0aGVyKHVybCxpbkNlbHNpdXM9ZmFsc2UpIHtcclxuICAgIGNvbnN0IGN1cnJlbnREYXRhID0gYXdhaXQgbG9hZEpzb24odXJsKVxyXG4gICAgd2VhdGhlckNvbnRhaW5lci5pbm5lckhUTUwgPSBjdXJyZW50RGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0XHJcbiAgICBsb2NhdGlvbkNvbnRhaW5lci5pbm5lckhUTUwgPSBgPGltZyBkYXRhLWxvY2F0aW9uLXBpbiBzcmM9XCJpbWFnZXMvbG9jYXRpb24tcGluLnN2Z1wiPiAke2N1cnJlbnREYXRhLmxvY2F0aW9uLm5hbWV9YFxyXG4gICAgZGF0ZUNvbnRhaW5lci5pbm5lckhUTUwgPSBhd2FpdCBmb3JtYXREYXRlKGN1cnJlbnREYXRhLmxvY2F0aW9uLmxvY2FsdGltZV9lcG9jaClcclxuICAgIGN1cnJlbnREZWdyZWVzLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmN1cnJlbnQudGVtcF9mfSDCsEZgXHJcbiAgICBjdXJyZW50R3JhcGhpYy5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1jdXJyZW50LWltYWdlIHNyYz1cImh0dHBzOiR7Y3VycmVudERhdGEuY3VycmVudC5jb25kaXRpb24uaWNvbn1cIiBhbHQ9XCJ3ZWF0aGVyIGljb25cIj5gXHJcblxyXG4gICAgLy9FeHRyYSBTZWN0aW9uXHJcbiAgICBjdXJyZW50RmVlbC5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5jdXJyZW50LmZlZWxzbGlrZV9mfSDCsEZgIFxyXG4gICAgY3VycmVudEh1bWlkaXR5LmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmN1cnJlbnQuaHVtaWRpdHl9ICVgXHJcbiAgICBjdXJyZW50UmFpbkNoYW5jZS5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW59ICVgXHJcbiAgICBjdXJyZW50V2luZC5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5jdXJyZW50LndpbmRfbXBofSBNUEhgXHJcblxyXG4gICAgLy9DZWxjaXVzIC8gRmFyZW5oZWl0XHJcbiAgICBpZiAoaW5DZWxzaXVzKSB7XHJcbiAgICAgICAgY3VycmVudEZlZWwuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC5mZWVsc2xpa2VfY30gwrBDYFxyXG4gICAgICAgIGN1cnJlbnREZWdyZWVzLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmN1cnJlbnQudGVtcF9jfSDCsENgXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7bG9hZEN1cnJlbnRXZWF0aGVyfVxyXG4iLCJcclxuYXN5bmMgZnVuY3Rpb24gbG9hZEpzb24odXJsKSB7XHJcbiAgICB0cnl7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKVxyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhXHJcbiAgICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZm9ybWF0RGF0ZShlcG9jaCkge1xyXG4gICAgY29uc3QgZXBvY2h0aW1lID0gZXBvY2gqMTAwMCAvL21pbGxpc2Vjb25kc1xyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGVwb2NodGltZSlcclxuICAgIHJldHVybiBkYXRlLnRvRGF0ZVN0cmluZygpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1pbGl0YXJ5VG9TdGFuZGFyZFRpbWUodGltZSkge1xyXG4gICAgY29uc3QgcGVyaW9kID0gdGltZSA+PSAxMiA/IFwiUE1cIiA6IFwiQU1cIlxyXG4gICAgY29uc3QgaG91ciA9ICh0aW1lICUgMTIpIHx8IDEyIFxyXG4gICAgcmV0dXJuIGAke2hvdXJ9ICR7cGVyaW9kfWAgXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBmb3JtYXRIb3VyKGVwb2NoKSB7XHJcbiAgICBjb25zdCBlcG9jaF90aW1lID0gZXBvY2gqMTAwMFxyXG4gICAgY29uc3QgaG91ciA9IG5ldyBEYXRlKGVwb2NoX3RpbWUpXHJcbiAgICByZXR1cm4gaG91ci5nZXRIb3VycygpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoaG91ciwgdGVtcCwgaWNvbiwgaW5DZWxzaXVzPWZhbHNlKSB7XHJcbiAgICBjb25zdCBob3VybHlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvdXJseS1jb250YWluZXJcIilcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJob3VybHlcIilcclxuXHJcbiAgICBsZXQgZGVncmVlID0gXCLCsEZcIlxyXG4gICAgaWYgKGluQ2Vsc2l1cykge1xyXG4gICAgICAgIGRlZ3JlZSA9IFwiwrBDXCJcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaG91cmx5XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJob3VybHktdGltZVwiPiR7aG91cn0gPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJob3VybHktdGVtcFwiPiR7dGVtcH0gJHtkZWdyZWV9PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJob3VybHktaW1nXCI+IDxpbWcgc3JjPVwiJHtpY29ufVwiPiA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGBcclxuXHJcbiAgICBob3VybHlDb250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbWVudClcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJIb3VybHlDb250YWluZXIoKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvdXJseS1jb250YWluZXJcIilcclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiXHJcbn1cclxuXHJcbmV4cG9ydCB7bG9hZEpzb24sIFxyXG4gICAgICAgIGZvcm1hdERhdGUsIFxyXG4gICAgICAgIG1pbGl0YXJ5VG9TdGFuZGFyZFRpbWUsIFxyXG4gICAgICAgIGZvcm1hdEhvdXIsIFxyXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQsXHJcbiAgICAgICAgY2xlYXJIb3VybHlDb250YWluZXJcclxuICAgIH0iLCJpbXBvcnQgeyBsb2FkSnNvbiwgbWlsaXRhcnlUb1N0YW5kYXJkVGltZSwgZm9ybWF0SG91ciwgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuL2hlbHBlckZ1bmN0aW9uc1wiXHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkSG91cmx5V2VhdGhlcih1cmwsIGluQ2Vsc2l1cz1mYWxzZSkge1xyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGxvYWRKc29uKHVybClcclxuICAgIGNvbnN0IHRpbWVOb3cgPSBmb3JtYXRIb3VyKGRhdGEubG9jYXRpb24ubG9jYWx0aW1lX2Vwb2NoKVxyXG4gICAgY29uc29sZS5sb2coYHRpbWUgbm93OiAke3RpbWVOb3d9YClcclxuICAgIGZvciAobGV0IGk9dGltZU5vdysxOyBpPCh0aW1lTm93KzYpOyBpKyspIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdGVtcGVyYXR1cmUgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMF0udGVtcF9mXHJcbiAgICAgICAgY29uc29sZS5sb2codGVtcGVyYXR1cmUpXHJcbiAgICAgICAgY29uc3QgaWNvbiA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS5jb25kaXRpb24uaWNvblxyXG4gICAgICAgIGNvbnN0IGhvdXIyNCA9IGZvcm1hdEhvdXIoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRpbWVfZXBvY2gpXHJcbiAgICAgICAgY29uc3QgaG91ciA9IG1pbGl0YXJ5VG9TdGFuZGFyZFRpbWUoaG91cjI0KSAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGluQ2Vsc2l1cykge1xyXG4gICAgICAgICAgICB0ZW1wZXJhdHVyZSA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS50ZW1wX2NcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoaG91ciwgdGVtcGVyYXR1cmUsIGljb24sIGluQ2Vsc2l1cylcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQge2xvYWRIb3VybHlXZWF0aGVyfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbG9hZEN1cnJlbnRXZWF0aGVyIH0gZnJvbSBcIi4vY3VycmVudFdlYXRoZXJcIlxyXG5pbXBvcnQgeyBsb2FkSG91cmx5V2VhdGhlciB9IGZyb20gXCIuL2hvdXJseVdlYXRoZXJcIlxyXG5pbXBvcnQge2NsZWFySG91cmx5Q29udGFpbmVyfSBmcm9tIFwiLi9oZWxwZXJGdW5jdGlvbnNcIlxyXG5cclxubGV0IHVybCA9IFwiaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9YTc4ZDgwNjVhYzkzNGRmNWI3ODE3MTAwMzIzMDMxMCZxPU5ldyBZb3JrJmRheXM9MSZhcWk9bm8mYWxlcnRzPW5vXCJcclxuXHJcbmxvYWRDdXJyZW50V2VhdGhlcih1cmwpIC8vaW5pdGlhbGl6ZSBzb21lIGRhdGFcclxubG9hZEhvdXJseVdlYXRoZXIodXJsKVxyXG5cclxuY29uc3Qgc2VhcmNoZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1mb3JtXVwiKVxyXG5zZWFyY2hmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFzeW5jIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hcIikudmFsdWVcclxuICAgIC8vdXJsID0gYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWE3OGQ4MDY1YWM5MzRkZjViNzgxNzEwMDMyMzAzMTAmcT0ke3NlYXJjaElucHV0fSZkYXlzPTEmYXFpPW5vJmFsZXJ0cz1ub2BcclxuICAgIGF3YWl0IGxvYWRDdXJyZW50V2VhdGhlcihgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9YTc4ZDgwNjVhYzkzNGRmNWI3ODE3MTAwMzIzMDMxMCZxPSR7c2VhcmNoSW5wdXR9JmRheXM9MSZhcWk9bm8mYWxlcnRzPW5vYClcclxuXHJcbiAgICBjbGVhckhvdXJseUNvbnRhaW5lcigpXHJcbiAgICBhd2FpdCBsb2FkSG91cmx5V2VhdGhlcihgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9YTc4ZDgwNjVhYzkzNGRmNWI3ODE3MTAwMzIzMDMxMCZxPSR7c2VhcmNoSW5wdXR9JmRheXM9MSZhcWk9bm8mYWxlcnRzPW5vYClcclxuXHJcbn0pXHJcblxyXG5cclxuY29uc3QgdG9nZ2xlRGVncmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oaWRkZW4tY2hlY2tib3hcIilcclxudG9nZ2xlRGVncmVlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKHRvZ2dsZURlZ3JlZS5jaGVja2VkKSB7XHJcbiAgICAgICAgY2xlYXJIb3VybHlDb250YWluZXIoKVxyXG4gICAgICAgIGF3YWl0IGxvYWRDdXJyZW50V2VhdGhlcih1cmwsdHJ1ZSlcclxuICAgICAgICBhd2FpdCBsb2FkSG91cmx5V2VhdGhlcih1cmwsdHJ1ZSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2xlYXJIb3VybHlDb250YWluZXIoKVxyXG4gICAgICAgIGF3YWl0IGxvYWRDdXJyZW50V2VhdGhlcih1cmwpXHJcbiAgICAgICAgYXdhaXQgbG9hZEhvdXJseVdlYXRoZXIodXJsKVxyXG4gICAgfVxyXG59KVxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9