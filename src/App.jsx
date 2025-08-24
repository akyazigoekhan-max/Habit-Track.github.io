
import React, { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import TaskEditor from './components/TaskEditor.jsx'
import TaskList from './components/TaskList.jsx'
import CalendarView from './components/CalendarView.jsx'
import TimerView from './components/TimerView.jsx'
import StatsView from './components/StatsView.jsx'
import { load, save } from './components/Storage.js'

export default function App(){
  const [active, setActive] = useState('tasks')
  const [state, setState] = useState(()=>{
    const s = load()
    if(s.lists.length===0){ s.lists = [{id:'inbox', name:'Inbox'},{id:'arbeit', name:'Arbeit'},{id:'privat', name:'Privat'}] }
    return s
  })
  useEffect(()=> save(state), [state])
  const createTask = (t)=> setState(s=> ({...s, tasks:[t, ...s.tasks]}))
  const setTasks = (fn)=> setState(s=> ({...s, tasks: typeof fn==='function' ? fn(s.tasks) : fn}))
  const setEvents = (fn)=> setState(s=> ({...s, events: typeof fn==='function' ? fn(s.events) : fn}))
  return (<div>
    <Header active={active} setActive={setActive} />
    <div className="container">
      {active==='tasks' && (<><TaskEditor lists={state.lists} onCreate={createTask} /><TaskList lists={state.lists} tasks={state.tasks} setTasks={setTasks} filter="all" /></>)}
      {active==='timer' && (<TimerView />)}
      {active==='calendar' && (<CalendarView events={state.events} setEvents={setEvents} />)}
      {active==='stats' && (<StatsView tasks={state.tasks} />)}
    </div>
  </div>)
}
