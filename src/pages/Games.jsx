import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { catalog, CATEGORIES } from "../data/catalog";
import Card from "../components/Card";
export default function Games({ s }) {
  const [sp, setSp] = useSearchParams();
  const q = (sp.get("q") || "").toLowerCase(), c = sp.get("c") || "", sort = sp.get("sort") || "popular", only = sp.get("fav") === "1";
  const list = catalog.filter((g) => (!c || g.category === c) && (!only || s.favs.includes(g.id)) && g.title.toLowerCase().includes(q))
    .sort((a, b) => sort === "name" ? a.title.localeCompare(b.title) : sort === "new" ? b.added.localeCompare(a.added) : b.popularity - a.popularity);
  const set = (k, v) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n, { replace: true }); };
  return (<div><h1>Games</h1>
    <div className="row wrap"><label className="field"><Search size={16} /><input placeholder="Filter games…" value={sp.get("q") || ""} onChange={(e) => set("q", e.target.value)} /></label>
      <select className="in" value={sort} onChange={(e) => set("sort", e.target.value)}><option value="popular">Most popular</option><option value="new">Newest</option><option value="name">A–Z</option></select>
      <button className={"chip" + (only ? " on" : "")} onClick={() => set("fav", only ? "" : "1")}>♥ Favorites</button></div>
    <div className="row wrap"><button className={"chip" + (!c ? " on" : "")} onClick={() => set("c", "")}>All</button>
      {CATEGORIES.map((k) => <button key={k} className={"chip" + (c === k ? " on" : "")} onClick={() => set("c", k)}>{k}</button>)}</div>
    {list.length ? <div className="grid">{list.map((g) => <Card key={g.id} g={g} fav={s.favs.includes(g.id)} onFav={s.toggleFav} />)}</div>
      : <p className="muted">Nothing matches. Add games in src/data/catalog.js.</p>}</div>);
}
