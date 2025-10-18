import React, { useState } from 'react';
import { 
  Button, 
  Avatar, 
  Badge, 
  BadgeWrapper, 
  Switch, 
  RadioGroup, 
  Spinner,
  LoadingWrapper 
} from '../../src';
import Card from '../../src/components/Card';

const PrimitivesPage = () => {
  const [switchValue, setSwitchValue] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [loading, setLoading] = useState(false);

  const radioOptions = [
    { value: 'option1', label: 'Option One', description: 'This is the first option' },
    { value: 'option2', label: 'Option Two', description: 'This is the second option' },
    { value: 'option3', label: 'Option Three', description: 'This is the third option' },
    { value: 'disabled', label: 'Disabled Option', description: 'This option is disabled', disabled: true }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', color: 'var(--text-primary)' }}>Primitive Components</h1>

      {/* Button Examples */}
      <Card title="Button Component">
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Button Variants</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <Button>Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
          </div>

          <h3 style={{ marginBottom: '1rem' }}>Button Sizes</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </div>

          <h3 style={{ marginBottom: '1rem' }}>Button States</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button disabled>Disabled</Button>
            <Button variant="primary" onClick={() => setLoading(!loading)}>
              {loading ? <Spinner size="small" color="white" /> : null}
              {loading ? 'Loading...' : 'Toggle Loading'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Avatar Examples */}
      <Card title="Avatar Component">
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Avatar Variants & Sizes</h3>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <Avatar size="small" name="John Doe" />
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Small</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Avatar size="medium" name="Jane Smith" status="online" />
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Medium + Online</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Avatar size="large" src="https://picsum.photos/100/100?random=1" name="Alice Johnson" status="away" />
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Large + Image</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Avatar size="xl" name="Bob Wilson" variant="rounded" status="busy" />
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>XL + Rounded</p>
            </div>
          </div>

          <h3 style={{ marginBottom: '1rem' }}>Avatar Status Indicators</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Avatar name="Online User" status="online" />
            <Avatar name="Away User" status="away" />
            <Avatar name="Busy User" status="busy" />
            <Avatar name="Offline User" status="offline" />
          </div>
        </div>
      </Card>

      {/* Badge Examples */}
      <Card title="Badge Component">
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Badge Variants</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem', alignItems: 'center' }}>
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="light">Light</Badge>
            <Badge variant="dark">Dark</Badge>
          </div>

          <h3 style={{ marginBottom: '1rem' }}>Badge Sizes & Numbers</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem', alignItems: 'center' }}>
            <Badge size="small">5</Badge>
            <Badge size="medium">{42}</Badge>
            <Badge size="large">{150}</Badge>
            <Badge dot variant="danger" />
            <Badge variant="primary">{9999}</Badge>
          </div>

          <h3 style={{ marginBottom: '1rem' }}>Badge with Components</h3>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <BadgeWrapper badge={<Badge variant="danger">{3}</Badge>}>
              <Button variant="primary">Messages</Button>
            </BadgeWrapper>
            
            <BadgeWrapper badge={<Badge variant="success" dot />} position="top-right">
              <Avatar name="User" size="large" />
            </BadgeWrapper>
          </div>
        </div>
      </Card>

      {/* Switch Examples */}
      <Card title="Switch Component">
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Switch States & Colors</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <Switch
              checked={switchValue}
              onChange={(e) => setSwitchValue(e.target.checked)}
              label="Enable Notifications"
              description="Receive push notifications when someone mentions you"
            />
            <Switch
              checked={true}
              onChange={() => {}}
              label="Dark Mode (Success)"
              color="success"
            />
            <Switch
              checked={false}
              onChange={() => {}}
              label="Maintenance Mode (Warning)"
              color="warning"
            />
            <Switch
              checked={true}
              onChange={() => {}}
              disabled
              label="Disabled Switch"
              description="This switch is disabled"
            />
          </div>

          <h3 style={{ marginBottom: '1rem' }}>Switch Sizes</h3>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Switch size="small" checked={true} onChange={() => {}} label="Small" />
            <Switch size="medium" checked={true} onChange={() => {}} label="Medium" />
            <Switch size="large" checked={true} onChange={() => {}} label="Large" />
          </div>
        </div>
      </Card>

      {/* RadioGroup Examples */}
      <Card title="RadioGroup Component">
        <div style={{ marginBottom: '2rem' }}>
          <RadioGroup
            label="Select your preferred option"
            description="Choose one option from the list below"
            value={radioValue}
            onChange={(e) => setRadioValue(e.target.value)}
            options={radioOptions}
          />

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Horizontal Radio Group</h3>
            <RadioGroup
              value={radioValue}
              onChange={(e) => setRadioValue(e.target.value)}
              options={['Small', 'Medium', 'Large']}
              direction="horizontal"
            />
          </div>
        </div>
      </Card>

      {/* Spinner Examples */}
      <Card title="Spinner Component">
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Spinner Variants</h3>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <Spinner variant="circular" />
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Circular</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Spinner variant="dots" />
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Dots</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Spinner variant="pulse" />
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Pulse</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Spinner variant="bars" />
              <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Bars</p>
            </div>
          </div>

          <h3 style={{ marginBottom: '1rem' }}>Spinner Sizes & Colors</h3>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
            <Spinner size="small" color="primary" />
            <Spinner size="medium" color="success" />
            <Spinner size="large" color="warning" />
            <Spinner size="xl" color="danger" />
          </div>

          <h3 style={{ marginBottom: '1rem' }}>Loading Wrapper</h3>
          <LoadingWrapper loading={loading} style={{ height: '100px', border: '2px dashed #ddd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>Content that can be in a loading state</p>
          </LoadingWrapper>
        </div>
      </Card>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          All primitive components are fully customizable with props, support dark mode, and follow accessibility best practices.
        </p>
      </div>
    </div>
  );
};

export default PrimitivesPage;