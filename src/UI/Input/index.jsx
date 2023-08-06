import React, { useEffect, useRef, useState } from 'react';
import s from './styles.module.scss';
import { UilSearch } from '@iconscout/react-unicons';
import { generateUniqueID } from '../../services/generateUniqueValue';
const Input = ({ isModalOpened, setQuery, weatherCity }) => {
    const input = useRef(null);
    const [city, setCity] = useState('');

    const defaultCities = [
        { id: 1, title: 'kyiv' },
        { id: 2, title: 'toronto' },
        { id: 3, title: 'tokyo' },
        { id: 4, title: 'london' },
        { id: 5, title: 'paris' },
    ];


    if (!localStorage.getItem('last_cities')) {
        localStorage.setItem('last_cities', JSON.stringify(defaultCities));
    }

    useEffect(() => {
        input.current.focus();
    }, [isModalOpened]);

    const handleEnter = (e) => {
        if (city && e.key === 'Enter') {
            setQuery({ q: city });

            const lastCities = JSON.parse(localStorage.getItem('last_cities'));

            if (!lastCities.some((item) => item.title.toLowerCase() === city.toLowerCase())) {
                lastCities.pop();
                lastCities.unshift({ id: generateUniqueID(), title: city });
                localStorage.setItem('last_cities', JSON.stringify(lastCities));
            } else {
                lastCities.forEach((item, index) => {
                    if (item.title.toLowerCase() === city.toLowerCase() && index !== 0) {
                        lastCities.splice(index, 1);
                        lastCities.unshift(item);
                        localStorage.setItem('last_cities', JSON.stringify(lastCities));
                    }
                });
            }
            setCity('');
        }
    };

    return (
        <div className={s.inputSolid}>
            <button>
                <UilSearch color="white" />
            </button>
            <input
                ref={input}
                type="text"
                className={s.input}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => handleEnter(e)}
            />
        </div>
    );
};

export default Input;
