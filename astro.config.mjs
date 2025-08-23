// @ts-check
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";

import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
// import rehypeKatex from "rehype-katex";
import rehypeMathjax from "rehype-mathjax";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjax],
  },
});
