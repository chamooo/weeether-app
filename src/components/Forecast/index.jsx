// import s from './styles.module.scss';
import ForecastCard from '../ForecastCard';
import { useTranslation } from 'react-i18next';
import { iconUrlFromCode } from '../../services/weatherService';
const Forecast = ({ weather, title, unitsSymbol }) => {
    const isWeek = weather.some((item) => item.title.toLowerCase() === 'monday');

    const { t } = useTranslation();
    console.log(weather);
    return (
        <div>
            <p className="mb-3">{title}</p>
            <div className="flex items-start gap-5 overflow-x-scroll no-scrollbar mb-10">
                {weather.map((item, i) => {
                    return isWeek ? (
                        <ForecastCard
                            key={i}
                            day={t(item.title.toLowerCase())}
                            temperature={item.temp.toFixed()}
                            unitsSymbol={unitsSymbol}
                            icon={iconUrlFromCode(item.icon)}
                        />
                    ) : (
                        <ForecastCard
                            key={i}
                            day={item.title}
                            temperature={item.temp.toFixed()}
                            unitsSymbol={unitsSymbol}
                            icon={iconUrlFromCode(item.icon)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Forecast;
