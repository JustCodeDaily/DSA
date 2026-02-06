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
        <div className="app-body">
          <Sidebar 
            isCollapsed={isSidebarCollapsed} 
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
          />
          <MainComponent isCollapsed={isSidebarCollapsed}>
            <Routes>
              <Route path="/" element={
                <div className="home">
                  <h1>Welcome to JS Blog</h1>
                  <p>Select a topic from the sidebar to get started.</p>
                </div>
              } />
              <Route path="/array-methods" element={<ArrayMethodsBlog />} />
              <Route path="/closures" element={<ClosuresBlog />} />
            </Routes>
          </MainComponent>
        </div>
      </div>
    </Router>
  );
}

export default App;
