
export const uid = () => crypto?.randomUUID?.() || (Date.now().toString(36)+Math.random().toString(36).slice(2));
export const todayISO = () => new Date().toISOString().slice(0,10);
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export function formatDate(iso){ const d = new Date(iso+'T00:00:00'); return d.toLocaleDateString(undefined,{weekday:'short', day:'2-digit', month:'short'}) }
