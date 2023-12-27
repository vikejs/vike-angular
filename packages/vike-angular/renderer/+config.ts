import type { Config, ConfigEffect } from 'vike/types'
import type { ImportProvidersSource, Provider } from '@angular/core'

// Depending on the value of `config.meta.ssr`, set other config options' `env`
// accordingly.
// See https://vike.dev/meta#modify-existing-configurations
const toggleSsrRelatedConfig: ConfigEffect = ({ configDefinedAt, configValue }) => {
  if (typeof configValue !== 'boolean') {
    throw new Error(`${configDefinedAt} should be a boolean`)
  }

  return {
    meta: {
      // When the SSR flag is false, we want to render the page only in the
      // browser. We achieve this by then making the `Page` implementation
      // accessible only in the client's renderer.
      Page: {
        env: configValue
          ? { server: true, client: true } // default
          : { client: true }
      }
    }
  }
}

export default {
  onRenderHtml: 'import:vike-angular/renderer/onRenderHtml:onRenderHtml',
  onRenderClient: 'import:vike-angular/renderer/onRenderClient:onRenderClient',

  // A page can define an onBeforeRender() hook to be run on the server, which
  // can fetch data and return it as additional page context. Typically it will
  // return the page's root Angular component's props and additional data that can
  // be used by the renderers.
  // It is a cumulative config option, so a web app using vike-angular can extend
  // this list.
  passToClient: ['pageProps', 'title', 'ngOnDestroy'],

  clientRouting: true,
  hydrationCanBeAborted: true,
  meta: {
    Layout: {
      env: { server: true, client: true }
    },
    title: {
      env: { server: true, client: true }
    },
    description: {
      env: { server: true }
    },
    favicon: {
      env: { server: true }
    },
    lang: {
      env: { server: true }
    },
    ssr: {
      env: { config: true },
      effect: toggleSsrRelatedConfig
    },
  }
} satisfies Config

// We purposely define the ConfigVikeAngular interface in this file: that way we ensure it's always applied whenever the user `import vikeAngular from 'vike-angular/config'`
import type { Component } from './types'
declare global {
  namespace VikePackages {
    interface ConfigVikeAngular {
      /** The page's root component */
      Page?: Component
      /** A component, usually common to several pages, that wraps the root component `Page` */
      Layout?: Component
      /** &lt;title>${title}&lt;/title> */
      title?: string
      /** &lt;meta name="description" content="${description}" /> */
      description?: string
      /** &lt;link rel="icon" href="${favicon}" /> */
      favicon?: string
      /** &lt;html lang="${lang}">
       *
       *  @default 'en'
       *
       */
      lang?: string
      /**
       * If true, render mode is SSR or pre-rendering (aka SSG). In other words, the
       * page's HTML will be rendered at build-time or request-time.
       * If false, render mode is SPA. In other words, the page will only be
       * rendered in the browser.
       *
       * See https://vike.dev/render-modes
       *
       * @default true
       *
       */
      ssr?: boolean
    }
  }
}
