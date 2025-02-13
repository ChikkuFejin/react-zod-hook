import typescript from "rollup-plugin-typescript2";
import {terser} from "rollup-plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.cjs.js", // CommonJS build
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js", // ES Module build
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: true, 
    }),
    terser(), // Minify the output
  ],
  external: ["react", "zod"], // Mark React and Zod as external dependencies
};