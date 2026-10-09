import { THEMES } from "../data/themes";
import { SEARCH_DEFAULT } from "../utils/resolve";
export default function Settings({ s }) {
  const engines = [["DuckDuckGo", "https://duckduckgo.com/?q=%s"], ["Bing", "https://www.bing.com/search?q=%s"], ["Brave", "https://search.brave.com/search?q=%s"]];
  return (<div className="settings"><h1>Settings</h1>
    <section><h2>Theme</h2><div className="themes">{THEMES.map((t) => (
      <button key={t.id} className={"theme" + (s.theme === t.id ? " on" : "")} onClick={() => s.setTheme(t.id)} style={{ background: t.bg, color: t.tx, borderColor: s.theme === t.id ? "var(--ac)" : t.line }}>
        <span className="sw"><i style={{ background: t.ac }} /><i style={{ background: t.ac2 }} /><i style={{ background: t.panel }} /></span>{t.name}</button>))}</div></section>
    <section><h2>Accent color</h2><div className="row"><input type="color" value={s.accent || THEMES.find((t) => t.id === s.theme).ac} onChange={(e) => s.setAccent(e.target.value)} />
      <button className="chip" onClick={() => s.setAccent("")}>Reset to theme</button></div></section>
    <section><h2>Animations</h2><label className="row"><input type="checkbox" checked={s.motion} onChange={(e) => s.setMotion(e.target.checked)} /> Smooth transitions and hover effects</label></section>
    <section><h2>Search engine</h2><p className="muted">Used by the browser for anything that isn't a URL. <code>%s</code> = your query. Default: {SEARCH_DEFAULT}</p>
      <input className="in wide" value={s.engine} onChange={(e) => s.setEngine(e.target.value)} />
      <div className="row wrap">{engines.map(([n, u]) => <button key={n} className="chip" onClick={() => s.setEngine(u)}>{n}</button>)}</div></section>
    <section><h2>Data</h2><div className="row wrap">
      <button className="btn ghost" onClick={() => s.setRecents([])}>Clear recently played</button>
      <button className="btn ghost" onClick={() => s.setFavs([])}>Clear favorites</button>
      <button className="btn ghost" onClick={() => s.setSearches([])}>Clear search history</button></div></section></div>);
}
