import { PageContext } from 'vike-angular'
import { AppService } from '#root/services/app.service'
import { Component, OnInit, Type, inject } from '@angular/core'
import { SharedModule } from '#root/services/shared.module'
import { ClientOnlyComponent } from '#root/components/ClientOnly'

@Component({
  standalone: true,
  imports: [SharedModule, ClientOnlyComponent],
  template: `
    <div>
      @defer {
        <client-only />
      } @placeholder {
        <div>Loading...</div>
      }
      Index page works
    </div>
  `
})
export default class Page implements OnInit {
  appService = inject(AppService)
  pageContext = inject(PageContext)

  ngOnInit(): void {
    console.log(this.appService.getHello())
    console.log('Page props', this.pageContext.pageProps)
  }
}
