import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Sidebar.css';

function Sidebar({ isCollapsed, onToggle }) {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    basics: true,
    advanced: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-btn" onClick={onToggle}>
        {isCollapsed ? '→' : '←'}
      </button>
      
      {!isCollapsed && (
        <nav className="sidebar-nav">
          <div className="section">
            <button 
              className="section-header"
              onClick={() => toggleSection('basics')}
            >
              <span>JavaScript Basics</span>
              <span className="arrow">{expandedSections.basics ? '▼' : '▶'}</span>
            </button>
            {expandedSections.basics && (
              <ul className="section-links">
                <li>
                  <Link 
                    to="/array-methods" 
                    className={isActive('/array-methods') ? 'active' : ''}
                  >
                    Array Methods
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <div className="section">
            <button 
              className="section-header"
              onClick={() => toggleSection('advanced')}
            >
              <span>Advanced Concepts</span>
              <span className="arrow">{expandedSections.advanced ? '▼' : '▶'}</span>
            </button>
            {expandedSections.advanced && (
              <ul className="section-links">
                <li>
                  <Link 
                    to="/closures" 
                    className={isActive('/closures') ? 'active' : ''}
                  >
                    Closures
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      )}
    </aside>
  );
}

export default Sidebar;
