// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax/svg";

const processor = unified({
  remarkPlugins: [remarkMath],
  rehypePlugins: [
    [
      rehypeMathjax,
      {
        svg: {
          fontCache: "local",
        },
      },
    ],
  ],
});

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    mdx(),
  ],

  markdown: {
    processor,
  },

  site: "https://learningguides.github.io",
  base: "/balancedemateria",
});