import { apps } from "../data/catalog";
import { AppTile } from "../components/Card";
export default function Apps() {
  return (<div><h1>Apps</h1><p className="muted">These open in the built-in browser. Some sites may not work through the proxy.</p>
    <div className="grid wide">{apps.map((a) => <AppTile key={a.id} a={a} />)}</div></div>);
}
