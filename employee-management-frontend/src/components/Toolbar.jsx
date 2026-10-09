import React, { useState } from 'react';
import './Toolbar.css';

const Toolbar = ({ onSearch, onAdd, departments }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="toolbar glass-panel animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <form className="search-box" onSubmit={handleSearchSubmit}>
        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input 
          type="text" 
          placeholder="Search by name, ID, email, or department..." 
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <button type="button" className="clear-btn" onClick={handleClear}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
        <button type="submit" className="search-btn">Search</button>
      </form>

      <div className="toolbar-actions">
        {onAdd && (
          <button className="btn btn-primary" onClick={onAdd}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Employee
          </button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
