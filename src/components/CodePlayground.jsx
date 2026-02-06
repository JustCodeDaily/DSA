import { 
  SandpackProvider, 
  SandpackCodeEditor, 
  SandpackPreview,
  useSandpack,
  useSandpackConsole,
  UnstyledOpenInCodeSandboxButton
} from '@codesandbox/sandpack-react';
import { levelUp } from '@codesandbox/sandpack-themes';
import { useState, useRef, useEffect } from 'react';
import './CodePlayground.css';

function ConsolePanel() {
  const { logs, reset } = useSandpackConsole({ resetOnPreviewRestart: true });

  return (
    <div className="console-panel">
      <div className="console-content">
        {logs.length === 0 ? (
          <div className="console-empty">Console output will appear here...</div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className={`console-log console-log-${log.method}`}>
              {log.data.map((item, i) => (
                <span key={i}>
                  {typeof item === 'object' ? JSON.stringify(item, null, 2) : String(item)}
                  {i < log.data.length - 1 ? ' ' : ''}
                </span>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function EditorHeader({ fileName, onReset }) {
  return (
    <div className="editor-header">
      <span className="file-name">{fileName}</span>
      <div className="editor-actions">
        <button onClick={onReset} className="action-btn" title="Reset code">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
            <path d="M3 21v-5h5"/>
          </svg>
          Reset
        </button>
        <UnstyledOpenInCodeSandboxButton className="action-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          CodeSandbox
        </UnstyledOpenInCodeSandboxButton>
      </div>
    </div>
  );
}

function PreviewTabs() {
  const [activeTab, setActiveTab] = useState('result');
  const { sandpack } = useSandpack();

  const handleRefresh = () => {
    sandpack.resetFile('/index.js');
  };

  return (
    <div className="preview-container">
      <div className="preview-tabs">
        <button
          className={`preview-tab ${activeTab === 'result' ? 'active' : ''}`}
          onClick={() => setActiveTab('result')}
        >
          Result
        </button>
        <button
          className={`preview-tab ${activeTab === 'console' ? 'active' : ''}`}
          onClick={() => setActiveTab('console')}
        >
          Console
        </button>
        <div className="preview-actions">
          <button className="refresh-btn" onClick={handleRefresh} title="Refresh">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="preview-content">
        {activeTab === 'result' ? (
          <SandpackPreview 
            showOpenInCodeSandbox={false} 
            showRefreshButton={false}
            showNavigator={false}
          />
        ) : (
          <ConsolePanel />
        )}
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
      
      // Constrain between 30% and 70%
      if (newLeftWidth >= 30 && newLeftWidth <= 70) {
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
      <div className="resizable-left" style={{ width: `${leftWidth}%` }}>
        {children[0]}
      </div>
      <div 
        className="resize-handle"
        onMouseDown={handleMouseDown}
      >
        <div className="resize-handle-bar" />
      </div>
      <div className="resizable-right" style={{ width: `${100 - leftWidth}%` }}>
        {children[1]}
      </div>
    </div>
  );
}

function CodePlayground({ code, template = 'vanilla', height = 400, fileName = 'index.js' }) {
  const [initialCode] = useState(code);
  const [currentCode, setCurrentCode] = useState(code);

  const handleReset = () => {
    setCurrentCode(initialCode);
    // Force re-render by updating the key
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="code-playground" style={{ height: `${height}px` }}>
      <SandpackProvider
        template={template}
        theme={levelUp}
        files={{
          '/index.js': currentCode
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
        <ResizableLayout>
          <div className="editor-section">
            <EditorHeader fileName={fileName} onReset={handleReset} />
            <SandpackCodeEditor 
              showTabs={false}
              showLineNumbers={true}
              showInlineErrors={true}
              wrapContent={false}
              style={{ height: `calc(100% - 40px)` }}
            />
          </div>
          <PreviewTabs />
        </ResizableLayout>
      </SandpackProvider>
    </div>
  );
}

export default CodePlayground;
