// Speicher-Helper
function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function load(key, fallback) {
  return JSON.parse(localStorage.getItem(key)) || fallback;
}

// Globale States
let habits = load("habits", []);
let rewardPoints = load("points", 0);
let routines = load("routines", []);
let calendarEvents = load("calendar", []);

let currentTab = "habits";
render();

// Tab-Wechsel
document.querySelectorAll("nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    currentTab = btn.dataset.tab;
    render();
  });
});

// Renderer
function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  if (currentTab === "habits") renderHabits(app);
  if (currentTab === "calendar") renderCalendar(app);
  if (currentTab === "timer") renderTimer(app);
  if (currentTab === "stats") renderStats(app);
  if (currentTab === "routines") renderRoutines(app);
}

/* ---------------- Habits ---------------- */
function renderHabits(app) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h2>Habits</h2>
    <input id="newHabit" placeholder="Neues Habit" />
    <button id="addHabit">Hinzufügen</button>
    <ul id="habitList"></ul>
    <p>Punkte: ${rewardPoints} ⭐</p>
  `;
  app.appendChild(card);

  document.getElementById("addHabit").onclick = () => {
    const val = document.getElementById("newHabit").value.trim();
    if (val) {
      habits.push({ id: Date.now(), title: val, dates: [] });
      save("habits", habits);
      render();
    }
  };

  const ul = card.querySelector("#habitList");
  const today = new Date().toDateString();
  habits.forEach(h => {
    const li = document.createElement("li");
    const done = h.dates.includes(today);
    li.innerHTML = `
      ${h.title}
      <button>${done ? "✅" : "⭕"}</button>
    `;
    li.querySelector("button").onclick = () => {
      if (done) {
        h.dates = h.dates.filter(d => d !== today);
        rewardPoints = Math.max(0, rewardPoints - 10);
      } else {
        h.dates.push(today);
        rewardPoints += 10;
      }
      save("habits", habits);
      save("points", rewardPoints);
      render();
    };
    ul.appendChild(li);
  });
}

/* ---------------- Kalender ---------------- */
function renderCalendar(app) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<h2>Kalender</h2>
    <div id="month"></div>
    <h3>Tagesansicht</h3>
    <div id="dayView"></div>
  `;
  app.appendChild(card);

  const now = new Date();
  const days = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  const monthDiv = card.querySelector("#month");

  for (let i = 1; i <= days; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), i).toDateString();
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.style.margin = "2px";
    btn.style.background = calendarEvents.some(e => e.date === d) ? "#10b981" : "#e5e7eb";
    btn.onclick = () => showDay(d);
    monthDiv.appendChild(btn);
  }

  function showDay(dayStr) {
    const dayView = card.querySelector("#dayView");
    dayView.innerHTML = "";
    for (let h = 0; h < 24; h++) {
      const hourBlock = document.createElement("div");
      hourBlock.textContent = `${h}:00 - `;
      const event = calendarEvents.find(e => e.date === dayStr && e.hour === h);
      if (event) {
        hourBlock.textContent += event.title;
      } else {
        const addBtn = document.createElement("button");
        addBtn.textContent = "+";
        addBtn.onclick = () => {
          const title = prompt("Habit/Event eintragen:");
          if (title) {
            calendarEvents.push({ date: dayStr, hour: h, title });
            save("calendar", calendarEvents);
            showDay(dayStr);
          }
        };
        hourBlock.appendChild(addBtn);
      }
      dayView.appendChild(hourBlock);
    }
  }
}

/* ---------------- Timer ---------------- */
let timerInterval;
let timeRemaining = 0;
function renderTimer(app) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h2>Fokus Timer</h2>
    <label>Dauer: </label>
    <select id="duration">${Array.from({length:90},(_,i)=>`<option>${i+1}</option>`).join("")}</select> Min
    <button id="startTimer">Start</button>
    <p id="timerDisplay">00:00</p>
    <label>Pause: </label>
    <select id="break"><option>5</option><option>10</option><option>15</option><option>20</option></select> Min
  `;
  app.appendChild(card);

  document.getElementById("startTimer").onclick = () => {
    timeRemaining = parseInt(document.getElementById("duration").value) * 60;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeRemaining--;
      updateTimer();
      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        alert("Zeit vorbei! Pause starten.");
        timeRemaining = parseInt(document.getElementById("break").value) * 60;
        timerInterval = setInterval(() => {
          timeRemaining--;
          updateTimer();
          if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Pause vorbei!");
          }
        }, 1000);
      }
    }, 1000);
  };

  function updateTimer() {
    const min = Math.floor(timeRemaining/60);
    const sec = String(timeRemaining%60).padStart(2,"0");
    document.getElementById("timerDisplay").textContent = `${min}:${sec}`;
  }
}

/* ---------------- Statistik ---------------- */
function renderStats(app) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<h2>Statistik</h2><canvas id="chart" width="300" height="150"></canvas>`;
  app.appendChild(card);

  const ctx = card.querySelector("#chart").getContext("2d");
  const done = habits.filter(h => h.dates.includes(new Date().toDateString())).length;
  const total = habits.length;
  const percent = total ? Math.round((done/total)*100) : 0;

  ctx.fillStyle = "#3b82f6";
  ctx.fillRect(0, 0, percent*3, 50);
  ctx.fillStyle = "#111";
  ctx.fillText(percent+"% erledigt heute", 10, 80);
}

/* ---------------- Routinen ---------------- */
function renderRoutines(app) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h2>Routinen</h2>
    <input id="routineTitle" placeholder="Routine-Name" />
    <button id="addRoutine">Hinzufügen</button>
    <ul id="routineList"></ul>
  `;
  app.appendChild(card);

  document.getElementById("addRoutine").onclick = () => {
    const title = document.getElementById("routineTitle").value.trim();
    if (title) {
      routines.push({ id: Date.now(), title });
      save("routines", routines);
      render();
    }
  };

  const ul = card.querySelector("#routineList");
  routines.forEach(r => {
    const li = document.createElement("li");
    li.textContent = r.title + " ";
    const btn = document.createElement("button");
    btn.textContent = "Zum Kalender";
    btn.onclick = () => {
      const date = prompt("Datum (YYYY-MM-DD):");
      const hour = parseInt(prompt("Uhrzeit (0-23):"));
      if (date && !isNaN(hour)) {
        const d = new Date(date).toDateString();
        calendarEvents.push({ date: d, hour, title: r.title });
        save("calendar", calendarEvents);
        alert("Routine eingetragen!");
      }
    };
    li.appendChild(btn);
    ul.appendChild(li);
  });
}