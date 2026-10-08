import { createServer } from "vite";
import config from "../vite.config.mjs";

const server = await createServer({
  ...config,
  configFile: false,
  server: {
    host: "0.0.0.0",
    port: 4173,
    strictPort: true,
    watch: {
      ignored: ["**/*.glb", "**/*.gltf"],
    },
  },
});

await server.listen();
console.log("Dev server listening on http://localhost:4173");
