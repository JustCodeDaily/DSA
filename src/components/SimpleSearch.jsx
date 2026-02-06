import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SimpleSearch.css';

function SimpleSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Search index - add your content here
  const searchIndex = [
    {
      title: 'JavaScript Array Methods',
      content: 'Essential array methods every JavaScript developer should know. Map, Filter, Reduce, Find, FindIndex',
      path: '/array-methods',
      section: 'Guides'
    },
    {
      title: 'Understanding JavaScript Closures',
      content: 'Master one of JavaScript most powerful features. Closures, scope, private variables, encapsulation',
      path: '/closures',
      section: 'Advanced Guides'
    },
    {
      title: 'Introduction',
      content: 'Welcome to JS Blog. Learn JavaScript concepts with interactive examples',
      path: '/',
      section: 'Getting Started'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        searchRef.current?.querySelector('input')?.focus();
      }
      if (event.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearch = (value) => {
    setQuery(value);
    
    if (value.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchTerms = value.toLowerCase().split(' ');
    const filtered = searchIndex.filter(item => {
      const searchableText = `${item.title} ${item.content} ${item.section}`.toLowerCase();
      return searchTerms.some(term => searchableText.includes(term));
    });

    setResults(filtered);
    setIsOpen(filtered.length > 0);
  };

  const handleResultClick = (path) => {
    navigate(path);
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="simple-search" ref={searchRef}>
      <div className="search-input-wrapper">
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search docs..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
        />
        <div className="search-shortcut">
          <kbd>⌘</kbd>
          <kbd>K</kbd>
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <div className="search-results">
          <div className="results-header">Search Results</div>
          {results.map((result, index) => (
            <button
              key={index}
              className="search-result-item"
              onClick={() => handleResultClick(result.path)}
            >
              <div className="result-section">{result.section}</div>
              <div className="result-title">{result.title}</div>
              <div className="result-content">{result.content}</div>
            </button>
          ))}
        </div>
      )}

      {isOpen && results.length === 0 && query.length >= 2 && (
        <div className="search-results">
          <div className="no-results">No results found for "{query}"</div>
        </div>
      )}
    </div>
  );
}

export default SimpleSearch;
