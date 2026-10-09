import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, RotateCw, Maximize } from "lucide-react";
import { catalog } from "../data/catalog";
import NotFound from "./NotFound";
export default function Player({ s }) {
  const { id } = useParams(); const g = catalog.find((x) => x.id === id);
  const ref = useRef(); const [k, setK] = useState(0); const [loading, setLoading] = useState(true);
  useEffect(() => { if (g) s.addRecent(g.id); setLoading(true); }, [id]);
  if (!g) return <NotFound />;
  return (<div className="player"><div className="row"><Link className="btn ghost" to="/games"><ArrowLeft size={16} /> Back</Link>
    <h2 style={{ margin: 0, flex: 1 }}>{g.title}</h2>
    <button className="btn ghost" onClick={() => { setLoading(true); setK(k + 1); }}><RotateCw size={16} /></button>
    <button className="btn ghost" onClick={() => ref.current?.requestFullscreen?.().catch(() => {})}><Maximize size={16} /></button></div>
    <p className="muted">{g.description}{g.credit && <small> · {g.credit}</small>}</p>
    <div className="stage">{loading && <div className="load">Loading…</div>}<iframe key={k} ref={ref} src={g.src} title={g.title} allow="fullscreen; gamepad" onLoad={() => setLoading(false)} /></div></div>);
}
