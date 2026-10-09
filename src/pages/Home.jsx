import { Link, useNavigate } from "react-router-dom";
import { Shuffle, Gamepad2, Compass } from "lucide-react";
import { catalog, CATEGORIES } from "../data/catalog";
import Card from "../components/Card";
export default function Home({ s }) {
  const nav = useNavigate();
  const by = (ids) => ids.map((i) => catalog.find((g) => g.id === i)).filter(Boolean);
  const row = (t, list, more) => list.length > 0 && (<section><div className="sh"><h2>{t}</h2>{more && <Link to={more}>See all</Link>}</div>
    <div className="grid">{list.map((g) => <Card key={g.id} g={g} fav={s.favs.includes(g.id)} onFav={s.toggleFav} />)}</div></section>);
  return (<div>
    <div className="hero"><div><h1>Play. Explore. <span className="grad">Chill.</span></h1><p>{catalog.length} games and a built-in browser, all in one place.</p>
      <div className="row"><Link className="btn" to="/games"><Gamepad2 size={16} /> Browse games</Link>
        <button className="btn ghost" onClick={() => nav("/play/" + catalog[Math.floor(Math.random() * catalog.length)].id)}><Shuffle size={16} /> Surprise me</button>
        <Link className="btn ghost" to="/browse"><Compass size={16} /> Open browser</Link></div></div></div>
    {row("Continue playing", by(s.recents).slice(0, 6))}{row("Your favorites", by(s.favs))}
    {row("Trending", [...catalog].sort((a, b) => b.popularity - a.popularity).slice(0, 6), "/games")}
    {row("New", [...catalog].sort((a, b) => b.added.localeCompare(a.added)).slice(0, 6), "/games?sort=new")}
    <section><div className="sh"><h2>Categories</h2></div><div className="row wrap">{CATEGORIES.map((c) => <Link key={c} className="chip" to={`/games?c=${c}`}>{c}</Link>)}</div></section></div>);
}
