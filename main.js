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
    await (0,_currentWeather__WEBPACK_IMPORTED_MODULE_0__.loadCurrentWeather)(url)

    ;(0,_helperFunctions__WEBPACK_IMPORTED_MODULE_2__.clearHourlyContainer)()
    await (0,_hourlyWeather__WEBPACK_IMPORTED_MODULE_1__.loadHourlyWeather)(url)

    searchInput.clear()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QiwwREFBUTtBQUN0QztBQUNBLDJGQUEyRiwwQkFBMEI7QUFDckgsb0NBQW9DLDREQUFVO0FBQzlDLGtDQUFrQyw0QkFBNEI7QUFDOUQsZ0VBQWdFLG1DQUFtQztBQUNuRztBQUNBO0FBQ0EsK0JBQStCLGlDQUFpQztBQUNoRSxtQ0FBbUMsOEJBQThCO0FBQ2pFLHFDQUFxQyw4REFBOEQ7QUFDbkcsK0JBQStCLDhCQUE4QjtBQUM3RDtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsaUNBQWlDO0FBQ3BFLHNDQUFzQyw0QkFBNEI7QUFDbEU7QUFDQTtBQUNBO0FBQzJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DM0I7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLGFBQWE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE1BQU0sRUFBRSxPQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxNQUFNO0FBQzdDLHVDQUF1QyxNQUFNLEVBQUUsT0FBTztBQUN0RCxpREFBaUQsS0FBSztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDekQrRjtBQUMvRjtBQUNBO0FBQ0EsdUJBQXVCLDBEQUFRO0FBQy9CO0FBQ0Esb0JBQW9CLDREQUFVO0FBQzlCO0FBQ0EsMEJBQTBCLGVBQWU7QUFDekM7QUFDQTtBQUNBLHVCQUF1Qiw0REFBVTtBQUNqQyxxQkFBcUIsd0VBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtEQUFhO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUN0QkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnFEO0FBQ0Y7QUFDRztBQUN0RDtBQUNBO0FBQ0E7QUFDQSxvRUFBa0I7QUFDbEIsa0VBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RkFBOEYsWUFBWTtBQUMxRyxVQUFVLG1FQUFrQjtBQUM1QjtBQUNBLElBQUksdUVBQW9CO0FBQ3hCLFVBQVUsaUVBQWlCO0FBQzNCO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0VBQW9CO0FBQzVCLGNBQWMsbUVBQWtCO0FBQ2hDLGNBQWMsaUVBQWlCO0FBQy9CLE1BQU07QUFDTixRQUFRLHNFQUFvQjtBQUM1QixjQUFjLG1FQUFrQjtBQUNoQyxjQUFjLGlFQUFpQjtBQUMvQjtBQUNBLENBQUM7QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2N1cnJlbnRXZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2hlbHBlckZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9ob3VybHlXZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbG9hZEpzb24sIGZvcm1hdERhdGUgfSBmcm9tIFwiLi9oZWxwZXJGdW5jdGlvbnNcIlxyXG5cclxuY29uc3Qgd2VhdGhlckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci1jb250YWluZXJcIilcclxuY29uc3QgbG9jYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvY2F0aW9uLWNvbnRhaW5lclwiKVxyXG5jb25zdCBkYXRlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50LXRpbWUtY29udGFpbmVyXCIpXHJcbmNvbnN0IGN1cnJlbnRHcmFwaGljID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50LWdyYXBoaWNzXCIpXHJcbmNvbnN0IGN1cnJlbnREZWdyZWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50LWRlZ3JlZXNcIilcclxuXHJcbmNvbnN0IGN1cnJlbnRGZWVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWZlZWxzLWxpa2VdXCIpXHJcbmNvbnN0IGN1cnJlbnRIdW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1odW1pZGl0eV1cIilcclxuY29uc3QgY3VycmVudFJhaW5DaGFuY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtcmFpbi1jaGFuY2VdXCIpXHJcbmNvbnN0IGN1cnJlbnRXaW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXdpbmRdXCIpXHJcblxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZEN1cnJlbnRXZWF0aGVyKHVybCxpbkNlbHNpdXM9ZmFsc2UpIHtcclxuICAgIGNvbnN0IGN1cnJlbnREYXRhID0gYXdhaXQgbG9hZEpzb24odXJsKVxyXG4gICAgd2VhdGhlckNvbnRhaW5lci5pbm5lckhUTUwgPSBjdXJyZW50RGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0XHJcbiAgICBsb2NhdGlvbkNvbnRhaW5lci5pbm5lckhUTUwgPSBgPGltZyBkYXRhLWxvY2F0aW9uLXBpbiBzcmM9XCJpbWFnZXMvbG9jYXRpb24tcGluLnN2Z1wiPiAke2N1cnJlbnREYXRhLmxvY2F0aW9uLm5hbWV9YFxyXG4gICAgZGF0ZUNvbnRhaW5lci5pbm5lckhUTUwgPSBhd2FpdCBmb3JtYXREYXRlKGN1cnJlbnREYXRhLmxvY2F0aW9uLmxvY2FsdGltZV9lcG9jaClcclxuICAgIGN1cnJlbnREZWdyZWVzLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmN1cnJlbnQudGVtcF9mfSDCsEZgXHJcbiAgICBjdXJyZW50R3JhcGhpYy5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1jdXJyZW50LWltYWdlIHNyYz1cIiR7Y3VycmVudERhdGEuY3VycmVudC5jb25kaXRpb24uaWNvbn1cIiBhbHQ9XCJ3ZWF0aGVyIGljb25cIj5gXHJcblxyXG4gICAgLy9FeHRyYSBTZWN0aW9uXHJcbiAgICBjdXJyZW50RmVlbC5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5jdXJyZW50LmZlZWxzbGlrZV9mfSDCsEZgIFxyXG4gICAgY3VycmVudEh1bWlkaXR5LmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmN1cnJlbnQuaHVtaWRpdHl9ICVgXHJcbiAgICBjdXJyZW50UmFpbkNoYW5jZS5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW59ICVgXHJcbiAgICBjdXJyZW50V2luZC5pbm5lckhUTUwgPSBgJHtjdXJyZW50RGF0YS5jdXJyZW50LndpbmRfbXBofSBNUEhgXHJcblxyXG4gICAgLy9DZWxjaXVzIC8gRmFyZW5oZWl0XHJcbiAgICBpZiAoaW5DZWxzaXVzKSB7XHJcbiAgICAgICAgY3VycmVudEZlZWwuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC5mZWVsc2xpa2VfY30gwrBDYFxyXG4gICAgICAgIGN1cnJlbnREZWdyZWVzLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmN1cnJlbnQudGVtcF9jfSDCsENgXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7bG9hZEN1cnJlbnRXZWF0aGVyfVxyXG4iLCJcclxuYXN5bmMgZnVuY3Rpb24gbG9hZEpzb24odXJsKSB7XHJcbiAgICB0cnl7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7bW9kZTogJ2NvcnMnfSlcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YVxyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGZvcm1hdERhdGUoZXBvY2gpIHtcclxuICAgIGNvbnN0IGVwb2NodGltZSA9IGVwb2NoKjEwMDAgLy9taWxsaXNlY29uZHNcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShlcG9jaHRpbWUpXHJcbiAgICByZXR1cm4gZGF0ZS50b0RhdGVTdHJpbmcoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBtaWxpdGFyeVRvU3RhbmRhcmRUaW1lKHRpbWUpIHtcclxuICAgIGNvbnN0IHBlcmlvZCA9IHRpbWUgPj0gMTIgPyBcIlBNXCIgOiBcIkFNXCJcclxuICAgIGNvbnN0IGhvdXIgPSAodGltZSAlIDEyKSB8fCAxMiBcclxuICAgIHJldHVybiBgJHtob3VyfSAke3BlcmlvZH1gIFxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZm9ybWF0SG91cihlcG9jaCkge1xyXG4gICAgY29uc3QgZXBvY2hfdGltZSA9IGVwb2NoKjEwMDBcclxuICAgIGNvbnN0IGhvdXIgPSBuZXcgRGF0ZShlcG9jaF90aW1lKVxyXG4gICAgcmV0dXJuIGhvdXIuZ2V0SG91cnMoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KGhvdXIsIHRlbXAsIGljb24sIGluQ2Vsc2l1cz1mYWxzZSkge1xyXG4gICAgY29uc3QgaG91cmx5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob3VybHktY29udGFpbmVyXCIpXHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaG91cmx5XCIpXHJcblxyXG4gICAgbGV0IGRlZ3JlZSA9IFwiwrBGXCJcclxuICAgIGlmIChpbkNlbHNpdXMpIHtcclxuICAgICAgICBkZWdyZWUgPSBcIsKwQ1wiXHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImhvdXJseVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaG91cmx5LXRpbWVcIj4ke2hvdXJ9IDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaG91cmx5LXRlbXBcIj4ke3RlbXB9ICR7ZGVncmVlfTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaG91cmx5LWltZ1wiPiA8aW1nIHNyYz1cIiR7aWNvbn1cIj4gPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgXHJcblxyXG4gICAgaG91cmx5Q29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFySG91cmx5Q29udGFpbmVyKCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob3VybHktY29udGFpbmVyXCIpXHJcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIlxyXG59XHJcblxyXG5leHBvcnQge2xvYWRKc29uLCBcclxuICAgICAgICBmb3JtYXREYXRlLCBcclxuICAgICAgICBtaWxpdGFyeVRvU3RhbmRhcmRUaW1lLCBcclxuICAgICAgICBmb3JtYXRIb3VyLCBcclxuICAgICAgICBjcmVhdGVFbGVtZW50LFxyXG4gICAgICAgIGNsZWFySG91cmx5Q29udGFpbmVyXHJcbiAgICB9IiwiaW1wb3J0IHsgbG9hZEpzb24sIG1pbGl0YXJ5VG9TdGFuZGFyZFRpbWUsIGZvcm1hdEhvdXIsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwiLi9oZWxwZXJGdW5jdGlvbnNcIlxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZEhvdXJseVdlYXRoZXIodXJsLCBpbkNlbHNpdXM9ZmFsc2UpIHtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBsb2FkSnNvbih1cmwpXHJcblxyXG4gICAgY29uc3QgdGltZU5vdyA9IGZvcm1hdEhvdXIoZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWVfZXBvY2gpXHJcblxyXG4gICAgZm9yIChsZXQgaT10aW1lTm93KzE7IGk8KHRpbWVOb3crOCk7IGkrKykge1xyXG4gICAgICAgIGxldCB0ZW1wZXJhdHVyZSA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS50ZW1wX2ZcclxuICAgICAgICBjb25zdCBpY29uID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLmNvbmRpdGlvbi5pY29uXHJcbiAgICAgICAgY29uc3QgaG91cjI0ID0gZm9ybWF0SG91cihkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbaV0udGltZV9lcG9jaClcclxuICAgICAgICBjb25zdCBob3VyID0gbWlsaXRhcnlUb1N0YW5kYXJkVGltZShob3VyMjQpICBcclxuICAgICAgICBcclxuICAgICAgICBpZiAoaW5DZWxzaXVzKSB7XHJcbiAgICAgICAgICAgIHRlbXBlcmF0dXJlID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW2ldLnRlbXBfY1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlRWxlbWVudChob3VyLCB0ZW1wZXJhdHVyZSwgaWNvbiwgaW5DZWxzaXVzKVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCB7bG9hZEhvdXJseVdlYXRoZXJ9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBsb2FkQ3VycmVudFdlYXRoZXIgfSBmcm9tIFwiLi9jdXJyZW50V2VhdGhlclwiXHJcbmltcG9ydCB7IGxvYWRIb3VybHlXZWF0aGVyIH0gZnJvbSBcIi4vaG91cmx5V2VhdGhlclwiXHJcbmltcG9ydCB7Y2xlYXJIb3VybHlDb250YWluZXJ9IGZyb20gXCIuL2hlbHBlckZ1bmN0aW9uc1wiXHJcblxyXG5sZXQgdXJsID0gXCJodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWE3OGQ4MDY1YWM5MzRkZjViNzgxNzEwMDMyMzAzMTAmcT1OZXcgWW9yayZkYXlzPTMmYXFpPW5vJmFsZXJ0cz1ub1wiXHJcblxyXG5sb2FkQ3VycmVudFdlYXRoZXIodXJsKSAvL2luaXRpYWxpemUgc29tZSBkYXRhXHJcbmxvYWRIb3VybHlXZWF0aGVyKHVybClcclxuXHJcbmNvbnN0IHNlYXJjaGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtZm9ybV1cIilcclxuc2VhcmNoZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoXCIpLnZhbHVlXHJcbiAgICB1cmwgPSBgaHR0cDovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT1hNzhkODA2NWFjOTM0ZGY1Yjc4MTcxMDAzMjMwMzEwJnE9JHtzZWFyY2hJbnB1dH0mZGF5cz0zJmFxaT1ubyZhbGVydHM9bm9gXHJcbiAgICBhd2FpdCBsb2FkQ3VycmVudFdlYXRoZXIodXJsKVxyXG5cclxuICAgIGNsZWFySG91cmx5Q29udGFpbmVyKClcclxuICAgIGF3YWl0IGxvYWRIb3VybHlXZWF0aGVyKHVybClcclxuXHJcbiAgICBzZWFyY2hJbnB1dC5jbGVhcigpXHJcbn0pXHJcblxyXG5cclxuY29uc3QgdG9nZ2xlRGVncmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oaWRkZW4tY2hlY2tib3hcIilcclxudG9nZ2xlRGVncmVlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKHRvZ2dsZURlZ3JlZS5jaGVja2VkKSB7XHJcbiAgICAgICAgY2xlYXJIb3VybHlDb250YWluZXIoKVxyXG4gICAgICAgIGF3YWl0IGxvYWRDdXJyZW50V2VhdGhlcih1cmwsdHJ1ZSlcclxuICAgICAgICBhd2FpdCBsb2FkSG91cmx5V2VhdGhlcih1cmwsdHJ1ZSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2xlYXJIb3VybHlDb250YWluZXIoKVxyXG4gICAgICAgIGF3YWl0IGxvYWRDdXJyZW50V2VhdGhlcih1cmwpXHJcbiAgICAgICAgYXdhaXQgbG9hZEhvdXJseVdlYXRoZXIodXJsKVxyXG4gICAgfVxyXG59KVxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9