import repoConfig from '@repo/config-prettier/config.mjs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...repoConfig,
  tailwindStylesheet: resolve(__dirname, './src/table-styles.css'),
}

export default config
