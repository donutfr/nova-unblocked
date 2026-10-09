import { Link } from "react-router-dom";
import { Heart, Play } from "lucide-react";
export default function Card({ g, fav, onFav }) {
  return (<Link to={`/play/${g.id}`} className="card">
    <div className="thumb" style={{ "--c": g.accent }}><span className="emo">{g.emoji}</span><span className="go"><Play size={18} fill="currentColor" /></span>
      <button aria-label="Favorite" className={"fav" + (fav ? " on" : "")} onClick={(e) => { e.preventDefault(); onFav(g.id); }}><Heart size={15} fill={fav ? "currentColor" : "none"} /></button></div>
    <div className="meta"><b>{g.title}</b><small>{g.category}</small></div></Link>);
}
export function AppTile({ a }) {
  return (<Link to={`/browse?u=${encodeURIComponent(a.url)}`} className="card app">
    <div className="thumb sm" style={{ "--c": a.accent }}><span className="emo">{a.emoji}</span></div>
    <div className="meta"><b>{a.name}</b><small>{a.description}</small></div></Link>);
}
