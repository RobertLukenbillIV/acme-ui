import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from '../src/components/Navigation';
import { TextInput, Select, Checkbox, TextArea } from '../src/components/Form';
import Card from '../src/components/Card';
import Footnote from '../src/components/Footnote';
import ImageGallery from '../src/components/ImageGallery';
import Hero from '../src/components/Hero';
import Forum from '../src/components/Forum';
import ThemeToggle from '../src/components/ThemeToggle';
import HomePage from './pages/HomePage.jsx';
import StaticHeroPage from './pages/StaticHeroPage.jsx';
import StickyHeroPage from './pages/StickyHeroPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ForumPage from './pages/ForumPage.jsx';
import FormsPage from './pages/FormsPage.jsx';
import AdvancedFormsPage from './pages/AdvancedFormsPage.jsx';
import UIComponentsPage from './pages/UIComponentsPage.jsx';
import PrimitivesPage from './pages/PrimitivesPage.jsx';
import NavigationPage from './pages/NavigationPage.jsx';
import TypographyPage from './pages/TypographyPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import { ThemeProvider, useTheme } from './theme.jsx';
import './demo.css';

const navigationLinks = [
  { 
    label: 'Home', 
    href: '/', 
    children: [
      { label: 'Overview', href: '/' },
      { label: 'Getting Started', href: '#getting-started' }
    ]
  },
  { 
    label: 'Components', 
    href: '#components',
    children: [
      { label: 'Primitives', href: '/primitives' },
      { label: 'Typography', href: '/typography' },
      { label: 'Authentication', href: '/auth' },
      { label: 'Forms', href: '/forms' },
      { label: 'UI Components', href: '/ui-components' },
      { label: 'Navigation', href: '/navigation' },
      { label: 'Community', href: '/forum' }
    ]
  },
  { 
    label: 'Layout', 
    href: '#layout',
    children: [
      { label: 'Hero Variants', href: '#heroes', children: [
        { label: 'Static Hero', href: '/static-hero' },
        { label: 'Sticky Hero', href: '/sticky-hero' }
      ]},
      { label: 'Navigation', href: '#navigation' },
      { label: 'Gallery Examples', href: '/gallery' }
    ]
  },
  { 
    label: 'Resources', 
    href: '#resources',
    children: [
      { label: 'Documentation', href: '#docs' },
      { label: 'API Reference', href: '#api' },
      { label: 'Examples', href: '#examples' },
      {
        label: 'Advanced',
        href: '#advanced',
        children: [
          { label: 'Custom Themes', href: '#themes' },
          { label: 'Accessibility', href: '#a11y' },
          { label: 'Performance', href: '#performance' }
        ]
      }
    ]
  }
];

const Demo = () => {

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' }
  ];

  // Sample data for new components
  const sampleImages = [
    { 
      src: 'https://picsum.photos/800/600?random=1', 
      thumbnail: 'https://picsum.photos/300/200?random=1',
      alt: 'Beautiful landscape',
      caption: 'A stunning mountain landscape at sunset'
    },
    { 
      src: 'https://picsum.photos/800/600?random=2', 
      thumbnail: 'https://picsum.photos/300/200?random=2',
      alt: 'City skyline',
      caption: 'Modern city skyline with glass buildings'
    },
    { 
      src: 'https://picsum.photos/800/600?random=3', 
      thumbnail: 'https://picsum.photos/300/200?random=3',
      alt: 'Nature scene',
      caption: 'Peaceful forest with morning mist'
    },
    { 
      src: 'https://picsum.photos/800/600?random=4', 
      thumbnail: 'https://picsum.photos/300/200?random=4',
      alt: 'Ocean view',
      caption: 'Crystal clear ocean with sandy beach'
    }
  ];

  const socialLinks = [
    { href: 'https://facebook.com/acme', label: 'Facebook', icon: '📘' },
    { href: 'https://twitter.com/acme', label: 'Twitter', icon: '🐦' },
    { href: 'https://linkedin.com/company/acme', label: 'LinkedIn', icon: '💼' },
    { href: 'https://instagram.com/acme', label: 'Instagram', icon: '📸' }
  ];

  const pageLinks = [
    { href: '#privacy', label: 'Privacy Policy' },
    { href: '#terms', label: 'Terms of Service' },
    { href: '#about', label: 'About Us' },
    { href: '#contact', label: 'Contact' },
    { href: '#help', label: 'Help Center' },
    { href: '#careers', label: 'Careers' }
  ];

  const sampleUser = {
    name: 'Alice Johnson',
    avatar: 'https://picsum.photos/100/100?random=person1',
    role: 'Moderator',
    isOnline: true
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleForumAction = (action) => {
    console.log(`Forum action: ${action}`);
  };

  return null; // This component is not used anymore
};

function AppContent() {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/example/acme-ui' },
    { label: 'Twitter', href: 'https://twitter.com/acme-ui' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/acme-ui' }
  ];

  const pageLinks = [
    { label: 'Documentation', href: '/docs' },
    { label: 'Support', href: '/support' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' }
  ];

  return (
    <div className="app">
      {/* Left Sidebar Navigation - Always visible on all pages */}
      <Navigation 
        companyName="Acme UI" 
        links={navigationLinks}
        position="left"
        variant="sidebar"
      />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/primitives" element={<PrimitivesPage />} />
          <Route path="/typography" element={<TypographyPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/static-hero" element={<StaticHeroPage />} />
          <Route path="/sticky-hero" element={<StickyHeroPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/advanced-forms" element={<AdvancedFormsPage />} />
          <Route path="/navigation" element={<NavigationPage />} />
          <Route path="/typography" element={<TypographyPage />} />
          <Route path="/ui-components" element={<UIComponentsPage />} />
        </Routes>
      </main>
      
      <Footnote 
        variant="footer"
        content={
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{ 
              margin: '0 0 1rem 0', 
              fontSize: '1.5rem',
              color: 'inherit' // Use footnote's inherited color
            }}>
              Acme UI Components
            </h3>
            <p style={{ 
              margin: '0 0 1.5rem 0', 
              fontSize: '1rem', 
              color: isDarkMode ? '#b0b0b0' : '#bdc3c7', // Original secondary text colors
              lineHeight: '1.6'
            }}>
              Built with React for modern web applications. Open source and customizable.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ThemeToggle
                variant="button"
                size="medium"
                showLabel={true}
                onChange={(theme, effectiveTheme) => {
                  if (effectiveTheme === 'dark' && !isDarkMode) {
                    toggleTheme();
                  } else if (effectiveTheme === 'light' && isDarkMode) {
                    toggleTheme();
                  }
                }}
                defaultTheme={isDarkMode ? 'dark' : 'light'}
                storageKey="darkMode"
              />
            </div>
          </div>
        }
        socialLinks={[
          { label: 'GitHub', href: 'https://github.com/example/acme-ui' },
          { label: 'Twitter', href: 'https://twitter.com/acme-ui' },
          { label: 'LinkedIn', href: 'https://linkedin.com/company/acme-ui' }
        ]}
        pageLinks={[
          { label: 'Documentation', href: '/docs' },
          { label: 'Support', href: '/support' },
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' }
        ]}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

// Bootstrap the application
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
