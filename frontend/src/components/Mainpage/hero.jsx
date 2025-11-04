import React, { useState, useEffect } from 'react';
import './hero.css';

const products = [
    {
        id: 1,
        title: 'Advanced Diagnostic Kit',
        description: 'State-of-the-art diagnostic tools for accurate and fast results.',
        image: '../assets/images/rapid up.png', // Placeholder image
    },
    {
        id: 2,
        title: 'Precision Surgical Scalpels',
        description: 'Ergonomically designed for precision and control in surgical procedures.',
        image: '../assets/images/sarma balm.png', // Placeholder image
    },
    {
        id: 3,
        title: 'Digital Health Monitor',
        description: 'Monitor vital signs in real-time with our smart health monitor.',
        image: '../assets/images/hoha 20.png', // Placeholder image
    },
];

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
        }, 5000); // Change product every 5 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    return (
        <section className="hero-section">
            {products.map((product, index) => (
                <div
                    key={product.id}
                    className={`hero-slide ${index === activeIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${product.image})` }}
                >
                    <div className="hero-content">
                        <h1 className="hero-title">{product.title}</h1>
                        <p className="hero-description">{product.description}</p>
                        <button className="hero-button">Learn More</button>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Hero;