'use client'

import { useState } from 'react'
import {
  Bot,
  ChevronDown,
  ChevronRight,
  Code2,
  Copy,
  FileCode2,
  FileJson,
  FileText,
  Folder,
  FolderOpen,
  GitBranch,
  Lightbulb,
  MoreHorizontal,
  Play,
  Plus,
  RotateCcw,
  Search,
  Send,
  Settings2,
  Sparkles,
  Terminal,
  X,
  Zap,
} from 'lucide-react'

const files = [
  { name: 'README.md', type: 'md', active: true },
  { name: 'getting-started.md', type: 'md' },
  { name: 'button.tsx', type: 'tsx' },
  { name: 'tokens.json', type: 'json' },
  { name: 'contributing.md', type: 'md' },
]

const codeLines = [
  ['1', '# Button', 'heading'],
  ['2', '', ''],
  ['3', 'A compact, accessible button for primary actions.', 'plain'],
  ['4', '', ''],
  ['5', '```tsx', 'fence'],
  ['6', 'import { Button } from "@/components/ui/button"', 'code'],
  ['7', '', ''],
  ['8', '<Button variant="primary" size="md">', 'code'],
  ['9', '  Get started', 'code'],
  ['10', '</Button>', 'code'],
  ['11', '```', 'fence'],
]

function FileIcon({ type }: { type: string }) {
  if (type === 'md') return <FileText className="file-icon md" />
  if (type === 'json') return <FileJson className="file-icon json" />
  return <FileCode2 className="file-icon tsx" />
}

export default function Page() {
  const [activeFile, setActiveFile] = useState('README.md')
  const [size, setSize] = useState('md')
  const [variant, setVariant] = useState('primary')
  const [message, setMessage] = useState('')
  const [ran, setRan] = useState(false)

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark"><Zap size={15} fill="currentColor" /></div>
          <span>Living README</span>
          <span className="version">v0.8.2</span>
        </div>
        <div className="breadcrumb"><span>acme-ui</span><ChevronRight size={13} /><span className="muted">docs</span><ChevronRight size={13} /><strong>{activeFile}</strong></div>
        <div className="top-actions"><button className="icon-btn" aria-label="Search"><Search size={16} /></button><button className="icon-btn" aria-label="Settings"><Settings2 size={16} /></button><div className="status"><span className="status-dot" /> Saved</div><div className="avatar">A</div></div>
      </header>

      <div className="workspace">
        <aside className="sidebar panel-border">
          <div className="sidebar-head"><span>EXPLORER</span><button className="icon-btn"><MoreHorizontal size={15} /></button></div>
          <div className="project"><ChevronDown size={14} /><FolderOpen size={15} className="folder-icon" /><span>acme-ui</span></div>
          <div className="file-tree">
            <div className="tree-indent" />
            <div className="section-label"><ChevronDown size={13} /><span>docs</span></div>
            {files.map((file) => <button key={file.name} className={`file-row ${activeFile === file.name ? 'selected' : ''}`} onClick={() => setActiveFile(file.name)}><FileIcon type={file.type} /><span>{file.name}</span>{file.active && <span className="modified-dot" />}</button>)}
          </div>
          <div className="sidebar-bottom"><div className="sidebar-item"><GitBranch size={14} /> main <span className="branch-count">↑ 2</span></div><div className="sidebar-item"><Terminal size={14} /> Open terminal</div></div>
        </aside>

        <section className="editor-pane">
          <div className="editor-tabs"><div className="editor-tab active"><FileText size={14} className="md" /> {activeFile}<X size={13} /></div><button className="new-tab"><Plus size={15} /></button><div className="editor-tools"><span>Markdown</span><button className="icon-btn"><Copy size={14} /></button></div></div>
          <div className="editor-wrap">
            <div className="line-numbers">{codeLines.map(([n]) => <span key={n}>{n}</span>)}</div>
            <div className="code-content">{codeLines.map(([n, line, kind]) => <div key={n} className={`code-line ${kind}`}>{kind === 'heading' ? <><span className="hash">#</span> <span className="title-code">Button</span></> : kind === 'fence' ? <span className="fence">{line}</span> : kind === 'code' ? <span><span className="syntax-tag">{line?.split(/([<&/>"=])/).map((part, i) => <span key={i} className={/[<&/>"=]/.test(part) ? 'syntax-punc' : i % 3 === 0 ? 'syntax-key' : ''}>{part}</span>)}</span></span> : line}</div>)}</div>
          </div>
          <div className="editor-footer"><span><GitBranch size={13} /> main*</span><span>Ln 8, Col 1</span><span>Spaces: 2</span><span>UTF-8</span><span className="footer-right">Prettier <ChevronDown size={12} /></span></div>
        </section>

        <section className="preview-pane panel-border">
          <div className="pane-title"><div><span className="eyebrow">LIVE PREVIEW</span><span className="live-dot" /> <span className="tiny">hot reload</span></div><div className="preview-actions"><button className="icon-btn"><RotateCcw size={14} /></button><button className={`run-btn ${ran ? 'ran' : ''}`} onClick={() => setRan(true)}><Play size={12} fill="currentColor" /> {ran ? 'Running' : 'Run'}</button></div></div>
          <div className="preview-stage"><div className="component-card"><div className="component-label"><span>Button</span><span className="component-chip">interactive</span></div><div className="button-demo"><button className={`demo-button ${variant} ${size}`} onClick={() => setMessage(message ? '' : 'Nice! The component is live.')}>{message || 'Get started'}</button></div><div className="event-line"><span className="event-dot" /> onClick {message ? '→ fired' : '→ waiting'}</div></div></div>
          <div className="props-panel"><div className="props-header"><span>PROPS</span><span className="props-count">3</span></div><label>variant <select value={variant} onChange={(e) => setVariant(e.target.value)}><option value="primary">primary</option><option value="outline">outline</option><option value="ghost">ghost</option></select></label><label>size <select value={size} onChange={(e) => setSize(e.target.value)}><option value="sm">sm</option><option value="md">md</option><option value="lg">lg</option></select></label><label className="disabled-label">disabled <input type="checkbox" disabled /></label></div>
        </section>

        <aside className="assistant-pane panel-border">
          <div className="assistant-head"><div className="assistant-title"><div className="ai-icon"><Sparkles size={15} /></div><div><strong>AI Assistant</strong><span>Context-aware help</span></div></div><button className="icon-btn"><MoreHorizontal size={15} /></button></div>
          <div className="assistant-body"><div className="ai-message"><div className="ai-avatar"><Bot size={14} /></div><div><p>Hey there. I’m looking at <b>{activeFile}</b> with you.</p><p>What would you like to improve?</p></div></div><div className="suggestions"><button onClick={() => setMessage('Added keyboard support.') }><Lightbulb size={14} /> Add keyboard support</button><button><Code2 size={14} /> Explain this component</button><button><Sparkles size={14} /> Suggest improvements</button></div></div>
          <div className="composer"><textarea placeholder="Ask about your docs..." rows={2} /><div className="composer-bottom"><span>⌘ Enter to send</span><button className="send-btn" aria-label="Send"><Send size={14} /></button></div></div>
        </aside>
      </div>
    </main>
  )
}
