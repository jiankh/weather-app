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
const weatherContainer = document.querySelector(".weather-container")
const locationContainer = document.querySelector(".location-container")
const dateContainer = document.querySelector(".current-time-container")
const currentGraphic = document.querySelector(".current-graphics")
const currentDegrees = document.querySelector(".current-degrees")

const currentFeel = document.querySelector("[data-feels-like]")
const currentHumidity = document.querySelector("[data-humidity]")
const currentRainChance = document.querySelector("[data-rain-chance]")
const currentWind = document.querySelector("[data-wind]")


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




async function loadCurrentWeather(url) {
    const currentData = await loadJson(url)
    weatherContainer.innerHTML = currentData.current.condition.text
    locationContainer.innerHTML = `<img data-location-pin src="images/location-pin.svg"> ${currentData.location.name}`
    dateContainer.innerHTML = await formatDate(currentData.location.localtime_epoch)
    currentDegrees.innerHTML = `${currentData.current.temp_f} °F`
    currentGraphic.innerHTML = `<img class=current-image src="${currentData.current.condition.icon}" alt="weather icon">`

    //Extra Section
    currentFeel.innerHTML = `${currentData.current.feelslike_f} °F` 
    currentHumidity.innerHTML = `${currentData.current.humidity} %`
    currentRainChance.innerHTML = `${currentData.forecast.forecastday[0].day.daily_chance_of_rain} %`
    currentWind.innerHTML = `${currentData.current.wind_mph} MPH`
}



