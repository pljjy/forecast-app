export enum ETempFormat {
  Fahrenheit,
  Celsius,
};

export class NoCityErorr extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NoCityError';
  }
}

export function setElementTemp(unit: ETempFormat, element: HTMLElement) {
  const kelvin = +element.getAttribute('kelvin')!;
  if (unit === ETempFormat.Fahrenheit) {
    element.textContent = Math.ceil((kelvin - 273.15) * 9 / 5 + 32) + '';
  } else {
    element.textContent = Math.ceil(kelvin - 273.15) + '';
  }
};

export function convertFromUnixTime(timeFormat: '12' | '24', element: HTMLElement){
  const unix = +element.getAttribute('unixTime')!;
  const hours = new Date(unix * 1000).getHours();
  if (timeFormat ===  '12'){
    element.textContent = `${hours % 12 || 12}:00 ${hours >= 12 ? 'PM' : 'AM'}`;
  } else{
    element.textContent = `${hours}: 00`;
  };
};

export function handleCityName(name: string): string {
  return name
    .replace(/(\s+$|^\s+)/g, '') // remove whitespace from begining and end of string
    .replace(/(,\s+)/g, ',') // remove any white space that follows a comma
    .replace(/(\s+,)/g, ',') // remove any white space that preceeds a comma
    .replace(/\s+/g, '+'); // replace any remaining white space with +, so it works in api call
}

export function formatDate(dt: number): string {
  const date = new Date(dt * 1000);
  const options = {
    weekday: 'long' as const,
    day: 'numeric' as const,
    month: 'long' as const,
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  return formatter.format(date);
}

export function getIconUrl(id: string): string {
  return `https://openweathermap.org/img/wn/${id}@2x.png`;
};

export async function getCoords(city: string) {
  city = handleCityName(city)
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=20f7632ffc2c022654e4093c6947b4f4`);
  if (response.status === 404) {
    throw new NoCityErorr(`No city with name ${city} was found`);
  };
  const json = await response.json();
  return json.coord;
};

export const key = import.meta.env.VITE_APP_KEY;
