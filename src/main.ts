import './style.css'
import initWeatherChange from './syncWeather'
import changeFormatAndTime from './formatUSandEU';


initWeatherChange();
const input = document.querySelector('#search')! as HTMLInputElement;
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    initWeatherChange(input.value);
  };
});

document.querySelector('.find')!.addEventListener('click', () => {
  initWeatherChange(input.value);
});

document.querySelector('.clear')?.addEventListener('click', () => {
  input.value = '';
});

const changeTemp = document.querySelector('#change-temp')!;
changeTemp.addEventListener('click', changeFormatAndTime);




