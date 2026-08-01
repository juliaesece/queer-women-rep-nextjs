"use client";

import { useEffect, useState } from 'react';
import styles from './ScrollToTopButton.module.css';

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 1500);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            className={`${styles.scrollToTop} ${visible ? styles.visible : ''}`}
            aria-label="Scroll back to top"
        >
            Scroll to top ↑
        </button>
    );
}
