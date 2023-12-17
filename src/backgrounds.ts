import drizzle from './backgrounds/drizzle.jpg';
import misty from './backgrounds/misty.jpg';
import thunderstorm from './backgrounds/thunderstorm.jpg';

import nightClear from './backgrounds/night/clear.jpg';
import nightCloudy from './backgrounds/night/cloudy.jpg';
import nightRain from './backgrounds/night/rain.jpg';
import nightShowerRain from './backgrounds/night/shower-rain.jpg';
import nightSnowy from './backgrounds/night/snowy.jpg';

import dayClear from './backgrounds/day/clear.jpg';
import dayCloudy from './backgrounds/day/cloudy.jpg';
import dayRain from './backgrounds/day/rain.jpg';
import dayScattered from './backgrounds/day/scattered.jpg';
import daySnowy from './backgrounds/day/snowy.jpg';

export default {
  drizzle,
  misty,
  thunderstorm,
  night: {
    clear: nightClear,
    cloudy: nightCloudy,
    rain: nightRain,
    showerRain: nightShowerRain,
    snowy: nightSnowy,
  },
  day: {
    clear: dayClear,
    cloudy: dayCloudy,
    rain: dayRain,
    scattered: dayScattered,
    snowy: daySnowy,
  },
};
