import React from 'react';
import s from './styles.module.scss';

const SearchModal = ({ isModalOpened, setIsModalOpened, children }) => {
    const handleKey = (e) => {
        if (e.key === 'Enter') {
            setIsModalOpened(false);
        }
    };
    return (
        <div
            className={`${s.modalOverlay} ${isModalOpened ? s.active : ''}`}
            onClick={() => setIsModalOpened(false)}
            onKeyDown={(e) => handleKey(e)}>
            <div className={s.modalContent} onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default SearchModal;
