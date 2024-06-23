/* eslint-disable import/no-extraneous-dependencies */
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { defineConfig, loadEnv } from "vite";
import checker from "vite-plugin-checker";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const config = {
    plugins: [
      laravel({
        input: ["resources/css/app.css", "resources/js/index.tsx"],
        refresh: true,
      }),
      react(),
      checker({ typescript: true }),
      {
        handleHotUpdate({ file, server }) {
          if (file.endsWith(".blade.php")) {
            server.ws.send({ path: "*", type: "full-reload" });
          }
        },
        name: "blade",
      },
    ],
    build: {
      sourcemap: true,
      rollupOptions: {
        onLog(level, log, handler) {
          if (
            log.cause &&
            log.cause.message === `Can't resolve original location of error.`
          ) {
            return;
          }
          handler(level, log);
        },
      },
    },
  };
  return defineConfig(config);
};
