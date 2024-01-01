import { angular } from '@vikejs/vite-plugin-angular/plugin'
import vike from 'vike/plugin'
import type { UserConfig } from 'vite'

export default {
  resolve: {
    alias: {
      '#root': __dirname
    }
  },
  plugins: [angular(), vike()]
} satisfies UserConfig
