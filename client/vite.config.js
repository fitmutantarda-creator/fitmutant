import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Build-time environment variables
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [react()],
    server: {
      host: "127.0.0.1",
      port: 5173,
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:5000",
          changeOrigin: true,
          rewrite: (path) => path,
          secure: false,
          ws: true,
        },
      },
    },
    define: {
      __API_URL__: JSON.stringify(env.VITE_API_URL),
      __ENV__: JSON.stringify(env.VITE_ENV),
    },
    build: {
      outDir: "dist",
      sourcemap: false,
      minify: "terser",
    },
  };
});