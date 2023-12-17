import { ETempFormat, setElementTemp, convertFromUnixTime } from "./api/utils";

const fahrenheit = document.querySelector('.fahr')!;
const celsius = document.querySelector('.cels')!;
const movingBg = document.querySelector('#moving-bg')!;
// TODO: rename to something adequate because it almost doesn't differ from switchFormat
export default function changeFormatAndTime() {
  if (fahrenheit.classList.contains('now')) {
    switchFormat(ETempFormat.Fahrenheit);
    localStorage.setItem('format', 'eu');
    celsius.classList.add('now');
    fahrenheit.classList.remove('now');
    movingBg.classList.remove('left');
    movingBg.classList.add('right');
  } else {
    switchFormat(ETempFormat.Celsius);
    localStorage.setItem('format', 'us');
    celsius.classList.remove('now');
    fahrenheit.classList.add('now');
    movingBg.classList.add('left');
    movingBg.classList.remove('right');
  };
};

function switchFormat(currentFormat: ETempFormat) {
  const temps = document.querySelectorAll('.temp')!;
  const times = document.querySelectorAll('.time')!;
  if (currentFormat === ETempFormat.Fahrenheit) {
    temps.forEach(ele => {
      setElementTemp(ETempFormat.Celsius, ele as HTMLElement);
    });

    times.forEach(ele => {
      convertFromUnixTime('24' as const, ele as HTMLElement);
    });
  } else {
    temps.forEach(ele => {
      setElementTemp(ETempFormat.Fahrenheit, ele as HTMLElement);
    });

    times.forEach(ele => {
      convertFromUnixTime('12' as const, ele as HTMLElement);
    });
  }
};
