import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from "vite";
import vitePluginWindicss from "vite-plugin-windicss";

// module.exports = defineConfig(({ command, mode }) => {
//   const isProduction = mode === "production";
//   return {
//     plugins: [
//       svelte(),
//       vitePluginWindicss({
//         transformCSS: "pre",
//       }),
//     ],
//     build: {
//       minify: isProduction,
//     },
//   };
// });

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === "production";
  return {
    plugins: [
      svelte(),
      vitePluginWindicss({
        transformCSS: "pre",
      }),
    ],
    build: {
      minify: isProduction,
    },
  };
});