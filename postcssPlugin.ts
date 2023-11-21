import { BunPlugin, PluginBuilder } from "bun";
import postcssrc from "postcss-load-config";
import postcss from "postcss";

/**
 * A bun plugin to load .svelte files.
 * It reads svelte.config.js to obtain configuration options.
 */
const postcssPlugin: BunPlugin = {
  name: "PostCSS loader",
  async setup(build: PluginBuilder) {
    console.log("Setting up postcss loader.");

    build.onLoad({ filter: /\.css$/ }, async ({ path }) => {
      console.log(`Css file detected: ${path}`);
      const fileContent = await Bun.file(path).text();

      const postcssConfig = await postcssrc();
      console.log(`Loading postcss config from ${postcssConfig.file}.`);

      const outputFile = path.split("/").at(-1);

      try {
        console.log(`Processing ${path}.`);
        const result = await postcss(postcssConfig.plugins).process(
          fileContent,
          Object.assign(postcssConfig.options, {
            from: path,
            to: `build/${outputFile}`,
          }),
        );

        //await Bun.write(`build/${outputFile}`, result.css);

        return {
          contents: result.css,
        };
      } catch (e) {
        console.error(e);
      }
    });
  },
};

export default postcssPlugin;
