import React from 'react';
import './FilterBar.css';

const FilterBar = () => {
  return (
    <div className="filter-bar">
      <button>All Skills</button>
      <button>Listening</button>
      <button>Reading</button>
      <input type="text" placeholder="Search..." />
      <select>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
};

export default FilterBar;
