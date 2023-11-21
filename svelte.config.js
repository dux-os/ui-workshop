import preprocess from "svelte-preprocess";

/**{@type import('svelte').config}*/
const config = {
  compilerOptions: {
    customElement: true,
  },
  preprocess: preprocess(),
};

export default config;
