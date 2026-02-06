import { useEffect, useState } from 'react';
import './RightSidebar.css';

function RightSidebar({ sections = [] }) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const headings = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean);

      const scrollPosition = window.scrollY + 100;

      for (let i = headings.length - 1; i >= 0; i--) {
        if (headings[i].offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
