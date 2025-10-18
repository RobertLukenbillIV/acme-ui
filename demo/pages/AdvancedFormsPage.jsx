import React, { useState } from 'react';
import Card from '../../src/components/Card';
import Hero from '../../src/components/Hero';
import SearchField from '../../src/components/SearchField';
import InputGroup from '../../src/components/InputGroup';
import DatePicker from '../../src/components/DatePicker';
import FileUploader from '../../src/components/FileUploader';
import { TextInput } from '../../src/components/Form';

const AdvancedFormsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [groupedValue, setGroupedValue] = useState('');
  
  const searchSuggestions = [
    'React components',
    'JavaScript tutorials',
    'CSS animations',
    'Node.js development',
    'TypeScript guide'
  ];

  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  const handleFileSelect = (files) => {
    console.log('Files selected:', files);
  };

  const handleFileUpload = async (file) => {
    console.log('Uploading file:', file.name);
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <>
      <Hero 
        backgroundImage="https://picsum.photos/1920/600?random=advanced-forms"
        title="Advanced Form Components"
        subtitle="Enhanced input patterns for modern web applications"
        variant="static"
        height="50vh"
      >
        <p style={{ 
          fontSize: '1.1rem', 
          marginTop: '1rem',
          maxWidth: '600px',
          textAlign: 'center'
        }}>
          Explore our advanced form components including search fields, input groups, date pickers, and file uploaders
        </p>
      </Hero>
      
      <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Advanced Form Components</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            <Card title="SearchField Component">
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <SearchField
                  label="Search with Suggestions"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onSearch={handleSearch}
                  placeholder="Type to search..."
                  suggestions={searchSuggestions}
                  showSuggestions={true}
                  debounceMs={300}
                />
                
                <SearchField
                  label="Simple Search"
                  placeholder="Search without suggestions..."
                  size="large"
                  variant="filled"
                />
                
                <SearchField
                  label="Compact Search"
                  placeholder="Compact search..."
                  size="small"
                  clearable={false}
                />
              </div>
            </Card>

            <Card title="InputGroup Component">
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <InputGroup
                  label="Price"
                  prefix="$"
                  suffix="USD"
                  helpText="Enter the price in US dollars"
                >
                  <TextInput
                    placeholder="0.00"
                    type="number"
                  />
                </InputGroup>
                
                <InputGroup
                  label="Website URL"
                  prefix="https://"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M2 12h20"></path>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  }
                  iconPosition="right"
                >
                  <TextInput
                    placeholder="example.com"
                  />
                </InputGroup>
                
                <InputGroup
                  label="Email with Icon"
                  icon="@"
                  size="large"
                >
                  <TextInput
                    type="email"
                    placeholder="your.email@example.com"
                  />
                </InputGroup>
              </div>
            </Card>
          </div>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            <Card title="DatePicker Component">
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <DatePicker
                  label="Select Date"
                  value={dateValue}
                  onChange={setDateValue}
                  placeholder="Choose a date..."
                />
                
                <DatePicker
                  label="Birth Date"
                  placeholder="MM/DD/YYYY"
                  format="MM/DD/YYYY"
                  maxDate="2010-12-31"
                  size="large"
                />
                
                <DatePicker
                  label="Event Date"
                  minDate={new Date().toISOString().split('T')[0]}
                  highlightedDates={[
                    '2024-12-25',
                    '2024-12-31',
                    '2025-01-01'
                  ]}
                  showTodayButton={true}
                  showClearButton={true}
                />
              </div>
            </Card>

            <Card title="FileUploader Component">
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <FileUploader
                  label="Upload Images"
                  accept="image/*"
                  multiple={true}
                  maxFiles={5}
                  maxSize={5 * 1024 * 1024} // 5MB
                  onFileSelect={handleFileSelect}
                  onUpload={handleFileUpload}
                  helpText="Upload up to 5 images, max 5MB each"
                  variant="dropzone"
                />
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <FileUploader
                    label="Document Upload"
                    accept=".pdf,.doc,.docx"
                    variant="button"
                    showPreview={false}
                  />
                  
                  <FileUploader
                    label="Quick Upload"
                    variant="minimal"
                    multiple={true}
                    showPreview={false}
                  />
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <Card title="Component Features">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div>
                <h4>🔍 SearchField</h4>
                <ul style={{ fontSize: '14px', color: '#666', paddingLeft: '1rem' }}>
                  <li>Auto-complete suggestions</li>
                  <li>Debounced search</li>
                  <li>Clear button</li>
                  <li>Keyboard navigation</li>
                  <li>Multiple sizes</li>
                </ul>
              </div>
              
              <div>
                <h4>📦 InputGroup</h4>
                <ul style={{ fontSize: '14px', color: '#666', paddingLeft: '1rem' }}>
                  <li>Prefix/suffix addons</li>
                  <li>Icon support</li>
                  <li>Wraps existing inputs</li>
                  <li>Help text</li>
                  <li>Error states</li>
                </ul>
              </div>
              
              <div>
                <h4>📅 DatePicker</h4>
                <ul style={{ fontSize: '14px', color: '#666', paddingLeft: '1rem' }}>
                  <li>Calendar popup</li>
                  <li>Date validation</li>
                  <li>Min/max dates</li>
                  <li>Highlighted dates</li>
                  <li>Multiple formats</li>
                </ul>
              </div>
              
              <div>
                <h4>📁 FileUploader</h4>
                <ul style={{ fontSize: '14px', color: '#666', paddingLeft: '1rem' }}>
                  <li>Drag & drop</li>
                  <li>File previews</li>
                  <li>Progress tracking</li>
                  <li>Multiple variants</li>
                  <li>File validation</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </>
  );
};

export default AdvancedFormsPage;