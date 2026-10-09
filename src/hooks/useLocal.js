import { useState, useEffect } from "react";
export function useLocal(key, init) {
  const [v, setV] = useState(() => { try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : init; } catch { return init; } });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v]);
  return [v, setV];
}
