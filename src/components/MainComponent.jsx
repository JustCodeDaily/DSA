import './MainComponent.css';

function MainComponent({ children, isCollapsed, rightSidebar }) {
  return (
    <div className={`main-wrapper ${isCollapsed ? 'expanded' : ''}`}>
      <main className="main-component">
        <div className="main-content">
          {children}
        </div>
      </main>
      {rightSidebar && <div className="right-sidebar-container">{rightSidebar}</div>}
    </div>
  );
}

export default MainComponent;
