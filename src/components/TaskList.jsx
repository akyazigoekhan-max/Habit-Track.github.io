
import React from 'react'
import { formatDate, todayISO } from './utils'
export default function TaskList({lists, tasks, setTasks, filter}){
  const toggle = (id)=> setTasks(ts=> ts.map(t=> t.id===id?{...t,done:!t.done}:t))
  const del = (id)=> setTasks(ts=> ts.filter(t=> t.id!==id))
  const listName = (id)=> lists.find(l=>l.id===id)?.name || 'Inbox'
  const data = tasks.filter(t=>{ if(filter==='today') return t.due===todayISO(); if(filter==='overdue') return t.due < todayISO() && !t.done; return true })
  return (<div className="card">
    <div className="row" style={{justifyContent:'space-between', marginBottom:8}}>
      <div className="muted">Aufgaben ({data.length})</div>
      <div className="row" style={{gap:8}}><span className="chip">Filter: {filter}</span></div>
    </div>
    <div className="list">
      {data.map(t=> (<div key={t.id} className="row" style={{justifyContent:'space-between', padding:'8px 10px', border:'1px solid var(--border)', borderRadius:12}}>
        <div className="row" style={{gap:10}}>
          <input type="checkbox" checked={t.done} onChange={()=>toggle(t.id)} />
          <div>
            <div style={{fontWeight:600, textDecoration:t.done?'line-through':'none'}}>{t.title}</div>
            <div className="muted" style={{fontSize:12}}>{listName(t.listId)} · fällig {formatDate(t.due)}{t.priority!=='none' && <> · Prio {t.priority}</>}{t.tags?.length>0 && <> · Tags: {t.tags.join(', ')}</>}</div>
          </div>
        </div>
        <button className="btn danger" onClick={()=>del(t.id)}>Löschen</button>
      </div>))}
      {data.length===0 && <div className="muted">Keine Aufgaben.</div>}
    </div>
  </div>)
}
