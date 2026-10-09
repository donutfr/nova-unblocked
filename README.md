# Nova

React + Vite frontend, Fastify backend, and a [Scramjet](https://github.com/MercuryWorkshop/Scramjet-App) in-browser web proxy (the "Browse" page).
The proxy setup follows the official Scramjet-App example: service worker, bare-mux, and the libcurl transport over Wisp.

## Run

    npm install
    npm run serve        # builds the frontend, then starts the server on :8080

Node 18+. `npm run dev` runs Vite alone and forwards /scram, /baremux, /libcurl and /wisp to a separately started `npm start`.

## Configure (see .env.example)

- `VITE_SEARCH_URL`: default search template, `%s` = the query (build-time). Users can change it in Settings. No API keys are needed; it opens a normal search page through the proxy.
- `VITE_WISP_PATH`: Wisp websocket path (default `/wisp/`; the server only routes `/wisp/`).
- `PORT`, `HOSTNAME_BLOCKLIST`: server port, and comma-separated hostnames the server refuses to connect to.
- Library entries live in `src/data/catalog.js` (games and apps). Themes live in `src/data/themes.js`. `src` can be a local `/embed/*.html` file or any embeddable URL you have rights to use.

## Deploy

Frontend and proxy backend are ONE Node process on ONE origin. The service worker must be same-origin, so the proxy cannot live on a separate domain.
Run it on a VPS or container you control, behind HTTPS (nginx or Caddy), and forward WebSocket upgrades for `/wisp/`.
Service workers require HTTPS except on localhost. Keep the COOP/COEP headers the server sets.
Only deploy on infrastructure you control, and add rate limiting and a hostname blocklist before exposing it publicly.

## Known limits

Scramjet is experimental and some sites will break. CAPTCHAs and video sites work best from a non-datacenter IP.
Pinned to scramjet 1.1.0, matching Scramjet-App.

## Bundled games and licenses

Each game lives in `public/embed/<name>/` with its original license file. Third-party ads and analytics were removed.
- 2048 by Gabriele Cirulli (MIT)
- javascript-tetris and javascript-racer by Jake Gordon (MIT)
- HexGL by Thibaut Despoulain (MIT)
- Hextris (GPL-3.0; its source is served unminified from this folder)
- Serpent and Brick Rush are original and tiny.

To add a game, copy its folder into `public/embed/`, check its license, strip external scripts (the server's cross-origin isolation blocks them), and add an entry to `src/data/catalog.js`.