async function formatDate(epoch) {
    const epochtime = epoch*1000 //milliseconds
    const date = new Date(epochtime)
    return date.toDateString()
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


let url = "http://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=New York&days=3&aqi=no&alerts=no"

;(0,_currentWeather__WEBPACK_IMPORTED_MODULE_0__.loadCurrentWeather)(url)

const searchform = document.querySelector("[data-form]")


searchform.addEventListener('submit', async (e) => {
    e.preventDefault()
    const searchInput = document.querySelector("#search").value
    url = `http://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=${searchInput}&days=3&aqi=no&alerts=no`
    await (0,_currentWeather__WEBPACK_IMPORTED_MODULE_0__.loadCurrentWeather)(url);
})








async function loadToDOM() {
    testerDOM = document.querySelector(".tester")
    const data = await loadJson(url)
    testerDOM.innerHTML = data.location.name
}

// loadToDOM()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsYUFBYTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJGQUEyRiwwQkFBMEI7QUFDckg7QUFDQSxrQ0FBa0MsNEJBQTRCO0FBQzlELGdFQUFnRSxtQ0FBbUM7QUFDbkc7QUFDQTtBQUNBLCtCQUErQixpQ0FBaUM7QUFDaEUsbUNBQW1DLDhCQUE4QjtBQUNqRSxxQ0FBcUMsOERBQThEO0FBQ25HLCtCQUErQiw4QkFBOEI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDMkI7Ozs7Ozs7VUNsRDNCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOcUQ7QUFDckQ7QUFDQTtBQUNBO0FBQ0Esb0VBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEZBQThGLFlBQVk7QUFDMUcsVUFBVSxtRUFBa0I7QUFDNUIsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY3VycmVudFdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB3ZWF0aGVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLWNvbnRhaW5lclwiKVxyXG5jb25zdCBsb2NhdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9jYXRpb24tY29udGFpbmVyXCIpXHJcbmNvbnN0IGRhdGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtdGltZS1jb250YWluZXJcIilcclxuY29uc3QgY3VycmVudEdyYXBoaWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtZ3JhcGhpY3NcIilcclxuY29uc3QgY3VycmVudERlZ3JlZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtZGVncmVlc1wiKVxyXG5cclxuY29uc3QgY3VycmVudEZlZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtZmVlbHMtbGlrZV1cIilcclxuY29uc3QgY3VycmVudEh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWh1bWlkaXR5XVwiKVxyXG5jb25zdCBjdXJyZW50UmFpbkNoYW5jZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1yYWluLWNoYW5jZV1cIilcclxuY29uc3QgY3VycmVudFdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtd2luZF1cIilcclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkSnNvbih1cmwpIHtcclxuICAgIHRyeXtcclxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHttb2RlOiAnY29ycyd9KVxyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhXHJcbiAgICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZEN1cnJlbnRXZWF0aGVyKHVybCkge1xyXG4gICAgY29uc3QgY3VycmVudERhdGEgPSBhd2FpdCBsb2FkSnNvbih1cmwpXHJcbiAgICB3ZWF0aGVyQ29udGFpbmVyLmlubmVySFRNTCA9IGN1cnJlbnREYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHRcclxuICAgIGxvY2F0aW9uQ29udGFpbmVyLmlubmVySFRNTCA9IGA8aW1nIGRhdGEtbG9jYXRpb24tcGluIHNyYz1cImltYWdlcy9sb2NhdGlvbi1waW4uc3ZnXCI+ICR7Y3VycmVudERhdGEubG9jYXRpb24ubmFtZX1gXHJcbiAgICBkYXRlQ29udGFpbmVyLmlubmVySFRNTCA9IGF3YWl0IGZvcm1hdERhdGUoY3VycmVudERhdGEubG9jYXRpb24ubG9jYWx0aW1lX2Vwb2NoKVxyXG4gICAgY3VycmVudERlZ3JlZXMuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC50ZW1wX2Z9IMKwRmBcclxuICAgIGN1cnJlbnRHcmFwaGljLmlubmVySFRNTCA9IGA8aW1nIGNsYXNzPWN1cnJlbnQtaW1hZ2Ugc3JjPVwiJHtjdXJyZW50RGF0YS5jdXJyZW50LmNvbmRpdGlvbi5pY29ufVwiIGFsdD1cIndlYXRoZXIgaWNvblwiPmBcclxuXHJcbiAgICAvL0V4dHJhIFNlY3Rpb25cclxuICAgIGN1cnJlbnRGZWVsLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2Z9IMKwRmAgXHJcbiAgICBjdXJyZW50SHVtaWRpdHkuaW5uZXJIVE1MID0gYCR7Y3VycmVudERhdGEuY3VycmVudC5odW1pZGl0eX0gJWBcclxuICAgIGN1cnJlbnRSYWluQ2hhbmNlLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbn0gJWBcclxuICAgIGN1cnJlbnRXaW5kLmlubmVySFRNTCA9IGAke2N1cnJlbnREYXRhLmN1cnJlbnQud2luZF9tcGh9IE1QSGBcclxufVxyXG5cclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBmb3JtYXREYXRlKGVwb2NoKSB7XHJcbiAgICBjb25zdCBlcG9jaHRpbWUgPSBlcG9jaCoxMDAwIC8vbWlsbGlzZWNvbmRzXHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZXBvY2h0aW1lKVxyXG4gICAgcmV0dXJuIGRhdGUudG9EYXRlU3RyaW5nKClcclxufVxyXG5cclxuZXhwb3J0IHtsb2FkQ3VycmVudFdlYXRoZXJ9XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbG9hZEN1cnJlbnRXZWF0aGVyIH0gZnJvbSBcIi4vY3VycmVudFdlYXRoZXJcIlxyXG5cclxubGV0IHVybCA9IFwiaHR0cDovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT1hNzhkODA2NWFjOTM0ZGY1Yjc4MTcxMDAzMjMwMzEwJnE9TmV3IFlvcmsmZGF5cz0zJmFxaT1ubyZhbGVydHM9bm9cIlxyXG5cclxubG9hZEN1cnJlbnRXZWF0aGVyKHVybClcclxuXHJcbmNvbnN0IHNlYXJjaGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtZm9ybV1cIilcclxuXHJcblxyXG5zZWFyY2hmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFzeW5jIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hcIikudmFsdWVcclxuICAgIHVybCA9IGBodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWE3OGQ4MDY1YWM5MzRkZjViNzgxNzEwMDMyMzAzMTAmcT0ke3NlYXJjaElucHV0fSZkYXlzPTMmYXFpPW5vJmFsZXJ0cz1ub2BcclxuICAgIGF3YWl0IGxvYWRDdXJyZW50V2VhdGhlcih1cmwpO1xyXG59KVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRUb0RPTSgpIHtcclxuICAgIHRlc3RlckRPTSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVzdGVyXCIpXHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgbG9hZEpzb24odXJsKVxyXG4gICAgdGVzdGVyRE9NLmlubmVySFRNTCA9IGRhdGEubG9jYXRpb24ubmFtZVxyXG59XHJcblxyXG4vLyBsb2FkVG9ET00oKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==