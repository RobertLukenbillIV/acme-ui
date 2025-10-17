import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = ({ 
  backgroundImage,
  title,
  subtitle,
  children,
  variant = 'static', // 'static', 'scroll-responsive', or 'sticky-third'
  height = '100vh',
  overlay = true,
  overlayOpacity = 0.4,
  className = ''
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (variant === 'scroll-responsive' || variant === 'sticky-third') {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);
        
        // Determine if user has scrolled away from hero
        const heroHeight = window.innerHeight;
        const scrollThreshold = heroHeight * 0.7; // When hero would be cut off
        
        setIsScrolled(currentScrollY > heroHeight * 0.3);
        
        if (variant === 'sticky-third') {
          setIsSticky(currentScrollY > scrollThreshold);
        }
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

  if (variant === 'scroll-responsive' && !isSticky) {
    heroStyle.transform = `translateY(${scrollY * 0.5}px)`;
  }

  const heroClass = `acme-hero ${variant} ${isScrolled ? 'scrolled' : ''} ${isSticky ? 'sticky' : ''} ${className}`;

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