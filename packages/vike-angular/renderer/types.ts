export type { Component }

import type { Type } from '@angular/core'

type Component = Type<any>

declare global {
  namespace Vike {
    interface PageContext {
      // Note: Page will typically be undefined in onRenderHtml() when setting the `ssr` config flag
      // to `false` (SPA mode).
      Page?: Component

      /** Properties of the page's root Angular component. */
      pageProps?: Record<string, unknown>

      /** &lt;title>${title}&lt;/title> - has precedence over the config */
      title?: string
      userAgent?: string
    }
  }
}
