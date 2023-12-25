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

  const { favicon, description } = pageContext.config
  const faviconTag = !favicon ? '' : `<link rel="icon" href="${favicon}" />`
  const descriptionTag = !description ? '' : `<meta name="description" content="${description}" />`

  const title = getTitle(pageContext)
  const titleTag = !title ? '' : `<title>${title}</title>`

  let documentHtml = `<!DOCTYPE html>
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

  const Layout = pageContext.config.Layout ?? undefined
  const Page = pageContext.Page
  if (Page) {
    documentHtml = await renderToString({
      page: Page,
      layout: Layout,
      providers: [{ provide: PageContext, useValue: pageContext }],
      document: documentHtml
    })
  }

  return {
    documentHtml: escapeInject`${dangerouslySkipEscape(documentHtml)}`,
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
