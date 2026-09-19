import './Modal.css'
import { useEffect } from 'react';

export const Modal = ({ images, closeModal }) => {
    const handlebackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [])

    const handleEscape = (event) => {
        if (event.code === 'Escape') {
            closeModal();
        }
    }

    return <div className="backdrop" onClick={handlebackdropClick}>
        <div className="modal">
            <img src={images} alt="#" />
        </div>
    </div>
}