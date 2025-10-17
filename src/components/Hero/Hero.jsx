import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = ({ 
  backgroundImage,
  title,
  subtitle,
  children,
  variant = 'static', // 'static' or 'scroll-responsive'
  height = '100vh',
  overlay = true,
  overlayOpacity = 0.4,
  className = ''
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (variant === 'scroll-responsive') {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);
        
        // Determine if user has scrolled away from hero
        const heroHeight = window.innerHeight;
        setIsScrolled(currentScrollY > heroHeight * 0.3);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [variant]);

  const heroStyle = {
    '--hero-height': height,
    '--overlay-opacity': overlayOpacity,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
  };

  if (variant === 'scroll-responsive') {
    heroStyle.transform = `translateY(${scrollY * 0.5}px)`;
  }

  const heroClass = `acme-hero ${variant} ${isScrolled ? 'scrolled' : ''} ${className}`;

  return (
    <section 
      className={heroClass}
      style={heroStyle}
    >
      {overlay && <div className="hero-overlay" />}
      
      <div className="hero-content">
        {title && <h1 className="hero-title">{title}</h1>}
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        {children && <div className="hero-children">{children}</div>}
      </div>
      
      {variant === 'scroll-responsive' && (
        <div className="scroll-indicator">
          <span className="scroll-arrow">↓</span>
          <span className="scroll-text">Scroll to explore</span>
        </div>
      )}
    </section>
  );
};

export default Hero;