import { ETempFormat, NoCityErorr, convertFromUnixTime, setElementTemp } from "./api/utils";
import getResponse from "./api/fetchApis";
import backgrounds from "./backgrounds";


let out = {
  current: {} as any,
  hourly: [] as any[],
  daily: [] as any[],
};

async function syncHours() {
  const seps = document.querySelectorAll('.sep-time');
  for (let x = 0; x < seps.length; x++) {
    const currentSep = seps[x];
    const currentHour = out.hourly[x];

    const temp = currentSep.querySelector('.temp')! as HTMLElement;
    temp.setAttribute('kelvin', currentHour.kTemp);
    setElementTemp(ETempFormat.Fahrenheit, temp);

    const time = currentSep.querySelector('.time')! as HTMLElement;
    time.setAttribute('unixTime', currentHour.unixTime);
    convertFromUnixTime('12' as const, time);

    currentSep.querySelector('img')!.src = currentHour.img;
  };
};

async function syncDays() {
  const days = document.querySelectorAll('.day');
  for (let x = 0; x < days.length; x++) {
    const day = days[x];
    const item = out.daily[x];
    const img = day.querySelector('img')!;

    const dayTemp = day.querySelector('.day-temp')! as HTMLElement;
    dayTemp.setAttribute('kelvin', item.kTemp);
    setElementTemp(ETempFormat.Fahrenheit, dayTemp);

    img.src = item.img;
    img.title = item.desc;
    img.alt = item.desc;
    day.querySelector('div>span')!.textContent = item.date;
  };
};

async function syncCurrent() {
  const tempNow = document.querySelector('#temp-now')! as HTMLElement;
  tempNow.setAttribute('kelvin', out.current.kTemp);
  setElementTemp(ETempFormat.Fahrenheit, tempNow);
  document.querySelector('#city')!.textContent = out.current.name;
  document.querySelector('#date-now')!.textContent = out.current.date;
};

function handleError(text: string) {
  // const error = document.querySelector('#error');
  // TODO: change from alert to using error element, just make it beautiful first
  alert(text);
};

async function changeBackground(iconId: string) {
  let img: string;
  switch (iconId) {
    case '11d':
    case '11n':
      img = backgrounds.thunderstorm;
      break;
    case '09d':
      img = backgrounds.drizzle;
      break;
    case '09n':
      img = backgrounds.night.showerRain;
      break;
    case '10d':
      img = backgrounds.day.rain;
      break;
    case '10n':
      img = backgrounds.night.rain;
      break;
    case '13d':
      img = backgrounds.day.snowy;
      break;
    case '13n':
      img = backgrounds.night.snowy;
      break;
    case '50d':
    case '50n':
      img = backgrounds.misty;
      break;
    case '01d':
      img = backgrounds.day.clear;
      break;
    case '01n':
      img = backgrounds.night.clear;
      break;
    case '02d':
    case '03d':
      img = backgrounds.day.scattered;
      break;
    case '02n':
    case '03n':
    case '04n':
      img = backgrounds.night.cloudy;
      break;
    case '04d':
      img = backgrounds.day.cloudy;
      break;
    default:
      img = backgrounds.day.clear;
      break;
  };

  const container = document.querySelector('#container') as HTMLElement;
  container.style.backgroundImage = `url('${img}')`;
};

export default async function initWeatherChange(city?: string) {
  city = (city ?? localStorage.getItem('city')) ?? 'New York';
  document.querySelector('#error')?.classList.remove('hide');
  try {
    out = await getResponse(city);
    localStorage.setItem('city', city);
    await Promise.all([
      syncCurrent(),
      syncDays(),
      syncHours(),
      changeBackground(out.current.iconId),
    ]);
  } catch (ex) {
    if (ex instanceof NoCityErorr) {
      handleError(`No city named '${city}' found`);
    }
    else {
      handleError('An error occured');
      throw ex;
    }
  };
}
