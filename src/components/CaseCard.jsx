import { useState } from 'react';

export default function CaseCard({ item, managing, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(item.command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="case-card" id={item.id}>
      <div className="card-main">
        <div className="card-top">
          <div className="card-tags">
            {(item.tags || []).map(tag => <span className={`tag ${item.danger || ''}`} key={tag}>{tag}</span>)}
          </div>
          {managing && (
            <div className="card-actions">
              <button className="text-btn" onClick={() => onEdit(item)}>수정</button>
              <button className="text-btn danger-text" onClick={() => onDelete(item)}>삭제</button>
            </div>
          )}
        </div>
        <h3>{item.title}</h3>
        <p className="case-summary">{item.summary}</p>
        <div className="code-block">
          <div className="code-label">
            <span>TERMINAL</span>
            <button className="copy-btn" onClick={copyCommand}>{copied ? '복사됨' : '복사'}</button>
          </div>
          <pre><code>{item.command}</code></pre>
        </div>
      </div>
      <div className="card-details">
        <button className="details-toggle" aria-expanded={open} onClick={() => setOpen(value => !value)}>
          <span>설명 / 주의사항</span><span>{open ? '−' : '＋'}</span>
        </button>
        {open && (
          <div className="details-content open">
            <strong>설명</strong>
            <p>{item.detail}</p>
            <div className="related">{(item.keywords || []).slice(0, 5).map(keyword => <span key={keyword}>{keyword}</span>)}</div>
          </div>
        )}
      </div>
    </article>
  );
}
