import React, { useState } from 'react';
import './TestTabs.css';

const TestTabs = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="test-tabs">
      <button
        className={activeTab === 'all' ? 'active' : ''}
        onClick={() => setActiveTab('all')}
      >
        All Test
      </button>
      <button
        className={activeTab === 'academic' ? 'active' : ''}
        onClick={() => setActiveTab('academic')}
      >
        Academic Test
      </button>
      <button
        className={activeTab === 'general' ? 'active' : ''}
        onClick={() => setActiveTab('general')}
      >
        General Training Test
      </button>
    </div>
  );
};

export default TestTabs;
