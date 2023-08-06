// https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=4eae63332fc0394252d1dcdad428887b

import { DateTime } from 'luxon';

const API_KEY = '4eae63332fc0394252d1dcdad428887b';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = (apiType, searchParams) => {
    const url = new URL(BASE_URL + '/' + apiType);
    url.search = new URLSearchParams({ ...searchParams, lang: 'ua', appid: API_KEY });

    return fetch(url)
        .then((res) => res.json())
        .then((data) => data);
};

const formatCurrentWeather = (data) => {
    const {
        coord: { lon, lat },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt, //timestamp of location
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
    } = data;

    const { main: details, description, icon } = weather[0];

    return {
        lon,
        lat,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        icon,
        description,
        speed,
    };
};

const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;

    daily = daily.slice(1, 8).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'cccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon,
        };
    });

    hourly = hourly.slice(1, 13).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'HH:mm'),
            temp: d.temp,
            icon: d.weather[0].icon,
        };
    });

    return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
    const currentWeatherData = await getWeatherData('weather', searchParams).then(
        formatCurrentWeather,
    );

    const { lon, lat } = currentWeatherData;

    const forecastData = await getWeatherData('onecall', {
        lat,
        lon,
        exclude: 'current,minutes,alerts',
        units: searchParams.units,
    }).then(formatForecastWeather);

    return { ...currentWeatherData, ...forecastData };
};

const formatToLocalTime = (secs, zone, format = 'ccc dd LLL | HH:mm') =>
    DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export { formatToLocalTime, iconUrlFromCode };

export default getFormattedWeatherData;
