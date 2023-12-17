import { formatDate, handleCityName, getIconUrl, getCoords, key } from "./utils";


let lastResponse: any;
let out = {
  current: {} as any,
  hourly: [] as any[],
  daily: [] as any[],
};

export default async function getResponse(city: string) {
  // clear out so it previous functions don't stack on it
  out = {
    current: {} as any,
    hourly: [] as any[],
    daily: [] as any[],
  };

  const coords = await getCoords(city);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=alerts&appid=${key}`
  );
  lastResponse = await response.json();
  await Promise.all([
    getCurrent(city),
    getDays(),
    getHours(),
  ]);

  return out;
};

// this function uses another api call because it formats the city name
async function getCurrent(city: string) {
  city = handleCityName(city);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
  );
  const json = await response.json();

  out.current = {
    kTemp: Math.floor(+json.main.temp),
    name: json.name as string,
    date: formatDate(+json.dt),
    desc: json.weather[0].main,
    img: getIconUrl(json.weather[0].icon),
    iconId: json.weather[0].icon,
  };
};

async function getDays() {
  const list = lastResponse.daily as any[];
  for (let x = 1; x <= 6; x++) {
    const ele = list[x];
    out.daily.push({
      kTemp: Math.floor(+ele.temp.day),
      img: getIconUrl(ele.weather[0].icon),
      date: formatDate(+ele.dt),
      desc: ele.weather[0].main,
    });
  }
};

async function getHours() {
  const list = lastResponse.hourly as any[];
  for (let x = 0; x < 12; x++) {
    const ele = list[x];
    out.hourly.push({
      kTemp: Math.floor(+ele.temp),
      unixTime: +ele.dt,
      img: getIconUrl(ele.weather[0].icon),
      desc: ele.weather[0].main,
    });
  };
};

