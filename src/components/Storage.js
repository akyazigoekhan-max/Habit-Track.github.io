
const KEY = 'opentasks_state_v1';
export function load(){ try { return JSON.parse(localStorage.getItem(KEY)) || {lists:[], tasks:[], events:{}, settings:{}}; } catch(e){ return {lists:[], tasks:[], events:{}, settings:{}}; } }
export function save(state){ localStorage.setItem(KEY, JSON.stringify(state)); }
