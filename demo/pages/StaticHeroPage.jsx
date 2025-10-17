import React from 'react';
import Hero from '../../src/components/Hero';
import Card from '../../src/components/Card';

const StaticHeroPage = () => {
  return (
    <>
      <Hero 
        backgroundImage="https://picsum.photos/1920/1080?random=static"
        title="Static Hero Demo"
        subtitle="This hero remains in place and doesn't respond to scroll events"
        variant="static"
        height="80vh"
      >
        <button className="demo-button primary" style={{ marginTop: '1rem' }}>
          Explore Static Hero
        </button>
      </Hero>
      
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Card title="Static Hero Component">
          <p>This page demonstrates the static hero variant. Key characteristics:</p>
          <ul>
            <li><strong>Fixed Position:</strong> The hero stays in its original position</li>
            <li><strong>No Scroll Effects:</strong> Content scrolls normally over it</li>
            <li><strong>Traditional Behavior:</strong> Standard website hero section</li>
            <li><strong>Performance:</strong> No scroll listeners or animations</li>
          </ul>
          <p>Scroll down to see how content flows naturally below the hero section.</p>
        </Card>

        <Card title="Use Cases">
          <p>Static heroes are perfect for:</p>
          <ul>
            <li>Landing pages with clear call-to-action</li>
            <li>Traditional website layouts</li>
            <li>When you want content to flow naturally</li>
            <li>Mobile-first designs</li>
          </ul>
        </Card>

        <Card title="Implementation">
          <pre className="code-block">
{`<Hero 
  backgroundImage="/your-image.jpg"
  title="Your Title"
  subtitle="Your subtitle"
  variant="static"
  height="80vh"
>
  <button>Call to Action</button>
</Hero>`}
          </pre>
        </Card>

        {/* Add some content to make the page scrollable */}
        {Array.from({ length: 10 }, (_, i) => (
          <Card key={i} title={`Content Section ${i + 1}`}>
            <p>This is additional content to demonstrate scrolling behavior with the static hero. 
               The hero remains in its position while this content scrolls normally.</p>
          </Card>
        ))}
      </div>
    </>
  );
};

export default StaticHeroPage;