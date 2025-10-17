import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Navigation from '../src/components/Navigation';
import { TextInput, Select, Checkbox, TextArea } from '../src/components/Form';
import Card from '../src/components/Card';
import Footnote from '../src/components/Footnote';
import ImageGallery from '../src/components/ImageGallery';
import Hero from '../src/components/Hero';
import Forum from '../src/components/Forum';
import './demo.css';

const Demo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    message: '',
    newsletter: false
  });

  const navigationLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Products', href: '#products' },
    { label: 'Services', href: '#services' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

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

  return (
    <>
      {/* Hero Section - Full width at top */}
      <Hero 
        backgroundImage="https://picsum.photos/1920/1080?random=hero"
        title="Acme UI Components Library"
        subtitle="Beautiful, reusable React components for modern web applications"
        variant="static"
        height="70vh"
      >
        <button className="demo-button primary" style={{ marginTop: '1rem' }}>
          Get Started
        </button>
      </Hero>
      
      <div className="demo-container">
        <Navigation companyName="Acme Corp" links={navigationLinks} />
        
        <div className="demo-content">
        <header className="demo-header">
          <h1>Component Showcase</h1>
          <p>Explore our comprehensive collection of UI components</p>
        </header>

        <section className="demo-section">
          <h2>Navigation Component</h2>
          <p>Click the 3-line menu button on the left to expand/collapse the navigation bar.</p>
        </section>

        <section className="demo-section">
          <h2>Hero Component</h2>
          <Card title="Hero Variants">
            <p>The hero component above demonstrates a static hero with background image and overlay.</p>
            <p>Available variants:</p>
            <ul>
              <li><strong>Static:</strong> Fixed hero section</li>
              <li><strong>Scroll-responsive:</strong> Hero that transforms on scroll (halves in size)</li>
            </ul>
          </Card>
        </section>

        <section className="demo-section">
          <h2>Image Gallery Component</h2>
          <Card title="Photo Gallery">
            <p>Click on any image to open the lightbox view with navigation controls.</p>
            <ImageGallery 
              images={sampleImages}
              columns={2}
              showLightbox={true}
            />
          </Card>
        </section>

        <section className="demo-section">
          <h2>Forum Component</h2>
          <Card title="Message Thread">
            <p>Interactive forum messages with user profiles and action buttons.</p>
            <Forum 
              user={sampleUser}
              message="Welcome to the Acme UI Components Library! This forum component demonstrates how to display user messages with profile information and interactive action buttons. Feel free to explore all the features."
              timestamp={new Date(Date.now() - 1000 * 60 * 30)} // 30 minutes ago
              onReact={() => handleForumAction('react')}
              onReply={() => handleForumAction('reply')}
              onForward={() => handleForumAction('forward')}
              onReport={() => handleForumAction('report')}
              reactions={[
                { emoji: '👍', count: 5 },
                { emoji: '❤️', count: 2 },
                { emoji: '🎉', count: 1 }
              ]}
            />
            
            <Forum 
              user={{
                name: 'Bob Smith',
                avatar: 'https://picsum.photos/100/100?random=person2',
                role: 'User',
                isOnline: false
              }}
              message="Thanks for sharing this component library! The documentation is very helpful and the components look great."
              timestamp={new Date(Date.now() - 1000 * 60 * 15)} // 15 minutes ago
              onReact={() => handleForumAction('react')}
              onReply={() => handleForumAction('reply')}
              onForward={() => handleForumAction('forward')}
              onReport={() => handleForumAction('report')}
              reactions={[
                { emoji: '👍', count: 3 },
                { emoji: '💯', count: 1 }
              ]}
            />
          </Card>
        </section>

        <section className="demo-section">
          <h2>Card Component</h2>
          <div className="card-grid">
            <Card title="Welcome Card">
              <p>This is a basic card component with a title and content.</p>
              <p>Cards are great for organizing content in a clean, contained format.</p>
            </Card>

            <Card 
              title="Card with Footer" 
              footer={<button className="demo-button">Action Button</button>}
            >
              <p>This card includes a footer section for actions or additional information.</p>
            </Card>

            <Card>
              <p>This is a card without a title, showing the flexible nature of the component.</p>
            </Card>
          </div>
        </section>

        <section className="demo-section">
          <h2>Form Components</h2>
          <Card title="Sample Form">
            <TextInput
              label="Full Name"
              value={formData.name}
              onChange={handleInputChange('name')}
              placeholder="Enter your name"
              required
            />

            <TextInput
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              placeholder="your.email@example.com"
              required
            />

            <Select
              label="Country"
              value={formData.country}
              onChange={handleInputChange('country')}
              options={countryOptions}
              required
            />

            <TextArea
              label="Message"
              value={formData.message}
              onChange={handleInputChange('message')}
              placeholder="Enter your message here..."
              rows={5}
            />

            <Checkbox
              label="Subscribe to newsletter"
              checked={formData.newsletter}
              onChange={handleInputChange('newsletter')}
            />

            <button className="demo-button primary">Submit Form</button>
          </Card>
        </section>

        <section className="demo-section">
          <h2>Footnote Component</h2>
          <Card title="Footnote Variants">
            <p>The footnote component can be used as a full-width footer or as a contained card.</p>
            
            <h4>Card Variant Example:</h4>
            <Footnote 
              variant="card"
              content={
                <div>
                  <h4>Card Footnote</h4>
                  <p>This is a footnote displayed as a card component.</p>
                </div>
              }
              socialLinks={socialLinks.slice(0, 2)}
              pageLinks={pageLinks.slice(0, 3)}
            />
            
            <p><strong>Footer Variant:</strong> The full-width footer is displayed at the bottom of the page.</p>
          </Card>
        </section>

        <section className="demo-section">
          <h2>Usage</h2>
          <Card title="How to Use">
            <p>Import components from the acme-ui package:</p>
            <pre className="code-block">
{`import { 
  Navigation, Card, TextInput, Select, Checkbox, TextArea,
  Footnote, ImageGallery, Hero, Forum 
} from 'acme-ui';

// Use the Navigation component
<Navigation 
  companyName="Your Company" 
  links={[
    { label: 'Home', href: '/home' },
    { label: 'About', href: '/about' }
  ]} 
/>

// Use Hero component
<Hero 
  backgroundImage="/hero-bg.jpg"
  title="Welcome"
  subtitle="Your amazing website"
  variant="scroll-responsive"
/>

// Use Image Gallery
<ImageGallery 
  images={galleryImages}
  columns={3}
  showLightbox={true}
/>

// Use Forum component
<Forum 
  user={userObj}
  message="Hello world!"
  onReact={handleReact}
  onReply={handleReply}
/>`}
            </pre>
          </Card>
        </section>
        </div>
      </div>
      
      {/* Footer - Full width at bottom */}
      <Footnote 
        variant="footer"
        content={
          <div>
            <h3>Acme UI Components</h3>
            <p>Built with React for modern web applications. Open source and customizable.</p>
          </div>
        }
        socialLinks={socialLinks}
        pageLinks={pageLinks}
      />
    </>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Demo />);
