import './MainComponent.css';

function MainComponent({ children, isCollapsed, rightSidebar }) {
  return (
    <main className={`main-component ${isCollapsed ? 'expanded' : ''} ${rightSidebar ? 'has-right-sidebar' : ''}`}>
      <div className="main-content">
        {children}
      </div>
      {rightSidebar}
    </main>
  );
}

export default MainComponent;
