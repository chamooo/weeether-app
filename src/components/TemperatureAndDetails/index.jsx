import s from './styles.module.scss';
import { UilSun } from '@iconscout/react-unicons';
import { UilSunset } from '@iconscout/react-unicons';
import { UilArrowUp } from '@iconscout/react-unicons';
import { UilArrowDown } from '@iconscout/react-unicons';
import { formatToLocalTime, iconUrlFromCode } from '../../services/weatherService';
import { useTranslation } from 'react-i18next';

const TemperatureAndDetails = ({
    weather: {
        temp,
        feels_like,
        humidity,
        speed,
        temp_max,
        temp_min,
        sunrise,
        sunset,
        timezone,
        icon,
        dt,
    },
    unitsSymbol,
}) => {
    const { t } = useTranslation();
    const timeNumber = +formatToLocalTime(dt, timezone).split('|').pop().trim().split(':')[0];
    return (
        <div className="mb-6">
            <div className="flex justify-center gap-5 items-center mb-7 text-white">
                {/* {timeNumber < 21 ? (
                    <img src="img/weather-icons/sunny.svg" alt="" width={70} />
                ) : (
                    <img src="img/weather-icons/clear-night.png" alt="" width={70} />
                )} */}
                <img src={iconUrlFromCode(icon)} alt="" />
                <div className="text-7xl">{temp.toFixed()}°</div>
                <ul className={`${s.infoList} font-light w-3/12`}>
                    <li className="flex items-center justify-between">
                        {t('feelsLike')}:{' '}
                        <span>
                            {feels_like.toFixed()}
                            {unitsSymbol}
                        </span>
                    </li>
                    <li className="flex items-center justify-between">
                        {t('humidity')}: <span>{humidity.toFixed()}%</span>
                    </li>
                    <li className="flex items-center justify-between">
                        {t('wind')}:{' '}
                        <span>
                            {speed.toFixed()}
                            {t('km-h')}
                        </span>
                    </li>
                </ul>
            </div>
            <ul className="flex items-center gap-5 justify-center font-thin">
                <li className="flex items-center gap-1">
                    <UilSun />
                    {formatToLocalTime(sunrise, timezone, t('hh-mm'))}
                </li>
                <li className="flex items-center gap-1">
                    <UilSunset />
                    {formatToLocalTime(sunset, timezone, t('hh-mm'))}
                </li>
                <li className="flex items-center gap-1">
                    <UilArrowUp />
                    {temp_max.toFixed()}
                    {unitsSymbol}
                </li>
                <li className="flex items-center gap-1">
                    <UilArrowDown />
                    {temp_min.toFixed()}
                    {unitsSymbol}
                </li>
            </ul>
        </div>
    );
};

export default TemperatureAndDetails;
