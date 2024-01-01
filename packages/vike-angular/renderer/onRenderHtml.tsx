// https://vike.dev/onRenderHtml
export { onRenderHtml }

import { renderToString } from '@vikejs/vite-plugin-angular/server'
import { dangerouslySkipEscape, escapeInject, version } from 'vike/server'
import type { OnRenderHtmlAsync } from 'vike/types'
import { PageContext } from './PageContext.js'
import { getTitle } from './getTitle.js'

checkVikeVersion()

const onRenderHtml: OnRenderHtmlAsync = async (pageContext): ReturnType<OnRenderHtmlAsync> => {
  const lang = pageContext.config.lang || 'en'

  const { favicon, description } = pageContext.config
  const faviconTag = !favicon ? '' : escapeInject`<link rel="icon" href="${favicon}" />`
  const descriptionTag = !description ? '' : escapeInject`<meta name="description" content="${description}" />`

  const title = getTitle(pageContext)
  const titleTag = !title ? '' : escapeInject`<title>${title}</title>`

  let headContent = ''
  let bodyContent = ''
  const Layout = pageContext.config.Layout ?? undefined
  const Page = pageContext.Page
  if (Page) {
    const result = await renderToString({
      page: Page,
      layout: Layout,
      providers: [{ provide: PageContext, useValue: pageContext }]
    })

    const headStart = result.indexOf('<head>') + 6
    const headEnd = result.indexOf('</head>')
    headContent = result.substring(headStart, headEnd)

    const bodyStart = result.indexOf('<body>') + 6
    const bodyEnd = result.indexOf('</body>')
    bodyContent = result.substring(bodyStart, bodyEnd)
  }

  const documentHtml = escapeInject`<!DOCTYPE html>
  <html lang='${lang}'>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1">
      ${faviconTag}
      ${titleTag}
      ${descriptionTag}
      ${dangerouslySkipEscape(headContent)}
    </head>
    <body>
      ${dangerouslySkipEscape(bodyContent)}
    </body>
    <!-- built with https://github.com/vikejs/vike-angular -->
  </html>`

  return documentHtml
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
