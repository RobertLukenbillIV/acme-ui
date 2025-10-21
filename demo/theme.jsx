import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved preference or default to light mode
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      try {
        // Try to parse as JSON first (for boolean values)
        const parsed = JSON.parse(savedMode);
        if (typeof parsed === 'boolean') {
          setIsDarkMode(parsed);
        } else {
          // Handle string values like "dark" or "light"
          setIsDarkMode(savedMode === 'dark');
        }
      } catch (error) {
        // Handle string values or invalid JSON
        setIsDarkMode(savedMode === 'dark' || savedMode === 'true');
      }
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    
    // Save preference
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};