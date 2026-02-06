import './MainComponent.css';

function MainComponent({ children, isCollapsed }) {
  return (
    <main className={`main-component ${isCollapsed ? 'expanded' : ''}`}>
      <div className="main-content">
        {children}
      </div>
    </main>
  );
}

export default MainComponent;
