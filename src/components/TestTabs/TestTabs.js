import React from 'react';
import './TestTabs.css';

const TestTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="test-tabs">
      <button
        className={activeTab === 'all' ? 'active' : ''}
        onClick={() => setActiveTab('all')}
      >
        <i className="fas fa-check-double"></i> All Test
      </button>
      <button
        className={activeTab === 'academic' ? 'active' : ''}
        onClick={() => setActiveTab('academic')}
      >
        <i className="fas fa-user-graduate"></i> Academic Test
      </button>
      <button
        className={activeTab === 'general' ? 'active' : ''}
        onClick={() => setActiveTab('general')}
      >
        <i className="fas fa-users"></i> General Training Test
      </button>
    </div>
  );
};

export default TestTabs;