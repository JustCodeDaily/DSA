import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainComponent from './components/MainComponent';
import RightSidebar from './components/RightSidebar';
import ArrayMethodsBlog from './blogs/ArrayMethodsBlog';
import ClosuresBlog from './blogs/ClosuresBlog';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Check if mobile on initial load
  const isMobile = () => window.innerWidth <= 768;
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile());

  useEffect(() => {
    const handleResize = () => {
      // Auto-open sidebar on desktop, keep current state on mobile
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const arrayMethodsSections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'map-filter-reduce', title: 'Map, Filter, and Reduce' },
    { id: 'find-findindex', title: 'Find and FindIndex' },
    { id: 'key-takeaways', title: 'Key Takeaways' }
  ];

  const closuresSections = [
    { id: 'what-is-closure', title: 'What is a Closure?' },
    { id: 'basic-example', title: 'Basic Closure Example' },
    { id: 'private-methods', title: 'Practical Use Case: Private Methods' },
    { id: 'common-pitfall', title: 'Common Pitfall: Closures in Loops' },
    { id: 'key-takeaways', title: 'Key Takeaways' }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Router>
      <div className="app">
        <Header onMenuToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className={`app-body ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          {/* Backdrop for mobile */}
          {isSidebarOpen && window.innerWidth <= 768 && (
            <div className="mobile-backdrop" onClick={closeSidebar} />
          )}
          
          <Sidebar 
            isCollapsed={!isSidebarOpen} 
            onToggle={toggleSidebar}
            onLinkClick={closeSidebar}
          />
          <Routes>
            <Route path="/" element={
              <MainComponent isCollapsed={!isSidebarOpen}>
                <div className="home">
                  <h1>Welcome to JS Blog</h1>
                  <p>Select a topic from the sidebar to get started.</p>
                </div>
              </MainComponent>
            } />
            <Route path="/array-methods" element={
              <MainComponent 
                isCollapsed={!isSidebarOpen} 
                rightSidebar={<RightSidebar sections={arrayMethodsSections} />}
              >
                <ArrayMethodsBlog />
              </MainComponent>
            } />
            <Route path="/closures" element={
              <MainComponent 
                isCollapsed={!isSidebarOpen}
                rightSidebar={<RightSidebar sections={closuresSections} />}
              >
                <ClosuresBlog />
              </MainComponent>
            } />
            <Route path="/installation" element={
              <MainComponent isCollapsed={!isSidebarOpen}>
                <div className="home">
                  <h1>Installation</h1>
                  <p>Coming soon...</p>
                </div>
              </MainComponent>
            } />
            <Route path="/configuration" element={
              <MainComponent isCollapsed={!isSidebarOpen}>
                <div className="home">
                  <h1>Configuration</h1>
                  <p>Coming soon...</p>
                </div>
              </MainComponent>
            } />
            <Route path="/playground" element={
              <MainComponent isCollapsed={!isSidebarOpen}>
                <div className="home">
                  <h1>Playground</h1>
                  <p>Coming soon...</p>
                </div>
              </MainComponent>
            } />
            <Route path="/typescript-support" element={
              <MainComponent isCollapsed={!isSidebarOpen}>
                <div className="home">
                  <h1>TypeScript Support</h1>
                  <p>Coming soon...</p>
                </div>
              </MainComponent>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
