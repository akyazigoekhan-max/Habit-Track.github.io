
import React, { useState } from 'react'
import { todayISO, formatDate } from './utils'
export default function CalendarView({events, setEvents}){
  const [base,setBase] = useState(todayISO())
  const add = (iso)=>{ const time = prompt('Uhrzeit (HH:MM)'); const text = prompt('Beschreibung'); if(time && text){ setEvents(e=> ({...e, [iso]: [...(e[iso]||[]), {time, text}] })) } }
  const days = [...Array(7)].map((_,i)=>{ const d = new Date(base); d.setDate(d.getDate()+i); const iso = d.toISOString().slice(0,10); return {iso, label:formatDate(iso)} })
  return (<div className="grid cols-2">
    <div className="card">
      <div className="row" style={{justifyContent:'space-between', marginBottom:8}}>
        <div><div style={{fontWeight:700}}>Tagesliste</div><div className="muted" style={{fontSize:12}}>Heute und kommende Tage</div></div>
        <div className="row" style={{gap:8}}><input className="input" type="date" value={base} onChange={e=>setBase(e.target.value)} /></div>
      </div>
      <div className="list">
        {days.map(d=> (<div key={d.iso} className="card" style={{padding:12}}>
          <div className="row" style={{justifyContent:'space-between'}}>
            <div style={{fontWeight:600}}>{d.label}</div>
            <button className="btn primary" onClick={()=>add(d.iso)}>+ Termin</button>
          </div>
          <div className="list" style={{marginTop:8, marginLeft:6}}>
            {(events[d.iso]||[]).map((ev,i)=> (<div key={i} className="row" style={{justifyContent:'space-between'}}><div>{ev.time} · {ev.text}</div></div>))}
            {(events[d.iso]||[]).length===0 && <div className="muted">Keine Termine</div>}
          </div>
        </div>))}
      </div>
    </div>
    <div className="card">
      <div style={{fontWeight:700, marginBottom:8}}>Wochenliste</div>
      <div className="list">
        {days.map(d=> (<div key={d.iso} className="row" style={{justifyContent:'space-between', border:'1px solid var(--border)', padding:'8px 10px', borderRadius:12}}>
          <div style={{width:120}}>{d.label}</div>
          <div className="muted" style={{flex:1}}>{(events[d.iso]||[]).map(ev=>ev.text).join(' · ')||'—'}</div>
          <div className="chip">{(events[d.iso]||[]).length} Termine</div>
        </div>))}
      </div>
    </div>
  </div>)
}
