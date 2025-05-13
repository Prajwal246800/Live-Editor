'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './editor.module.css';
import ReactMarkdown from 'react-markdown';

// Helper to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

const aceThemes = [
  { name: 'Ambiance', value: 'ambiance' },
  { name: 'Chaos', value: 'chaos' },
  { name: 'Clouds Midnight', value: 'clouds_midnight' },
  { name: 'Cobalt', value: 'cobalt' },
  { name: 'Dracula', value: 'dracula' },
  { name: 'Gob', value: 'gob' },
  { name: 'Gruvbox', value: 'gruvbox' },
  { name: 'Idle Fingers', value: 'idle_fingers' },
  { name: 'KR Theme', value: 'kr_theme' },
  { name: 'Merbivore', value: 'merbivore' },
  { name: 'Merbivore Soft', value: 'merbivore_soft' },
  { name: 'Monokai', value: 'monokai' },
  { name: 'Pastel on Dark', value: 'pastel_on_dark' },
  { name: 'Solarized Dark', value: 'solarized_dark' },
  { name: 'Terminal', value: 'terminal' },
  { name: 'Tomorrow Night', value: 'tomorrow_night' },
  { name: 'Tomorrow Night Blue', value: 'tomorrow_night_blue' },
  { name: 'Tomorrow Night Bright', value: 'tomorrow_night_bright' },
  { name: 'Tomorrow Night Eighties', value: 'tomorrow_night_eighties' },
  { name: 'Twilight', value: 'twilight' },
  { name: 'Vibrant Ink', value: 'vibrant_ink' },
  { name: 'GitHub', value: 'github' },
];

// Dynamically import Ace editor to avoid SSR issues
const AceEditor = dynamic(
  async () => {
    const ace = await import('react-ace');
    require('ace-builds/src-noconflict/mode-html');
    require('ace-builds/src-noconflict/mode-css');
    require('ace-builds/src-noconflict/mode-javascript');
    // Themes
    require('ace-builds/src-noconflict/theme-ambiance');
    require('ace-builds/src-noconflict/theme-chaos');
    require('ace-builds/src-noconflict/theme-clouds_midnight');
    require('ace-builds/src-noconflict/theme-cobalt');
    require('ace-builds/src-noconflict/theme-dracula');
    require('ace-builds/src-noconflict/theme-gob');
    require('ace-builds/src-noconflict/theme-gruvbox');
    require('ace-builds/src-noconflict/theme-idle_fingers');
    require('ace-builds/src-noconflict/theme-kr_theme');
    require('ace-builds/src-noconflict/theme-merbivore');
    require('ace-builds/src-noconflict/theme-merbivore_soft');
    require('ace-builds/src-noconflict/theme-monokai');
    require('ace-builds/src-noconflict/theme-pastel_on_dark');
    require('ace-builds/src-noconflict/theme-solarized_dark');
    require('ace-builds/src-noconflict/theme-terminal');
    require('ace-builds/src-noconflict/theme-tomorrow_night');
    require('ace-builds/src-noconflict/theme-tomorrow_night_blue');
    require('ace-builds/src-noconflict/theme-tomorrow_night_bright');
    require('ace-builds/src-noconflict/theme-tomorrow_night_eighties');
    require('ace-builds/src-noconflict/theme-twilight');
    require('ace-builds/src-noconflict/theme-vibrant_ink');
    require('ace-builds/src-noconflict/theme-github');
    // Autocomplete & Snippets
    require('ace-builds/src-noconflict/ext-language_tools');
    require('ace-builds/src-noconflict/snippets/html');
    require('ace-builds/src-noconflict/snippets/css');
    require('ace-builds/src-noconflict/snippets/javascript');
    return ace;
  },
  { 
    ssr: false,
    loading: () => <div className={styles.editor}>Loading editor...</div>
  }
);

