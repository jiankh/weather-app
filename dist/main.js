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
    locationContainer.innerHTML = currentData.location.name
    dateContainer.innerHTML = await formatDate(currentData.location.localtime_epoch)
    currentDegrees.innerHTML = currentData.current.temp_f
    currentGraphic.innerHTML = `<img class=current-image src="${currentData.current.condition.icon}" alt="weather icon">`

    //Extra Section
    currentFeel.innerHTML = currentData.current.feelslike_f
    currentHumidity.innerHTML = currentData.current.humidity
    currentRainChance.innerHTML = currentData.forecast.forecastday[0].day.daily_chance_of_rain
    currentWind.innerHTML = currentData.current.wind_mph
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







const url = "http://api.weatherapi.com/v1/forecast.json?key=a78d8065ac934df5b78171003230310&q=London&days=3&aqi=no&alerts=no"
const url2 = "http://api.weatherapi.com/v1/current.json?key=a78d8065ac934df5b78171003230310&q=London&aqi=no"

;(0,_currentWeather__WEBPACK_IMPORTED_MODULE_0__.loadCurrentWeather)(url)









async function loadToDOM() {
    testerDOM = document.querySelector(".tester")
    const data = await loadJson(url)
    testerDOM.innerHTML = data.location.name
}

// loadToDOM()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsYUFBYTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRSxtQ0FBbUM7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDMkI7Ozs7Ozs7VUNsRDNCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOcUQ7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0VBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jdXJyZW50V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHdlYXRoZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItY29udGFpbmVyXCIpXHJcbmNvbnN0IGxvY2F0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2NhdGlvbi1jb250YWluZXJcIilcclxuY29uc3QgZGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC10aW1lLWNvbnRhaW5lclwiKVxyXG5jb25zdCBjdXJyZW50R3JhcGhpYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1ncmFwaGljc1wiKVxyXG5jb25zdCBjdXJyZW50RGVncmVlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1kZWdyZWVzXCIpXHJcblxyXG5jb25zdCBjdXJyZW50RmVlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1mZWVscy1saWtlXVwiKVxyXG5jb25zdCBjdXJyZW50SHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtaHVtaWRpdHldXCIpXHJcbmNvbnN0IGN1cnJlbnRSYWluQ2hhbmNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXJhaW4tY2hhbmNlXVwiKVxyXG5jb25zdCBjdXJyZW50V2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS13aW5kXVwiKVxyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRKc29uKHVybCkge1xyXG4gICAgdHJ5e1xyXG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge21vZGU6ICdjb3JzJ30pXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFcclxuICAgICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkQ3VycmVudFdlYXRoZXIodXJsKSB7XHJcbiAgICBjb25zdCBjdXJyZW50RGF0YSA9IGF3YWl0IGxvYWRKc29uKHVybClcclxuICAgIHdlYXRoZXJDb250YWluZXIuaW5uZXJIVE1MID0gY3VycmVudERhdGEuY3VycmVudC5jb25kaXRpb24udGV4dFxyXG4gICAgbG9jYXRpb25Db250YWluZXIuaW5uZXJIVE1MID0gY3VycmVudERhdGEubG9jYXRpb24ubmFtZVxyXG4gICAgZGF0ZUNvbnRhaW5lci5pbm5lckhUTUwgPSBhd2FpdCBmb3JtYXREYXRlKGN1cnJlbnREYXRhLmxvY2F0aW9uLmxvY2FsdGltZV9lcG9jaClcclxuICAgIGN1cnJlbnREZWdyZWVzLmlubmVySFRNTCA9IGN1cnJlbnREYXRhLmN1cnJlbnQudGVtcF9mXHJcbiAgICBjdXJyZW50R3JhcGhpYy5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1jdXJyZW50LWltYWdlIHNyYz1cIiR7Y3VycmVudERhdGEuY3VycmVudC5jb25kaXRpb24uaWNvbn1cIiBhbHQ9XCJ3ZWF0aGVyIGljb25cIj5gXHJcblxyXG4gICAgLy9FeHRyYSBTZWN0aW9uXHJcbiAgICBjdXJyZW50RmVlbC5pbm5lckhUTUwgPSBjdXJyZW50RGF0YS5jdXJyZW50LmZlZWxzbGlrZV9mXHJcbiAgICBjdXJyZW50SHVtaWRpdHkuaW5uZXJIVE1MID0gY3VycmVudERhdGEuY3VycmVudC5odW1pZGl0eVxyXG4gICAgY3VycmVudFJhaW5DaGFuY2UuaW5uZXJIVE1MID0gY3VycmVudERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluXHJcbiAgICBjdXJyZW50V2luZC5pbm5lckhUTUwgPSBjdXJyZW50RGF0YS5jdXJyZW50LndpbmRfbXBoXHJcbn1cclxuXHJcblxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZm9ybWF0RGF0ZShlcG9jaCkge1xyXG4gICAgY29uc3QgZXBvY2h0aW1lID0gZXBvY2gqMTAwMCAvL21pbGxpc2Vjb25kc1xyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGVwb2NodGltZSlcclxuICAgIHJldHVybiBkYXRlLnRvRGF0ZVN0cmluZygpXHJcbn1cclxuXHJcbmV4cG9ydCB7bG9hZEN1cnJlbnRXZWF0aGVyfVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGxvYWRDdXJyZW50V2VhdGhlciB9IGZyb20gXCIuL2N1cnJlbnRXZWF0aGVyXCJcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuY29uc3QgdXJsID0gXCJodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWE3OGQ4MDY1YWM5MzRkZjViNzgxNzEwMDMyMzAzMTAmcT1Mb25kb24mZGF5cz0zJmFxaT1ubyZhbGVydHM9bm9cIlxyXG5jb25zdCB1cmwyID0gXCJodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2N1cnJlbnQuanNvbj9rZXk9YTc4ZDgwNjVhYzkzNGRmNWI3ODE3MTAwMzIzMDMxMCZxPUxvbmRvbiZhcWk9bm9cIlxyXG5cclxubG9hZEN1cnJlbnRXZWF0aGVyKHVybClcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZFRvRE9NKCkge1xyXG4gICAgdGVzdGVyRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZXN0ZXJcIilcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBsb2FkSnNvbih1cmwpXHJcbiAgICB0ZXN0ZXJET00uaW5uZXJIVE1MID0gZGF0YS5sb2NhdGlvbi5uYW1lXHJcbn1cclxuXHJcbi8vIGxvYWRUb0RPTSgpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9