import { createRequire } from "node:module";

// ESM 환경에서 require 기능을 쓰기 위해 생성
const require = createRequire(import.meta.url);

/** @type {import("prettier").Config} */
const config = {
  semi: false,
  singleQuote: true,
  trailingComma: "all",
  tabWidth: 2,
  plugins: [
    // 플러그인 객체 대신, 플러그인이 설치된 '절대 경로'를 문자열로 반환합니다.
    require.resolve("prettier-plugin-organize-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
  tailwindFunctions: ["tv", "extendVariants"],
};

export default config;
