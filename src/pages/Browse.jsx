import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Home, RotateCw, ArrowRight } from "lucide-react";
import { resolve } from "../utils/resolve";
let ctl;
const STORES = ["config", "cookies", "redirectTrackers", "referrerPolicies", "publicSuffixList"];
/** Removes a stale/incomplete "$scramjet" IndexedDB (e.g. left by another proxy app on this origin) so Scramjet can recreate it. */
async function repairDB(force = false) {
  const complete = force ? false : await new Promise((res) => {
    const r = indexedDB.open("$scramjet");
    r.onupgradeneeded = () => r.transaction.abort(); // DB did not exist: don't create an empty one
    r.onerror = () => res(true);
    r.onsuccess = () => { const ok = STORES.every((n) => r.result.objectStoreNames.contains(n)); r.result.close(); res(ok); };
  });
  if (complete) return;
  for (const reg of await navigator.serviceWorker.getRegistrations()) await reg.unregister();
  await new Promise((res) => { const d = indexedDB.deleteDatabase("$scramjet"); d.onsuccess = d.onerror = d.onblocked = () => res(); setTimeout(res, 2000); });
}
async function boot() {
  if (ctl) return ctl;
  if (!navigator.serviceWorker) throw new Error("Service workers need HTTPS (or localhost).");
  if (!window.$scramjetLoadController || !window.BareMux) throw new Error("Proxy scripts not loaded. Run the Node server (npm run serve), not just Vite.");
  await repairDB();
  await navigator.serviceWorker.register("/sw.js");
  const { ScramjetController } = window.$scramjetLoadController();
  const c = new ScramjetController({ files: { wasm: "/scram/scramjet.wasm.wasm", all: "/scram/scramjet.all.js", sync: "/scram/scramjet.sync.js" } });
  await c.init();
  const conn = new window.BareMux.BareMuxConnection("/baremux/worker.js");
  const wisp = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + (import.meta.env.VITE_WISP_PATH || "/wisp/");
  if ((await conn.getTransport()) !== "/libcurl/index.mjs") await conn.setTransport("/libcurl/index.mjs", [{ websocket: wisp }]);
  return (ctl = c);
}
export default function Browse({ s }) {
  const [sp] = useSearchParams();
  const [val, setVal] = useState(""); const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false); const box = useRef(); const frame = useRef(); const cur = useRef("");
  async function go(e, preset) {
    e?.preventDefault(); setErr("");
    const text = preset ?? val; let url; try { url = resolve(text, s.engine); } catch (x) { return setErr(x.message); }
    setLoading(true);
    try {
      const c = await boot();
      if (!frame.current) { frame.current = c.createFrame(); frame.current.frame.className = "pframe"; box.current.appendChild(frame.current.frame);
        frame.current.frame.addEventListener("load", () => setLoading(false)); }
      cur.current = url; setActive(true); s.addSearch(text.trim()); frame.current.go(url);
      go.retried = false; setTimeout(() => setLoading(false), 15000);
    } catch (x) {
      ctl = null; frame.current = null;
      if (/object stores?/i.test(x.message) && !go.retried) { go.retried = true; await repairDB(true); return go(null, text); }
      go.retried = false; setErr("Could not start: " + x.message); setLoading(false);
    }
  }
  useEffect(() => { const t = sp.get('u') || sp.get('q'); if (t) { setVal(t); go(null, t); } }, [sp]);
  function home() { if (frame.current) { frame.current.frame.remove(); frame.current = null; } setActive(false); setLoading(false); setVal(""); }
  return (<div className="browse"><form className="row bar" onSubmit={go}>
    <button type="button" className="btn ghost" onClick={home} title="Home"><Home size={16} /></button>
    <button type="button" className="btn ghost" onClick={() => cur.current && (setLoading(true), frame.current.go(cur.current))} title="Reload"><RotateCw size={16} /></button>
    <input className="in grow" list="hist" value={val} onChange={(e) => setVal(e.target.value)} placeholder="Search or enter a URL" />
    <datalist id="hist">{s.searches.map((x) => <option key={x} value={x} />)}</datalist>
    <button className="btn"><ArrowRight size={16} /> Go</button></form>
    {err && <p className="err">{err}</p>}{loading && <div className="bar-load" />}
    {!active && <p className="muted">Enter an address or a search. Pages load through this site's own server.</p>}
    <div ref={box} className="pbox" style={{ display: active ? "block" : "none" }} /></div>);
}
