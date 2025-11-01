import React, { useState, useEffect } from 'react';
import Chart from '../../src/components/Chart';
import StatCard, { StatGroup } from '../../src/components/StatCard';
import ProgressBar, { CircularProgress, Gauge } from '../../src/components/ProgressBar';
import Timeline from '../../src/components/Timeline';

const DataVisualizationPage = () => {
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Sample data for charts
  const barChartData = [
    { label: 'Jan', value: 45, color: '#3498db' },
    { label: 'Feb', value: 67, color: '#2ecc71' },
    { label: 'Mar', value: 23, color: '#e74c3c' },
    { label: 'Apr', value: 89, color: '#f39c12' },
    { label: 'May', value: 34, color: '#9b59b6' },
    { label: 'Jun', value: 78, color: '#1abc9c' }
  ];

  const lineChartData = [
    { label: 'Week 1', value: 10 },
    { label: 'Week 2', value: 25 },
    { label: 'Week 3', value: 15 },
    { label: 'Week 4', value: 40 },
    { label: 'Week 5', value: 30 },
    { label: 'Week 6', value: 55 }
  ];

  const pieChartData = [
    { label: 'Desktop', value: 45, color: '#3498db' },
    { label: 'Mobile', value: 35, color: '#2ecc71' },
    { label: 'Tablet', value: 20, color: '#e74c3c' }
  ];

  // Sample timeline data
  const timelineData = [
    {
      id: 1,
      title: 'Project Kickoff',
      description: 'Initial meeting with stakeholders and team members',
      date: '2024-01-15T09:00:00Z',
      type: 'milestone',
      icon: '🚀',
      tags: ['Meeting', 'Planning']
    },
    {
      id: 2,
      title: 'Requirements Gathering',
      description: 'Collected and analyzed user requirements and business needs',
      date: '2024-01-20T14:30:00Z',
      type: 'task',
      icon: '📋'
    },
    {
      id: 3,
      title: 'Design Phase Complete',
      description: 'Finalized UI/UX designs and user flow diagrams',
      date: '2024-02-05T16:00:00Z',
      type: 'milestone',
      icon: '🎨',
      tags: ['Design', 'UI/UX']
    },
    {
      id: 4,
      title: 'Development Started',
      description: 'Backend and frontend development in progress',
      date: '2024-02-10T10:00:00Z',
      type: 'event',
      icon: '💻'
    }
  ];

  const processSteps = [
    {
      id: 1,
      title: 'Planning',
      description: 'Define project scope and requirements',
      duration: '2 weeks',
      icon: '📝'
    },
    {
      id: 2,
      title: 'Design',
      description: 'Create wireframes and visual designs',
      duration: '3 weeks',
      icon: '🎨'
    },
    {
      id: 3,
      title: 'Development',
      description: 'Build and implement features',
      duration: '8 weeks',
      icon: '💻'
    },
    {
      id: 4,
      title: 'Testing',
      description: 'Quality assurance and bug fixes',
      duration: '2 weeks',
      icon: '🧪'
    },
    {
      id: 5,
      title: 'Deployment',
      description: 'Release to production environment',
      duration: '1 week',
      icon: '🚀'
    }
  ];

  const horizontalTimelineData = [
    { id: 1, title: 'Q1', date: '2024-01-01', completed: true },
    { id: 2, title: 'Q2', date: '2024-04-01', completed: true },
    { id: 3, title: 'Q3', date: '2024-07-01', completed: false },
    { id: 4, title: 'Q4', date: '2024-10-01', completed: false }
  ];

  const handleRefreshData = () => {
    setRefreshCounter(prev => prev + 1);
  };

  const handleTimelineItemClick = (item, index) => {
    console.log('Timeline item clicked:', item, index);
  };

  const handleProcessStepClick = (step, index) => {
    console.log('Process step clicked:', step, index);
  };

  return (
    <div className="demo-page">
      <div className="demo-header">
        <h1>Data Visualization Components</h1>
        <p>Comprehensive components for displaying charts, metrics, progress, and timelines.</p>
        <button onClick={handleRefreshData} className="refresh-button">
          Refresh Data ({refreshCounter})
        </button>
      </div>

      {/* Charts Section */}
      <section className="demo-section">
        <h2>Charts</h2>
        <p>Visualize quantitative data with various chart types including bar, line, pie, and doughnut charts.</p>
        
        <div className="component-demo-grid">
          <div className="demo-item">
            <h4>Bar Chart</h4>
            <Chart 
              type="bar" 
              data={barChartData} 
              title="Monthly Sales"
              showLegend={true}
              animate={true}
              height={350}
            />
          </div>

          <div className="demo-item">
            <h4>Line Chart</h4>
            <Chart 
              type="line" 
              data={lineChartData} 
              title="Weekly Growth"
              animate={true}
              height={350}
            />
          </div>

          <div className="demo-item">
            <h4>Pie Chart</h4>
            <Chart 
              type="pie" 
              data={pieChartData} 
              title="Device Usage"
              showLegend={true}
              showValues={true}
              size={250}
            />
          </div>

          <div className="demo-item">
            <h4>Doughnut Chart</h4>
            <Chart 
              type="doughnut" 
              data={pieChartData} 
              title="Traffic Sources"
              showLegend={true}
              showValues={true}
              size={250}
            />
          </div>
        </div>
      </section>

      {/* Stat Cards Section */}
      <section className="demo-section">
        <h2>Stat / KPI Cards</h2>
        <p>Display key performance indicators and metrics in compact, visually appealing cards.</p>
        
        <div className="component-demo-grid">
          <StatCard
            title="Total Revenue"
            value="$125,430"
            trend={{ value: 12.5, direction: 'up', label: 'vs last month' }}
            color="success"
            icon="💰"
          />

          <StatCard
            title="Active Users"
            value="8,429"
            trend={{ value: -3.2, direction: 'down', label: 'vs last week' }}
            color="primary"
            icon="👥"
          />

          <StatCard
            title="Conversion Rate"
            value="24.8%"
            trend={{ value: 5.1, direction: 'up', label: 'vs last quarter' }}
            color="info"
            icon="📈"
          />

          <StatCard
            title="Support Tickets"
            value="42"
            trend={{ value: -18.7, direction: 'down', label: 'vs yesterday' }}
            color="warning"
            icon="🎫"
          />
        </div>

        <h3>Stat Card Variants</h3>
        <div className="component-demo-grid">
          <StatCard
            title="System Status"
            value="Online"
            subtitle="All systems operational"
            variant="filled"
            color="success"
            size="large"
          />

          <StatCard
            title="Loading..."
            loading={true}
            variant="default"
            size="medium"
          />

          <StatCard
            title="Interactive Card"
            value="Click me!"
            subtitle="This card responds to clicks"
            variant="outlined"
            color="primary"
            onClick={() => alert('Stat card clicked!')}
          />
        </div>
      </section>

      {/* Progress Indicators Section */}
      <section className="demo-section">
        <h2>Progress & Gauge Indicators</h2>
        <p>Show completion status, thresholds, and progress with various visual styles.</p>
        
        <div className="component-demo-grid">
          <div className="demo-item">
            <h4>Linear Progress</h4>
            <ProgressBar
              value={75}
              label="Project Completion"
              color="primary"
              size="medium"
              showPercentage={true}
              animated={true}
            />
            <br />
            <ProgressBar
              value={45}
              label="Upload Progress"
              color="info"
              size="small"
              variant="striped"
              animated={true}
            />
            <br />
            <ProgressBar
              value={90}
              label="System Health"
              color="success"
              size="large"
              variant="gradient"
            />
          </div>

          <div className="demo-item">
            <h4>Circular Progress</h4>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
              <CircularProgress
                value={65}
                size={120}
                color="primary"
                showPercentage={true}
                animated={true}
              />
              <CircularProgress
                value={85}
                size={100}
                color="success"
                strokeWidth={8}
                showPercentage={true}
              />
              <CircularProgress
                value={40}
                size={80}
                color="warning"
                strokeWidth={6}
                showPercentage={false}
              />
            </div>
          </div>

          <div className="demo-item">
            <h4>Gauge Indicators</h4>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
              <Gauge
                value={78}
                min={0}
                max={100}
                size={120}
                color="primary"
                showValue={true}
                showScale={true}
                label="Performance"
                animated={true}
              />
              <Gauge
                value={92}
                min={0}
                max={100}
                size={100}
                color="success"
                showValue={true}
                label="Health"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="demo-section">
        <h2>Timeline Components</h2>
        <p>Display chronological events, processes, and workflows in various layouts.</p>
        
        <div className="component-demo-grid">
          <div className="demo-item">
            <h4>Vertical Timeline</h4>
            <Timeline
              items={timelineData}
              variant="vertical"
              color="primary"
              size="medium"
              showTime={true}
              interactive={true}
              onItemClick={handleTimelineItemClick}
            />
          </div>

          <div className="demo-item">
            <h4>Process Timeline</h4>
            <Timeline.Process
              steps={processSteps}
              currentStep={2}
              color="info"
              size="medium"
              orientation="vertical"
              showNumbers={true}
              onStepClick={handleProcessStepClick}
            />
          </div>
        </div>

        <h3>Horizontal Timeline</h3>
        <Timeline.Horizontal
          items={horizontalTimelineData}
          color="primary"
          size="medium"
          showLabels={true}
          onItemClick={(item, index) => console.log('Horizontal timeline clicked:', item, index)}
        />

        <h3>Horizontal Process Timeline</h3>
        <Timeline.Process
          steps={processSteps.slice(0, 4)}
          currentStep={1}
          color="success"
          size="medium"
          orientation="horizontal"
          showNumbers={true}
        />
      </section>

      {/* StatGroup Section */}
      <section className="demo-section">
        <h2>Stat Card Groups</h2>
        <p>Organize multiple metrics in responsive grid layouts.</p>
        
        <StatGroup columns={4} gap="1rem">
          <StatCard
            title="Sales"
            value="$52,430"
            trend={{ value: 8.2, direction: 'up' }}
            color="success"
            size="small"
          />
          <StatCard
            title="Orders"
            value="1,429"
            trend={{ value: -2.1, direction: 'down' }}
            color="primary"
            size="small"
          />
          <StatCard
            title="Customers"
            value="342"
            trend={{ value: 15.3, direction: 'up' }}
            color="info"
            size="small"
          />
          <StatCard
            title="Returns"
            value="23"
            trend={{ value: -45.2, direction: 'down' }}
            color="success"
            size="small"
          />
        </StatGroup>
      </section>
    </div>
  );
};

export default DataVisualizationPage;