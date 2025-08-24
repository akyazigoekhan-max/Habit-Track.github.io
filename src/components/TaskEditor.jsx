
import React, { useState } from 'react'
import { uid, todayISO } from './utils'
export default function TaskEditor({lists, onCreate}){
  const [step,setStep] = useState(1)
  const [title,setTitle] = useState('')
  const [listId,setListId] = useState(lists[0]?.id || 'inbox')
  const [due,setDue] = useState(todayISO())
  const [priority,setPriority] = useState('none')
  const [tags,setTags] = useState('')
  const [repeat,setRepeat] = useState('none')
  const next = ()=> setStep(2)
  const save = ()=>{ if(!title.trim()) return; onCreate({ id: uid(), title, listId, done:false, due, priority, tags: tags.split(',').map(s=>s.trim()).filter(Boolean), repeat, createdAt: new Date().toISOString() }); setTitle(''); setStep(1) }
  return (<div className="card">
    {step===1 && (<div className="row" style={{gap:8}}>
      <input className="input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Neue Aufgabe..." style={{flex:1}}/>
      <button className="btn primary" onClick={next}>Weiter</button>
    </div>)}
    {step===2 && (<div className="grid cols-3">
      <select className="input" value={listId} onChange={e=>setListId(e.target.value)}>{lists.map(l=><option key={l.id} value={l.id}>{l.name}</option>)}</select>
      <input className="input" type="date" value={due} onChange={e=>setDue(e.target.value)} />
      <select className="input" value={priority} onChange={e=>setPriority(e.target.value)}>
        <option value="none">Prio: Keine</option><option value="low">Prio: Niedrig</option><option value="med">Prio: Mittel</option><option value="high">Prio: Hoch</option>
      </select>
      <select className="input" value={repeat} onChange={e=>setRepeat(e.target.value)}>
        <option value="none">Wiederholung: Keine</option><option value="daily">Täglich</option><option value="weekly">Wöchentlich</option>
      </select>
      <input className="input" value={tags} onChange={e=>setTags(e.target.value)} placeholder="Tags (kommagetrennt)" />
      <div></div><div></div>
      <div className="row" style={{justifyContent:'flex-end', gap:8}}>
        <button className="btn" onClick={()=>setStep(1)}>Zurück</button>
        <button className="btn success" onClick={save}>Speichern</button>
      </div>
    </div>)}
  </div>)
}
