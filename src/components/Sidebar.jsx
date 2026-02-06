import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Sidebar.css';

function Sidebar({ isCollapsed, onToggle, onLinkClick }) {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    gettingStarted: true,
    guides: false,
    advancedGuides: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isActive = (path) => location.pathname === path;

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (window.innerWidth <= 768 && onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-btn desktop-only" onClick={onToggle}>
        {isCollapsed ? '→' : '←'}
      </button>
      
      {!isCollapsed && (
        <nav className="sidebar-nav">
          {/* Introduction - No dropdown */}
          <Link 
            to="/" 
            className={`nav-item ${isActive('/') ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            Introduction
          </Link>

          {/* Getting Started - Expandable */}
          <div className="section">
            <button 
              className={`section-header ${expandedSections.gettingStarted ? 'expanded' : ''}`}
              onClick={() => toggleSection('gettingStarted')}
            >
              <span>Getting Started</span>
              <span className="arrow">{expandedSections.gettingStarted ? '∨' : '›'}</span>
            </button>
            {expandedSections.gettingStarted && (
              <div className="section-content">
                <Link 
                  to="/installation" 
                  className={`sub-item ${isActive('/installation') ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  Installation
                </Link>
                <Link 
                  to="/configuration" 
                  className={`sub-item ${isActive('/configuration') ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  Configuration
                </Link>
                <Link 
                  to="/playground" 
                  className={`sub-item ${isActive('/playground') ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  Playground
                </Link>
                <Link 
                  to="/typescript-support" 
                  className={`sub-item ${isActive('/typescript-support') ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  TypeScript Support
                </Link>
              </div>
            )}
          </div>

          {/* Guides - Expandable */}
          <div className="section">
            <button 
              className={`section-header ${expandedSections.guides ? 'expanded' : ''}`}
              onClick={() => toggleSection('guides')}
            >
              <span>Guides</span>
              <span className="arrow">{expandedSections.guides ? '∨' : '›'}</span>
            </button>
            {expandedSections.guides && (
              <div className="section-content">
                <Link 
                  to="/array-methods" 
                  className={`sub-item ${isActive('/array-methods') ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  Array Methods
                </Link>
              </div>
            )}
          </div>

          {/* Advanced Guides - Expandable */}
          <div className="section">
            <button 
              className={`section-header ${expandedSections.advancedGuides ? 'expanded' : ''}`}
              onClick={() => toggleSection('advancedGuides')}
            >
              <span>Advanced Guides</span>
              <span className="arrow">{expandedSections.advancedGuides ? '∨' : '›'}</span>
            </button>
            {expandedSections.advancedGuides && (
              <div className="section-content">
                <Link 
                  to="/closures" 
                  className={`sub-item ${isActive('/closures') ? 'active' : ''}`}
                  onClick={handleLinkClick}
                >
                  Closures
                </Link>
              </div>
            )}
          </div>

          {/* Upgrading - No dropdown */}
          <button className="section-header no-dropdown">
            <span>Upgrading</span>
            <span className="arrow">›</span>
          </button>
        </nav>
      )}
    </aside>
  );
}

export default Sidebar;
