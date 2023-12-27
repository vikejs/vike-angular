// https://vike.dev/onRenderHtml
export { onRenderHtml }

import { renderToString } from '@nitedani/vite-plugin-angular/server'
import { dangerouslySkipEscape, escapeInject, version } from 'vike/server'
import type { OnRenderHtmlAsync } from 'vike/types'
import { PageContext } from './PageContext.js'
import { getTitle } from './getTitle.js'

checkVikeVersion()

const onRenderHtml: OnRenderHtmlAsync = async (pageContext): ReturnType<OnRenderHtmlAsync> => {
  const lang = pageContext.config.lang || 'en'
  const Page = pageContext.Page

  //TODO: remove this if possible
  // Angular needs the whole HTML in string form to render, because it injects things to head
  // Angular outputs sanitized HTML
  // If there is no Page, we need to use escapeInject instead
  function getDocumentHtml(escape: false): string
  function getDocumentHtml(escape: true): ReturnType<typeof escapeInject>
  function getDocumentHtml(escape = true) {
    const { favicon, description } = pageContext.config
    const faviconTag = !favicon
      ? ''
      : escape
        ? escapeInject`<link rel="icon" href="${favicon}" />`
        : `<link rel="icon" href="${favicon}" />`
    const descriptionTag = !description
      ? ''
      : escape
        ? escapeInject`<meta name="description" content="${description}" />`
        : `<meta name="description" content="${description}" />`

    const title = getTitle(pageContext)
    const titleTag = !title ? '' : escape ? escapeInject`<title>${title}</title>` : `<title>${title}</title>`

    return escape
      ? escapeInject`<!DOCTYPE html>
      <html lang='${lang}'>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1">
          ${faviconTag}
          ${titleTag}
          ${descriptionTag}
        </head>
        <body>
          <app-root></app-root>
        </body>
        <!-- built with https://github.com/vikejs/vike-angular -->
      </html>`
      : `<!DOCTYPE html>
      <html lang='${lang}'>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1">
          ${faviconTag}
          ${titleTag}
          ${descriptionTag}
        </head>
        <body>
          <app-root></app-root>
        </body>
        <!-- built with https://github.com/vikejs/vike-angular -->
      </html>`
  }

  let documentHtml: string | ReturnType<typeof escapeInject>
  const Layout = pageContext.config.Layout ?? undefined
  if (Page) {
    // Angular needs the whole html, because it injects things to head
    documentHtml = escapeInject`${dangerouslySkipEscape(
      await renderToString({
        page: Page,
        layout: Layout,
        providers: [{ provide: PageContext, useValue: pageContext }],
        document: getDocumentHtml(false)
      })
    )}`
  } else {
    documentHtml = getDocumentHtml(true)
  }

  return {
    documentHtml,
    pageContext: {}
  }
}

function checkVikeVersion() {
  if (version) {
    const versionParts = version.split('.').map((s) => parseInt(s, 10)) as [number, number, number]
    if (versionParts[0] > 0) return
    if (versionParts[1] > 4) return
    if (versionParts[2] >= 147) return
  }
  throw new Error('Update Vike to its latest version (or vike@0.4.147 and any version above)')
}
