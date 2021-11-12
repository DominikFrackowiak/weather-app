//IMPORTS
import {
  getWeatherByCity
} from './apiService.js';

//OBJECT THAT RECOLLECT ALL ELEMENTS
const viewElems = {};

console.log(viewElems)

const getDOMElem = id => document.getElementById(id);

//FUNCTION THAT RECOLLECTS ELEMENTS AND SETS THEM AS KEY/VALUE PAIRS OF "VIEWELEMS" OBJ.
const connectHTMLElems = () => {
  viewElems.mainContainer = getDOMElem('mainContainer');
  viewElems.weatherSearchView = getDOMElem('weatherSearchView');
  viewElems.weatherForecastView = getDOMElem('weatherForecastView');

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
  viewElems.returnToSearchBtn.addEventListener('click', returnToSearch)
}



//MAIN FUNCTION THAT IS TRIGGERED BY THE END OF THE LOADING OF THE DOCUMENT
const initializeApp = () => {
  connectHTMLElems();
  setupListeners();
}

const onEnterSubmit = e => {

  if (e.key === "Enter") {
    fadeInOut();
    let query = viewElems.searchInput.value;
    getWeatherByCity(query)
      .then(data => {
        console.log(data);
        displayWeatherData(data);
        // switchView();
        // fadeInOut();
      })
  }
};
const onClickSubmit = () => {

  let query = viewElems.searchInput.value;
  getWeatherByCity(query)
    .then(data => {
      console.log(data);
      fadeInOut();
      switchView();
    })
};

const fadeInOut = () => {
  if (viewElems.mainContainer.style.opacity === '1' || viewElems.mainContainer.style.opacity === '') {
    viewElems.mainContainer.style.opacity = '0';
  } else {
    viewElems.mainContainer.style.opacity = '1'
  }
}

const switchView = () => {
  if (viewElems.weatherSearchView.style.display !== 'none') {
    viewElems.weatherSearchView.style.display = 'none';
    viewElems.weatherForecastView.style.display = 'flex'
    console.log("searchview!")
  } else {
    viewElems.weatherSearchView.style.display = 'flex';
    viewElems.weatherForecastView.style.display = 'none'
    console.log("not searchview!")
  }
}

const returnToSearch = () => {
  fadeInOut();
  setTimeout(() => {
    switchView();
    fadeInOut()
  }, 500)
}

const displayWeatherData = data => {
  fadeInOut();
  switchView();

  const weather = data.consolidated_weather[0];
  viewElems.weatherCity.innerText = data.title;
  viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
  viewElems.weatherIcon.alt = weather.weather_state_name;

  const currTemp = weather.the_temp.toFixed(2);
  const maxTemp = weather.max_temp.toFixed(2);
  const minTemp = weather.min_temp.toFixed(2);

  viewElems.weatherCurrentTemp.innerText = `Current temperature: ${currTemp}°C`;
  viewElems.weatherMaxTemp.innerText = `Max temperature: ${maxTemp}°C`;
  viewElems.weatherMinTemp.innerText = `Min temperature: ${minTemp}°C`;
}


document.addEventListener("DOMContentLoaded", initializeApp);