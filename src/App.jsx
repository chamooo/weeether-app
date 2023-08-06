import React, { useEffect, useState } from 'react';
import './App.css';
import TopActions from './components/TopActions';
import TopButtons from './components/TopButtons';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import SearchModal from './components/SearchModal';
import Forecast from './components/Forecast';
import Input from './UI/Input';
import getFormattedWeatherData from './services/weatherService';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

function App() {
    const [isModalOpened, setIsModalOpened] = React.useState(false);
    const [query, setQuery] = useState({ q: 'kyiv' });
    const [units, setUnits] = useState('metric');
    const [weather, setWeather] = useState(null);
    const [bgImage, setBgImage] = useState('/img/bg-1.jpeg');

    const { t } = useTranslation();

    const unitsSymbol = units === 'metric' ? '℃' : '℉';

    useEffect(() => {
        const fetchWeather = async () => {
            await getFormattedWeatherData({ ...query, units })
                .then((data) => {
                    setWeather(data);
                })
                .catch((err) => {
                    console.log(err);
                    alert('There is no city with this name. Try changing the query');
                });
        };
        fetchWeather();
    }, [query]);

    useEffect(() => {
        const API_KEY = 'SOue95Hm9NBO8t4nkxcidBJJTvrLEX42iu3MMFMPuTo';
        const BASE_URL = 'https://api.unsplash.com/search/photos';

        function getRandomNumber(max) {
            return Math.floor(Math.random() * max);
        }

        if (weather) {
            const time = +formatToLocalTime(dt, timezone).split('|').pop().trim().split(':')[0];
            let dayTime = 'afternoon';
            if (time >= 5 && time <= 9) dayTime = 'morning';
            else if (time > 9 && time < 15) dayTime = 'afternoon';
            else if (time > 15 && time < 19) dayTime = 'evening';
            else if (time >= 20 && time < 5) dayTime = 'night';

            const imgQuery = encodeURI(
                `${dayTime} ${weather.description} sky&orientation=landscape`,
            );

            const url = `${BASE_URL}?client_id=${API_KEY}&query=${imgQuery}`;
            console.log(url);
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    if (data.results && data.results.length > 0) {
                        const randomIndex = getRandomNumber(data.results.length);
                        setBgImage(data.results[randomIndex].urls.regular);
                    } else {
                        console.log('No results found.');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [weather]);

    return (
        <div
            id="app"
            className="py-8 px-4 w-1 relative"
            style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="container">
                <LanguageSwitcher />
                <TopButtons className="mb-7" setQuery={setQuery} />
                {weather && (
                    <>
                        <div className="flex gap-9 justify-center items-center">
                            <TimeAndLocation weather={weather} />
                            <TopActions
                                className="mb-10"
                                setIsModalOpened={setIsModalOpened}
                                setQuery={setQuery}
                                setUnits={setUnits}
                            />
                        </div>
                        <TemperatureAndDetails weather={weather} unitsSymbol={unitsSymbol} />
                        <Forecast
                            unitsSymbol={unitsSymbol}
                            weather={weather.hourly}
                            title={t('hourly') + ' ' + t('forecast')}
                        />
                        <Forecast
                            unitsSymbol={unitsSymbol}
                            weather={weather.daily}
                            title={t('daily') + ' ' + t('forecast')}
                        />
                    </>
                )}
            </div>
            <SearchModal isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened}>
                <Input
                    isModalOpened={isModalOpened}
                    setQuery={setQuery}
                    query={query}
                    weatherCity={weather?.name}
                />
            </SearchModal>
        </div>
    );
}

export default App;
