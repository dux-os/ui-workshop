import type { BunPlugin, PluginBuilder } from "bun";
import svelteConfig from "./svelte.config.js";
import { compile, preprocess } from "svelte/compiler";

/**
 * A bun plugin to load .svelte files.
 * It reads svelte.config.js to obtain configuration options.
 */
const sveltePlugin: BunPlugin = {
  name: "Svelte loader",
  async setup(build: PluginBuilder) {
    console.log("Setting up Svelte loader.");

    // when a .svelte file is imported...
    build.onLoad({ filter: /\.svelte$/ }, async ({ path }) => {
      console.log("Svelte file detected");

      // read and compile it with the Svelte compiler
      const file = await Bun.file(path).text();

      console.log(`Preprocessing ${path}.`);
      const preProcessorResults = await preprocess(
        file,
        svelteConfig.preprocess,
        { filename: path },
      );

      console.log(`Compiling ${path}.`);
      try {
        const contents = compile(
          preProcessorResults.code,
          Object.assign(svelteConfig.compilerOptions, { filename: path }),
        );

        // and return the compiled source code as "js"
        return {
          contents: contents.js.code,
          loader: "js",
        };
      } catch (e) {
        console.error(e);
      }
    });
  },
};

export default sveltePlugin;
