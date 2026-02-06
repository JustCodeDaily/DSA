import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, useSandpack, useSandpackConsole } from '@codesandbox/sandpack-react';
import { levelUp } from '@codesandbox/sandpack-themes';
import { useState, useEffect } from 'react';
import './CodePlayground.css';

function ConsolePanel() {
  const { logs, reset } = useSandpackConsole({ resetOnPreviewRestart: true });

  return (
    <div className="console-panel">
      <div className="console-header">
        <button onClick={reset} className="console-clear-btn" title="Clear console">
          Clear
        </button>
      </div>
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

function PreviewTabs() {
  const [activeTab, setActiveTab] = useState('result');

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
          <button className="refresh-btn" title="Refresh">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="preview-content">
        {activeTab === 'result' ? (
          <SandpackPreview showOpenInCodeSandbox={false} showRefreshButton={false} />
        ) : (
          <ConsolePanel />
        )}
      </div>
    </div>
  );
}

function CodePlayground({ code, template = 'vanilla', height = 400 }) {
  return (
    <div className="code-playground">
      <SandpackProvider
        template={template}
        theme={levelUp}
        files={{
          '/index.js': code
        }}
        options={{
          showNavigator: false,
          showTabs: false,
          showLineNumbers: true,
          showInlineErrors: true,
          editorHeight: height,
          autorun: true,
          autoReload: true
        }}
        customSetup={{
          dependencies: {}
        }}
      >
        <SandpackLayout>
          <SandpackCodeEditor 
            showTabs={false}
            showLineNumbers={true}
            showInlineErrors={true}
            wrapContent={true}
          />
          <PreviewTabs />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

export default CodePlayground;
