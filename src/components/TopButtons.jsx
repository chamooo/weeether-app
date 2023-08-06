import React from 'react';

const TopButtons = ({ className, setQuery }) => {
    const cities = JSON.parse(localStorage.getItem('last_cities'));

    return (
        <ul className={`flex flex-row items-center justify-center space-x-7 ${className}`}>
            {cities?.map((city) => (
                <li key={city.id}>
                    <button
                        className="text-white uppercase cursor-pointer border-none"
                        onClick={(e) => setQuery({ q: city.title })}>
                        {city.title}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TopButtons;
