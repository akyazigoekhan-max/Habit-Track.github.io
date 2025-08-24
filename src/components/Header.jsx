
import React from 'react'
export default function Header({active, setActive}){
  const tabs = [['tasks','Aufgaben'],['timer','Timer'],['calendar','Kalender'],['stats','Statistik']]
  return (<div className="container">
    <div className="row" style={{justifyContent:'space-between', marginBottom:16}}>
      <div className="row" style={{gap:10}}>
        <div style={{width:36,height:36,borderRadius:12,background:'linear-gradient(135deg,#38bdf8,#22c55e)'}}></div>
        <div><div style={{fontWeight:700}}>OpenTasks</div><div className="muted" style={{fontSize:12}}>frei & lokal</div></div>
      </div>
      <div className="tabs">{tabs.map(([id,label])=> (<div key={id} className={`tab ${active===id?'active':''}`} onClick={()=>setActive(id)}>{label}</div>))}</div>
    </div></div>)
}
