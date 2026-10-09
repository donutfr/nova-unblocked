import { Routes, Route, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, Home as H, Gamepad2, LayoutGrid, Compass, Settings as St, Search, Globe } from "lucide-react";
import { useLocal } from "./hooks/useLocal";
import { SEARCH_DEFAULT } from "./utils/resolve";
import { THEMES } from "./data/themes";
import { catalog, apps } from "./data/catalog";
import Home from "./pages/Home"; import Games from "./pages/Games"; import Apps from "./pages/Apps"; import Player from "./pages/Player";
import Browse from "./pages/Browse"; import Settings from "./pages/Settings"; import NotFound from "./pages/NotFound";

export default function App() {
  const [favs, setFavs] = useLocal("nova.favs", []); const [recents, setRecents] = useLocal("nova.recents", []);
  const [searches, setSearches] = useLocal("nova.searches", []); const [theme, setTheme] = useLocal("nova.theme", "midnight");
  const [accent, setAccent] = useLocal("nova.accent", ""); const [motion, setMotion] = useLocal("nova.motion", true);
  const [engine, setEngine] = useLocal("nova.engine", SEARCH_DEFAULT); const [open, setOpen] = useState(innerWidth > 900);
  const s = { favs, setFavs, recents, setRecents, searches, setSearches, theme, setTheme, accent, setAccent, motion, setMotion, engine, setEngine,
    toggleFav: (id) => setFavs((f) => f.includes(id) ? f.filter((x) => x !== id) : [...f, id]),
    addRecent: (id) => setRecents((r) => [id, ...r.filter((x) => x !== id)].slice(0, 12)),
    addSearch: (q) => q && setSearches((r) => [q, ...r.filter((x) => x !== q)].slice(0, 10)) };
  const nav = useNavigate(); const loc = useLocation(); const input = useRef();
  const [q, setQ] = useState(""); const [focus, setFocus] = useState(false);

  useEffect(() => {
    const t = THEMES.find((x) => x.id === theme) || THEMES[0], r = document.documentElement.style;
    for (const k of ["bg", "panel", "line", "tx", "mu"]) r.setProperty("--" + k, t[k]);
    r.setProperty("--ac", accent || t.ac); r.setProperty("--ac2", t.ac2);
    document.documentElement.dataset.motion = motion ? "on" : "off"; document.documentElement.style.colorScheme = theme === "snow" ? "light" : "dark";
  }, [theme, accent, motion]);
  useEffect(() => { const k = (e) => { if (e.key === "/" && !/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); input.current?.focus(); } }; addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, []);
  useEffect(() => { setQ(""); setFocus(false); if (innerWidth < 900) setOpen(false); }, [loc.pathname]);

  const hits = useMemo(() => { const n = q.trim().toLowerCase(); if (!n) return [];
    return [...catalog.filter((g) => g.title.toLowerCase().includes(n)).slice(0, 4).map((g) => ({ k: "g" + g.id, label: g.title, sub: "Game", emoji: g.emoji, to: "/play/" + g.id })),
      ...apps.filter((a) => a.name.toLowerCase().includes(n)).slice(0, 3).map((a) => ({ k: "a" + a.id, label: a.name, sub: "App", emoji: a.emoji, to: "/browse?u=" + encodeURIComponent(a.url) }))]; }, [q]);
  const submit = (e) => { e.preventDefault(); if (!q.trim()) return; nav("/browse?q=" + encodeURIComponent(q.trim())); };
  const links = [["/", H, "Home"], ["/games", Gamepad2, "Games"], ["/apps", LayoutGrid, "Apps"], ["/browse", Compass, "Browse"], ["/settings", St, "Settings"]];

  return (<div className={"app" + (open ? "" : " closed")}>
    <aside><div className="brand"><span className="mark">✦</span><b>Nova</b></div>
      <nav>{links.map(([to, I, t]) => <NavLink key={to} to={to} end={to === "/"}><I size={19} /><span>{t}</span></NavLink>)}</nav>
      <div className="foot muted">Press <kbd>/</kbd> to search</div></aside>
    <header><button className="icon" onClick={() => setOpen(!open)} aria-label="Toggle menu"><Menu size={19} /></button>
      <form className="search" onSubmit={submit}><Search size={16} />
        <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setTimeout(() => setFocus(false), 150)} placeholder="Search games, apps, or the web" />
        {focus && q.trim() && <div className="drop">{hits.map((h) => <button type="button" key={h.k} onMouseDown={() => nav(h.to)}><span>{h.emoji}</span>{h.label}<small>{h.sub}</small></button>)}
          <button type="submit"><Globe size={16} />Search the web for “{q.trim()}”<small>Browse</small></button></div>}</form></header>
    <main><Routes><Route path="/" element={<Home s={s} />} /><Route path="/games" element={<Games s={s} />} /><Route path="/apps" element={<Apps />} />
      <Route path="/play/:id" element={<Player s={s} />} /><Route path="/browse" element={<Browse s={s} />} /><Route path="/settings" element={<Settings s={s} />} />
      <Route path="*" element={<NotFound />} /></Routes></main></div>);
}
