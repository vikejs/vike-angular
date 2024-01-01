export { onRenderClient }

import { renderPage } from '@vikejs/vite-plugin-angular/client'
import { OnRenderClientAsync } from 'vike/types'
import { PageContext } from './PageContext'

const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  const { Layout } = pageContext.config
  const Page = pageContext.Page

  if (!Page) {
    return
  }

  await renderPage({
    page: Page,
    layout: Layout,
    providers: [{ provide: PageContext, useValue: pageContext }]
  })
}
