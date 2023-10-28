import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './modal.module.scss';
import ReactDOM from 'react-dom';
import { fixWindow } from '../../utils/fixWindow';

interface ModalProps {
    children: ReactNode,
    closeFunc?: () => void
}

export default function Modal({ children, closeFunc }: ModalProps) {
    const node = document.getElementById('modal_root');
    if (!node) return null;

    const [isActive, setActive] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            fixWindow(true);
            setActive(true);
        }, 100);
    }, []);

    function onClose() {
        fixWindow(false);
        setActive(false);
        setTimeout(() => {
            if (!closeFunc) return;
            closeFunc()
        }, 300);
    }

    return ReactDOM.createPortal((
        <div className={styles.wrapper + (isActive ? ' ' + styles.active : '')} ref={modalRef}>
            <div className={styles.shadow} onClick={onClose}></div>
            <div className={styles.close} onClick={onClose}>
                <span></span>
                <span></span>
            </div>
            <div className={styles.outer}>
                <div className={styles.inner}>
                    {children}
                </div>
            </div>
        </div>
    ), node);
}