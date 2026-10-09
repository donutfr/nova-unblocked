import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { server as wisp, logging } from "@mercuryworkshop/wisp-js/server";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { scramjetPath } from "@mercuryworkshop/scramjet/path";
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const blocked = (process.env.HOSTNAME_BLOCKLIST || "").split(",").map((s) => s.trim()).filter(Boolean)
  .map((h) => new RegExp(h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
logging.set_level(logging.NONE);
Object.assign(wisp.options, { allow_udp_streams: false, hostname_blacklist: blocked, dns_servers: ["1.1.1.3", "1.0.0.3"] });

const app = Fastify({
  serverFactory: (handler) => createServer()
    .on("request", (req, res) => {
      res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
      handler(req, res);
    })
    .on("upgrade", (req, socket, head) => {
      if (req.url.endsWith("/wisp/")) wisp.routeRequest(req, socket, head); else socket.end();
    }),
});
app.register(fastifyStatic, { root: dist, decorateReply: true });
app.register(fastifyStatic, { root: scramjetPath, prefix: "/scram/", decorateReply: false });
app.register(fastifyStatic, { root: libcurlPath, prefix: "/libcurl/", decorateReply: false });
app.register(fastifyStatic, { root: baremuxPath, prefix: "/baremux/", decorateReply: false });
// SPA fallback: unknown paths get the app shell, which renders its own 404 page
app.setNotFoundHandler((req, reply) => reply.type("text/html").sendFile("index.html"));
const shutdown = () => { app.close(); process.exit(0); };
process.on("SIGINT", shutdown); process.on("SIGTERM", shutdown);
app.listen({ port: parseInt(process.env.PORT) || 8080, host: "0.0.0.0" });
