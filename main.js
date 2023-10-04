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
/* harmony export */   clearHourlyContainer: () => (/* binding */ clearHourlyContainer),
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   formatDate: () => (/* binding */ formatDate),
/* harmony export */   formatHour: () => (/* binding */ formatHour),
/* harmony export */   loadJson: () => (/* binding */ loadJson),
/* harmony export */   militaryToStandardTime: () => (/* binding */ militaryToStandardTime)
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

    for (let i=timeNow+1; i<(timeNow+8); i++) {
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




let url = "http://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=New York&days=3&aqi=no&alerts=no"

;(0,_currentWeather__WEBPACK_IMPORTED_MODULE_0__.loadCurrentWeather)(url) //initialize some data
;(0,_hourlyWeather__WEBPACK_IMPORTED_MODULE_1__.loadHourlyWeather)(url)

const searchform = document.querySelector("[data-form]")
searchform.addEventListener('submit', async (e) => {
    e.preventDefault()
    const searchInput = document.querySelector("#search").value
    url = `http://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=${searchInput}&days=3&aqi=no&alerts=no`
    await (0,_currentWeather__WEBPACK_IMPORTED_MODULE_0__.loadCurrentWeather)(url);

    (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_2__.clearHourlyContainer)()
    await (0,_hourlyWeather__WEBPACK_IMPORTED_MODULE_1__.loadHourlyWeather)(url);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QiwwREFBUTtBQUN0QztBQUNBLDJGQUEyRiwwQkFBMEI7QUFDckgsb0NBQW9DLDREQUFVO0FBQzlDLGtDQUFrQyw0QkFBNEI7QUFDOUQsZ0VBQWdFLG1DQUFtQztBQUNuRztBQUNBO0FBQ0EsK0JBQStCLGlDQUFpQztBQUNoRSxtQ0FBbUMsOEJBQThCO0FBQ2pFLHFDQUFxQyw4REFBOEQ7QUFDbkcsK0JBQStCLDhCQUE4QjtBQUM3RDtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsaUNBQWlDO0FBQ3BFLHNDQUFzQyw0QkFBNEI7QUFDbEU7QUFDQTtBQUNBO0FBQzJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DM0I7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLGFBQWE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE1BQU0sRUFBRSxPQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxNQUFNO0FBQzdDLHVDQUF1QyxNQUFNLEVBQUUsT0FBTztBQUN0RCxpREFBaUQsS0FBSztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDekQrRjtBQUMvRjtBQUNBO0FBQ0EsdUJBQXVCLDBEQUFRO0FBQy9CO0FBQ0Esb0JBQW9CLDREQUFVO0FBQzlCO0FBQ0EsMEJBQTBCLGVBQWU7QUFDekM7QUFDQTtBQUNBLHVCQUF1Qiw0REFBVTtBQUNqQyxxQkFBcUIsd0VBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtEQUFhO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUN0QkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnFEO0FBQ0Y7QUFDRztBQUN0RDtBQUNBO0FBQ0E7QUFDQSxvRUFBa0I7QUFDbEIsa0VBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RkFBOEYsWUFBWTtBQUMxRyxVQUFVLG1FQUFrQjtBQUM1QjtBQUNBLElBQUksc0VBQW9CO0FBQ3hCLFVBQVUsaUVBQWlCO0FBQzNCLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzRUFBb0I7QUFDNUIsY0FBYyxtRUFBa0I7QUFDaEMsY0FBYyxpRUFBaUI7QUFDL0IsTUFBTTtBQUNOLFFBQVEsc0VBQW9CO0FBQzVCLGNBQWMsbUVBQWtCO0FBQ2hDLGNBQWMsaUVBQWlCO0FBQy9CO0FBQ0EsQ0FBQztBQUNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY3VycmVudFdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaGVscGVyRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2hvdXJseVdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2FkSnNvbiwgZm9ybWF0RGF0ZSB9IGZyb20gXCIuL2hlbHBlckZ1bmN0aW9uc1wiXHJcblxyXG5jb25zdCB3ZWF0aGVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLWNvbnRhaW5lclwiKVxyXG5jb25zdCBsb2NhdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9jYXRpb24tY29udGFpbmVyXCIpXHJcbmNvbnN0IGRhdGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtdGltZS1jb250YWluZXJcIilcclxuY29uc3QgY3VycmVudEdyYXBoaWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtZ3JhcGhpY3NcIilcclxuY29uc3QgY3VycmVudERlZ3JlZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtZGVncmVlc1wiKVxyXG5cclxuY29uc3QgY3VycmVudEZlZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtZmVlbHMtbGlrZV1cIilcclxuY29uc3QgY3VycmVudEh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWh1bWlkaXR5XVwiKVxyXG5jb25zdCBjdXJyZW50UmFpbkNoYW5jZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1yYWluLWNoYW5jZV1cIilcclxuY29uc3QgY3VycmVudFdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtd2luZF1cIilcclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkQ3VycmVudFdlYXRoZXIodXJsLGluQ2Vsc2l1cz1mYWxzZSkge1xyXG4gICAgY29uc3QgY3VycmVudERhdGEgPSBhd2FpdCBsb2FkSnNvbih1cmwpXHJcbiAgICB3ZWF0aGVyQ29udGFpbmVyLmlubmVySFRNTCA9IGN1cnJlbnREYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHRcclxuICAgIGxvY2F0aW9uQ29udGFpbmVyLmlubmVySFRNTCA9IGA8aW1nIGRhdGEtbG9jYXRpb24tcGluIHNyYz1cImltYWdlcy9sb2NhdGlvbi1waW4uc3ZnXCI+ICR7Y3VycmVudERhdGEubG9jYXRpb24ubmFtZX1gXHJcbiAgICBkYXRlQ29udGFpbmVyLmlubmVySFRNTCA9IGF3YWl0IGZvcm1hdERhdGUoY3VycmVudERhdGEubG9jYXRpb24ubG9jYWx0aW1lX2Vwb2NoKVxyXG4gICAgY3VycmVudERlZ3JlZXMuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC50ZW1wX2Z9IMKwRmBcclxuICAgIGN1cnJlbnRHcmFwaGljLmlubmVySFRNTCA9IGA8aW1nIGNsYXNzPWN1cnJlbnQtaW1hZ2Ugc3JjPVwiJHtjdXJyZW50RGF0YS5jdXJyZW50LmNvbmRpdGlvbi5pY29ufVwiIGFsdD1cIndlYXRoZXIgaWNvblwiPmBcclxuXHJcbiAgICAvL0V4dHJhIFNlY3Rpb25cclxuICAgIGN1cnJlbnRGZWVsLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2Z9IMKwRmAgXHJcbiAgICBjdXJyZW50SHVtaWRpdHkuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC5odW1pZGl0eX0gJWBcclxuICAgIGN1cnJlbnRSYWluQ2hhbmNlLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbn0gJWBcclxuICAgIGN1cnJlbnRXaW5kLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmN1cnJlbnQud2luZF9tcGh9IE1QSGBcclxuXHJcbiAgICAvL0NlbGNpdXMgLyBGYXJlbmhlaXRcclxuICAgIGlmIChpbkNlbHNpdXMpIHtcclxuICAgICAgICBjdXJyZW50RmVlbC5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jfSDCsENgXHJcbiAgICAgICAgY3VycmVudERlZ3JlZXMuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC50ZW1wX2N9IMKwQ2BcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtsb2FkQ3VycmVudFdlYXRoZXJ9XHJcbiIsIlxyXG5hc3luYyBmdW5jdGlvbiBsb2FkSnNvbih1cmwpIHtcclxuICAgIHRyeXtcclxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHttb2RlOiAnY29ycyd9KVxyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhXHJcbiAgICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZm9ybWF0RGF0ZShlcG9jaCkge1xyXG4gICAgY29uc3QgZXBvY2h0aW1lID0gZXBvY2gqMTAwMCAvL21pbGxpc2Vjb25kc1xyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGVwb2NodGltZSlcclxuICAgIHJldHVybiBkYXRlLnRvRGF0ZVN0cmluZygpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1pbGl0YXJ5VG9TdGFuZGFyZFRpbWUodGltZSkge1xyXG4gICAgY29uc3QgcGVyaW9kID0gdGltZSA+PSAxMiA/IFwiUE1cIiA6IFwiQU1cIlxyXG4gICAgY29uc3QgaG91ciA9ICh0aW1lICUgMTIpIHx8IDEyIFxyXG4gICAgcmV0dXJuIGAke2hvdXJ9ICR7cGVyaW9kfWAgXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBmb3JtYXRIb3VyKGVwb2NoKSB7XHJcbiAgICBjb25zdCBlcG9jaF90aW1lID0gZXBvY2gqMTAwMFxyXG4gICAgY29uc3QgaG91ciA9IG5ldyBEYXRlKGVwb2NoX3RpbWUpXHJcbiAgICByZXR1cm4gaG91ci5nZXRIb3VycygpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoaG91ciwgdGVtcCwgaWNvbiwgaW5DZWxzaXVzPWZhbHNlKSB7XHJcbiAgICBjb25zdCBob3VybHlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvdXJseS1jb250YWluZXJcIilcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJob3VybHlcIilcclxuXHJcbiAgICBsZXQgZGVncmVlID0gXCLCsEZcIlxyXG4gICAgaWYgKGluQ2Vsc2l1cykge1xyXG4gICAgICAgIGRlZ3JlZSA9IFwiwrBDXCJcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaG91cmx5XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJob3VybHktdGltZVwiPiR7aG91cn0gPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJob3VybHktdGVtcFwiPiR7dGVtcH0gJHtkZWdyZWV9PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJob3VybHktaW1nXCI+IDxpbWcgc3JjPVwiJHtpY29ufVwiPiA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGBcclxuXHJcbiAgICBob3VybHlDb250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbWVudClcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJIb3VybHlDb250YWluZXIoKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvdXJseS1jb250YWluZXJcIilcclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiXHJcbn1cclxuXHJcbmV4cG9ydCB7bG9hZEpzb24sIFxyXG4gICAgICAgIGZvcm1hdERhdGUsIFxyXG4gICAgICAgIG1pbGl0YXJ5VG9TdGFuZGFyZFRpbWUsIFxyXG4gICAgICAgIGZvcm1hdEhvdXIsIFxyXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQsXHJcbiAgICAgICAgY2xlYXJIb3VybHlDb250YWluZXJcclxuICAgIH0iLCJpbXBvcnQgeyBsb2FkSnNvbiwgbWlsaXRhcnlUb1N0YW5kYXJkVGltZSwgZm9ybWF0SG91ciwgY3JlYXRlRWxlbWVudCB9IGZyb20gXCIuL2hlbHBlckZ1bmN0aW9uc1wiXHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkSG91cmx5V2VhdGhlcih1cmwsIGluQ2Vsc2l1cz1mYWxzZSkge1xyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGxvYWRKc29uKHVybClcclxuXHJcbiAgICBjb25zdCB0aW1lTm93ID0gZm9ybWF0SG91cihkYXRhLmxvY2F0aW9uLmxvY2FsdGltZV9lcG9jaClcclxuXHJcbiAgICBmb3IgKGxldCBpPXRpbWVOb3crMTsgaTwodGltZU5vdys4KTsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHRlbXBlcmF0dXJlID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRlbXBfZlxyXG4gICAgICAgIGNvbnN0IGljb24gPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbaV0uY29uZGl0aW9uLmljb25cclxuICAgICAgICBjb25zdCBob3VyMjQgPSBmb3JtYXRIb3VyKGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS50aW1lX2Vwb2NoKVxyXG4gICAgICAgIGNvbnN0IGhvdXIgPSBtaWxpdGFyeVRvU3RhbmRhcmRUaW1lKGhvdXIyNCkgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChpbkNlbHNpdXMpIHtcclxuICAgICAgICAgICAgdGVtcGVyYXR1cmUgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbaV0udGVtcF9jXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVFbGVtZW50KGhvdXIsIHRlbXBlcmF0dXJlLCBpY29uLCBpbkNlbHNpdXMpXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IHtsb2FkSG91cmx5V2VhdGhlcn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGxvYWRDdXJyZW50V2VhdGhlciB9IGZyb20gXCIuL2N1cnJlbnRXZWF0aGVyXCJcclxuaW1wb3J0IHsgbG9hZEhvdXJseVdlYXRoZXIgfSBmcm9tIFwiLi9ob3VybHlXZWF0aGVyXCJcclxuaW1wb3J0IHtjbGVhckhvdXJseUNvbnRhaW5lcn0gZnJvbSBcIi4vaGVscGVyRnVuY3Rpb25zXCJcclxuXHJcbmxldCB1cmwgPSBcImh0dHA6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9YTc4ZDgwNjVhYzkzNGRmNWI3ODE3MTAwMzIzMDMxMCZxPU5ldyBZb3JrJmRheXM9MyZhcWk9bm8mYWxlcnRzPW5vXCJcclxuXHJcbmxvYWRDdXJyZW50V2VhdGhlcih1cmwpIC8vaW5pdGlhbGl6ZSBzb21lIGRhdGFcclxubG9hZEhvdXJseVdlYXRoZXIodXJsKVxyXG5cclxuY29uc3Qgc2VhcmNoZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1mb3JtXVwiKVxyXG5zZWFyY2hmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFzeW5jIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hcIikudmFsdWVcclxuICAgIHVybCA9IGBodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWE3OGQ4MDY1YWM5MzRkZjViNzgxNzEwMDMyMzAzMTAmcT0ke3NlYXJjaElucHV0fSZkYXlzPTMmYXFpPW5vJmFsZXJ0cz1ub2BcclxuICAgIGF3YWl0IGxvYWRDdXJyZW50V2VhdGhlcih1cmwpO1xyXG5cclxuICAgIGNsZWFySG91cmx5Q29udGFpbmVyKClcclxuICAgIGF3YWl0IGxvYWRIb3VybHlXZWF0aGVyKHVybCk7XHJcbn0pXHJcblxyXG5cclxuY29uc3QgdG9nZ2xlRGVncmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oaWRkZW4tY2hlY2tib3hcIilcclxudG9nZ2xlRGVncmVlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKHRvZ2dsZURlZ3JlZS5jaGVja2VkKSB7XHJcbiAgICAgICAgY2xlYXJIb3VybHlDb250YWluZXIoKVxyXG4gICAgICAgIGF3YWl0IGxvYWRDdXJyZW50V2VhdGhlcih1cmwsdHJ1ZSlcclxuICAgICAgICBhd2FpdCBsb2FkSG91cmx5V2VhdGhlcih1cmwsdHJ1ZSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2xlYXJIb3VybHlDb250YWluZXIoKVxyXG4gICAgICAgIGF3YWl0IGxvYWRDdXJyZW50V2VhdGhlcih1cmwpXHJcbiAgICAgICAgYXdhaXQgbG9hZEhvdXJseVdlYXRoZXIodXJsKVxyXG4gICAgfVxyXG59KVxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9