import { useEffect, useState } from 'react';
import './RightSidebar.css';

function RightSidebar({ sections = [] }) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const mainComponent = document.querySelector('.main-component');
    if (!mainComponent) return;

    const handleScroll = () => {
      const scrollPosition = mainComponent.scrollTop;
      const headings = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean);

      // Find the current section based on scroll position
      let currentSection = sections[0]?.id || '';
      
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        const rect = heading.getBoundingClientRect();
        const mainRect = mainComponent.getBoundingClientRect();
        
        // Calculate position relative to the scrollable container
        if (rect.top - mainRect.top <= 100) {
          currentSection = sections[i].id;
          break;
        }
      }

      setActiveSection(currentSection);
    };

    mainComponent.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => mainComponent.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    const mainComponent = document.querySelector('.main-component');
    
    if (element && mainComponent) {
      const elementTop = element.offsetTop;
      mainComponent.scrollTo({
        top: elementTop - 80,
        behavior: 'smooth'
      });
    }
  };

  if (sections.length === 0) return null;

  return (
    <aside className="right-sidebar">
      <nav className="toc-nav">
        <h3 className="toc-title">On This Page</h3>
        <ul className="toc-list">
          {sections.map((section) => (
            <li key={section.id} className={activeSection === section.id ? 'active' : ''}>
              <a 
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section.id);
                }}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default RightSidebar;
