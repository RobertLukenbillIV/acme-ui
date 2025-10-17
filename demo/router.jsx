import React, { useState } from 'react';

// Simple routing context for demo purposes
export const RouterContext = React.createContext();

export const Router = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => {
    setCurrentPage(page);
    // Update URL hash for better UX
    window.location.hash = page;
  };

  // Listen to hash changes for back/forward navigation
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentPage(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Set initial page from hash
    const initialHash = window.location.hash.slice(1) || 'home';
    setCurrentPage(initialHash);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <RouterContext.Provider value={{ currentPage, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = React.useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a Router');
  }
  return context;
};