import React, { useEffect } from 'react';

const ToastNotification = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`toast ${type}`}>
            <p>{message}</p>
        </div>
    );
};

export default ToastNotification;