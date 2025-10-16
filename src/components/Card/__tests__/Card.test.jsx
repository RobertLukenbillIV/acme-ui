import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
  test('renders card with title and children', () => {
    render(
      <Card title="Test Card">
        <p>Test content</p>
      </Card>
    );
    
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('renders card without title', () => {
    render(
      <Card>
        <p>Content without title</p>
      </Card>
    );
    
    expect(screen.getByText('Content without title')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  test('renders card with footer', () => {
    const footer = <button>Action Button</button>;
    
    render(
      <Card title="Card with Footer" footer={footer}>
        <p>Card content</p>
      </Card>
    );
    
    expect(screen.getByText('Card with Footer')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        <p>Test content</p>
      </Card>
    );
    
    expect(container.firstChild).toHaveClass('acme-card');
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('renders empty card', () => {
    render(<Card />);
    
    // Should render the card container even if empty
    expect(document.querySelector('.acme-card')).toBeInTheDocument();
  });
});