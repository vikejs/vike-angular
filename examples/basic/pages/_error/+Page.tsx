import { Component, OnInit, inject } from '@angular/core'
import { PageContext } from 'vike-angular'

@Component({
  standalone: true,
  template: `<div>Error page works</div>`
})
export default class Page implements OnInit {
  pageContext = inject(PageContext)

  ngOnInit() {
    console.log(`Running on ${import.meta.env.SSR ? 'server' : 'browser'} `)
    console.log('Page props', this.pageContext.pageProps)
  }
}
