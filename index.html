<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Habit Tracker</title>
<style>
  body { font-family: Arial, sans-serif; background: #f0f4f8; color: #333; margin:0; padding:0;}
  header { background: #1e3a8a; color: white; padding: 1rem; text-align: center;}
  nav { display: flex; justify-content: center; background: #3b82f6;}
  nav button { background: transparent; border: none; color: white; padding: 1rem; cursor: pointer; font-size: 1rem;}
  nav button.active { background: #2563eb;}
  section { display: none; padding: 1rem;}
  section.active { display: block;}
  input, select, button { padding: 0.5rem; margin: 0.2rem 0; border-radius: 4px; border: 1px solid #ccc;}
  button { cursor: pointer;}
  .habit-item { display: flex; justify-content: space-between; padding:0.5rem; margin-bottom:0.3rem; background:#e0f2fe; border-radius:4px;}
  .calendar { display:grid; grid-template-columns: repeat(7, 1fr); gap:2px; margin-bottom:1rem;}
  .day { background:#dbeafe; padding:0.5rem; text-align:center; border-radius:4px;}
  .day.completed { background:#4ade80; color:white;}
  .timer-display { font-size:2rem; margin-bottom:0.5rem;}
  .streak-bar { display:flex; gap:2px; margin-top:0.2rem;}
  .streak-bar div { width:10px; height:20px; background:#93c5fd;}
  .streak-bar div.off { background:#d1d5db;}
</style>
</head>
<body>

<header><h1>Habit Tracker</h1></header>

<nav>
  <button class="tab-btn active" data-tab="habits">Habits</button>
  <button class="tab-btn" data-tab="calendar">Kalender</button>
  <button class="tab-btn" data-tab="timer">Fokus Timer</button>
  <button class="tab-btn" data-tab="routines">Routinen</button>
  <button class="tab-btn" data-tab="stats">Statistik</button>
</nav>

<section id="habits" class="active">
  <h2>Deine Habits</h2>
  <input type="text" id="newHabit" placeholder="Neues Habit">
  <button id="addHabit">Hinzufügen</button>
  <ul id="habitList"></ul>
</section>

<section id="calendar">
  <h2>Kalender</h2>
  <div class="calendar" id="monthCalendar"></div>
</section>

<section id="timer">
  <h2>Fokus Timer</h2>
  <div>
    <label>Dauer (Minuten):</label>
    <select id="timerDuration">
      ${Array.from({length: 90}, (_, i) => `<option value="${i+1}">${i+1}</option>`).join('')}
    </select>
    <button id="startTimer">Start</button>
    <button id="pauseTimer">Pause</button>
    <button id="resetTimer">Reset</button>
  </div>
  <div class="timer-display" id="timerDisplay">00:00</div>
  <div>
    <label>Nach Timer Pause (Minuten):</label>
    <select id="breakDuration">
      ${Array.from({length:16}, (_, i)=> `<option value="${i+5}">${i+5}</option>`).join('')}
    </select>
  </div>
</section>

<section id="routines">
  <h2>Routinen</h2>
  <input type="text" id="newRoutine" placeholder="Neue Routine">
  <button id="addRoutine">Hinzufügen</button>
  <ul id="routineList"></ul>
</section>

<section id="stats">
  <h2>Statistik</h2>
  <div id="streakStats"></div>
</section>

<script>
document.addEventListener("DOMContentLoaded", () => {

  // Tabs
  const tabs = document.querySelectorAll(".tab-btn");
  const sections = document.querySelectorAll("section");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const tabId = tab.dataset.tab;
      sections.forEach(sec => sec.classList.remove("active"));
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Habits
  let habits = JSON.parse(localStorage.getItem("habits")||"[]");
  const habitList = document.getElementById("habitList");
  const newHabitInput = document.getElementById("newHabit");

  function saveHabits(){ localStorage.setItem("habits", JSON.stringify(habits)); }
  function renderHabits(){
    habitList.innerHTML = "";
    habits.forEach((h,i)=>{
      const li = document.createElement("li");
      li.className="habit-item";
      li.innerHTML = `<span>${h.title}</span> <button data-id="${i}">${h.completed? "✅":"⭕"}</button>`;
      habitList.appendChild(li);
    });
  }
  renderHabits();

  document.getElementById("addHabit").addEventListener("click", ()=>{
    if(newHabitInput.value.trim()){
      habits.push({title:newHabitInput.value, completed:false});
      newHabitInput.value="";
      saveHabits();
      renderHabits();
    }
  });

  habitList.addEventListener("click", e=>{
    if(e.target.tagName==="BUTTON"){
      const id = e.target.dataset.id;
      habits[id].completed = !habits[id].completed;
      saveHabits();
      renderHabits();
    }
  });

  // Timer
  let timerInterval=null;
  let remaining=0;
  const timerDisplay = document.getElementById("timerDisplay");
  const timerDuration = document.getElementById("timerDuration");
  const breakDuration = document.getElementById("breakDuration");

  function updateTimerDisplay(){ 
    const m = String(Math.floor(remaining/60)).padStart(2,"0");
    const s = String(remaining%60).padStart(2,"0");
    timerDisplay.textContent = `${m}:${s}`;
  }

  document.getElementById("startTimer").addEventListener("click", ()=>{
    if(!timerInterval){
      remaining = parseInt(timerDuration.value)*60;
      timerInterval = setInterval(()=>{
        if(remaining>0){ remaining--; updateTimerDisplay(); } 
        else { clearInterval(timerInterval); timerInterval=null; alert("Timer beendet!"); }
      },1000);
    }
  });

  document.getElementById("pauseTimer").addEventListener("click", ()=>{
    clearInterval(timerInterval);
    timerInterval=null;
  });

  document.getElementById("resetTimer").addEventListener("click", ()=>{
    clearInterval(timerInterval); timerInterval=null; remaining=parseInt(timerDuration.value)*60; updateTimerDisplay();
  });

  updateTimerDisplay();

  // Routinen
  let routines = JSON.parse(localStorage.getItem("routines")||"[]");
  const routineList = document.getElementById("routineList");
  const newRoutineInput = document.getElementById("newRoutine");

  function saveRoutines(){ localStorage.setItem("routines", JSON.stringify(routines)); }
  function renderRoutines(){
    routineList.innerHTML="";
    routines.forEach((r,i)=>{
      const li = document.createElement("li");
      li.textContent=r.title;
      routineList.appendChild(li);
    });
  }
  renderRoutines();

  document.getElementById("addRoutine").addEventListener("click", ()=>{
    if(newRoutineInput.value.trim()){
      routines.push({title:newRoutineInput.value});
      newRoutineInput.value="";
      saveRoutines();
      renderRoutines();
    }
  });

  // Kalender Monatsansicht
  const monthCalendar = document.getElementById("monthCalendar");
  function renderCalendar(){
    monthCalendar.innerHTML="";
    const now = new Date();
    const days = new Date(now.getFullYear(), now.getMonth()+1,0).getDate();
    for(let i=1;i<=days;i++){
      const div = document.createElement("div");
      div.className="day";
      div.textContent=i;
      monthCalendar.appendChild(div);
    }
  }
  renderCalendar();

});
</script>

</body>
</html>
