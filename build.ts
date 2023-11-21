import postcssPlugin from "./postcssPlugin.ts";
import sveltePlugin from "./sveltePlugin.ts";

await Bun.build({
  entrypoints: ["./src/index.ts"],
  plugins: [postcssPlugin, sveltePlugin],
  outdir: "./build",
  loader: {
    ".css": "text",
  },
});
