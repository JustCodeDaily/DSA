import { 
  SandpackProvider, 
  SandpackCodeEditor, 
  SandpackPreview,
  useSandpack,
  UnstyledOpenInCodeSandboxButton
} from '@codesandbox/sandpack-react';
import { levelUp } from '@codesandbox/sandpack-themes';
import { useState, useRef, useEffect } from 'react';
import './CodePlayground.css';

function ConsoleOutput() {
  const { sandpack, listen } = useSandpack();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const unsubscribe = listen((message) => {
      if (message.type === 'console') {
        setLogs((prev) => [...prev, message]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [listen]);

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="console-output">
      {logs.length > 0 && (
        <button onClick={clearLogs} className="console-clear-btn">
          Clear
        </button>
      )}
      <div className="console-logs">
        {logs.length === 0 ? (
          <div className="console-empty">Console output will appear here...</div>
        ) : (
          logs.map((log, index) => {
            const method = log.log?.[0]?.method || 'log';
            const data = log.log?.[0]?.data || [];
            
            return (
              <div key={index} className={`console-log log-${method}`}>
                {data.map((item, i) => (
                  <span key={i}>
                    {typeof item === 'object' ? JSON.stringify(item) : String(item)}
                    {i < data.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function UnifiedHeader({ fileName, activeTab, onTabChange, onReset }) {
  return (
    <div className="unified-header">
      <div className="header-left">
        <span className="file-name">{fileName}</span>
      </div>
      <div className="header-center">
        <button
          className={`tab-btn ${activeTab === 'result' ? 'active' : ''}`}
          onClick={() => onTabChange('result')}
        >
          Result
        </button>
        <button
          className={`tab-btn ${activeTab === 'console' ? 'active' : ''}`}
          onClick={() => onTabChange('console')}
        >
          Console
        </button>
      </div>
      <div className="header-right">
        <button onClick={onReset} className="header-btn" title="Reset code">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
            <path d="M3 21v-5h5"/>
          </svg>
        </button>
        <UnstyledOpenInCodeSandboxButton className="header-btn" title="Open in CodeSandbox">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </UnstyledOpenInCodeSandboxButton>
      </div>
    </div>
  );
}

function ResizableLayout({ children, initialWidth = 50 }) {
  const [leftWidth, setLeftWidth] = useState(initialWidth);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return;
      
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      
      if (newLeftWidth >= 25 && newLeftWidth <= 75) {
        setLeftWidth(newLeftWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className={`resizable-layout ${isDragging ? 'resizing' : ''}`} 
      ref={containerRef}
    >
      <div className="resizable-pane left-pane" style={{ width: `${leftWidth}%` }}>
        {children[0]}
      </div>
      <div 
        className="resize-divider"
        onMouseDown={handleMouseDown}
      />
      <div className="resizable-pane right-pane" style={{ width: `${100 - leftWidth}%` }}>
        {children[1]}
      </div>
    </div>
  );
}

function CodePlayground({ code, template = 'vanilla', height = 400, fileName = 'index.js' }) {
  const [initialCode] = useState(code);
  const [key, setKey] = useState(0);
  const [activeTab, setActiveTab] = useState('result');

  const handleReset = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="code-playground">
      <SandpackProvider
        key={key}
        template={template}
        theme={levelUp}
        files={{
          '/index.js': initialCode
        }}
        options={{
          showNavigator: false,
          showTabs: false,
          showLineNumbers: true,
          showInlineErrors: true,
          autorun: true,
          autoReload: true,
          recompileMode: 'delayed',
          recompileDelay: 300
        }}
      >
        <UnifiedHeader 
          fileName={fileName} 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onReset={handleReset}
        />
        <div className="playground-content" style={{ height: `${height}px` }}>
          <ResizableLayout>
            <div className="editor-wrapper">
              <SandpackCodeEditor 
                showTabs={false}
                showLineNumbers={true}
                showInlineErrors={true}
                wrapContent={false}
              />
            </div>
            <div className="preview-wrapper">
              {activeTab === 'result' ? (
                <SandpackPreview 
                  showOpenInCodeSandbox={false} 
                  showRefreshButton={false}
                  showNavigator={false}
                />
              ) : (
                <ConsoleOutput />
              )}
            </div>
          </ResizableLayout>
        </div>
      </SandpackProvider>
    </div>
  );
}

export default CodePlayground;
