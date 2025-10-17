import React from 'react';
import Hero from '../../src/components/Hero';
import Card from '../../src/components/Card';

const StickyHeroPage = () => {
  return (
    <>
      <Hero 
        backgroundImage="https://picsum.photos/1920/1080?random=sticky"
        title="Sticky Third Hero Demo"
        subtitle="Scroll down to see the hero become sticky at one-third height"
        variant="sticky-third"
        height="100vh"
      >
        <button className="demo-button primary" style={{ marginTop: '1rem' }}>
          Scroll to See Magic
        </button>
      </Hero>
      
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Card title="Sticky Third Hero Component">
          <p><strong>Scroll up and down to see the effect!</strong></p>
          <p>This page demonstrates the sticky-third hero variant. Key behavior:</p>
          <ul>
            <li><strong>Initial State:</strong> Full-height hero (100vh)</li>
            <li><strong>Scroll Detection:</strong> Monitors when hero would be cut off</li>
            <li><strong>Sticky Transformation:</strong> Becomes fixed at 1/3 height when scrolling</li>
            <li><strong>Smooth Transition:</strong> Animated transformation with CSS transitions</li>
            <li><strong>Background Positioning:</strong> Shows top portion of image when sticky</li>
          </ul>
        </Card>

        <Card title="Technical Details">
          <p>The sticky behavior is triggered when:</p>
          <ul>
            <li>User scrolls past 70% of the hero height</li>
            <li>Hero transforms to fixed position with 33vh height</li>
            <li>Content becomes slightly transparent and scaled</li>
            <li>Background position adjusts to show the top portion</li>
          </ul>
        </Card>

        <Card title="Implementation">
          <pre className="code-block">
{`<Hero 
  backgroundImage="/your-image.jpg"
  title="Your Title"
  subtitle="Your subtitle"
  variant="sticky-third"
  height="100vh"
>
  <button>Call to Action</button>
</Hero>`}
          </pre>
        </Card>

        {/* Add substantial content to make scrolling meaningful */}
        {Array.from({ length: 15 }, (_, i) => (
          <Card key={i} title={`Scroll Section ${i + 1}`}>
            <p>Keep scrolling to see how the hero behaves! When you scroll back up, 
               the hero will return to its full size. This creates an engaging 
               parallax-like effect while maintaining the hero presence.</p>
            <p>The hero image shows the top portion when sticky, making it perfect 
               for images with important content in the upper area like faces, 
               logos, or key visual elements.</p>
            {i === 7 && (
              <div style={{ backgroundColor: '#e3f2fd', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                <strong>💡 Tip:</strong> Try scrolling quickly up and down to see the smooth transitions!
              </div>
            )}
          </Card>
        ))}
      </div>
    </>
  );
};

export default StickyHeroPage;