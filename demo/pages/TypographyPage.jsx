import React, { useState } from 'react';
import Heading from '../../src/components/Heading';
import Text from '../../src/components/Text';
import Link from '../../src/components/Link';
import Lists, { UnorderedList, OrderedList, ListItem, DescriptionList, DescriptionTerm, DescriptionDetail } from '../../src/components/Lists';
import Code, { InlineCode, CodeBlock, KeyboardShortcut } from '../../src/components/Code';
import Card from '../../src/components/Card';
import Button from '../../src/components/Button';

const TypographyPage = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <Heading level={1}>Typography & Design Tokens</Heading>
        <Button onClick={toggleTheme} variant="secondary">
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Theme
        </Button>
      </div>
      
      <Text size="lg" color="secondary" style={{ marginBottom: '3rem' }}>
        Explore Acme UI's comprehensive typography system and design tokens that provide consistent styling across all components.
      </Text>

      <div style={{ display: 'grid', gap: '2rem' }}>

        <Card title="Design Tokens Overview">
          <Text variant="body">
            Acme UI uses CSS custom properties (design tokens) to maintain consistency across the entire design system. 
            These tokens cover colors, typography, spacing, shadows, and more.
          </Text>
          
          <Heading level={3} style={{ marginTop: '2rem' }}>Token Categories:</Heading>
          <UnorderedList marker="check">
            <ListItem><strong>Colors:</strong> Primary, secondary, semantic colors with light/dark theme support</ListItem>
            <ListItem><strong>Typography:</strong> Font families, sizes, weights, line heights, and letter spacing</ListItem>
            <ListItem><strong>Spacing:</strong> Consistent spacing scale based on 4px grid system</ListItem>
            <ListItem><strong>Layout:</strong> Border radius, shadows, z-index, and container widths</ListItem>
            <ListItem><strong>Transitions:</strong> Animation timings and easing functions</ListItem>
          </UnorderedList>

          <CodeBlock
            language="css"
            title="Example Token Usage"
            copyable={true}
          >{`/* Using design tokens in your CSS */
.my-component {
  color: var(--acme-color-text-primary);
  background: var(--acme-color-background-elevated);
  padding: var(--acme-space-4) var(--acme-space-6);
  border-radius: var(--acme-radius-lg);
  box-shadow: var(--acme-elevation-2);
  font-size: var(--acme-text-base);
  transition: var(--acme-transition-fast);
}`}</CodeBlock>
        </Card>

        <Card title="Heading Components">
          <Text variant="body">
            Semantic heading components with consistent typography scale and responsive behavior.
          </Text>
          
          <div style={{ marginTop: '2rem', display: 'grid', gap: '1.5rem' }}>
            <div>
              <Heading level={1}>Heading Level 1</Heading>
              <Text variant="caption" color="secondary">
                <InlineCode>level={1}</InlineCode> • Best for page titles
              </Text>
            </div>
            
            <div>
              <Heading level={2}>Heading Level 2</Heading>
              <Text variant="caption" color="secondary">
                <InlineCode>level={2}</InlineCode> • Section headings
              </Text>
            </div>
            
            <div>
              <Heading level={3}>Heading Level 3</Heading>
              <Text variant="caption" color="secondary">
                <InlineCode>level={3}</InlineCode> • Subsection headings
              </Text>
            </div>
            
            <div>
              <Heading level={4}>Heading Level 4</Heading>
              <Text variant="caption" color="secondary">
                <InlineCode>level={4}</InlineCode> • Component titles
              </Text>
            </div>
            
            <div>
              <Heading level={5}>Heading Level 5</Heading>
              <Text variant="caption" color="secondary">
                <InlineCode>level={5}</InlineCode> • Small section headers
              </Text>
            </div>
            
            <div>
              <Heading level={6}>Heading Level 6</Heading>
              <Text variant="caption" color="secondary">
                <InlineCode>level={6}</InlineCode> • Minor headings
              </Text>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <Heading level={3}>Color Variants</Heading>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
              <Heading level={4} color="primary">Primary Color Heading</Heading>
              <Heading level={4} color="secondary">Secondary Color Heading</Heading>
              <Heading level={4} color="success">Success Color Heading</Heading>
              <Heading level={4} color="warning">Warning Color Heading</Heading>
              <Heading level={4} color="error">Error Color Heading</Heading>
            </div>
          </div>

          <CodeBlock
            language="jsx"
            title="Heading Usage Examples"
            style={{ marginTop: '2rem' }}
          >{`<Heading level={1}>Page Title</Heading>
<Heading level={2} color="primary">Section Heading</Heading>
<Heading level={3} visualLevel={2}>Large Visual but H3 Semantic</Heading>
<Heading level={4} className="gradient-text">Gradient Heading</Heading>`}</CodeBlock>
        </Card>

        <Card title="Text Components">
          <Text variant="body">
            Flexible text components with multiple sizes, variants, and semantic options.
          </Text>

          <div style={{ marginTop: '2rem', display: 'grid', gap: '1.5rem' }}>
            <div>
              <Heading level={4}>Text Sizes</Heading>
              <div style={{ display: 'grid', gap: '0.5rem', marginTop: '1rem' }}>
                <Text size="xs">Extra small text (12px)</Text>
                <Text size="sm">Small text (14px)</Text>
                <Text size="base">Base text (16px)</Text>
                <Text size="lg">Large text (18px)</Text>
                <Text size="xl">Extra large text (20px)</Text>
                <Text size="2xl">2XL text (24px)</Text>
              </div>
            </div>

            <div>
              <Heading level={4}>Text Variants</Heading>
              <div style={{ display: 'grid', gap: '0.5rem', marginTop: '1rem' }}>
                <Text variant="body">Body text variant with relaxed line height</Text>
                <Text variant="caption">Caption text variant for secondary information</Text>
                <Text variant="label">Label text variant for form labels</Text>
                <Text variant="code">Code text variant with monospace font</Text>
              </div>
            </div>

            <div>
              <Heading level={4}>Color Variants</Heading>
              <div style={{ display: 'grid', gap: '0.5rem', marginTop: '1rem' }}>
                <Text color="primary">Primary text color</Text>
                <Text color="secondary">Secondary text color</Text>
                <Text color="tertiary">Tertiary text color</Text>
                <Text color="success">Success text color</Text>
                <Text color="warning">Warning text color</Text>
                <Text color="error">Error text color</Text>
              </div>
            </div>

            <div>
              <Heading level={4}>Font Weights</Heading>
              <div style={{ display: 'grid', gap: '0.5rem', marginTop: '1rem' }}>
                <Text weight="light">Light weight text</Text>
                <Text weight="normal">Normal weight text</Text>
                <Text weight="medium">Medium weight text</Text>
                <Text weight="semibold">Semibold weight text</Text>
                <Text weight="bold">Bold weight text</Text>
              </div>
            </div>
          </div>

          <CodeBlock
            language="jsx"
            title="Text Usage Examples"
            style={{ marginTop: '2rem' }}
          >{`<Text variant="body">Standard paragraph text</Text>
<Text size="lg" weight="medium" color="primary">
  Large prominent text
</Text>
<Text as="span" size="sm" color="secondary">
  Inline secondary text
</Text>
<Text variant="caption" className="uppercase">
  Transformed caption text
</Text>`}</CodeBlock>
        </Card>

        <Card title="Link Components">
          <Text variant="body">
            Accessible links with security features, external link detection, and multiple styling variants.
          </Text>

          <div style={{ marginTop: '2rem', display: 'grid', gap: '2rem' }}>
            <div>
              <Heading level={4}>Link Variants</Heading>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                <Link href="#" variant="default">Default Link</Link>
                <Link href="#" variant="subtle">Subtle Link</Link>
                <Link href="#" variant="button">Button-style Link</Link>
              </div>
            </div>

            <div>
              <Heading level={4}>External Links</Heading>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                <Link href="https://github.com" external>GitHub (Auto-detected)</Link>
                <Link href="https://acme-ui.com" showExternalIcon={false}>No Icon</Link>
              </div>
              <Text variant="caption" color="secondary" style={{ marginTop: '0.5rem' }}>
                External links automatically open in new tabs with security attributes
              </Text>
            </div>

            <div>
              <Heading level={4}>Color Variants</Heading>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                <Link href="#" color="primary">Primary</Link>
                <Link href="#" color="secondary">Secondary</Link>
                <Link href="#" color="success">Success</Link>
                <Link href="#" color="warning">Warning</Link>
                <Link href="#" color="error">Error</Link>
              </div>
            </div>

            <div>
              <Heading level={4}>Size Variants</Heading>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
                <Link href="#" size="xs">Extra Small</Link>
                <Link href="#" size="sm">Small</Link>
                <Link href="#" size="base">Base</Link>
                <Link href="#" size="lg">Large</Link>
                <Link href="#" size="xl">Extra Large</Link>
              </div>
            </div>
          </div>

          <CodeBlock
            language="jsx"
            title="Link Usage Examples"
            style={{ marginTop: '2rem' }}
          >{`<Link href="/about">Internal Navigation</Link>
<Link href="https://external.com" external>
  External Link (auto-detected)
</Link>
<Link href="#" variant="subtle" underline={false}>
  Subtle link without underline
</Link>
<Link href="#" variant="button" size="lg">
  Button-style Link
</Link>`}</CodeBlock>
        </Card>

        <Card title="Lists Components">
          <Text variant="body">
            Structured list components with custom markers, spacing variants, and semantic HTML.
          </Text>

          <div style={{ marginTop: '2rem', display: 'grid', gap: '2rem' }}>
            <div>
              <Heading level={4}>Unordered Lists</Heading>
              <UnorderedList marker="bullet">
                <ListItem>Default bullet marker</ListItem>
                <ListItem>Nested lists supported
                  <UnorderedList marker="dash">
                    <ListItem>Dash marker for nested</ListItem>
                    <ListItem>Auto-changing markers</ListItem>
                  </UnorderedList>
                </ListItem>
                <ListItem>Consistent spacing</ListItem>
              </UnorderedList>

              <UnorderedList marker="check" style={{ marginTop: '1.5rem' }}>
                <ListItem>Check marker for completed items</ListItem>
                <ListItem>Great for feature lists</ListItem>
                <ListItem>Visual feedback</ListItem>
              </UnorderedList>
            </div>

            <div>
              <Heading level={4}>Ordered Lists</Heading>
              <OrderedList type="decimal">
                <ListItem>Numbered items</ListItem>
                <ListItem>Sequential ordering</ListItem>
                <ListItem>Multiple numbering types</ListItem>
              </OrderedList>

              <OrderedList type="lower-alpha" style={{ marginTop: '1rem' }}>
                <ListItem>Alphabetical ordering</ListItem>
                <ListItem>Alternative numbering</ListItem>
                <ListItem>Flexible options</ListItem>
              </OrderedList>
            </div>

            <div>
              <Heading level={4}>Custom Icons</Heading>
              <UnorderedList variant="flush">
                <ListItem icon="🚀">Launch new features</ListItem>
                <ListItem icon="📝">Write documentation</ListItem>
                <ListItem icon="🎨">Design components</ListItem>
                <ListItem icon="✅">Complete testing</ListItem>
              </UnorderedList>
            </div>

            <div>
              <Heading level={4}>Description Lists</Heading>
              <DescriptionList>
                <DescriptionTerm>Design Tokens</DescriptionTerm>
                <DescriptionDetail>CSS custom properties for consistent styling</DescriptionDetail>
                
                <DescriptionTerm>Components</DescriptionTerm>
                <DescriptionDetail>Reusable UI elements with consistent APIs</DescriptionDetail>
                
                <DescriptionTerm>Accessibility</DescriptionTerm>
                <DescriptionDetail>WCAG compliant with proper semantic HTML</DescriptionDetail>
              </DescriptionList>
            </div>
          </div>

          <CodeBlock
            language="jsx"
            title="Lists Usage Examples"
            style={{ marginTop: '2rem' }}
          >{`<UnorderedList marker="check" spacing="relaxed">
  <ListItem>Feature complete</ListItem>
  <ListItem>Fully tested</ListItem>
</UnorderedList>

<OrderedList type="lower-roman">
  <ListItem>Introduction</ListItem>
  <ListItem>Implementation</ListItem>
</OrderedList>

<UnorderedList variant="flush">
  <ListItem icon="📦">Custom icon support</ListItem>
</UnorderedList>`}</CodeBlock>
        </Card>

        <Card title="Code Components">
          <Text variant="body">
            Display formatted code with syntax highlighting, copy functionality, and keyboard shortcuts.
          </Text>

          <div style={{ marginTop: '2rem', display: 'grid', gap: '2rem' }}>
            <div>
              <Heading level={4}>Inline Code</Heading>
              <Text variant="body">
                Use <InlineCode>inline code</InlineCode> for variable names, function calls like <InlineCode>useState()</InlineCode>, 
                or file names like <InlineCode>package.json</InlineCode>.
              </Text>
              
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <InlineCode variant="default">Default variant</InlineCode>
                <InlineCode variant="subtle">Subtle variant</InlineCode>
                <InlineCode variant="accent">Accent variant</InlineCode>
              </div>
            </div>

            <div>
              <Heading level={4}>Code Blocks</Heading>
              <CodeBlock
                language="javascript"
                title="React Component Example"
                showLineNumbers={true}
                highlightLines={[3, 4, 5]}
              >{`import React, { useState } from 'react';
import { Button, Text } from '@acme-ui/react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <Text>Count: {count}</Text>
      <Button onClick={() => setCount(count + 1)}>
        Increment
      </Button>
    </div>
  );
}`}</CodeBlock>
            </div>

            <div>
              <Heading level={4}>Keyboard Shortcuts</Heading>
              <div style={{ display: 'grid', gap: '0.5rem', marginTop: '1rem' }}>
                <Text>Copy: <KeyboardShortcut keys={['Cmd', 'C']} /></Text>
                <Text>Paste: <KeyboardShortcut keys={['Cmd', 'V']} /></Text>
                <Text>Save: <KeyboardShortcut keys={['Cmd', 'S']} /></Text>
                <Text>Find: <KeyboardShortcut keys={['Cmd', 'Shift', 'F']} /></Text>
                <Text>Custom separator: <KeyboardShortcut keys={['Ctrl', 'Alt']} separator=" + " /></Text>
              </div>
            </div>

            <div>
              <Heading level={4}>Theme Variants</Heading>
              <CodeBlock
                theme="dark"
                language="css"
                title="Dark Theme Example"
              >{`.dark-theme {
  background: #1a1a1a;
  color: #ffffff;
  border: 1px solid #333;
}`}</CodeBlock>
            </div>
          </div>

          <CodeBlock
            language="jsx"
            title="Code Component Usage"
            style={{ marginTop: '2rem' }}
          >{`<InlineCode>inline code</InlineCode>

<CodeBlock 
  language="javascript"
  title="Component Example"
  showLineNumbers={true}
  highlightLines={[1, 3]}
  copyable={true}
>
  {codeString}
</CodeBlock>

<KeyboardShortcut keys={['Cmd', 'K']} />`}</CodeBlock>
        </Card>

        <Card title="Design Token Reference">
          <Text variant="body">
            Complete reference of available design tokens organized by category.
          </Text>

          <div style={{ marginTop: '2rem', display: 'grid', gap: '2rem' }}>
            <div>
              <Heading level={4}>Color Tokens</Heading>
              <CodeBlock language="css" title="Color Token Examples">{`/* Semantic Colors */
--acme-color-text-primary
--acme-color-text-secondary
--acme-color-text-tertiary
--acme-color-background-primary
--acme-color-background-elevated
--acme-color-border-primary

/* Brand Colors */
--acme-color-primary-500
--acme-color-success-600
--acme-color-warning-500
--acme-color-error-600`}</CodeBlock>
            </div>

            <div>
              <Heading level={4}>Typography Tokens</Heading>
              <CodeBlock language="css" title="Typography Token Examples">{`/* Font Families */
--acme-font-sans
--acme-font-serif
--acme-font-mono

/* Font Sizes */
--acme-text-xs /* 12px */
--acme-text-sm /* 14px */
--acme-text-base /* 16px */
--acme-text-lg /* 18px */

/* Font Weights */
--acme-font-normal /* 400 */
--acme-font-medium /* 500 */
--acme-font-semibold /* 600 */
--acme-font-bold /* 700 */`}</CodeBlock>
            </div>

            <div>
              <Heading level={4}>Spacing Tokens</Heading>
              <CodeBlock language="css" title="Spacing Token Examples">{`/* Spacing Scale (4px base) */
--acme-space-1 /* 4px */
--acme-space-2 /* 8px */
--acme-space-4 /* 16px */
--acme-space-6 /* 24px */
--acme-space-8 /* 32px */

/* Semantic Spacing */
--acme-space-xs
--acme-space-sm
--acme-space-md
--acme-space-lg
--acme-space-xl`}</CodeBlock>
            </div>

            <div>
              <Heading level={4}>Layout Tokens</Heading>
              <CodeBlock language="css" title="Layout Token Examples">{`/* Border Radius */
--acme-radius-sm /* 2px */
--acme-radius-md /* 4px */
--acme-radius-lg /* 6px */
--acme-radius-xl /* 8px */

/* Shadows */
--acme-shadow-sm
--acme-shadow-md
--acme-shadow-lg
--acme-elevation-1
--acme-elevation-2

/* Z-Index */
--acme-z-dropdown /* 1000 */
--acme-z-modal /* 1400 */
--acme-z-tooltip /* 1800 */`}</CodeBlock>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default TypographyPage;