import { UilLocationPoint } from '@iconscout/react-unicons';
import { UilSearch } from '@iconscout/react-unicons';
import { useState } from 'react';
import s from './styles.module.scss';

const TopActions = ({ className, setIsModalOpened, setQuery, setUnits }) => {
    const [isFahr, setIsFahr] = useState(false);

    const handleMeasure = () => {
        setIsFahr((prev) => !prev);
        setUnits(!isFahr ? 'imperial' : 'metric');
    };

    const handleLcationClick = () => {
        if (navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let lat = position.coords.latitude;
                    let lon = position.coords.longitude;

                    setQuery({ lat, lon });
                },
                (error) => {
                    alert('Error fetching location:', error);
                },
            );
        }
    };

    return (
        <div
            className={`flex flex-row space-x-1 text-white items-center justify-center ui-wrapper ${className}`}>
            <button className={s.topActionBtn} onClick={() => setIsModalOpened(true)}>
                <UilSearch size="28" />
            </button>
            <button className={s.topActionBtn}>
                <UilLocationPoint size="28" color="#fff" onClick={handleLcationClick} />
            </button>
            <div
                className={`${s.measures} ${
                    s.topActionBtn
                } flex flex-col items-center overflow-hidden text-2xl leading-7 font-thin ${
                    isFahr ? s.fahrenheit : ''
                }`}
                onClick={() => handleMeasure()}>
                <button>℃</button>
                <button>℉</button>
            </div>
        </div>
    );
};

export default TopActions;