// Gemini REST API call from frontend
async function askGemini(question: string, html: string, css: string, js: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
  if (!apiKey) return 'Some Issue with the API Key Try Again Later';
  const prompt = `User Question: ${question}\n\nHere is my code:\n\nHTML:\n${html}\n\nCSS:\n${css}\n\nJavaScript:\n${js}\n\nPlease answer in a way that is helpful for a beginner. Please keep your response short and concise. Please be very specific and to the point.`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    return data.error?.message || 'No response from Gemini.';
  } catch (e: any) {
    return 'Error contacting Gemini: ' + (e?.message || e);
  }
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className={styles.copyButton + (copied ? ' ' + styles.copied : '')}
      onClick={() => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      title="Copy code"
      type="button"
      aria-label={copied ? 'Copied!' : 'Copy code'}
    >
      <span className="copyIcon" aria-hidden="true" style={{marginRight: '0.5em', display: 'inline-block'}}>
        <svg className={styles.copyIcon} viewBox="0 0 20 20" fill="currentColor"><path d="M8 2a2 2 0 0 0-2 2v1H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1V4a2 2 0 0 0-2-2H8zm5 3v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1v1a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V5h1a1 1 0 0 1 1 1zm-2-3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3z"/></svg>
      </span>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export default function Editor() {
  const [activeEditor, setActiveEditor] = useState('html');
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Live Editor</title>\n  </head>\n  <body>\n    <h1>Hello, World!</h1>\n    <p>Start editing to see some magic happen :)</p>\n  </body>\n</html>`);
  const [cssCode, setCssCode] = useState(`body {\n  font-family: 'Segoe UI', sans-serif;\n  background: #f4f4f4;\n  color: #222;\n  margin: 0;\n  padding: 2rem;\n}\nh1 {\n  color: #2563eb;\n}`);
  const [jsCode, setJsCode] = useState(`document.querySelector('h1').onclick = function() {\n  alert('Hello from JavaScript!');\n};`);
  const [isMounted, setIsMounted] = useState(false);
  const outputRef = useRef<HTMLIFrameElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [editorTheme, setEditorTheme] = useState('monokai');
  const [themeIndex, setThemeIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'user'|'ai', text: string}[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      updateOutput();
    }
    // eslint-disable-next-line
  }, [htmlCode, cssCode, jsCode, isMounted, editorTheme]);

  const updateOutput = () => {
    setError(null);
    if (outputRef.current) {
      const iframe = outputRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        // Inject error handling for JS
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <style>${cssCode}</style>
            </head>
            <body>
              ${htmlCode}
              <script>
                window.onerror = function(msg, url, line, col, error) {
                  window.parent.postMessage({ type: 'iframe-error', msg, url, line, col, error: error && error.stack }, '*');
                };
                try {
                  ${jsCode}
                } catch (e) {
                  window.parent.postMessage({ type: 'iframe-error', msg: e.message, error: e.stack }, '*');
                }
              <\/script>
            </body>
          </html>
        `);
        doc.close();
      }
    }
  };

  // Listen for errors from iframe
  useEffect(() => {
    function handleMsg(e: MessageEvent) {
      if (e.data && e.data.type === 'iframe-error') {
        setError(e.data.msg + (e.data.line ? ` (line ${e.data.line})` : ''));
      }
    }
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, []);

  const handleThemeChange = () => {
    const nextIndex = (themeIndex + 1) % aceThemes.length;
    setThemeIndex(nextIndex);
    setEditorTheme(aceThemes[nextIndex].value);
  };

  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages((msgs) => [...msgs, { role: 'user', text: userMsg }]);
    setChatInput('');
    setChatLoading(true);
    try {
      const aiResp = await askGemini(userMsg, htmlCode, cssCode, jsCode);
      setChatMessages((msgs) => [...msgs, { role: 'ai', text: aiResp }]);
    } catch (e) {
      setChatMessages((msgs) => [...msgs, { role: 'ai', text: 'Sorry, there was an error contacting Gemini.' }]);
    }
    setChatLoading(false);
  };

  // Add auto-scroll effect when messages change or chat is opened
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages, chatOpen]);

  // Add click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatOpen && chatWindowRef.current && !chatWindowRef.current.contains(event.target as Node)) {
        setChatOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [chatOpen]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <span className={styles.logo}>ADAM CODES</span>
          <ul className={styles.navList}>
            <li><a href="#" className={styles.active}>PLAYGROUND</a></li>
            <li>
              <button type="button" className={styles.themeButton} onClick={handleThemeChange}>
                <ruby>CHANGE&nbsp;THEME<rt>{aceThemes[themeIndex].name.toUpperCase()}</rt></ruby>
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        {!isMobile && (
          <aside className={styles.sidebar}>
            <div className={styles.menu}>
              <button 
                className={`${styles.menuButton} ${activeEditor === 'html' ? styles.active : ''}`}
                onClick={() => setActiveEditor('html')}
              >
                index.html
              </button>
              <button 
                className={`${styles.menuButton} ${activeEditor === 'css' ? styles.active : ''}`}
                onClick={() => setActiveEditor('css')}
              >
                style.css
              </button>
              <button 
                className={`${styles.menuButton} ${activeEditor === 'js' ? styles.active : ''}`}
                onClick={() => setActiveEditor('js')}
              >
                script.js
              </button>
            </div>
          </aside>
        )}
        {isMobile && (
          <div className={styles.menu}>
            <button 
              className={`${styles.menuButton} ${activeEditor === 'html' ? styles.active : ''}`}
              onClick={() => setActiveEditor('html')}
            >
              index.html
            </button>
            <button 
              className={`${styles.menuButton} ${activeEditor === 'css' ? styles.active : ''}`}
              onClick={() => setActiveEditor('css')}
            >
              style.css
            </button>
            <button 
              className={`${styles.menuButton} ${activeEditor === 'js' ? styles.active : ''}`}
              onClick={() => setActiveEditor('js')}
            >
              script.js
            </button>
          </div>
        )}
        <div className={styles.editorOutputWrapper}>
          <section className={styles.editorCard}>
            <div className={styles.editorHeader}>
              {activeEditor === 'html' && 'HTML Editor'}
              {activeEditor === 'css' && 'CSS Editor'}
              {activeEditor === 'js' && 'JavaScript Editor'}
            </div>
            <div className={styles.editor} style={isMobile ? { minHeight: 180, height: '32vh', maxHeight: '32vh' } : {}}>
              {activeEditor === 'html' && (
                <AceEditor
                  mode="html"
                  theme={editorTheme}
                  value={htmlCode}
                  onChange={setHtmlCode}
                  name="htmlEditor"
                  editorProps={{ $blockScrolling: true }}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                  width="100%"
                  height={isMobile ? '32vh' : '100%'}
                />
              )}
              {activeEditor === 'css' && (
                <AceEditor
                  mode="css"
                  theme={editorTheme}
                  value={cssCode}
                  onChange={setCssCode}
                  name="cssEditor"
                  editorProps={{ $blockScrolling: true }}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                  width="100%"
                  height={isMobile ? '32vh' : '100%'}
                />
              )}
              {activeEditor === 'js' && (
                <AceEditor
                  mode="javascript"
                  theme={editorTheme}
                  value={jsCode}
                  onChange={setJsCode}
                  name="jsEditor"
                  editorProps={{ $blockScrolling: true }}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                  width="100%"
                  height={isMobile ? '32vh' : '100%'}
                />
              )}
            </div>
          </section>
          <section className={styles.outputCard}>
            <div className={styles.outputHeader}>Live Output</div>
            <iframe
              ref={outputRef}
              className={styles.output}
              title="output"
              style={isMobile ? { minHeight: 120, height: '32vh', maxHeight: '32vh' } : {}}
            />
            {error && (
              <div className={styles.errorBox}>
                <strong>Error:</strong> {error}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Floating AI Chat Bot */}
      <div className={styles.fabChatBot}>
        {!chatOpen && (
          <button className={styles.fabButton} onClick={() => setChatOpen(true)} title="Ask Adam AI">
            <span role="img" aria-label="AI">🤖</span>
          </button>
        )}
        {chatOpen && (
          <div className={styles.chatWindow} ref={chatWindowRef}>
            <div className={styles.chatHeader}>
              <span>Adam AI Assistant</span>
              <button className={styles.closeChatBtn} onClick={() => setChatOpen(false)} title="Close">×</button>
            </div>
            <div className={styles.chatMessages} ref={chatMessagesRef}>
              {chatMessages.length === 0 && (
                <div className={styles.chatWelcome}>Ask Adam AI anything about your HTML, CSS, or JS code!</div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={msg.role === 'user' ? styles.userMsg : styles.aiMsg}>
                  {msg.role === 'ai' ? (
                    <ReactMarkdown
                      components={{
                        pre({children}) {
                          // children can be a single element or an array
                          let codeElement = Array.isArray(children) ? children[0] : children;
                          if (!codeElement || typeof codeElement !== 'object' || !('props' in codeElement)) {
                            return <pre style={{border: '2px solid orange', color: 'red'}}>NO CODE BLOCK DETECTED</pre>;
                          }
                          const codeString = codeElement.props.children;
                          return (
                            <div className={styles.codeBlockWrapper}>
                              <CopyButton code={typeof codeString === 'string' ? codeString : Array.isArray(codeString) ? codeString.join('') : ''} />
                              <pre>{children}</pre>
                            </div>
                          );
                        },
                        code(props) {
                          // ReactMarkdown v10+ passes inline as a prop only for inline code
                          // @ts-ignore
                          if (props.inline) {
                            return <code {...props}>{props.children}</code>;
                          }
                          // Block code is handled by the pre renderer
                          return <code {...props}>{props.children}</code>;
                        }
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              ))}
              {chatLoading && <div className={styles.aiMsg}>Adam AI is typing...</div>}
            </div>
            <div className={styles.chatInputRow}>
              <input
                className={styles.chatInput}
                type="text"
                placeholder="Ask Adam AI about your code..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSendChat(); }}
                disabled={chatLoading}
              />
              <button className={styles.sendBtn} onClick={handleSendChat} disabled={chatLoading || !chatInput.trim()}>
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 