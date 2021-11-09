//IMPORTS
import {
 getWeatherByCity
} from './apiService.js'

//OBJECT THAT RECOLLECT ALL ELEMENTS
const viewElems = {};

const getDOMElem = id => document.getElementById(id);

//FUNCTION THAT RECOLLECTS ELEMENTS AND SETS THEM AS KEY/VALUE PAIRS OF "VIEWELEMS" OBJ.
const connectHTMLElems = () => {
 viewElems.mainContainer = getDOMElem('');
 viewElems.weatherSearchView = getDOMElem('wheatherSearchView');
 viewElems.weatherForecasthView = getDOMElem('wheatherForecastView');

 viewElems.searchInput = getDOMElem('searchInput');
 viewElems.searchButton = getDOMElem('searchButton');

 viewElems.weatherCityContainer = getDOMElem('weatherCityContainer');
 viewElems.weatherCity = getDOMElem('weatherCity');
 viewElems.weatherIcon = getDOMElem('weatherIcon');

 viewElems.weatherCurrentTemp = getDOMElem('weatherCurrentTemp');
 viewElems.weatherMaxTemp = getDOMElem('weatherMaxTemp');
 viewElems.weatherMinTemp = getDOMElem('weatherMinTemp');

 viewElems.returnToSearchBtn = getDOMElem('returnToSearchBtn');
}

//FUNCTION THAT RECOLLECTS LISTENERS
const setupListeners = () => {
 viewElems.searchInput.addEventListener('keydown', onEnterSubmit);
 viewElems.searchButton.addEventListener('click', onClickSubmit);
}



//MAIN FUNCTION THAT IS TRIGGERED BY THE END OF THE LOADING OF THE DOCUMENT
const initializeApp = () => {
 connectHTMLElems();
 setupListeners();
}

const onEnterSubmit = e => {
 if (e.key === "Enter") {
  let query = viewElems.searchInput.value;
  getWeatherByCity(query);
 }
};
const onClickSubmit = () => {
 console.log("Click!");
};

document.addEventListener("DOMContentLoaded", initializeApp);