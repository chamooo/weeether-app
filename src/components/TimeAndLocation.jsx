import React from 'react';
import { UilClock } from '@iconscout/react-unicons';
import { UilCalender } from '@iconscout/react-unicons';
import { formatToLocalTime } from '../services/weatherService';

const TimeAndLocation = ({ weather: { dt, timezone, name, country } }) => {
    return (
        <div className="mb-9">
            <h2 className="text-white text-4xl font-bold uppercase mb-1 max-w-xs">
                {name}, {country}
            </h2>
            <span className="font-thin">{formatToLocalTime(dt, timezone)}</span>
        </div>
    );
};

export default TimeAndLocation;
