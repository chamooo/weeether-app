// import React from 'react';
import s from './styles.module.scss';
const ForecastCard = ({ temperature, day, unitsSymbol, icon }) => {
    return (
        <div className={`${s.card} flex flex-col items-center text-center gap-3 cursor-pointer`}>
            <span>
                {temperature}
                {unitsSymbol}
            </span>
            <img src={icon} alt="" />
            <span>{day}</span>
        </div>
    );
};

export default ForecastCard;
