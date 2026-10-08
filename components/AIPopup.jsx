"use client";
import { useState } from 'react';
import Icon from './Icon';

export default function AIPopup() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [msgs, setMsgs] = useState([
    { role: 'ai', text: 'FounderPilot Copilot connected. I can analyze your sales trends, draft customer replies, or manage your inventory forecasting. What would you like to do?' }
  ]);
  const [loading, setLoading] = useState(false);

  const send = async (e) => {
    e.preventDefault();
    if(!query.trim()) return;
    
    const userMsg = query;
    const currentMsgs = [...msgs, { role: 'user', text: userMsg }];
    
    setMsgs(currentMsgs);
    setQuery('');
    setLoading(true);
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history: msgs })
      });
      
      const data = await res.json();
      
      setMsgs(prev => [...prev, { role: 'ai', text: data.text || 'Received an empty response.' }]);
    } catch (error) {
      setMsgs(prev => [...prev, { role: 'ai', text: 'Sorry, I am having trouble connecting to the server.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-fab-container">
      {open && (
        <div className="ai-popup">
          <div className="ai-popup-header">
            <div className="ai-popup-title">
              <Icon k="ai" size={18} />
              <strong>AI Assistant</strong>
            </div>
            <button className="ai-popup-close" onClick={() => setOpen(false)}>×</button>
          </div>
          
          <div className="ai-popup-body">
            {msgs.map((m, i) => (
              <div key={i} className={`ai-row ${m.role}`}>
                {m.role === 'ai' && (
                  <div className="ai-avatar"><Icon k="ai" size={14} /></div>
                )}
                <div className="ai-bubble">{m.text}</div>
              </div>
            ))}
            {loading && (
              <div className="ai-row ai">
                <div className="ai-avatar"><Icon k="ai" size={14} /></div>
                <div className="ai-bubble mute" style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="dot-pulse"></span>
                  Analyzing data...
                </div>
              </div>
            )}
          </div>

          <form className="ai-popup-footer" onSubmit={send}>
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              autoFocus
            />
            <button type="submit" className="ai-send" disabled={!query.trim()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </form>
        </div>
      )}

      <button className={`ai-fab ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Toggle AI Assistant">
        <Icon k="ai" size={24} />
      </button>
    </div>
  );
}
