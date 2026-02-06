import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainComponent from './components/MainComponent';
import ArrayMethodsBlog from './blogs/ArrayMethodsBlog';
import ClosuresBlog from './blogs/ClosuresBlog';
import { useState } from 'react';
import './App.css';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <Router>
      <div className="app">
        <Header />
        <div className={`app-body ${!isSidebarCollapsed ? 'sidebar-open' : ''}`}>
          <Sidebar 
            isCollapsed={isSidebarCollapsed} 
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
          />
          <Routes>
            <Route path="/" element={
              <MainComponent isCollapsed={isSidebarCollapsed}>
                <div className="home">
                  <h1>Welcome to JS Blog</h1>
                  <p>Select a topic from the sidebar to get started.</p>
                </div>
              </MainComponent>
            } />
            <Route path="/array-methods" element={
              <MainComponent isCollapsed={isSidebarCollapsed} rightSidebar={true}>
                <ArrayMethodsBlog />
              </MainComponent>
            } />
            <Route path="/closures" element={
              <MainComponent isCollapsed={isSidebarCollapsed} rightSidebar={true}>
                <ClosuresBlog />
              </MainComponent>
            } />
            <Route path="/installation" element={
              <MainComponent isCollapsed={isSidebarCollapsed}>
                <div className="home">
                  <h1>Installation</h1>
                  <p>Coming soon...</p>
                </div>
              </MainComponent>
            } />
            <Route path="/configuration" element={
              <MainComponent isCollapsed={isSidebarCollapsed}>
                <div className="home">
                  <h1>Configuration</h1>
                  <p>Coming soon...</p>
                </div>
              </MainComponent>
            } />
            <Route path="/playground" element={
              <MainComponent isCollapsed={isSidebarCollapsed}>
                <div className="home">
                  <h1>Playground</h1>
                  <p>Coming soon...</p>
                </div>
              </MainComponent>
            } />
            <Route path="/typescript-support" element={
              <MainComponent isCollapsed={isSidebarCollapsed}>
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
