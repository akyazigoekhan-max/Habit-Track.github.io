
import React, { useEffect, useState } from 'react'
import { clamp } from './utils'
export default function TimerView(){
  const [mode,setMode] = useState('work')
  const [work,setWork] = useState(25)
  const [brk,setBrk] = useState(5)
  const [min,setMin] = useState(25)
  const [sec,setSec] = useState(0)
  const [running,setRunning] = useState(false)
  useEffect(()=>{ if(!running) return; const id = setInterval(()=>{ setSec(s=>{ if(s>0) return s-1; if(min>0){ setMin(m=>m-1); return 59 } clearInterval(id); setRunning(false); if(mode==='work'){ setMode('break'); setMin(brk); setSec(0); alert('Arbeitszeit vorbei – Pause!') } else { setMode('work'); setMin(work); setSec(0); alert('Pause vorbei – weiter!') } return 0 }) },1000); return ()=>clearInterval(id) },[running, min, sec, mode, work, brk])
  const start = ()=> setRunning(true); const stop = ()=> setRunning(false); const reset = ()=>{ setRunning(false); setMode('work'); setMin(work); setSec(0) }
  useEffect(()=>{ if(mode==='work'){ setMin(work); setSec(0) } },[work, mode])
  useEffect(()=>{ if(mode==='break'){ setMin(brk); setSec(0) } },[brk, mode])
  return (<div className="card">
    <div className="row" style={{justifyContent:'space-between'}}>
      <div><div className="muted" style={{fontSize:12}}>{mode==='work'?'Arbeitszeit':'Pause'}</div>
        <div style={{fontFamily:'ui-monospace, SFMono-Regular', fontSize:48}}>{String(min).padStart(2,'0')}:{String(sec).padStart(2,'0')}</div></div>
      <div className="grid" style={{gap:8}}>
        <div className="row" style={{gap:8}}>
          <select className="input" value={work} onChange={e=>setWork(clamp(Number(e.target.value),1,90))}>
            {[...Array(90)].map((_,i)=>(<option key={i+1} value={i+1}>{i+1} min Arbeit</option>))}
          </select>
          <select className="input" value={brk} onChange={e=>setBrk(clamp(Number(e.target.value),5,20))}>
            {[5,10,15,20].map(m=>(<option key={m} value={m}>{m} min Pause</option>))}
          </select>
        </div>
        <div className="row" style={{gap:8, justifyContent:'flex-end'}}>
          {!running && <button className="btn primary" onClick={start}>Start</button>}
          {running && <button className="btn" onClick={stop}>Stop</button>}
          <button className="btn" onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  </div>)
}
