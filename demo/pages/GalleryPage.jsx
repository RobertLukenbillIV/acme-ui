import React from 'react';
import Card from '../../src/components/Card';
import ImageGallery from '../../src/components/ImageGallery';
import Hero from '../../src/components/Hero';

const GalleryPage = () => {
  const galleryImages = [
    { 
      src: 'https://picsum.photos/800/600?random=1', 
      thumbnail: 'https://picsum.photos/300/200?random=1',
      alt: 'Beautiful landscape',
      caption: 'A stunning mountain landscape at sunset with vibrant colors painting the sky'
    },
    { 
      src: 'https://picsum.photos/800/600?random=2', 
      thumbnail: 'https://picsum.photos/300/200?random=2',
      alt: 'City skyline',
      caption: 'Modern city skyline with glass buildings reflecting the golden hour light'
    },
    { 
      src: 'https://picsum.photos/800/600?random=3', 
      thumbnail: 'https://picsum.photos/300/200?random=3',
      alt: 'Nature scene',
      caption: 'Peaceful forest with morning mist creating an ethereal atmosphere'
    },
    { 
      src: 'https://picsum.photos/800/600?random=4', 
      thumbnail: 'https://picsum.photos/300/200?random=4',
      alt: 'Ocean view',
      caption: 'Crystal clear ocean with sandy beach and tropical palm trees'
    },
    { 
      src: 'https://picsum.photos/800/600?random=5', 
      thumbnail: 'https://picsum.photos/300/200?random=5',
      alt: 'Mountain range',
      caption: 'Majestic mountain range with snow-capped peaks under a clear blue sky'
    },
    { 
      src: 'https://picsum.photos/800/600?random=6', 
      thumbnail: 'https://picsum.photos/300/200?random=6',
      alt: 'Urban architecture',
      caption: 'Contemporary urban architecture showcasing innovative design patterns'
    },
    { 
      src: 'https://picsum.photos/800/600?random=7', 
      thumbnail: 'https://picsum.photos/300/200?random=7',
      alt: 'Desert landscape',
      caption: 'Vast desert landscape with rolling sand dunes and dramatic shadows'
    },
    { 
      src: 'https://picsum.photos/800/600?random=8', 
      thumbnail: 'https://picsum.photos/300/200?random=8',
      alt: 'Autumn forest',
      caption: 'Autumn forest with golden and red leaves creating a magical canopy'
    }
  ];

  return (
    <>
      <Hero 
        backgroundImage="https://picsum.photos/1920/600?random=gallery"
        title="Image Gallery Showcase"
        subtitle="Explore our advanced gallery component with lightbox and smooth animations"
        variant="static"
        height="50vh"
      >
        <p style={{ 
          fontSize: '1.1rem', 
          marginTop: '1rem',
          maxWidth: '600px',
          textAlign: 'center'
        }}>
          Click on any image to open the interactive lightbox with fluid navigation transitions
        </p>
      </Hero>
      
      <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <section style={{ marginBottom: '4rem' }}>
          <Card title="Gallery Features">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <h4>✨ Smooth Animations</h4>
                <p>Fluid transitions when navigating between images in lightbox mode</p>
              </div>
              <div>
                <h4>🖼️ Responsive Layout</h4>
                <p>Automatically adjusts columns based on screen size and content</p>
              </div>
              <div>
                <h4>🔍 Interactive Lightbox</h4>
                <p>Full-screen viewing experience with keyboard navigation support</p>
              </div>
              <div>
                <h4>📱 Touch Friendly</h4>
                <p>Optimized for mobile devices with touch gestures</p>
              </div>
            </div>
            
            <h4>Usage Example:</h4>
            <pre className="code-block">
{`<ImageGallery 
  images={[
    { 
      src: '/full-image.jpg',
      thumbnail: '/thumb.jpg',
      alt: 'Description',
      caption: 'Image caption'
    }
  ]}
  columns={3}
  showLightbox={true}
/>`}
            </pre>
          </Card>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>3-Column Gallery</h2>
          <Card>
            <ImageGallery 
              images={galleryImages}
              columns={3}
              showLightbox={true}
            />
          </Card>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>2-Column Gallery</h2>
          <Card>
            <ImageGallery 
              images={galleryImages.slice(0, 4)}
              columns={2}
              showLightbox={true}
            />
          </Card>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Single Column Gallery</h2>
          <Card>
            <ImageGallery 
              images={galleryImages.slice(0, 3)}
              columns={1}
              showLightbox={true}
            />
          </Card>
        </section>

        <section>
          <Card title="Gallery Properties">
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color, #ddd)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Property</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Type</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Default</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                    <td style={{ padding: '0.75rem' }}><code>images</code></td>
                    <td style={{ padding: '0.75rem' }}>Array</td>
                    <td style={{ padding: '0.75rem' }}>[]</td>
                    <td style={{ padding: '0.75rem' }}>Array of image objects with src, thumbnail, alt, and caption</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                    <td style={{ padding: '0.75rem' }}><code>columns</code></td>
                    <td style={{ padding: '0.75rem' }}>Number</td>
                    <td style={{ padding: '0.75rem' }}>3</td>
                    <td style={{ padding: '0.75rem' }}>Number of columns in the gallery grid</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                    <td style={{ padding: '0.75rem' }}><code>showLightbox</code></td>
                    <td style={{ padding: '0.75rem' }}>Boolean</td>
                    <td style={{ padding: '0.75rem' }}>true</td>
                    <td style={{ padding: '0.75rem' }}>Enable/disable lightbox functionality</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color, #eee)' }}>
                    <td style={{ padding: '0.75rem' }}><code>onImageClick</code></td>
                    <td style={{ padding: '0.75rem' }}>Function</td>
                    <td style={{ padding: '0.75rem' }}>-</td>
                    <td style={{ padding: '0.75rem' }}>Callback when image is clicked</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </div>
    </>
  );
};

export default GalleryPage;