require("dotenv").config();

import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

const isProd = process.env.NODE_ENV === "production";

export default [
  {
    input: "src/shows.js",
    output: {
      dir: "src/site/js",
      format: "iife"
    },
    plugins: [
      resolve(),
      replace({
        preventAssignment: true,
        __BANDS_IN_TOWN_ID__: JSON.stringify(process.env.BANDS_IN_TOWN),
        __DEV__: JSON.stringify(process.env.NODE_ENV === "development")
      }),
      isProd && terser()
    ],
    watch: {
      clearScreen: false
    }
  }
];
