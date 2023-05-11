import { useEffect } from 'react';
import './InfoToolTip.css';

export default function InfoToolTip({ onClose, status: { isOpen, successful, text } }) {
    function handleClickOverlay(e) {
        e.stopPropagation();
    }

    useEffect(() => {
        if (isOpen) {
            const onEscClose = e => {
                if (e.key === 'Escape') {
                    onClose();
                    document.removeEventListener('keyup', onEscClose)
                }
            }

            document.addEventListener('keyup', onEscClose);
            
        }
    }, [isOpen])

    const checkText = (text) => {
        if (text === 'Ошибка: 409') return 'Пользователь с данной почтой уже зарегистрирован';
        if (text === 'Ошибка: 401') return 'Неправильная почта или пароль';
        return text;
    }

    return (
        <div
            className={`info-tooltip ${isOpen && 'info-tooltip_opened'}`}
            onClick={onClose}
        >
            <div className="info-tooltip__container" onClick={handleClickOverlay}>
                <div
                    className={`info-tooltip__status ${successful
                        ? 'info-tooltip__status_success'
                        : 'info-tooltip__status_fail'
                        }`}
                ></div>
                <h2 className="info-tooltip__title">{checkText(text)}</h2>
                <button
                    type="button"
                    className="info-tooltip__close-button"
                    onClick={onClose}
                ></button>
            </div>
        </div>
    );
}