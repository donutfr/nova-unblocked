// Central catalog. `src` = local /embed/ file or an embeddable URL you have rights to use.
import { imported } from "./imported.js";
export const CATEGORIES = ["Action", "Racing", "Puzzle", "Arcade", "Platformer", "Multiplayer"];
const D = "2026-10-09";
const manual = [
  { id: "hexgl", title: "HexGL", category: "Racing", src: "/embed/hexgl/index.html", emoji: "🚀", accent: "#0ea5e9", popularity: 94, added: D, credit: "HexGL by Thibaut Despoulain (MIT)", description: "Futuristic anti-gravity racer in 3D. Needs WebGL." },
  { id: "2048", title: "2048", category: "Puzzle", src: "/embed/g2048/index.html", emoji: "🔢", accent: "#d97706", popularity: 98, added: D, credit: "Gabriele Cirulli (MIT)", description: "Slide tiles and merge matching numbers to reach 2048." },
  { id: "tetris", title: "Block Stack", category: "Puzzle", src: "/embed/tetris/index.html", emoji: "🧩", accent: "#0891b2", popularity: 95, added: D, credit: "Jake Gordon (MIT)", description: "Rotate and drop falling blocks to clear lines." },
  { id: "racer", title: "Road Rush", category: "Racing", src: "/embed/racer/index.html", emoji: "🏎️", accent: "#dc2626", popularity: 92, added: D, credit: "Jake Gordon (MIT)", description: "Pseudo-3D racing. Arrow keys to steer and accelerate." },
  { id: "serpent", title: "Serpent", category: "Arcade", src: "/embed/snake.html", emoji: "🐍", accent: "#7c3aed", popularity: 90, added: "2026-10-01", description: "Guide the serpent, eat, grow, avoid yourself." },
  { id: "hex", title: "Hexa Fall", category: "Arcade", src: "/embed/hextris/index.html", emoji: "⬡", accent: "#9333ea", popularity: 88, added: D, credit: "Hextris (GPL-3.0)", description: "Rotate the hexagon to match falling blocks." },
  { id: "brick-rush", title: "Brick Rush", category: "Arcade", src: "/embed/breakout.html", emoji: "🧱", accent: "#2563eb", popularity: 80, added: "2026-10-05", description: "Clear every brick with a bouncing ball." },
];
export const catalog = [...manual, ...imported];
// Apps open inside Browse (through the proxy). Site compatibility varies.
export const apps = [
  { id: "wiki", name: "Wikipedia", url: "https://en.wikipedia.org", emoji: "📚", accent: "#475569", description: "The free encyclopedia." },
  { id: "desmos", name: "Desmos", url: "https://www.desmos.com/calculator", emoji: "📈", accent: "#16a34a", description: "Graphing calculator." },
  { id: "khan", name: "Khan Academy", url: "https://www.khanacademy.org", emoji: "🎓", accent: "#0d9488", description: "Free lessons and practice." },
  { id: "archive", name: "Internet Archive", url: "https://archive.org", emoji: "🏛️", accent: "#b45309", description: "Books, media and the Wayback Machine." },
  { id: "osm", name: "OpenStreetMap", url: "https://www.openstreetmap.org", emoji: "🗺️", accent: "#65a30d", description: "Collaborative world map." },
  { id: "ddg", name: "DuckDuckGo", url: "https://duckduckgo.com", emoji: "🦆", accent: "#ea580c", description: "Private web search." },
  { id: "gutenberg", name: "Project Gutenberg", url: "https://www.gutenberg.org", emoji: "📖", accent: "#7c2d12", description: "Free public-domain books." },
  { id: "weather", name: "Weather.gov", url: "https://www.weather.gov", emoji: "⛅", accent: "#0284c7", description: "US forecasts." },
];
