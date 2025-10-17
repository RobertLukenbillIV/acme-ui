import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ 
  images = [], 
  columns = 3, 
  showLightbox = true,
  className = '' 
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    if (showLightbox) {
      setSelectedImage(images[index]);
      setLightboxIndex(index);
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setLightboxIndex(0);
  };

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState('');

  const navigateLightbox = (direction) => {
    if (isTransitioning) return; // Prevent rapid clicking
    
    setIsTransitioning(true);
    setTransitionDirection(direction);
    
    setTimeout(() => {
      const newIndex = direction === 'next' 
        ? (lightboxIndex + 1) % images.length
        : (lightboxIndex - 1 + images.length) % images.length;
      
      setLightboxIndex(newIndex);
      setSelectedImage(images[newIndex]);
      
      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionDirection('');
      }, 150);
    }, 150);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigateLightbox('next');
    if (e.key === 'ArrowLeft') navigateLightbox('prev');
  };

  React.useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImage, lightboxIndex]);

  if (!images || images.length === 0) {
    return (
      <div className={`acme-image-gallery empty ${className}`}>
        <p>No images to display</p>
      </div>
    );
  }

  return (
    <>
      <div 
        className={`acme-image-gallery ${className}`}
        style={{ '--columns': columns }}
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            className="gallery-item"
            onClick={() => openLightbox(index)}
            role={showLightbox ? "button" : undefined}
            tabIndex={showLightbox ? 0 : undefined}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
              }
            }}
          >
            <img 
              src={image.thumbnail || image.src} 
              alt={image.alt || `Gallery image ${index + 1}`}
              className="gallery-thumbnail"
              loading="lazy"
            />
            {image.caption && (
              <div className="gallery-caption">
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && showLightbox && (
        <div className="acme-lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              ✕
            </button>
            
            {images.length > 1 && (
              <>
                <button 
                  className="lightbox-nav lightbox-prev"
                  onClick={() => navigateLightbox('prev')}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button 
                  className="lightbox-nav lightbox-next"
                  onClick={() => navigateLightbox('next')}
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}
            
            <div className="lightbox-image-container">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt || 'Lightbox image'}
                className={`lightbox-image ${isTransitioning ? `transitioning-${transitionDirection}` : ''}`}
              />
            </div>
            
            {selectedImage.caption && (
              <div className="lightbox-caption">
                {selectedImage.caption}
              </div>
            )}
            
            {images.length > 1 && (
              <div className="lightbox-counter">
                {lightboxIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;