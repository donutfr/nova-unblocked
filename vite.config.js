import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const t = "http://localhost:" + (process.env.PORT || 8080);
export default defineConfig({ plugins: [react()],
  server: { proxy: { "/scram": t, "/baremux": t, "/libcurl": t, "/wisp": { target: t, ws: true } } } });
